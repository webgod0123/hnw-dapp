<template>
	<div class="app" v-if="!appOptions.appEmpty" v-bind:class="{
		'app-header-fixed': appOptions.appHeaderFixed && !appOptions.appHeaderNone,
		'app-sidebar-fixed': appOptions.appSidebarFixed,
		'app-sidebar-minified': appOptions.appSidebarMinified, 
		'app-content-full-height': appOptions.appContentFullHeight, 
		'app-without-sidebar': appOptions.appSidebarNone, 
		'app-with-end-sidebar': appOptions.appSidebarEnd, 
		'app-with-two-sidebar': appOptions.appSidebarTwo,
		'app-with-wide-sidebar': appOptions.appSidebarWide,
		'app-with-light-sidebar': appOptions.appSidebarLight,
		'app-sidebar-mobile-toggled': appOptions.appSidebarMobileToggled,
		'app-sidebar-end-toggled': appOptions.appSidebarEndToggled,
		'app-sidebar-end-collapsed': !appOptions.appSidebarEndToggled,
		'app-sidebar-end-mobile-toggled': appOptions.appSidebarEndMobileToggled,
		'app-without-header': appOptions.appHeaderNone,
		'app-with-top-menu': appOptions.appTopMenu,
		'app-gradient-enabled': appOptions.appGradientEnabled,
		'has-scroll': appOptions.appBodyScrollTop
	}">
		<Header />
		<TopMenu v-if="appOptions.appTopMenu" />
		<Sidebar v-if="!appOptions.appSidebarNone" />
		<SidebarRight v-if="appOptions.appSidebarTwo" />
		<div class="app-cover"></div>
		<div id="content" class="app-content" v-bind:class="appOptions.appContentClass">
			<router-view :key="$route.path"></router-view>
			<vue-ins-progress-bar></vue-ins-progress-bar>
		</div>
		<SidebarRight v-if="appOptions.appSidebarTwo" />
		<ScrollTopBtn />
        <button class="d-none" id="togglerefineryDisclaimerModal" data-bs-toggle="modal" data-bs-target="#refineryDisclaimerModal"></button>
        <!-- #modal-dialog -->
        <div class="modal fade bg-dark bg-opacity-60" id="refineryDisclaimerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark bg-opacity-90">
                    <div class="modal-header">
                        <h4 class="modal-title text-white">Refinery Wingman Disclaimer</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col-12 text-white">
                                <p class="text-justify">PLEASE MAKE SURE YOU READ THIS DISCLAIMER AND BE AWARE OF THE TEAM YOU ARE WANTING TO JOIN.</p>
                                <p class="text-justify">To invest in the Refinery, you need to fill in the address of your 'Wingman'. This can either be the MARKETING WALLET ADDRESS or the address of a person in whose team you would like to be on.</p>
                                <p class="text-justify">Please note that once you have filled in this address and made a deposit in the Refinery, you cannot change it.</p>
                                <p class="text-justify">The common practice is that a Wingman sends airdrops to the team members below him, but it is not compulsory. Whatever your reason to join a person's team, HNW will not take any responsibility for the actions of your Wingman.</p>
                                <p class="text-justify">Your position in the chain will determine your gas fees. The further down the chain you are from the marketing wallet, the higher your gas fees are when you deposit or refuel.</p>
                                <p class="text-justify">If your position in any chain is past the 14th level from the marketing wallet, the gas fees you pay will be a maximum of 15 levels. We strongly advise that you make sure that you are aware of your position from the marketing wallet in the team structure you are about to get in.</p>
                                <p class="text-justify">ONLY JOIN A TEAM IF YOU ARE AWARE OF YOUR POSITION IN THE TEAM STRUCTURE.</p>
                                <p class="text-justify">IF YOU ARE NOT SURE WHAT TO DO THE SAFEST OPTION IS TO USE THE MARKETING WALLET AS YOUR WINGMAN.</p>
                                <p class="text-justify">It is up to you to inform yourself where you will be positioned so that you can make an informed decision.</p>
                                <p class="text-justify">HNW will not take any responsibility for your decision regarding your wingman, their actions, fees or your actions as a wingman.</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary text-dark" v-on:click="refuseRefineryDisclaimer">Go back</button>
                        <button class="btn btn-primary text-dark" v-on:click="acceptRefineryDisclaimer">I accept</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- #modal-dialog -->
        <div class="modal fade" id="createToken">
            <div class="modal-dialog modal-xl">
                <div class="modal-content bg-dark bg-opacity-90">
                    <div class="modal-header">
                        <h4 class="modal-title">Create Token</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <create-token-form></create-token-form>
                    </div>
                </div>
            </div>
        </div>
	</div>
	<div class="h-100" v-else>
		<router-view :key="$route.path"></router-view>
		<vue-ins-progress-bar></vue-ins-progress-bar>
	</div>
</template>

<script>
import {version} from '../package';
import Sidebar from './components/sidebar/Sidebar.vue'
import SidebarRight from './components/sidebar-right/SidebarRight.vue'
import Header from './components/header/Header.vue'
import TopMenu from './components/top-menu/TopMenu.vue'
import ScrollTopBtn from './components/scroll-top-btn/ScrollTopBtn.vue'
import AppOptions from './config/AppOptions.vue'
import CreateTokenForm from './components/old-git/Launchpad/CreateToken/CreateTokenForm.vue';


import appOptions from './config/Options';
import sidebarMenu from './config/SideBar';
import requestsConditions from './config/RequestsConditions';
import { mapState } from 'vuex';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAqTxzRNnwqPqeZhXtkxSW4Zp2SxqbjYpU",
  authDomain: "hnetworking-28b01.firebaseapp.com",
  projectId: "hnetworking-28b01",
  storageBucket: "hnetworking-28b01.appspot.com",
  messagingSenderId: "327875147119",
  appId: "1:327875147119:web:aa2f2ec06e951eba30e49a",
  measurementId: "G-MPEJYPGL95"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default {
	name: 'app',
	components: {
		Sidebar,
		SidebarRight,
		Header,
		TopMenu,
		ScrollTopBtn,
        CreateTokenForm
	},

	data() {
		return {
			appOptions: AppOptions,
			//System
			displayDecimals: 3,
			config: {
				appOptions: appOptions,
				sidebarMenu: sidebarMenu,
			},
			requestsConditions: requestsConditions,
			requestsTries: {},
            counter: 0,
            version: version,
            polling: {
                pools: [],
            },
            requiredContracts: ['PoolFactory', "PoolFactoryWithToken", 'FairLaunchFactory'],
		}
	},

	created() {
		this.getSession();

		AppOptions.appBodyScrollTop = window.scrollY;
		
		window.addEventListener('scroll', this.handleScroll);
		
		this.$insProgress.start();
		
		this.$router.beforeEach((to, from, next) => {
			this.$insProgress.start();
			next();
		});

		this.$router.afterEach(() => {
			this.$insProgress.finish()
			AppOptions.appSidebarMobileToggled = false;
		});

        this.$store.subscribeAction({
            after: (action, state) => {
                // if (action.type.split('/')[0] !== 'events') {return;}
                this.$eventBus.$emit(action.type, {payload: action.payload});
            }
        });
	},

    watch: {
        "$route": function(to, from) {
            this.lookAtRouteDisclaimer();
            this.$eventBus.$emit('routeChanged', to);
        },

        "session.isConnected": function(newVal, oldVal) {
            if (oldVal !== null) {this.putSession();}
            if (oldVal === null && newVal === true && this.wallet.account === undefined) {
                this.verifyRequestConditionsAndContinueOrDelay('getWalletAccount');
                this.verifyRequestConditionsAndContinueOrDelay('getRequiredContracts', this.requiredContracts);
            } //In case the website authorisation got revoke and the session tell it's connected, reset state.
        },

        "web3.isInitialised": function() {
            this.verifyRequestConditionsAndContinueOrDelay('getWalletAccount');
        },
    },

    computed: mapState(['contracts', 'pairs', 'session', 'wallet', 'web3']),

	methods: {
		handleScroll: function() {
			AppOptions.appBodyScrollTop = window.scrollY;
		},

        // // [START] - Request Condition
        // // This is a helper that verify if a function can be executed, if not, it's delayed further in the stack.
        verifyRequestConditionsAndContinueOrDelay: function(request, payload = false) {
            if (this.requestsTries[request] === undefined) {this.requestsTries[request] = 0;}
            if (this.verifyGlobalConditions() && this.verifyRequestConditions(request, payload)) {
                this.requestsTries[request] = 0;
                this.$nextTick(function() {
                    this[request](payload);
                });
                return;
            }
            if (this.requestsTries[request] < this.requestsConditions.config.tries) {
                let self = this;
                setTimeout(function() {
                    self.verifyRequestConditionsAndContinueOrDelay(request, payload)
                }, this.requestsConditions.config.timer);
                this.requestsTries[request]++;
                return;
            }
            this.requestsTries[request] = 0;
        },

        verifyGlobalConditions: function() {
            return true;
        },

        verifyRequestConditions: function(request, payload) {
            if (this.requestsConditions.requests[request] === undefined) {return true;}
            for (var condition of this.requestsConditions.requests[request].conditions) {
                if (condition.type === 'equal' && this[condition.module][condition.state] !== condition.value) {return false;}
                if (condition.type === 'notEqual' && this[condition.module][condition.state] === condition.value) {return false;}
                if (condition.type === 'getters' && this.$store.getters[condition.module+'/'+condition.state](payload) !== condition.value) {return false;}
                if (condition.type === 'gettersRoot' && this.$store.getters[condition.module+'/'+condition.state](this.$store.state.contracts[payload].root) !== condition.value) {return false;}
            }
            return true;
        },
        // // [END] - Request Condition

        // [START] - Session Handler
        // This part is used to sync the wallet connection. The wallet connection is responsible to either show or not the data.

        // getSession : The purpose of this funtion is too retrieve the value of the wallet connection from the sesssion store onto the back send server.
        getSession: async function() {
            // var response = await this.$api.getFunction('/session/get'); //Get the current state of session isConnected
            // if (response.data === 1) {response.data = true;} else {response.data = false;} //Transform server response to fit Javascript
            // this.$store.commit('session/setConnection', response.data); //Store the response inside the store session state.
            // if (this.session.isInitialised === false) {this.$store.commit('session/setInitialisation');} //Tell the app that the session has been initialised.
            this.$store.commit('session/setConnection', true);
            if (this.session.isInitialised === false) {this.$store.commit('session/setInitialisation');}
        },

        // putSession : The purpose of this function is to send value of the wallet connection to back end server and store it into the session of the user.
        putSession: function() {
            // this.$api.putFunction('/session/put', {isConnected: this.session.isConnected}); //Put the current state of the session isConnected (is the wallet connected) into the server.
        },
        // [END] - Session Handler

        getWalletAccount: async function(firstOccurence = false) {
            await this.$store.dispatch('wallet/getAccount');
            if (this.wallet.account !== undefined && firstOccurence === false) {
                this.$eventBus.$emit('walletAccountIsSet');
                return;
            }
            if (this.wallet.account === undefined && firstOccurence === true) { //The first occurence is forced if the session connection was set to true. This condition will be filled if the web3 authorization was revoked.
                this.$store.commit('session/setConnection', false); //Force session to not connect, because authorization was revoked.
            }
        },

        connectWallet: async function(providerName) {
            // this.$store.dispatch('web3/initialise', providerName);
            await this.$store.dispatch('web3/initialise', providerName);
            await this.getWalletAccount();
            this.$store.commit('session/setConnection', true);
        },

        disconnectWallet: async function() {
            this.$store.commit('session/setConnection', false);
            this.$store.dispatch('web3/disconnectWallet');
            // this.resetDatas();
        },

        getRequiredContracts: async function(requiredContracts) {//This need to be seperate getRequiredContracts and getRequiredBalances...
            if (this.session.isConnected === false) {return;}
            for(var contract of requiredContracts) {
                this.$store.dispatch('contracts/instantiateContract', contract);
            }
        },

        getWalletBalance: async function(contract) {
            this.$store.dispatch('wallet/getWalletBalance', contract);
        },

        getRequiredPairs: async function(requiredPairs) {
            if (this.session.isConnected === false) {return;}
            for(var pair of requiredPairs) {
                this.$store.dispatch('pairs/instantiatePair', pair);
            }
        },

        getRequiredPools: async function(requiredPools) {
            if (this.session.isConnected === false) {return;}
            for(var pool of requiredPools) {
                this.$store.dispatch('pools/instantiatePool', pool);
            }
        },

        callAllowanceAmount: async function(contract) {
            var response = await this.$calls.allowance(this.$store.state.wallet.account, false, this.$store.state.contracts[contract].address, this.$store.state.contracts[this.$store.state.contracts[contract].root]);
            if (response === undefined) {return;}
            await this.$store.commit('contracts/setAllowance', {contract: contract, allowance: this.$store.state.web3.instance.utils.fromWei(response)});
            this.$eventBus.$emit('updateAllowanceAmount', {payload: contract});
        },

        getRequiredForms: async function(requiredForms) {
            if (this.session.isConnected === false) {return;}
            for(var form of requiredForms) {
                await this.$store.dispatch('forms/instantiateForm', form);
                this.$nextTick(function() {
                    this.$eventBus.$emit('updateForm', {form: form});
                });
            }
        },

        notify: function() {
            this.$notify({
                group: 'foo',
                title: 'Important message',
                text: 'Hello user! This is a notification!'
            });
        },

        doesPoolExist: async function(address) {
            let exist = false;
            if (await this.contracts.PoolFactory.instance.methods.isExisting(address).call()) {exist = true;}
            if (await this.contracts.PoolFactoryWithToken.instance.methods.isExisting(address).call()) {exist = true;}
            if (await this.contracts.FairLaunchFactory.instance.methods.isExisting(address).call()) {exist = true;}
            return exist;
        },

        refuseRefineryDisclaimer: function() {
            window.history.back();
            document.getElementById('togglerefineryDisclaimerModal').click();
        },

        acceptRefineryDisclaimer: function() {
            this.$cookies.set('disclaimer-refinery', true);
            document.getElementById('togglerefineryDisclaimerModal').click();
        },

        lookAtRouteDisclaimer: function() {
            if (this.$router.currentRoute.fullPath.includes('refinery') && !this.$cookies.get('disclaimer-refinery')) {
                document.getElementById('togglerefineryDisclaimerModal').click();
            }
        },

	},

	mounted () {
		this.$insProgress.finish();
        this.$store.dispatch('web3/initialise');
        this.lookAtRouteDisclaimer();
	},
}
</script>
