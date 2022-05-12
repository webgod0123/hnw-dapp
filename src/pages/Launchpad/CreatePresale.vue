<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
        <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-9 col-xxl-7 mb-3">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col text-center fs-3 ft-fram-l mb-3">
                                Create a Presale
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
                                        <div class="nav-text">Presale details</div>
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
                                <component  v-bind:is="'create-presale-step-'+step"
                                            v-bind:fees="fees"
                                            v-bind:factory="factory"
                                            v-bind:secondFactory="secondFactory"
                                            v-bind:creatingPool="creatingPool"
                                            v-on:createPool="createPool"
                                            v-on:setUserBalance="setUserBalance"
                                            v-on:canShowFees="canShowFees"
                                            v-on:advance="advance"
                                            v-on:previous="previous"
                                            v-bind:globalRender="step"></component>
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
                                                        Creation of presale
                                                    </div>
                                                    <div class="col-6 text-end">
                                                        {{Number(fees.creation).toFixed($root.$children[0].displayDecimals)}} BNB
                                                    </div>
                                                </div>
                                                <div class="row pt-2 mb-2 border-top border-gray">
                                                    <div class="col-6">
                                                        Estimate amount of {{forms.presale.token.symbol}}
                                                    </div>
                                                    <div class="col-6 text-end">
                                                        {{(forms.presale.estimateTokens === null) ? 'NA' : Number(forms.presale.estimateTokens).toFixed($root.$children[0].displayDecimals)}} {{forms.presale.token.symbol}}
                                                    </div>
                                                </div>
                                                <div class="row pt-2 mb-2 border-top border-gray">
                                                    <div class="col-6">
                                                        Your balance of {{forms.presale.token.symbol}}
                                                    </div>
                                                    <div class="col-6 text-end">
                                                        {{Number(fees.userBalance).toFixed($root.$children[0].displayDecimals)}} {{forms.presale.token.symbol}}
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


                        <div class="mt-4 text-white text-justify">
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
    import CreatePresaleStepLoading from '../../components/old-git/Launchpad/CreatePresale/CreatePresaleStepLoading.vue';
    import CreatePresaleStep0 from '../../components/old-git/Launchpad/CreatePresale/CreatePresaleStep0.vue';
    import CreatePresaleStep1 from '../../components/old-git/Launchpad/CreatePresale/CreatePresaleStep1.vue';
    import CreatePresaleStep2 from '../../components/old-git/Launchpad/CreatePresale/CreatePresaleStep2.vue';
    import CreatePresaleStep3 from '../../components/old-git/Launchpad/CreatePresale/CreatePresaleStep3.vue';
    const contractsAddresses = require('../../contracts/contractsAddresses.json');
    const routersAddresses = require('../../contracts/routersAddresses.json');
    const routers = require('../../forms/Routers.json');
    const presaleTypes = require('../../forms/PresaleTypes');

    export default {
        name: 'CreatePresale',
        components: {
            CreatePresaleStepLoading,
            CreatePresaleStep0,
            CreatePresaleStep1,
            CreatePresaleStep2,
            CreatePresaleStep3
	    },
        data() {
            return {
                contractsAddresses: contractsAddresses,
                routersAddresses: routersAddresses,
                routers: routers,
                forceRender: 0,
                loaded: {
                    contracts: [],
                    forms: [],
                    pairs: [],
                },
                creating: true,
                requiredContracts: ['PoolFactory', "PoolFactoryWithToken", 'FairLaunchFactory', "HFUEL"],
                requiredPairs: [],
                requiredForms: ['presale'],
                step:'loading',
                creatingPool: false,
                fees: {
                    creation: 0,
                    userBalance: 0,
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
            factory: function() {
                if (!this.forms.presale) {return undefined;}
                if (!this.forms.presale.presaleType) {return undefined;}
                if (!this.forms.presale.presaleType > 0) {return undefined;}
                if (this.forms.presale.presaleType === "1") {return this.contracts.PoolFactory;}
                if (Number(this.forms.presale.presaleType) > 1) {return this.contracts.PoolFactoryWithToken;}
            },
            secondFactory: function() {
                if (!this.forms.presale) {return undefined;}
                if (!this.forms.presale.presaleType) {return undefined;}
                if (!this.forms.presale.presaleType > 0) {return undefined;}
                if (this.forms.presale.presaleType === "1") {return this.contracts.PoolFactoryWithToken;}
                if (Number(this.forms.presale.presaleType) > 1) {return this.contracts.PoolFactory;}
            },
            getFeeBorderColorClass: function() {
                if (Number(this.forms.presale.estimateTokens) > Number(this.forms.presale.token.totalSupply)) {this.fees.errors[0] = "The estimate amount must be equal or lower than your balance.";return 'border-warning';}
                return 'border-primary';
            }
        },

        watch: {
            "session.isConnected": function(newVal, oldVal) {
                if (newVal === true && oldVal === false) {this.initiate();}
            },

            factory: function(newVal, oldVal) {
                if (newVal !== undefined) {this.getFees();}
            }
        },

        methods: {
            initiate: function() {
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredContracts', this.requiredContracts);
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredPairs', this.requiredPairs);
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredForms', this.requiredForms);
            },

            getFees: async function() {
                this.fees.creation = this.web3.instance.utils.fromWei(await this.factory.instance.methods.createFee().call());
            },

            setUserBalance: function(value) {
                this.fees.userBalance = value;
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
                if (Number(this.forms.presale.estimateTokens) > Number(this.forms.presale.token.totalSupply)) {this.fees.errors.push("The estimate amount must be equal or lower than your balance.");}

                if (this.fees.errors.length > 0) {return false;}
                return true;
            },

            getImplement: function() {
                let implement = this.contractsAddresses.PoolFactory.implementation[this.web3.networkId];
                if (Number(this.forms.presale.presaleType) > 1) {implement = this.contractsAddresses.PoolFactoryWithToken.implementation[this.web3.networkId];}
                return implement;
            },

            getAddrs: function() {
                let addrs = [
                    this.wallet.account,//Owner
                    this.forms.presale.token.address,//Token
                    this.routersAddresses[this.forms.presale.router][this.web3.networkId],
                    // this.contractsAddresses[this.routers[this.forms.presale.router]].chainID[this.web3.networkId], //Router
                    this.wallet.account//Governance
                ];
                if (Number(this.forms.presale.presaleType) > 1) {
                    addrs.push(this.contractsAddresses[presaleTypes[this.forms.presale.presaleType]].chainID[this.web3.networkId]);
                }
                return addrs;
            },
            
            createPool: async function() {
                if (!this.validateFees()) {return;}
                if (this.creatingPool === true) {return;}

                const implement = this.getImplement();
                const addrs = this.getAddrs();

                const rateSetting = [
                    '0x' + (this.forms.presale.rate * Math.pow(10, this.forms.presale.token.decimals)).toString(16),
                    '0x' + (this.forms.presale.listingRate * Math.pow(10, this.forms.presale.token.decimals)).toString(16)
                ];
                const contributionSettings = [
                    '0x' + (this.forms.presale.minBuy * Math.pow(10, 18)).toString(16),
                    '0x' + (this.forms.presale.maxBuy * Math.pow(10, 18)).toString(16)
                ];
                const capSettings = [
                    '0x' + (this.forms.presale.softCap * Math.pow(10, 18)).toString(16),
                    '0x' + (this.forms.presale.hardCap * Math.pow(10, 18)).toString(16)
                ];
                const timeSettings = [
                    Math.ceil(this.forms.presale.startTime.getTime() / 1000),
                    Math.ceil(this.forms.presale.endTime.getTime() / 1000),
                    this.forms.presale.liquidityLock * 60
                ];
                const vestingSettings = !this.forms.presale.isVestingContributor ? [0,0,0] : [
                    this.forms.presale.vestingContributorFirstPercentageRelease,
                    this.forms.presale.vestingContributorCycleMinutes * 60,
                    this.forms.presale.vestingContributorCyclePercentage
                ];
                const teamVestingSettings = !this.forms.presale.isVestingTeam ? [0,0,0,0,0] : [
                    '0x' + (this.forms.presale.vestingTeamTotalTokens * Math.pow(10, this.forms.presale.token.decimals)).toString(16),
                    this.forms.presale.vestingTeamMinutesRelease * 60,
                    this.forms.presale.vestingTeamFirstPercentageRelease,
                    this.forms.presale.vestingTeamCycleMinutes,
                    this.forms.presale.vestingTeamCyclePercentage
                ];

                const urls = ((this.forms.presale.logoUrl !== null && this.forms.presale.logoUrl !== '') ? this.forms.presale.logoUrl : 'none') +
                            ' ' + ((this.forms.presale.website !== null && this.forms.presale.website !== '') ? this.forms.presale.website : 'none') +
                            ' ' + ((this.forms.presale.facebook !== null && this.forms.presale.facebook !== '') ? this.forms.presale.facebook : 'none') +
                            ' ' + ((this.forms.presale.twitter !== null && this.forms.presale.twitter !== '') ? this.forms.presale.twitter : 'none') +
                            ' ' + ((this.forms.presale.github !== null && this.forms.presale.github !== '') ? this.forms.presale.github : 'none') +
                            ' ' + ((this.forms.presale.telegram !== null && this.forms.presale.telegram !== '') ? this.forms.presale.telegram : 'none') +
                            ' ' + ((this.forms.presale.instagram !== null && this.forms.presale.instagram !== '') ? this.forms.presale.instagram : 'none') +
                            ' ' + ((this.forms.presale.discord !== null && this.forms.presale.discord !== '') ? this.forms.presale.discord : 'none') +
                            ' ' + ((this.forms.presale.reddit !== null && this.forms.presale.reddit !== '') ? this.forms.presale.reddit : 'none');
                const liquidity = this.forms.presale.liquidity / 1;
                const refundType = [
                    Number(this.forms.presale.refund),
                    this.forms.presale.whitelistEnable ? 1 : 0
                ];
                const description = this.forms.presale.description;
                try {
                    console.log([
                        implement,
                        addrs,
                        rateSetting,
                        contributionSettings,
                        capSettings,
                        timeSettings,
                        vestingSettings,
                        teamVestingSettings,
                        urls,
                        liquidity,
                        refundType,
                        description
                    ]);
                    const receipt = await this.factory.instance.methods.createPool(
                        implement,
                        addrs,
                        rateSetting,
                        contributionSettings,
                        capSettings,
                        timeSettings,
                        vestingSettings,
                        teamVestingSettings,
                        urls,
                        liquidity,
                        refundType,
                        description
                    ).send({ from: this.wallet.account, value: await this.factory.instance.methods.createFee().call()});
                    console.log(receipt);
                    const poolAddress = await this.factory.instance.methods.getPools().call();
                    window.location.href = '/launchpad/list/' + poolAddress[0];
                } catch (error) {
                    console.log(error);
                    this.creatingPool = false;
                }
                this.creatingPool = false;
            },

            canShowFees: function(value) {
                this.showFees = value;
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