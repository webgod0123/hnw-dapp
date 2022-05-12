<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
        <!-- BEGIN row -->
        <div class="row justify-content-center" v-if="loaded.balances.length === requiredBalances.length">
            <div class="col-12 col-lg-7">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-12 text-center fs-4">
                                <span class="ft-fram-l"><b>YOUR</b></span><span class="ps-1 ft-fram-l">NFTs</span>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 justify-content-center px-0">
                                <!-- BEGIN row -->
                                <div class="row gx-2 mb-20px">
                                    <!-- BEGIN col-4 -->
                                    <div class="col">
                                        <img src="/assets/img/NFTs/nft-bronze_v003.png" class="img-fluid">
                                        <h4 class="text-center">{{(wallet.balances.HBRONZE === undefined) ? 0 : wallet.balances.HBRONZE}}</h4>
                                    </div>
                                    <div class="col">
                                        <img src="/assets/img/NFTs/nft-silver_v003.png" class="img-fluid">
                                        <h4 class="text-center">{{(wallet.balances.HSILVER === undefined) ? 0 : wallet.balances.HSILVER}}</h4>
                                    </div>
                                    <div class="col">
                                        <img src="/assets/img/NFTs/nft-gold_v003.png" class="img-fluid">
                                        <h4 class="text-center">{{(wallet.balances.HGOLD === undefined) ? 0 : wallet.balances.HGOLD}}</h4>
                                    </div>
                                    <div class="col">
                                        <img src="/assets/img/NFTs/nft-platinum_v003.png" class="img-fluid">
                                        <h4 class="text-center">{{(wallet.balances.HPLATINUM === undefined) ? 0 : wallet.balances.HPLATINUM}}</h4>
                                    </div>
                                    <div class="col">
                                        <img src="/assets/img/NFTs/nft-obsidian_v003.png" class="img-fluid">
                                        <h4 class="text-center">{{(wallet.balances.HOBSIDIAN === undefined) ? 0 : wallet.balances.HOBSIDIAN}}</h4>
                                    </div>
                                    <!-- END col-4 -->
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-12 col-sm-6">
                                <div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3">

                                    <div class="col text-center fs-5">
                                        <h1>{{(wallet.balances.HNWNFT === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : Number(wallet.balances.HNWNFT).toFixed($root.$children[0].displayDecimals)}} <span class="ps-1 ft-fram-l">HNW</span></h1>
                                        <h4><span class="ft-fram-l"><b>YOUR</b></span><span class="ps-1 ft-fram-l">REWARDS</span></h4>
                                        <h6 class="text-muted d-none">You have {{(wallet.balances.HNW === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : Number(wallet.balances.HNW).toFixed($root.$children[0].displayDecimals)}} <span class="ps-1 ft-fram-l">HNW</span></h6>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 px-0">
                                        <button class="btn btn-primary text-dark fs-3 w-100" v-on:click="claimNFTFees()">{{(claiming.use === true) ? 'PROCESSING...' : 'CLAIM'}}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END row -->
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {

        data() {
            return {
                forceRender: 0,
                requiredContracts: ["HNW", "HNWNFT", "HBRONZE", "HSILVER", "HGOLD", "HPLATINUM", "HOBSIDIAN"],
                requiredBalances: ["HNWNFT", "HBRONZE", "HSILVER", "HGOLD", "HPLATINUM", "HOBSIDIAN"],
                requiredAllowances: [],
                requiredPairs: [],
                loaded: {
                    contracts: [],
                    balances: [],
                    allowances: []
                },
                claiming: {
					message: '',
					use: false,
				},
            }
        },

        created() {
            this.$eventBus.$on("contracts/instantiateContract", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}//Return if it's not needed inside the component
                if (this.loaded.contracts.includes(event.payload)) {return;}//Return if the component already register it as loaded
                this.loaded.contracts.push(event.payload);//Add the contract name to the list that have been loaded
                if (this.requiredBalances.includes(event.payload)) {//Verify is component need the balance of the contract that have been loaded
                    this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getWalletBalance', event.payload);//Ask root to load the balance of the contract
                }
            });

            this.$eventBus.$on("wallet/getWalletBalance", (event) => {
                if (!this.requiredBalances.includes(event.payload)) {return;}
                if (this.loaded.balances.includes(event.payload)) {return;}
                this.loaded.balances.push(event.payload);
                if (this.requiredAllowances.includes(event.payload)) {
                    this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('callAllowanceAmount', event.payload);
                }
            });

            this.$eventBus.$on("updateAllowanceAmount", (event) => {
                if (!this.requiredAllowances.includes(event.payload)) {return;}
                if (this.loaded.allowances.includes(event.payload)) {return;}
                this.loaded.allowances.push(event.payload);
            });
        },

        updated () {
        },

        computed: {
            ...mapState(['session', 'wallet'])
        },

        watch: {
            "session.isConnected": function(newVal, oldVal) {
                if (newVal === true && oldVal === false) {this.initiate();}
            }
        },

        methods: {
            initiate: function() {
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredContracts', this.requiredContracts);
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredPairs', this.requiredPairs);
            },

            claimNFTFees: async function() {
				if (this.claiming.use === false) {
					this.claiming.use = true;
					try {
						var response = await this.$calls.claimNFTFee(this.$root.$children[0].wallet.account, false, this.$root.$children[0].contracts.HNWNFT);
					} catch (e) {
						console.log(e);
						this.claiming.use = false;
						return;
					}
                	this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getWalletBalance', "HNWNFT");
					this.claiming.use = false;
				}
            },
		},

        mounted() {
            this.initiate();
        }
    }
</script>