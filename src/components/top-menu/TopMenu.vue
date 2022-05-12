<template>
	<!-- begin #top-menu -->
	<div id="top-menu" class="app-top-menu" v-bind:class="{ 'd-block': appOptions.appTopMenuMobileToggled }">
		<!-- begin top-menu nav -->
		<top-menu-nav></top-menu-nav>
		<!-- end top-menu nav -->
	</div>
	<!-- end #top-menu -->
</template>

<script>
import TopMenuNav from './TopMenuNav.vue'
import AppOptions from '../../config/AppOptions.vue'

export default {
	name: 'TopMenu',
	components: {
		TopMenuNav
	},
	data() {
		return {
			appOptions: AppOptions
		}
	}
}
</script>
