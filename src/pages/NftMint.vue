<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
        <!-- BEGIN row -->
        <div class="row justify-content-center">
            <div class="d-flex" style="width:325px !important;">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-12 text-center px-0" style="position:relative;">
                                <img src="/assets/img/NFTs/nft-hnw-bronze_v001.gif" class="img-fluid rounded">
                                <div style="position:absolute;bottom:15px;right:15px;">
                                    <div class="border border-muted bg-purple-800 bg-opacity-60 rounded p-2">
                                        {{nfts.HBRONZE.leftToMint}} LEFT
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3">
                            <div class="col text-center fs-5">
                                <p class="fs-2 text-decoration-underline">
                                    <span class="ft-fram-l"><b>HNW</b> BRONZE</span>
                                </p>
                                <p class="text-muted">
                                    Mint price: <b>50</b> $HNW<br>
                                    <b>0.002%</b> stakeholder's revenue<br>
                                    Limited to <b>10,000</b> minted<br><br>
                                    You hold <b>{{(wallet.balances.HBRONZE === undefined) ? 0 : wallet.balances.HBRONZE}}</b> bronze
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 px-0">
                                <button class="btn btn-orange text-dark fs-3 w-100">SOLD OUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex" style="width:325px !important;">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-12 text-center px-0" style="position:relative;">
                                <img src="/assets/img/NFTs/nft-hnw-silver_v001.gif" class="img-fluid rounded">
                                <div style="position:absolute;bottom:15px;right:15px;">
                                    <div class="border border-muted bg-purple-800 bg-opacity-60 rounded p-2">
                                        {{nfts.HSILVER.leftToMint}} LEFT
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3">
                            <div class="col text-center fs-5">
                                <p class="fs-2 text-decoration-underline">
                                    <span class="ft-fram-l"><b>HNW</b> SILVER</span>
                                </p>
                                <p class="text-muted">
                                    Mint price: <b>250</b> $HNW<br>
                                    <b>0.01%</b> stakeholder's revenue<br>
                                    Limited to <b>500</b> minted<br><br>
                                    You hold <b>{{(wallet.balances.HSILVER === undefined) ? 0 : wallet.balances.HSILVER}}</b> silver
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 px-0">
                                <button class="btn btn-orange text-dark fs-3 w-100">SOLD OUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex" style="width:325px !important;">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-12 text-center px-0" style="position:relative;">
                                <img src="/assets/img/NFTs/nft-hnw-gold_v001.gif" class="img-fluid rounded">
                                <div style="position:absolute;bottom:15px;right:15px;">
                                    <div class="border border-muted bg-purple-800 bg-opacity-60 rounded p-2">
                                        {{nfts.HGOLD.leftToMint}} LEFT
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3">
                            <div class="col text-center fs-5">
                                <p class="fs-2 text-decoration-underline">
                                    <span class="ft-fram-l"><b>HNW</b> GOLD</span>
                                </p>
                                <p class="text-muted">
                                    Mint price: <b>2,500</b> $HNW<br>
                                    <b>0.1%</b> stakeholder's revenue<br>
                                    Limited to <b>50</b> minted<br><br>
                                    You hold <b>{{(wallet.balances.HGOLD === undefined) ? 0 : wallet.balances.HGOLD}}</b> gold
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 px-0">
                                <button class="btn btn-orange text-dark fs-3 w-100">SOLD OUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex" style="width:325px !important;">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-12 text-center px-0" style="position:relative;">
                                <img src="/assets/img/NFTs/nft-hnw-platinum_v001.gif" class="img-fluid rounded">
                                <div style="position:absolute;bottom:15px;right:15px;">
                                    <div class="border border-muted bg-purple-800 bg-opacity-60 rounded p-2">
                                        {{nfts.HPLATINUM.leftToMint}} LEFT
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3">
                            <div class="col text-center fs-5">
                                <p class="fs-2 text-decoration-underline">
                                    <span class="ft-fram-l"><b>HNW</b> PLATINUM</span>
                                </p>
                                <p class="text-muted">
                                    Mint price: <b>5,000</b> $HNW<br>
                                    <b>0.2%</b> stakeholder's revenue<br>
                                    Limited to <b>25</b> minted<br><br>
                                    You hold <b>{{(wallet.balances.HPLATINUM === undefined) ? 0 : wallet.balances.HPLATINUM}}</b> platinum
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 px-0">
                                <button class="btn btn-orange text-dark fs-3 w-100">SOLD OUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex" style="width:325px !important;">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-12 text-center px-0" style="position:relative;">
                                <img src="/assets/img/NFTs/nft-hnw-obsidian_v001.gif" class="img-fluid rounded">
                                <div style="position:absolute;bottom:15px;right:15px;">
                                    <div class="border border-muted bg-purple-800 bg-opacity-60 rounded p-2">
                                        {{nfts.HOBSIDIAN.leftToMint}} LEFT
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3">
                            <div class="col text-center fs-5">
                                <p class="fs-2 text-decoration-underline">
                                    <span class="ft-fram-l"><b>HNW</b> OBSIDIAN</span>
                                </p>
                                <p class="text-muted">
                                    Mint price: <b>12,500</b> $HNW<br>
                                    <b>0.5%</b> stakeholder's revenue<br>
                                    Limited to <b>10</b> minted<br><br>
                                    You hold <b>{{(wallet.balances.HOBSIDIAN === undefined) ? 0 : wallet.balances.HOBSIDIAN}}</b> obsidian
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 px-0">
                                <button class="btn btn-orange text-dark fs-3 w-100">SOLD OUT</button>
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

        props: {
        },

        data() {
            return {
                forceRender: 0,
                requiredContracts: ["HBRONZE", "HSILVER", "HGOLD", "HPLATINUM", "HOBSIDIAN"],
                requiredPairs: [],
                allowances: {},
                balances: {},
                minting: {
                    HBRONZE: {
                        message: '',
                        use: false,
                    }
				},
                approves: {
                    HBRONZE: {
                        message: '',
                        use: false,
                    }
				},
                firstTrigger: false,
                nfts: {
                    HBRONZE: {totalMint: 0, leftToMint: 0},
                    HSILVER: {totalMint: 500, leftToMint: 0},
                    HGOLD: {totalMint: 50, leftToMint: 0},
                    HPLATINUM: {totalMint: 25, leftToMint: 0},
                    HOBSIDIAN: {totalMint: 10, leftToMint: 0}
                },
                loaded: {
                    contracts: [],
                }
            }
        },

        created() {
            this.$eventBus.$on("contracts/instantiateContract", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getWalletBalance', event.payload);
            });

            this.$eventBus.$on("wallet/getWalletBalance", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}
                if (event.payload === 'HBRONZE' && this.firstTrigger === false) {this.startListening()}
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('callAllowanceAmount', event.payload);
            });

            this.$eventBus.$on("updateAllowanceAmount", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}
                if (this.loaded.contracts.includes(event.payload)) {return;}
                this.loaded.contracts.push(event.payload);
            });

            this.$eventBus.$on("updatePairRatio", (event) => {
                if (this.requiredPairs.includes(event.pair)) {
                    this.$nextTick(function() {this.forceRender++;});
                }
            });
        },

        updated () {
        },

        computed: {
            ...mapState(['contracts', 'pairs', 'session', 'wallet', 'web3'])
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

            approve: async function(contract) {
				if (this.approves[contract].use === false) {
					this.approves[contract].use = true;
					try {
						var response = await this.$calls.approve(this.$root.$children[0].wallet.account, false, this.$root.$children[0].contracts[contract].address, this.$root.$children[0].contracts.HNW);
					} catch (e) {
						console.log(e);
						this.approves[contract].use = false;
						return;
					}
					this.approves[contract].use = false;
                    this.$nextTick(function() {this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('callAllowanceAmount', contract);});
				}
            },

            mintNFT: async function(nft) {
				if (this.minting[nft].use === false) {
					this.minting[nft].use = true;
					try {
						var response = await this.$calls.mintNFT(this.$root.$children[0].wallet.account, false, this.$root.$children[0].contracts[nft]);
                	    this.$root.$children[0].getRequiredContracts([nft]);
                        this.listeningEvents();
					} catch (e) {
						console.log(e);
						this.minting[nft].use = false;
						return;
					}
                	// this.$root.$children[0].getRequiredContracts(this.requiredContracts);
					this.minting[nft].use = false;
				}
            },

            startListening: async function() {
                this.firstTrigger = true;
                this.listeningEvents();
                window.setInterval(() => {
                    this.listeningEvents();
                }, 3000);
            },

            listeningEvents: async function() {
                this.nfts.HBRONZE.totalMinted = await this.contracts.HBRONZE.instance.methods.totalMinted().call({ from: this.wallet.account });
                this.nfts.HBRONZE.leftToMint = await this.contracts.HBRONZE.instance.methods._mintLimit().call({ from: this.wallet.account });
                this.$nextTick(function() {this.forceRender++;});
            }

		},

        mounted() {
            this.initiate();
        }
    }
</script>