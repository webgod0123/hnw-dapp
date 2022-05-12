<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
        <div class="row" v-if="loaded.contracts.length === requiredContracts.length">
            <div class="col-12 col-xl-9 col-xxl-8">
                <div class="row">
                    <div class="col-12">
                        <div class="panel bg-dark text-white">
                            <div class="panel-body">
                                <div class="row mb-3">
                                    <div class="col-12 text-center fs-4">
                                        <img src="/assets/img/logo/hnw-big.png" class="img img-fluid" style="max-height: 60px;">
                                        <h3 class="mt-3 ft-fram-l">HNW</h3>
                                    </div>
                                </div>
                                <!-- BEGIN row -->
                                <div class="row gx-2 mb-20px">
                                    <!-- BEGIN col-4 -->
                                    <div class="col-12 col-lg-4">
                                        <div class="widget widget-stats bg-purple-800 mb-7px">
                                            <div class="stats-icon stats-icon-lg"><i class="fa fa-dollar-sign fa-fw"></i></div>
                                            <div class="stats-content">
                                                <div class="stats-title">HOLDINGS</div>
                                                <div class="stats-number">{{(wallet.balances.HNW === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : (wallet.balances.HNW).toFixed($root.$children[0].displayDecimals)}} <span class="fs-5">$HNW</span></div>
                                                <div class="stats-progress progress">
                                                    <div class="progress-bar" style="width: 100%;"></div>
                                                </div>
                                                <div class="stats-desc">≃ {{(pairs.BUSDHNW === undefined) ? '0' : (wallet.balances.HNW * pairs.BUSDHNW.ratio).toFixed(0)}} $BUSD</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- END col-4 -->
                                    <!-- BEGIN col-4 -->
                                    <div class="col-12 col-lg-4">
                                        <div class="widget widget-stats bg-orange-700 mb-7px">
                                            <div class="stats-icon stats-icon-lg"><i class="fa fa-piggy-bank fa-fw"></i></div>
                                            <div class="stats-content">
                                                <div class="stats-title">STAKE</div>
                                                <div class="stats-number">{{(wallet.balances.xHNW === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : (wallet.balances.xHNW).toFixed($root.$children[0].displayDecimals)}} <span class="fs-5">$xHNW</span></div>
                                                <div class="stats-progress progress">
                                                    <div class="progress-bar" style="width: 100%;"></div>
                                                </div>
                                                <div class="stats-desc">≃ {{(pairs.HNWxHNW === undefined) ? '0' : (wallet.balances.xHNW * pairs.HNWxHNW.inverse).toFixed(0)}} $HNW / {{(pairs.HNWxHNW === undefined || pairs.BUSDHNW === undefined) ? '0.00' : (wallet.balances.xHNW * pairs.HNWxHNW.inverse * pairs.BUSDHNW.ratio).toFixed(0)}} $BUSD</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- END col-4 -->
                                    <!-- BEGIN col-4 -->
                                    <div class="col-12 col-lg-4">
                                        <div class="widget widget-stats bg-yellow-800 mb-7px">
                                            <div class="stats-icon stats-icon-lg"><i class="fa fa-chart-line fa-fw"></i></div>
                                            <div class="stats-content">
                                                <div class="stats-title">PRICE</div>
                                                <div class="stats-number">{{(pairs.BUSDHNW === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : pairs.BUSDHNW.ratio.toFixed($root.$children[0].displayDecimals)}} <span class="fs-5">$BUSD</span></div>
                                                <div class="stats-progress progress">
                                                    <div class="progress-bar" style="width: 100%;"></div>
                                                </div>
                                                <!--<div class="stats-desc">1 $HNW ≃ 0.000 $BNB</div>-->
                                                <div class="stats-desc">&nbsp;</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- END col-4 -->
                                </div>
                                <!-- END row -->
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
                    </div>
                    <div class="col-12">
                        <div class="panel bg-dark text-white">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-3 text-center">
                                        <img style="max-width:75px;" class="img-fluid" src="/assets/img/logo/hfuel-big.png">
                                        <h2 class="mt-3 ft-fram-l">HFUEL</h2>
                                    </div>
                                    <div class="col-9">
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="widget widget-stats bg-purple-800 mb-7px">
                                                    <div class="stats-icon stats-icon-lg"><i class="fa fa-dollar-sign fa-fw"></i></div>
                                                    <div class="stats-content">
                                                        <div class="stats-title">HOLDINGS</div>
                                                        <div class="stats-number">{{(wallet.balances.HFUEL === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : wallet.balances.HFUEL.toFixed($root.$children[0].displayDecimals)}} <span class="fs-5">$HFUEL</span></div>
                                                        <div class="stats-progress progress">
                                                            <div class="progress-bar" style="width: 100%;"></div>
                                                        </div>
                                                        <div class="stats-desc">≃ {{(pairs.BUSDHFUEL === undefined) ? '0' : (wallet.balances.HFUEL * pairs.BUSDHFUEL.ratio).toFixed(0)}} $BUSD</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="widget widget-stats bg-yellow-800 mb-7px">
                                                    <div class="stats-icon stats-icon-lg"><i class="fa fa-chart-line fa-fw"></i></div>
                                                    <div class="stats-content">
                                                        <div class="stats-title">PRICE</div>
                                                        <div class="stats-number">{{(pairs.BUSDHFUEL === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : pairs.BUSDHFUEL.ratio.toFixed($root.$children[0].displayDecimals)}} <span class="fs-5">$BUSD</span></div>
                                                        <div class="stats-progress progress">
                                                            <div class="progress-bar" style="width: 100%;"></div>
                                                        </div>
                                                        <div class="stats-desc">&nbsp;</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="panel bg-dark text-white">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-3 text-center">
                                        <img style="max-width:75px;" class="img-fluid" src="/assets/img/logo/refinery-big.png">
                                        <h2 class="mt-3 ft-fram-l">REFINERY</h2>
                                    </div>
                                    <div class="col-9">
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="widget widget-stats bg-purple-800 mb-7px">
                                                    <div class="stats-icon stats-icon-lg"><i class="fa fa-dollar-sign fa-fw"></i></div>
                                                    <div class="stats-content">
                                                        <div class="stats-title">CLAIMABLE</div>
                                                        <div class="stats-number">{{(refineryData.loaded) ? Number(web3.instance.utils.fromWei(refineryData.claimsAvailable)).toFixed(3) : 0}} <span class="fs-5">$HFUEL</span></div>
                                                        <div class="stats-progress progress">
                                                            <div class="progress-bar" style="width: 100%;"></div>
                                                        </div>
                                                        <div class="stats-desc">≃ {{(refineryData.loaded) ? (Number(web3.instance.utils.fromWei(refineryData.claimsAvailable)) * pairs.BUSDHFUEL.ratio).toFixed(3) : 0}} $BUSD</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="widget widget-stats bg-yellow-800 mb-7px">
                                                    <div class="stats-icon stats-icon-lg"><i class="fa fa-chart-line fa-fw"></i></div>
                                                    <div class="stats-content">
                                                        <div class="stats-title">TOTAL DEPOSIT</div>
                                                        <div class="stats-number">{{(refineryData.loaded) ? Number(web3.instance.utils.fromWei(refineryData.userInfo[2])).toFixed(0) : 0}} <span class="fs-5">$HFUEL</span></div>
                                                        <div class="stats-progress progress">
                                                            <div class="progress-bar" style="width: 100%;"></div>
                                                        </div>
                                                        <div class="stats-desc">≃ {{(refineryData.loaded) ? (Number(web3.instance.utils.fromWei(refineryData.userInfo[2])) * pairs.BUSDHFUEL.ratio).toFixed(0) : 0}} $BUSD</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="panel bg-dark text-white">
                            <div class="panel-body">
                                <div class="row mb-3">
                                    <div class="col-12 text-center fs-4">
                                        <img src="/assets/img/logo/sidekick-big.png" class="img img-fluid" style="max-height: 60px;">
                                        <h3 class="mt-3 ft-fram-l">SIDEKICK</h3>
                                    </div>
                                </div>
                                <!-- BEGIN row -->
                                <div class="row gx-2 mb-20px">
                                    <!-- BEGIN col-4 -->
                                    <div class="col-12 col-lg-4">
                                        <div class="widget widget-stats bg-purple-800 mb-7px">
                                            <div class="stats-icon stats-icon-lg"><i class="fa fa-dollar-sign fa-fw"></i></div>
                                            <div class="stats-content">
                                                <div class="stats-title">HOLDINGS</div>
                                                <div class="stats-number">{{(wallet.balances.SK === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : (wallet.balances.SK).toFixed($root.$children[0].displayDecimals)}} <span class="fs-5">$SK</span></div>
                                                <div class="stats-progress progress">
                                                    <div class="progress-bar" style="width: 100%;"></div>
                                                </div>
                                                <div class="stats-desc">≃ {{(pairs.BNBSK === undefined) ? '0' : (wallet.balances.SK * (pairs.BNBSK.ratio * pairs.BUSDBNB.ratio)).toFixed(0)}} $BUSD</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- END col-4 -->
                                    <!-- BEGIN col-4 -->
                                    <div class="col-12 col-lg-4">
                                        <div class="widget widget-stats bg-orange-700 mb-7px">
                                            <div class="stats-icon stats-icon-lg"><i class="fa fa-piggy-bank fa-fw"></i></div>
                                            <div class="stats-content">
                                                <div class="stats-title">STAKE</div>
                                                <div class="stats-number">{{(wallet.balances.xSK === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : (wallet.balances.xSK).toFixed($root.$children[0].displayDecimals)}} <span class="fs-5">$xSK</span></div>
                                                <div class="stats-progress progress">
                                                    <div class="progress-bar" style="width: 100%;"></div>
                                                </div>
                                                <div class="stats-desc">≃ {{(pairs.SKxSK === undefined) ? '0' : (wallet.balances.xSK * pairs.SKxSK.inverse).toFixed(0)}} $SK / {{(pairs.SKxSK === undefined || pairs.BNBSK === undefined) ? '0.00' : (wallet.balances.xSK * pairs.SKxSK.inverse * (pairs.BNBSK.ratio * pairs.BUSDBNB.ratio)).toFixed(0)}} $BUSD</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- END col-4 -->
                                    <!-- BEGIN col-4 -->
                                    <div class="col-12 col-lg-4">
                                        <div class="widget widget-stats bg-yellow-800 mb-7px">
                                            <div class="stats-icon stats-icon-lg"><i class="fa fa-chart-line fa-fw"></i></div>
                                            <div class="stats-content">
                                                <div class="stats-title">PRICE</div>
                                                <div class="stats-number">{{(pairs.BNBSK === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : (pairs.BNBSK.ratio * pairs.BUSDBNB.ratio).toFixed($root.$children[0].displayDecimals)}} <span class="fs-5">$BUSD</span></div>
                                                <div class="stats-progress progress">
                                                    <div class="progress-bar" style="width: 100%;"></div>
                                                </div>
                                                <!--<div class="stats-desc">1 $SK ≃ 0.000 $BNB</div>-->
                                                <div class="stats-desc">&nbsp;</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- END col-4 -->
                                </div>
                                <!-- END row -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {

        data() {
            return {
                forceRender: 0,
                requiredContracts: ["HNW", "xHNW", "HBRONZE", "HSILVER", "HGOLD", "HPLATINUM", "HOBSIDIAN", "HFUEL", "xHFUEL", "Refinery", "SK", "xSK"],
                requiredPairs: ["BUSDHNW", "BUSDHFUEL", "HNWxHNW", "HFUELV1xHFUELV1", "BNBSK", "BUSDBNB", "SKxSK"],
                loaded: {
                    contracts: []
                },
                refineryData: {
                    contractInfo: [],
                    claimsAvailable: 0,
                    userInfo: [],
                    loaded: false,
                }
            }
        },

        created() {
            this.$eventBus.$on("contracts/instantiateContract", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}
                if (event.payload === 'Refinery') {
                    this.loaded.contracts.push(event.payload);
                    this.getRefineryData();
                    return;
                }
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getWalletBalance', event.payload);
            });

            this.$eventBus.$on("wallet/getWalletBalance", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('callAllowanceAmount', event.payload);
            });

            this.$eventBus.$on("updateAllowanceAmount", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}
                if (this.loaded.contracts.includes(event.payload)) {return;}
                this.loaded.contracts.push(event.payload);
            });


            // this.$eventBus.$on("updateWalletBalance", (event) => {
            //     if (this.requiredContracts.includes(event.token)) {
            //         this.$nextTick(function() {this.forceRender++;});
            //     }
            // });

            // this.$eventBus.$on("updatePairRatio", (event) => {
            //     if (this.requiredPairs.includes(event.pair)) {
            //         this.$nextTick(function() {this.forceRender++;});
            //     }
            // });
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

            getRefineryData: async function() {
                this.refineryData.contractInfo = await this.contracts.Refinery.instance.methods.contractInfo().call();
                this.refineryData.claimsAvailable = await this.contracts.Refinery.instance.methods.claimsAvailable(this.wallet.account).call();
                this.refineryData.userInfo = await this.contracts.Refinery.instance.methods.userInfo(this.wallet.account).call();
                this.refineryData.loaded = true;
            }
        },

        mounted() {
            this.initiate();
        }
    }
</script>