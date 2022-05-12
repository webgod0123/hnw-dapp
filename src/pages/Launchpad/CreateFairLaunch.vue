<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
        <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-9 col-xxl-7 mb-3">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col text-center fs-3 ft-fram-l mb-3">
                                Create a Market Generation
                            </div>
                        </div>
                        <div class="nav-wizards-container" v-show="creating">
                            <nav class="nav nav-wizards-1 mb-2">
                                <div class="nav-item col">
                                    <a class="nav-link" v-bind:class="{'active': step === 0, 'completed': step > 0}" href="#" v-on:click="step = 0">
                                        <div class="nav-no">1</div>
                                        <div class="nav-text">Link token</div>
                                    </a>
                                </div>
                                <div class="nav-item col">
                                    <a class="nav-link" v-bind:class="{'active': step === 1, 'completed': step > 1}" href="#" v-on:click="step = 1">
                                        <div class="nav-no">2</div>
                                        <div class="nav-text">Market Generation details</div>
                                    </a>
                                </div>
                                <div class="nav-item col">
                                    <a class="nav-link" v-bind:class="{'active': step === 2, 'completed': step > 2}" href="#" v-on:click="step = 2">
                                        <div class="nav-no">3</div>
                                        <div class="nav-text">Social media</div>
                                    </a>
                                </div>
                                <div class="nav-item col">
                                    <a class="nav-link" v-bind:class="{'active': step === 3, 'completed': step > 3}" href="#" v-on:click="step = 3">
                                        <div class="nav-no">4</div>
                                        <div class="nav-text">Verify and submit</div>
                                    </a>
                                </div>
                            </nav>
                        </div>
                        <div class="nav-wizards-container" v-show="!creating">
                            
                        </div>

                        <div class="my-3">
                            &nbsp;
                        </div>

                        <transition name="component-fade" mode="out-in">
                            <keep-alive>
                                <component v-bind:is="'create-fairlaunch-step-'+step" v-on:createPool="createPool" v-on:advance="advance" v-on:previous="previous" v-bind:globalRender="step" v-on:canShowFees="canShowFees"></component>
                            </keep-alive>
                        </transition>

                        <div class="card bg-gray-900 bg-opacity-70 text-white mt-3" v-if="showFees">
                            <div class="card-body">
                                <h5>Fees</h5>
                                <div class="row justify-content-center">
                                    <div class="col-12">
                                        <div class="card border text-white" v-bind:class="getFeeBorderColorClass">
                                            <div class="card-body">
                                                <div class="row pt-2 mb-2">
                                                    <div class="col-6">
                                                        Creation of MGE
                                                    </div>
                                                    <div class="col-6 text-end">
                                                        {{Number(fees.creation).toFixed($root.$children[0].displayDecimals)}} BNB
                                                    </div>
                                                </div>
                                                <div class="row pt-2 mb-2 border-top border-gray">
                                                    <div class="col-6">
                                                        Estimate amount of {{forms.fairlaunch.token.symbol}}
                                                    </div>
                                                    <div class="col-6 text-end">
                                                        {{(forms.fairlaunch.estimateTokens === null) ? 'NA' : Number(forms.fairlaunch.estimateTokens).toFixed($root.$children[0].displayDecimals)}} {{forms.fairlaunch.token.symbol}}
                                                    </div>
                                                </div>
                                                <div class="row pt-2 mb-2 border-top border-gray">
                                                    <div class="col-6">
                                                        Your balance of {{forms.fairlaunch.token.symbol}}
                                                    </div>
                                                    <div class="col-6 text-end">
                                                        {{Number(wallet.balances[forms.fairlaunch.token.symbol]).toFixed($root.$children[0].displayDecimals)}} {{forms.fairlaunch.token.symbol}}
                                                    </div>
                                                </div>
                                                <div class="row pt-2 mb-2 border-top border-gray" v-if="fees.errors.length > 0">
                                                    <div class="col-12 text-warning">
                                                        {{fees.errors[0]}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-5 text-white text-justify">
                            Disclaimer: The information provided is neither financial advice, nor a recommendation to invest in any HNW product or listed product. We are not liable for any loss resulting from investing or not investing in listed products or HNW products, as a result of any information provided or published. Any decisions taken in this regard is for any person's own responsibility.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import CreateFairlaunchStepLoading from '../../components/old-git/Launchpad/CreateFairLaunch/CreateFairlaunchStepLoading.vue';
    import CreateFairlaunchStep0 from '../../components/old-git/Launchpad/CreateFairLaunch/CreateFairlaunchStep0.vue';
    import CreateFairlaunchStep1 from '../../components/old-git/Launchpad/CreateFairLaunch/CreateFairlaunchStep1.vue';
    import CreateFairlaunchStep2 from '../../components/old-git/Launchpad/CreateFairLaunch/CreateFairlaunchStep2.vue';
    import CreateFairlaunchStep3 from '../../components/old-git/Launchpad/CreateFairLaunch/CreateFairlaunchStep3.vue';
    const contractsAddresses = require('../../contracts/contractsAddresses.json');
    const routers = require('../../forms/Routers.json');

    export default {
        name: 'CreateFairLaunch',
        components: {
            CreateFairlaunchStepLoading,
            CreateFairlaunchStep0,
            CreateFairlaunchStep1,
            CreateFairlaunchStep2,
            CreateFairlaunchStep3
	    },
        data() {
            return {
                contractsAddresses,
                routers,
                forceRender: 0,
                loaded: {
                    contracts: [],
                    forms: [],
                    pairs: [],
                },
                creating: true,
                requiredContracts: ['PoolFactory', "PoolFactoryWithToken", 'FairLaunchFactory'],
                requiredPairs: [],
                requiredForms: ['fairlaunch'],
                step:'loading',
                creatingPool: false,
                fees: {
                    creation: 0,
                    errors: [],
                },
                showFees: false,
            }
        },

        created() {
            this.$eventBus.$on("updateWalletBalance", (event) => {
                if (this.requiredContracts.includes(event.token)) {
                    if (!this.loaded.contracts.includes(event.token)) {this.loaded.contracts.push(event.token);}
                    this.$nextTick(function() {this.forceRender++;});
                }
            });

            this.$eventBus.$on("updatePairRatio", (event) => {
                if (this.requiredPairs.includes(event.pair)) {
                    if (!this.loaded.pairs.includes(event.pair)) {this.loaded.pairs.push(event.pair);}
                    this.$nextTick(function() {this.forceRender++;});
                }
            });

            this.$eventBus.$on("updateForm", (event) => {
                if (this.requiredForms.includes(event.form)) {
                    if (!this.loaded.forms.includes(event.form)) {this.loaded.forms.push(event.form);this.step = 0;}
                    this.$nextTick(function() {this.forceRender++;});
                }
            });
        },

        updated () {
        },

        computed: {
            ...mapState(['contracts', 'forms', 'session', 'wallet', 'web3']),
            getFeeBorderColorClass: function() {
                if (Number(this.forms.fairlaunch.estimateTokens) > Number(this.forms.fairlaunch.token.totalSupply)) {this.fees.errors[0] = "The estimate amount must be equal or lower than your balance.";return 'border-warning';}
                return 'border-primary';
            }
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
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredForms', this.requiredForms);
            },

            getFees: async function() {
                this.fees.creation = this.web3.instance.utils.fromWei(await this.contracts.FairLaunchFactory.instance.methods.createFee().call());
            },

            advance: function() {
                if (!this.validateFees()) {return;}
                if (this.step < 3) {this.step++;}
            },

            previous: function() {
                if (this.step > 0) {this.step--;}
            },

            validateFees: function() {
                this.fees.errors = [];
                if (Number(this.forms.fairlaunch.estimateTokens) > Number(this.forms.fairlaunch.token.totalSupply)) {this.fees.errors.push("The estimate amount must be equal or lower than your balance.");}

                if (this.fees.errors.length > 0) {return false;}
                return true;
            },
            
            createPool: async function() {
                if (!this.validateFees()) {return;}
                if (this.creatingPool === true) {return;}
                this.creatingPool = true;
                const _implement = this.contractsAddresses.FairLaunchFactory.implementation[this.web3.networkId];
                let _addrs = [
                    this.wallet.account,//Owner
                    this.forms.fairlaunch.token.address,//Token
                    this.contractsAddresses[this.routers[this.forms.fairlaunch.router]].chainID[this.web3.networkId], //Router
                    this.wallet.account//Governance
                ];

                const _saleToken = '0x' + (this.forms.fairlaunch.sellingAmount * Math.pow(10, 18)).toString(16);
                const _softCap = '0x' + (this.forms.fairlaunch.softCap * Math.pow(10, 18)).toString(16);
                const _timeSettings = [
                    Math.ceil(this.forms.fairlaunch.startTime.getTime() / 1000),
                    Math.ceil(this.forms.fairlaunch.endTime.getTime() / 1000),
                    this.forms.fairlaunch.liquidityLock * 60
                ];
                const _teamVestings = !this.forms.fairlaunch.isVestingTeam ? [0,0,0,0,0] : [
                    '0x' + (this.forms.fairlaunch.vestingTeamTotalTokens * Math.pow(10, this.forms.fairlaunch.token.decimals)).toString(16),
                    this.forms.fairlaunch.vestingTeamMinutesRelease * 60,
                    this.forms.fairlaunch.vestingTeamFirstPercentageRelease,
                    this.forms.fairlaunch.vestingTeamCycleMinutes,
                    this.forms.fairlaunch.vestingTeamCyclePercentage
                ]
                const _urls = ((this.forms.fairlaunch.logoUrl !== null && this.forms.fairlaunch.logoUrl !== '') ? this.forms.fairlaunch.logoUrl : 'none') +
                            ' ' + ((this.forms.fairlaunch.website !== null && this.forms.fairlaunch.website !== '') ? this.forms.fairlaunch.website : 'none') +
                            ' ' + ((this.forms.fairlaunch.facebook !== null && this.forms.fairlaunch.facebook !== '') ? this.forms.fairlaunch.facebook : 'none') +
                            ' ' + ((this.forms.fairlaunch.twitter !== null && this.forms.fairlaunch.twitter !== '') ? this.forms.fairlaunch.twitter : 'none') +
                            ' ' + ((this.forms.fairlaunch.github !== null && this.forms.fairlaunch.github !== '') ? this.forms.fairlaunch.github : 'none') +
                            ' ' + ((this.forms.fairlaunch.telegram !== null && this.forms.fairlaunch.telegram !== '') ? this.forms.fairlaunch.telegram : 'none') +
                            ' ' + ((this.forms.fairlaunch.instagram !== null && this.forms.fairlaunch.instagram !== '') ? this.forms.fairlaunch.instagram : 'none') +
                            ' ' + ((this.forms.fairlaunch.discord !== null && this.forms.fairlaunch.discord !== '') ? this.forms.fairlaunch.discord : 'none') +
                            ' ' + ((this.forms.fairlaunch.reddit !== null && this.forms.fairlaunch.reddit !== '') ? this.forms.fairlaunch.reddit : 'none');
                const _liquidityPercent = this.forms.fairlaunch.liquidity;
                const _poolDetails = this.forms.fairlaunch.description;

                try {
                    const receipt = await this.contracts.FairLaunchFactory.instance.methods.createPool(
                        _implement,
                        _addrs,
                        _saleToken,
                        _softCap,
                        _timeSettings,
                        _teamVestings,
                        _urls,
                        _liquidityPercent,
                        _poolDetails
                    ).send({ from: this.wallet.account, value: await this.contracts.FairLaunchFactory.instance.methods.createFee().call()});
                    console.log(receipt);
                    const poolAddress = await this.contracts.FairLaunchFactory.instance.methods.getPools().call();
                    window.location.href = '/launchpad/list/' + poolAddress[0];

                    // await poolFactory.methods.createPool(addrs, rateSetting, contributionSettings, capSettings,
                    //     timeSettings, vestingSettings, teamVestingSettings, urls, liquidity / 1, refundtype, "Description").send({ from: wallet.account });
                    // const pooladdress = await poolFactory.methods.pools(0).call();
                    // console.log("pooladdress", pooladdress);
                    // window.location.href = '/launchpadlists/' + pooladdress;
                    // const contract = await getERC20Contract(wallet, token);
                    // const amount = '0x' + (100 * Math.pow(10, 18)).toString(16);
                    // await contract.methods.transferFrom(wallet.account, '0xCaD6291eb218371b610f1d17e56F259ad6734229', amount).send({ from: wallet.account })
                }
                catch (error) {
                    this.creatingPool = false;
                    console.log(error);
                }
                //  await this.contracts.PoolFactory.instance.methods.createPool(addrs,rateSetting,contributionSettings,capSettings,timeSettings,vestingSettings,teamVestingSettings,urls).send();
                // console.log(receipt);
                this.creatingPool = false;
            },

            canShowFees: function(value) {
                this.showFees = value;
                this.getFees();
            }
        },

        mounted() {
            this.initiate();
        }
    }
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>