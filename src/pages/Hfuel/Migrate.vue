<template>
  <div>
    <!-- BEGIN row -->
    <div class="row">
      <div class="col-12 col-xl-6 order-1 order-xl-2">
        <div class="card bg-dark text-white mb-3 p-3">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-12 text-center fs-4">
                <span class="ft-fram-l"><b>Migrate</b></span>
              </div>
            </div>
            <div
              class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3"
            >
              <div class="row">
                <div class="col-12 text-start fs-5">
                  <span>Amount</span>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-12 text-start fs-5">
                  <div class="input-group text-white bg-transparent w-100">
                    <input
                      class="form-control form-control-lg bg-transparent border border-primary"
                      type="text"
                      placeholder="0.0"
                      aria-label="amount"
                      v-model="migrate.amount"
                      v-on:keyup="manualAmount()"
                    />
                    <button
                      type="button"
                      class="btn btn-primary text-dark"
                      v-on:click="getMaxAmount()"
                    >
                      MAX
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12 px-0 fs-5">
                <span>Old Hfuel Balance: {{ this.oldHfuelBalance }}</span>
                <span class="float-end"
                  >New Hfuel Balance: {{ this.newHfuelBalance }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-12 px-0">
                <button
                  class="btn btn-info text-dark fs-3 w-100 claim-btn"
                  v-on:click="migrateAmount()"
                  :disabled="isDisableButton('migrateAmount')"
                >
                  <Preloader v-show="this.isLoading.migrateAmount" width="6%" />
                  <span v-show="!this.isLoading.migrateAmount">{{
                    this.migrate.label
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END col-6 -->
    </div>
    <!-- END row -->
  </div>
</template>

<script>
import Preloader from "../../components/loader/Preloader.vue";
import { MaxUint256 } from "@ethersproject/constants";
import { mapState } from "vuex";

export default {
  data() {
    return {
      forceRender: 0,
      requiredContracts: [
        "HFUEL",
        "OLDHFUEL",
        "TokenMint",
        "ERC20"
      ],
      requiredPairs: [],
      migrate: {
        amount: null,
        label: "Migrate",
        maxButtonClicked: false,
        listenChange: true,
        message: "",
        use: false,
      },
      oldHfuelBalance: "N/A",
      newHfuelBalance: "N/A",
      loaded: {
        contracts: [],
        pairs: [],
      },
      isLoading: {},
      isMaxAmount: false,
    };
  },

  created() {
    this.$eventBus.$on("contracts/instantiateContract", (event) => {
      if (!this.requiredContracts.includes(event.payload)) {
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getWalletBalance",
        event.payload
      );
    });

    this.$eventBus.$on("wallet/getWalletBalance", (event) => {
      if (!this.requiredContracts.includes(event.payload)) {
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "callAllowanceAmount",
        event.payload
      );
    });

    this.$eventBus.$on("updateAllowanceAmount", (event) => {
      if (!this.requiredContracts.includes(event.payload)) {
        return;
      }
      if (this.loaded.contracts.includes(event.payload)) {
        return;
      }
      this.loaded.contracts.push(event.payload);
    });

    this.$eventBus.$on("updatePairRatio", (event) => {
      if (this.requiredPairs.includes(event.pair)) {
        this.$nextTick(function () {
          this.forceRender++;
        });
      }
    });
  },

  updated() {},

  components: {
    Preloader,
  },
  computed: {
    ...mapState(["contracts", "pairs", "session", "wallet", "web3"]),
  },

  watch: {
    "session.isConnected": function (newVal, oldVal) {
      if (newVal === true && oldVal === false) {
        this.initiate();
      }
    },
  },

  methods: {
    initiate: function () {
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredPairs",
        this.requiredPairs
      );
      let interval = setInterval(async () => {
        let HfuelInstance =
          this.contracts.HFUEL && this.contracts.HFUEL.instance;
        if (HfuelInstance) {
          clearInterval(interval);
          this.getHfuelBalance();
        }
      }, 500);
    },

    getHfuelBalance: async function () {
      let OldHfuelMethod = this.contracts.OLDHFUEL.instance.methods;
      let oldHfuelBalance = await this.contracts.OLDHFUEL.instance.methods
        .balanceOf(this.wallet.account)
        .call();
      let allowance = await OldHfuelMethod.allowance(
        this.wallet.account,
        this.contracts.TokenMint.address
      ).call();
      let newHfuelBalance = await this.contracts.HFUEL.instance.methods
        .balanceOf(this.wallet.account)
        .call();
      this.oldHfuelBalance = this.getToFixedNum(oldHfuelBalance);
      this.newHfuelBalance = this.getToFixedNum(newHfuelBalance);
      if (allowance > 0) {
        this.migrate.label = "Migrate";
      } else {
        this.migrate.label = "Approve";
      }
    },


    manualAmount: function() {
      this.isMaxAmount = false;
    },

    getMaxAmount: function () {
      this.migrate.amount = this.wallet.balances['OLDHFUEL'];
      this.isMaxAmount = true;
    },

    getToFixedNum: function (num) {
      return Number(this.web3.instance.utils.fromWei(num, "ether")).toFixed(
        this.$root.$children[0].displayDecimals
      );
    },

    migrateAmount: async function () {
      this.isLoading = { ...this.Loading, migrateAmount: true };
      let _amount = 0;
      if (this.isMaxAmount) {
        _amount = this.wallet.weiBalances['OLDHFUEL'];
      } else {
        _amount = this.web3.instance.utils.toWei(this.migrate.amount);
      }
      console.log(_amount);
      try {
        if (this.migrate.amount) {
          let allowance = await this.contracts.OLDHFUEL.instance.methods
            .allowance(this.wallet.account, this.contracts.TokenMint.address)
            .call();
          let response = {};

          if (Number(allowance) < Number(_amount)) {
            response = await this.contracts.OLDHFUEL.instance.methods
              .approve(this.contracts.TokenMint.address, MaxUint256)
              .send({ from: this.wallet.account });
            this.migrate.label = "Migrate";
          } else {
            response = await this.contracts.TokenMint.instance.methods
              .exchangeTokens(_amount)
              .send({
                from: this.wallet.account,
              });
          }

          let { transactionHash } = response;
          this.showAlert({
            type: "success",
            title: "Your transaction has been completed",
            html: `Here is the <a target="_blank" href="https://bscscan.com/tx/${transactionHash}">link</a> of transaction`,
          });
          this.getHfuelBalance();
        } else {
          this.showAlert({
            type: "error",
            title: "Error",
            html: "Invalid Amount",
          });
        }
        this.isLoading = { ...this.Loading, migrateAmount: false };
      } catch (e) {
        this.isLoading = { ...this.Loading, migrateAmount: false };
        console.log(e);
        this.showAlert({
          type: "error",
          title: "Error",
          html: e.message,
        });
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
    },

    isDisableButton: function (name) {
      let res = false;
      if (!this.wallet.account) {
        res = true;
      } else if (this.isLoading[`name`]) {
        res = true;
      }
      return res;
    },

    showAlert: function ({ title = "", type = "", html = "" }) {
      this.$swal.fire({
        icon: type,
        title,
        html,
        showConfirmButton: true,
        timer: 5000,
      });
      // .then((result) => {
      //   this.$router.go(this.$router.currentRoute);
      // });
    },
  },

  mounted() {
    this.initiate();
  },
};
</script>
