<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
        <!-- BEGIN row -->
        <div class="row justify-content-center">
            <div class="col-12 col-lg-7">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body" v-bind:key="forceRender">
                        <div class="row mb-3">
                            <div class="col-12 text-center fs-4">
                                <span class="ft-fram-l"><b>{{$route.params.token}}</b></span><span class="ps-1 ft-fram-l me-2">PRESALE</span><span class="badge" v-bind:class="{'bg-green': mge.isActive, 'bg-red': !mge.isActive}">{{(mge.isActive) ? 'ACTIVE' : 'INACTIVE'}}</span>
                            </div>
                        </div>
                        <div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3" >
                            <div class="col-12 col-md-4 text-center py-3">
                                <img style="max-width:100px;" class="img-fluid" src="/img/hfuel_thumbnail.png">
                            </div>
                            <div class="col-12 col-md-8">
                                <div class="row mb-3 text-center">
                                    <h3>{{mge.totalContribution}} / 500,000 $BUSD</h3>
                                    <h4 class="text-muted">Total contribution / Hard Cap</h4>
                                </div>
                                <div class="row text-center" v-show="mge.willBeWithelisted === false">
                                    <h3 class="text-red text-center" >This address is not authorized for HFUEL presale.</h3>
                                </div>
                                <div class="row text-center">
                                    <h3>{{mge.contribution}} $BUSD</h3>
                                    <h4 class="text-muted">My contribution</h4>
                                </div>
                            </div>
                        </div>
                        <div v-if="mge.isActive == true">
                            <div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3" v-if="mge.willBeWithelisted === true && mge.isWhitelisted === false">
                                <h3 class="text-yellow text-center">This section will unlock when your address is added to the contract.</h3>
                            </div>
                            <div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3">
                                <div class="row mb-3 text-center">
                                    <h3>{{(balances.BUSD === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : balances.BUSD.toFixed($root.$children[0].displayDecimals)}} $BUSD</h3>
                                    <h4 class="text-muted">My Available $BUSD</h4>
                                </div>
                                <div class="row text-center">
                                    <h3>{{mge.maxContribute}} $BUSD</h3>
                                    <h4 class="text-muted">My max contribution</h4>
                                </div>
                            </div>
                            <div class="row mb-3" v-if="mge.actualContribution < mge.totalContribution">
                                <div class="col-12 text-start fs-5 px-0">
                                    <div class="input-group text-white bg-transparent w-100">
                                        <input class="form-control form-control-lg bg-transparent border border-primary" type="text" placeholder="0.0" aria-label="contribute amount" v-model="contribution.amount">
                                        <button type="button" class="btn btn-primary text-dark" v-on:click="maxContribute()">MAX</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 text-start fs-5 px-0">
                                    <button v-if="!(allowances.MGEHFUELGEN !== undefined && allowances.MGEHFUELGEN > 0)" class="btn btn-info text-dark fs-3 w-100" v-on:click="approve('MGEHFUELGEN')">{{(approves.MGEHFUELGEN.use === true) ? 'PROCESSING...' : 'APPROVE'}}</button>
                                    <button v-if="allowances.MGEHFUELGEN !== undefined && allowances.MGEHFUELGEN > 0 && mge.actualContribution < mge.totalContribution" class="btn btn-primary text-dark fs-3 w-100" v-on:click="contribute()">{{(contribution.use === true) ? 'PROCESSING...' : 'CONTRIBUTE'}}</button>
                                    <button v-if="allowances.MGEHFUELGEN !== undefined && allowances.MGEHFUELGEN > 0 && !(mge.actualContribution < mge.totalContribution)" class="btn btn-orange text-dark fs-3 w-100">HARD CAP FILLED</button>
                                </div>
                            </div>
                        </div>
                        <div v-if="mge.isActive == false">
                            <div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3">
                                <div class="row mb-3 text-center">
                                    <h3>{{mge.getTotalClaim.toFixed($root.$children[0].displayDecimals)}} $HFUEL</h3>
                                    <h4 class="text-muted">Claim presale tokens</h4>
                                </div>
                                <div class="row text-center">
                                    <h3>{{(balances.HFUEL === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : balances.HFUEL.toFixed($root.$children[0].displayDecimals)}} $HFUEL</h3>
                                    <h4 class="text-muted">Your HFUEL balance</h4>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <button class="btn btn-primary text-dark fs-3 w-100" v-on:click="claim()">{{(claiming.use === true) ? 'PROCESSING...' : 'CLAIM'}}</button>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 text-center fs-5">
                            The claiming function will be available once the presale becomes inactive.
                        </div>
                        <div class="col-12 text-center fs-6">
                            This page looks for contract changes and will update automatically.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        props: {
        },

        data() {
            return {
                whitelisted: [],
                forceRender: 0,
                requiredContracts: ["BUSD", "HFUEL", "HNW", "MGEHFUELGEN", "MGEHFUELDIS", "HFUELGATE"],
                mge: {
                    isActive: null,
                    actualContribution: 500000,
                    totalContribution: 500000,
                    contribution: 0,
                    maxContribute: 0,
                    getTotalClaim: 0,
                    remainingClaim: 0,
                    isWhitelisted: false,
                    willBeWithelisted: true,
                },
                balances: {},
                requiredPairs: [],
                pairs: {},
                allowances: {},
                contribution: {
					amount: null,
					message: '',
					use: false,
				},
                claiming: {
					amount: null,
					message: '',
					use: false,
				},
                approves: {
                    MGEHFUELGEN: {
                        message: '',
                        use: false,
                    },
                    MGEHFUELDIS: {
                        message: '',
                        use: false,
                    }
				},
            }
        },

        created() {
            for (var i in window.infos) {
                this.whitelisted.push({
                    address: String(i),
                    amount: window.infos[i]
                });
            }

            this.$eventBus.$on("walletAccountIsSet", (event) => {
                this.$root.$children[0].getRequiredContracts(this.requiredContracts);
                this.$root.$children[0].getRequiredPairs(this.requiredPairs);
                this.checkIfIsWhitelisted();
            });

            this.$eventBus.$on("updateAllowanceAmount", (event) => {
                if (this.requiredContracts.includes(event.token)) {
                    this.allowances[event.token] = event.value;
                    this.$nextTick(function() {this.forceRender++;});
                }
            });

            this.$eventBus.$on("updateWalletBalance", (event) => {
                if (this.requiredContracts.includes(event.token)) {
                    if (event.token == 'MGEHFUELGEN') {this.startListening();}
                    if (event.token == 'MGEHFUELDIS') {this.logContractCalls();}
                    this.balances[event.token] = event.value;
                    this.$nextTick(function() {this.forceRender++;});
                }
            });

            this.$eventBus.$on("updatePairRatio", (event) => {
                if (this.requiredPairs.includes(event.pair)) {
                    this.pairs[event.pair] = event.data;
                    this.$nextTick(function() {this.forceRender++;});
                }
            });
        },

        updated () {
        },

        computed: {
        },

        watch: {
        },

        methods: {
            maxContribute: function() {
                this.contribution.amount = this.mge.maxContribute;
            },

            startListening: async function() {
                this.listeningEvents();
                window.setInterval(() => {
                    this.listeningEvents();
                }, 3000);
                    // this.checkContracts();
                // window.setInterval(() => {
                //     this.checkContracts();
                // }, 1000);
            },

            listeningEvents: async function() {
                if (this.mge.isWhitelisted == false) {this.checkIfIsWhitelisted();}
                this.mge.isActive = await this.$root.$children[0].contracts.MGEHFUELGEN.instance.methods.isActive().call();
                this.mge.contribution = this.$root.$children[0].fromWei(await this.$root.$children[0].contracts.MGEHFUELGEN.instance.methods.contribution(this.$root.$children[0].wallet.account).call());
                this.checkIfIsWhitelisted();
                this.$nextTick(function() {this.forceRender++;});
            },

            exceedAmount: function() {
                alert("You exceed your max contribution.");
            },

            contribute: async function() {
				if (this.contribution.use === false) {
					this.contribution.use = true;
					try {
						const response = await this.$calls.contribute(this.$root.$children[0].toWei(this.contribution.amount, 'MGEHFUELGEN'), this.$root.$children[0].wallet.account, false, this.$root.$children[0].contracts.MGEHFUELGEN);
					} catch (e) {
						console.log(e);
						this.contribution.use = false;
						return;
					}
                	this.$root.$children[0].getRequiredContracts(this.requiredContracts);
					this.contribution.amount = null;
					this.contribution.use = false;
				}
            },

            claim: async function() {
				if (this.claiming.use === false) {
					this.claiming.use = true;
					try {
						var response = await this.$calls.claim(this.$root.$children[0].wallet.account, false, this.$root.$children[0].contracts.MGEHFUELGEN);
					} catch (e) {
						console.log(e);
						this.claiming.use = false;
						return;
					}
                	this.$root.$children[0].getRequiredContracts(this.requiredContracts);
					this.claiming.use = false;
				}
            },

            approve: async function(contract) {
				if (this.approves[contract].use === false) {
					this.approves[contract].use = true;
					try {
                        console.log(this.$root.$children[0].contracts.BUSD);
						var response = await this.$calls.approve(this.$root.$children[0].wallet.account, false, this.$root.$children[0].contracts[contract].address, this.$root.$children[0].contracts.BUSD);
					} catch (e) {
						console.log(e);
						this.approves[contract].use = false;
						return;
					}
					this.approves[contract].use = false;
                    this.$nextTick(function() {this.$root.$children[0].callAllowanceAmount(contract);});
				}
            },

            checkIfIsWhitelisted: async function() {
                var index = this.whitelisted.findIndex(item => String(item.address).toLowerCase() == String(this.$root.$children[0].wallet.account).toLowerCase());
                if (index == -1) {return;}
                if (this.$root.$children[0].contracts.MGEHFUELGEN === undefined) {return;}
                this.mge.willBeWithelisted = true;
                var response = await this.$root.$children[0].contracts.MGEHFUELGEN.instance.methods.whitelist(this.$root.$children[0].wallet.account).call();
                this.mge.isWhitelisted = response.active;
                this.mge.maxContribute = this.$root.$children[0].fromWei(response.maxContribution);
                this.forceRender++;
            },

            logContractCalls: async function() {
                var response = await this.$root.$children[0].contracts.MGEHFUELDIS.instance.methods.getTotalClaim(this.$root.$children[0].wallet.account).call({from: this.$root.$children[0].wallet.account});
                this.mge.getTotalClaim = Number(this.$root.$children[0].fromWei(response));

                // var response = await this.$root.$children[0].contracts.MGEHFUELDIS.instance.methods.rootedToken().call();
                // console.log(response);
                // console.log(String("0xd2789D33016bea231Ea81C207701640166D5653").toLowerCase());
            },

            checkContracts: async function() {
                // var response = await this.$root.$children[0].contracts.HFUELGATE.instance.methods.tradingOpened().call();
                // console.log('tradingOpened: '+response);
            }
        },

        mounted() {
        }
    }
</script>