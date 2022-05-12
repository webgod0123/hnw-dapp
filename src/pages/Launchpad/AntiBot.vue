<template>
  <div>
    <!-- First Page -->
    <div v-if="pageNo == 1" class="col-12 col-xl-7 container">
      <div class="col-12 order-1 order-xl-2">
          <div class="col-12">
            <div class="card bg-dark text-white mb-3 p-3">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-12 text-center fs-4">
                    <span class="ft-fram-l"><b>HNW Anti-Bot</b></span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 text-start fs-5">  
                    <span class="pe-3 float-end text-danger">
                      {{!this.token.address ? "(*) is required field." : ""}}
                    </span>
                  </div>
                </div>
                <div class="row border border-muted mb-5 bg-gray-800 bg-opacity-60 rounded py-3 mb-3">
                  <div class="row">
                    <div class="col-12 text-start fs-5">
                      <span>Token Address<span class="text-danger">*</span></span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-12 text-start fs-5">
                      <div class="input-group text-white bg-transparent w-100">
                        <input
                          class="form-control form-control-lg bg-transparent border border-primary"
                          placeholder="Input your token address"
                          v-model="token.address"
                        />
                        <button @click="clearInputContext" type="button" class="btn btn-primary text-dark">
                          CLEAR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 px-0">
                    <button @click="TokenListPage" class="btn btn-info text-dark fs-3 offset-1 col-4 p-1">
                      Select Token
                    </button>
                    <button @click="createtokenPage" class="btn btn-info text-dark fs-3 offset-2 col-4 p-1">
                      Create Token
                    </button>
                    <br /><br /><br />
                    <p>
                      Choose a token to integrate with HNW Anti-Bot.<br />
                      Check out the guide how to integrate HNW Anti-Bot for custom contract here:
                    </p>
                    <br />
                    <button @click="nextPage" class="btn btn-info float-end text-dark fs-3 col-3" :class="{ 'disabled': !token.address }">
                      Next >
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <!-- Second Page -->
    <div v-if="pageNo == 2" class="row">
      <div class="col-10 col-lg-6 container">
        <!-- Start Enable HNW Anti-Bot -->
        <div class="col-12 order-1 order-xl-2">
          <div class="col-12">
            <div class="card bg-dark text-white mb-3 p-3">
              <div class="card-body">
                
                <div class="row mb-3">
                  <div class="col-12 text-center fs-4">
                    <p class="ft-fram-l"><b>Enable HNW Anti-Bot</b></p>
                  </div>
                </div>
              
                <div class="row">
                  <div class="col-12 px-0">
                    <button @click="disableAntiBot" :class="{'disabled': !loaded.antiBotStatus}" class="btn btn-info text-dark fs-5 col-12 col-xl-5 p-2 mb-1">
                      Disable HNW AntiBot
                    </button>
                    <button @click="activeAntiBot" :class="{'disabled': loaded.antiBotStatus}" class="btn btn-info text-dark fs-5 offset-xl-2 col-12 col-xl-5 p-2">
                      Enable HNW AntiBot
                    </button>
                    <br /><br />
                    <p class="text-cyan text-center fs-5">
                      You need to pay 0.01 BNB at first time enable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Enable HNW Anti-Bot -->
        <!-- Start Status -->
        <div class="col-12 order-1 order-xl-2">
          <div class="col-12">
            <div class="card bg-dark text-white mb-3 p-3">
              <div class="card-body">
                
                <div class="row mb-3">
                  <div class="col-12 text-center fs-4">
                    <span class="ft-fram-l"><b>Status</b></span>
                  </div>
                </div>
              
                <div class="container">
                  <ul class="list-group list-group-flush fs-5">
                    <li class="list-group-item bg-transparent">
                      <span>Protect Status</span>
                      <span :class="{'text-danger': !loaded.antiBotStatus, 'text-success': loaded.antiBotStatus}" class="float-end">{{ this.loaded.antiBotStatus ? "Active" : "Not Active" }}</span>
                    </li>
                    <li class="list-group-item bg-transparent">
                      <span>Amount Limit</span>
                      <span class="float-end">{{ this.loaded.amountLimit }}</span>
                    </li>
                    <li class="list-group-item bg-transparent">
                      <span>Time Limit</span>
                      <span class="float-end">{{ this.loaded.timeLimit }}</span>
                    </li>
                    <li class="list-group-item bg-transparent">
                      <span>Blocks left to disable</span>
                      <span class="float-end">{{ this.loaded.blocksLeftToDisable }}</span>
                    </li>
                    <li class="list-group-item bg-transparent">
                      <span>Current Block</span>
                      <span class="float-end">{{ this.loaded.currentBlock }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Status -->
      </div>
      <!-- Start Pink Anti-Bot config -->
      <div class="col-10 col-lg-6 container">
        <div class="col-12 order-1 order-xl-2">
          <div class="col-12">
            <div class="card bg-dark text-white mb-3 p-3">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-12 text-center fs-4">
                    <p class="ft-fram-l"><b>Pink Anti-Bot config</b></p>
                  </div>
                </div>
                <div class="row mb-4 fs-6">
                  <div class="col-12 col-xl-6 px-0">
                    <div class="text-white bg-transparent col-11">
                      <label class="form-label">Select Router Exchange</label>
                      <select
                        class="form-control form-control-lg bg-transparent border border-primary"
                        v-model="loaded.routerType"
                      >
                        <option class="bg-dark" value="0">
                          --Select Router Exchange--
                        </option>
                        <option class="bg-dark text-dark" value="1">
                          Pancakeswap
                        </option>
                        <option class="bg-dark text-dark" value="2">
                          Pinkswap Testnet
                        </option>

                      </select>
                      <small class="form-text text-danger">* Router cannot be blank</small>
                    </div>
                  </div>
                  <div class="col-12 col-xl-6 px-0">
                    <div class="text-white bg-transparent offset-xl-1 col-11">
                      <label class="form-label">Select Pair Token</label>
                      <select
                        class="form-control form-control-lg bg-transparent border border-primary"
                        v-model="loaded.pairType"
                      >
                        <option class="bg-dark" value="0">
                          --Select Pair Token--
                        </option>
                        <option class="bg-dark" value="1">
                          BNB
                        </option>

                      </select>
                      <small class="form-text text-danger">* Quote token cannot be blank</small>
                    </div>
                    
                  </div>
                  
                </div>
                <div class="row mb-4 fs-6">
                  <div class="col-6 px-0">
                    
                      <div class="col-11 text-start">
                        <span>Amount Limit Per Trade<span class="text-danger">*</span></span>
                      </div>
                  
                      <div class="col-11 text-start">
                        <div class="input-group text-white bg-transparent w-100">
                          <input
                            class="form-control form-control-lg bg-transparent border border-primary"
                            v-model="loaded.amountLimitPerTrade"
                          />
                        </div>
                      </div>
                  </div>
                  <div class="col-6 px-0">
                      <div class="offset-1 col-11 text-start fs-6">
                        <span>Amount to Be Added Per Block<span class="text-danger">*</span></span>
                      </div>
                      <div class="offset-1 col-11 text-start fs-6">
                        <div class="input-group text-white bg-transparent w-100">
                          <input
                            class="form-control form-control-lg bg-transparent border border-primary"
                            v-model="loaded.amountToBeAddedPerBlock"
                          />
                        </div>
                      </div>
                    
                  </div>
                </div>
                <div class="row mb-4 fs-6">
                  <div class="col-12 px-0">
                    <div class="col-12 text-start">
                      <span>Time Limit Per Trade(seconds)<span class="text-danger">*</span></span>
                    </div>
                    <div class="col-12 text-start">
                      <div class="input-group text-white bg-transparent w-100">
                        <input
                          class="form-control form-control-lg bg-transparent border border-primary"
                          v-model="loaded.timeLimitPerTrade"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-5 fs-6">
                  <div class="col-12 px-0">
                    <div class="col-12 text-start">
                      <span>Block Number to Disable Anti-Bot(Listing is Block #1)<span class="text-danger">*</span></span>
                    </div>
                    <div class="col-12 text-start">
                      <div class="input-group text-white bg-transparent w-100">
                        <input
                          class="form-control form-control-lg bg-transparent border border-primary"
                          v-model="loaded.blockNumberToDisable"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button @click="saveConfig" class="btn btn-info float-end text-dark fs-5 p-1 col-lg-3">
                    Save config
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- END col-6 -->
        </div>
      </div>
      <!-- End Pink Anti-Bot config -->
      <!-- Start BlackList -->
      <div class="col-12 container">
        <div class="col-12 col-xl-12 order-1 order-xl-2">
          <div class="col-12">
            <div class="card bg-dark text-white mb-3 p-3">
              <div class="card-body">
                
                <div class="row mb-3">
                  <div class="col-12 text-center fs-4">
                    <span class="ft-fram-l"><b>BlackList</b></span>
                  </div>
                </div>
                
                <div class="col-12 px-0 text-center">
                  <b-button class="btn btn-info text-dark fs-5 col-10 col-xl-4 col-xxl-3 p-2 mb-1" v-b-modal.modal-scrollable-blacklist-add>
                    Add user to blacklist
                  </b-button>
                  <b-button class="btn btn-info text-dark fs-5 offset-xl-2 col-10 col-xl-4 col-xxl-3 p-2 mb-3" v-b-modal.modal-scrollable-blacklist-remove>
                    Remove user from blacklist
                  </b-button>
                  <br /><br />

                  <div class="overflow-auto">

                    <b-table
                      id="my-table"
                      :items="blackList"
                      :per-page="perPage"
                      :current-page="currentPage"
                      small
                    ></b-table>

                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                      aria-controls="my-table"
                    ></b-pagination>
                  </div>

                  <b-modal id="modal-scrollable-blacklist-add" scrollable ref="blackListModal">
                    <template #modal-header="{ close }">
                      <b-button size="sm" class="d-none" @click="close()">
                      </b-button>
                      <h5>Add user to blacklists</h5>
                    </template>

                    <b-form-textarea
                      id="addBlockList"
                      v-model="addBlack"
                      placeholder="Enter addresses..."
                      rows="10"
                    ></b-form-textarea>

                    <template #modal-footer="{ ok, cancel }">
                      <b-button size="sm" variant="success" @click="addBlackToList">
                        Add
                      </b-button>
                    </template>
                  </b-modal>

                  <b-modal id="modal-scrollable-blacklist-remove" scrollable title="Remove user to blacklists" ref="blackListModal">
                    <template #modal-header="{ close }">
                      <b-button size="sm" class="d-none" @click="close()">
                      </b-button>
                      <h5>Remove user to blacklists</h5>
                    </template>

                    <b-form-textarea
                      id="removeBlockList"
                      v-model="removeBlack"
                      placeholder="Enter addresses..."
                      rows="10"
                    ></b-form-textarea>

                    <template #modal-footer="{ ok, cancel }">
                      <b-button size="sm" variant="danger" @click="removeBlackToList">
                        Remove
                      </b-button>
                    </template>
                  </b-modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End BlackList -->
      <!-- Start WhiteList -->
      <!--<div class="col-12 container">
        <div class="col-12 col-xl-12 order-1 order-xl-2">
          <div class="col-12">
            <div class="card bg-dark text-white mb-3 p-3">
              <div class="card-body">
                
                <div class="row mb-3">
                  <div class="col-12 text-center fs-4">
                    <span class="ft-fram-l"><b>WhiteList</b></span>
                  </div>
                </div>
                
                <div class="col-12 px-0 text-center">
                  <button class="btn btn-info text-dark fs-5 col-10 col-xl-4 col-xxl-3 p-2 mb-1" v-b-modal.modal-scrollable-whitelist-add>
                    Add user to whitelist
                  </button>
                  <button class="btn btn-info text-dark fs-5 offset-xl-2 col-10 col-xl-4 col-xxl-3 p-2 mb-3" v-b-modal.modal-scrollable-whitelist-remove>
                    Remove user from whitelist
                  </button>
                  <br /><br />
                  <p class="text-center">
                    No data
                  </p>

                  <b-modal id="modal-scrollable-whitelist-add" scrollable title="Add user to whitelists">
                    <p class="my-4" >
                      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </p>
                  </b-modal>

                  <b-modal id="modal-scrollable-whitelist-remove" scrollable title="Remove user to whitelists">
                    <p class="my-4" >
                      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </p>
                  </b-modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <!-- End WhiteList -->
    </div>
    <!-- Create Token Page -->
    <div v-if="pageNo == 3" class="col-11 col-xl-6 container">
      <div class="col-12 order-1 order-xl-2">
          <div class="col-12">
            <div class="card bg-dark text-white mb-3 p-3">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-12 text-center fs-4">
                    <span class="ft-fram-l"><b>Create Token</b></span>
                    <button @click="firstPage" class="btn btn-info float-end bg-muted rounded fs-5 pd-0">X</button>
                  </div>
                </div>
                <create-token-form v-on:createTokenReceipt="createTokenReceipt"></create-token-form> 
              </div>
            </div>
          </div>
      </div>
    </div>
    <!-- Token List Page -->
    <div v-if="pageNo == 4" class="col-11 col-xl-6 container">
      <div class="col-12 order-1 order-xl-2">
        <div class="col-12">
          <div class="card bg-dark text-white mb-3 p-3">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-12 text-center fs-4">
                  <span class="ft-fram-l"><b>Select Token</b></span>
                  <button @click="firstPage" class="btn btn-info float-end bg-muted rounded fs-5 pd-0">X</button>
                </div>
              </div>
              <token-list></token-list> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import CreateTokenForm from '../../components/old-git/AntiBot/CreateToken/CreateTokenForm.vue';
import TokenList from '../../components/old-git/AntiBot/TokenList/TokenList.vue';
const abis = require('../../contracts/abis.js');
const routersAddresses = require('../../contracts/routersAddresses.json');

export default {
  name: 'CreateTokenAndSelectToken',
    components: {
        CreateTokenForm,
        TokenList
  },

  data() {
    return {
      pageNo: 1,
      isChecked: false,

      forceRender: 0,
      requiredContracts: [
        "AntiBotConfig"
      ],
      requiredPairs: [
      ],
      creatingToken: true,
      token: {
          address: null,
          name: null,
          symbol: null,
          decimals: null,
      },
      perPage: 5,
      currentPage: 1,
      blackList: [
      ],
      addBlack: "",
      removeBlack: "",
      routersAddresses: routersAddresses,
      loaded: {
          getToken: [],
          antiBotStatus: false,
          protectStatus: "Not Active",
          amountLimit: "N/A", 
          timeLimit: "N/A", 
          blocksLeftToDisable: "N/A", 
          currentBlock: "N/A",
          selectRouterExchange: "", 
          selectPairToken: "", 
          amountLimitPerTrade: "0", 
          amountToBeAddedPerBlock: "0",
          timeLimitPerTrade: "0", 
          blockNumberToDisable: "0",
          routerType: "0",
          pairType: "0",
      },
    }
  },

  created() {
      this.$eventBus.$on("updateWalletBalance", (event) => {
          if (this.requiredContracts.includes(event.token)) {
              this.$nextTick(function() {this.forceRender++;});
          }
      });

      this.$eventBus.$on("createTokenReceipt", (event) => { this.createTokenReceipt(event.receipt, event.infos);});
      this.$eventBus.$on("tokenModalClose", (event) => { this.firstPage();});
      this.$eventBus.$on("tokenSelected", (event) => {});
      this.$eventBus.$on("selectToken", (event) => {this.selectToken(event.selectToken)});
  },

  computed: {
      ...mapState(['contracts', 'session', 'wallet', 'web3']),
      rows() {
        return this.blackList.length
      }
  },

  watch: {
      "session.isConnected": function(newVal, oldVal) {
          if (newVal === true && oldVal === false) {this.initiate();}
      },

      "token.address": function(val, oldVal) {
          this.token.address = val
      },

      "loaded.routerType": function(val, oldVal) {
        this.loaded.routerType = val
        this.loaded.selectRouterExchange = this.routersAddresses[this.loaded.routerType][this.web3.networkId]
      },

      "loaded.pairType": function(val, oldVal) {
        this.loaded.selectPairToken = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
      },

      "loaded.amountLimitPerTrade": function(val, oldVal) {
        this.loaded.amountLimitPerTrade = val
      },

      "loaded.amountToBeAddedPerBlock": function(val, oldVal) {
        this.loaded.amountToBeAddedPerBlock = val
      },
      
      "loaded.timeLimitPerTrade": function(val, oldVal) {
        this.loaded.timeLimitPerTrade = val
      },
      
      "loaded.blockNumberToDisable": function(val, oldVal) {
        this.loaded.blockNumberToDisable = val
      },
  },

  methods: {
    firstPage() {
      this.pageNo = 1
    },
    async nextPage() {
      this.loaded.getToken = await new this.web3.instance.eth.Contract(abis.getAbi("AntiBotStandardToken"), this.token.address)
      this.token.decimals = await this.loaded.getToken.methods.decimals().call()
      this.loaded.antiBotStatus = await this.loaded.getToken.methods.enableAntiBot().call()
      this.getConfigInfo()
      this.pageNo = 2
    },
    clearInputContext() {
      this.token.address = ""
    },
    createtokenPage() {
      this.pageNo = 3
    },
    TokenListPage() {
      this.pageNo = 4
    },
    checked() {
      this.isChecked = !this.isChecked
    },

    initiate: function() {
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredContracts', this.requiredContracts);
    },

    createTokenReceipt: function(receipt, infos) {
      this.token.address = receipt.events.TokenCreated.returnValues.token;
      this.token.name = infos.name;
      this.token.symbol = infos.symbol;
      this.token.decimals = 18;
      if (infos.decimals) {this.token.decimals = infos.decimals;}
      this.creatingToken = false;
    },

    selectToken: function(token) {
      this.token.address = token
    },

    disableAntiBot: async function() {
      try {
        await this.loaded.getToken.methods.setEnableAntiBot(false)
        .send({from: this.wallet.account})
        this.loaded.antiBotStatus = false;
        this.$toasted.success("AntiBot Inactive Success!")
      } catch (err) {
        this.$toasted.error("AntiBot Inactive Failed!")
      }
    },

    activeAntiBot: async function() {
      try {
        await this.loaded.getToken.methods.setEnableAntiBot(true)
        .send({from: this.wallet.account})
        this.loaded.antiBotStatus = true;
        this.$toasted.success("AntiBot Active Success!")
      } catch (err) {
        this.$toasted.error("AntiBot Active Failed!")
      }
    },

    saveConfig: async function() {
      try { 
        if(!this.loaded.antiBotStatus) {
          this.$toasted.error("You must acive antiBot status!");
          return
        }
        await this.contracts.AntiBotConfig.instance.methods.saveConfig(
          this.token.address,
          this.loaded.selectRouterExchange,
          this.loaded.selectPairToken,
          this.web3.instance.utils.toWei(this.loaded.amountLimitPerTrade, "ether"),
          this.web3.instance.utils.toWei(this.loaded.amountToBeAddedPerBlock, "ether"),
          this.loaded.timeLimitPerTrade,
          this.loaded.blockNumberToDisable
        ).send({from: this.wallet.account})

        this.$toasted.success("AntiBot config data save success!")
      } catch (err) {
        console.log(err)
        this.$toasted.error("AntiBot config save failed!")
      }
    },

    getConfigInfo: async function() {
      try {
        let info = await this.contracts.AntiBotConfig.instance.methods.configs(this.token.address).call()
        this.loaded.currentBlock = await this.contracts.AntiBotConfig.instance.methods.getCurrrentBlock().call()
        this.loaded.amountLimit = this.web3.instance.utils.fromWei(info.limitAmount, "ether")
        this.loaded.timeLimit = info.preTransferTime
      } catch (err) {
        console.log("get Info", err)
      }
    },

    addBlackToList: async function() {
      let temp = [];
      this.addBlack.split("\n").map(item => {
        if(!this.duplicateCheck(item)) {
          this.blackList.push({"TokenAddress": item})
          temp.push(item)
        }
      })

      this.$refs['blackListModal'].hide()
      await this.contracts.AntiBotConfig.instance.methods.addBlockLists(this.token.address, temp)
      .send({from: this.wallet.account})
      this.addBlack = ""
    },

    removeBlackToList: async function() {
      this.removeBlack.split("\n").map( item => {
        this.removeBlackListItem(item)
      })

      this.$refs['blackListModal'].hide()
      await this.contracts.AntiBotConfig.instance.methods.removeBlockLists(this.token.address, this.removeBlack.split("\n"))
      .send({from: this.wallet.account})

      this.removeBlack = ""
    },

    removeBlackListItem: function(item) {
      this.blackList.filter( (val, index) => {
          if (String(item).toUpperCase() == (val.TokenAddress).toUpperCase()) {
            this.blackList.splice(index, 1)
          }
        }
      )
    },

    duplicateCheck: function(item) {
      let temp = this.blackList.filter(val => 
        String(item).toUpperCase() == (val.TokenAddress).toUpperCase()
      )

      if(temp.length > 0) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.initiate();
  }
}
</script>
