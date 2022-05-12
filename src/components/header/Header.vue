<template>
	<div>
		<!-- BEGIN #header -->
		<div id="header" class="app-header" v-bind:class="{ 'app-header-inverse': appOptions.appHeaderInverse }">
			<!-- BEGIN navbar-header -->
			<div class="navbar-header">
				<button type="button" class="navbar-mobile-toggler" v-on:click="toggleSidebarEndMobile" v-if="appOptions.appSidebarTwo">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<router-link to="/" class="navbar-brand"><img class="me-3" src="/assets/img/logo/hnw-small.png"> <span class="ft-fram-l"><b>HNW</b></span></router-link>
				<button type="button" class="navbar-mobile-toggler" v-on:click="toggleTopMenuMobile" v-if="appOptions.appTopMenu && !appOptions.appSidebarNone">
					<span class="fa-stack fa-lg text-inverse">
						<i class="far fa-square fa-stack-2x"></i>
						<i class="fa fa-cog fa-stack-1x"></i>
					</span>
				</button>
				<button type="button" class="navbar-mobile-toggler" v-on:click="toggleTopMenuMobile" v-if="appOptions.appTopMenu && appOptions.appSidebarNone">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<button type="button" class="navbar-mobile-toggler" v-on:click="toggleHeaderMegaMenuMobile" v-if="appOptions.appHeaderMegaMenu">
					<span class="fa-stack fa-lg text-inverse m-t-2">
						<i class="far fa-square fa-stack-2x"></i>
						<i class="fa fa-cog fa-stack-1x"></i>
					</span>
				</button>
				<button type="button" class="navbar-mobile-toggler" v-on:click="toggleSidebarMobile" v-if="!appOptions.appSidebarNone">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			<!-- END navbar-header -->
			
		
			<!-- BEGIN header-nav -->
			<div class="navbar-nav">
				<div class="navbar-item me-3 my-2">
					HNW / BUSD : {{(pairs.BUSDHNW === undefined) ? '0.00' : pairs.BUSDHNW.ratio.toFixed(2)}}
				</div>
				<wallet-connect></wallet-connect>
			</div>
			<!-- end header navigation right -->
		</div>
		<!-- end #header -->
	</div>
</template>

<script>
import {mapState} from 'vuex';
import AppOptions from '../../config/AppOptions.vue'
import WalletConnect from './WalletConnect.vue'

export default {
	name: 'Header',
	components: {
		WalletConnect
	},
	data() {
		return {
			appOptions: AppOptions,
			requiredPairs: ["BUSDHNW"],
		}
	},

	computed: {
		...mapState(['pairs', 'session', 'wallet'])
	},

	watch: {
		"session.isConnected": function(newVal, oldVal) {
			if (newVal === true && oldVal === false) {this.initiate();}
		}
	},
	methods: {
		initiate: function() {
			this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredPairs', this.requiredPairs);
		},

		toggleSidebarMobile() {
			this.appOptions.appSidebarMobileToggled = !this.appOptions.appSidebarMobileToggled;
		},

		toggleSidebarEnd() {
			this.appOptions.appSidebarEndToggled = !this.appOptions.appSidebarEndToggled;
		},

		toggleSidebarEndMobile() {
			this.appOptions.appSidebarEndMobileToggled = !this.appOptions.appSidebarEndMobileToggled;
		},

		toggleTopMenuMobile() {
			this.appOptions.appTopMenuMobileToggled = !this.appOptions.appTopMenuMobileToggled;
		},

		toggleHeaderMegaMenuMobile() {
			this.appOptions.appHeaderMegaMenuMobileToggled = !this.appOptions.appHeaderMegaMenuMobileToggled;
		},

		checkForm: function(e) {
			e.preventDefault();
			this.$router.push({ path: '/extra/search' })
		}
	},

	mounted() {
		this.initiate();
		window.setInterval(() => {
			this.initiate();
		}, 30000);
	}
}
</script>
