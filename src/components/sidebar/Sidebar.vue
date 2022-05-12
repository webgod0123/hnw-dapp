<template>
	<div>
		<!-- BEGIN #sidebar -->
		<div id="sidebar" class="app-sidebar" v-bind:class="{ 
			'app-sidebar-transparent': appOptions.appSidebarTransparent,
			'app-sidebar-grid': appOptions.appSidebarGrid
		}">
			<!-- BEGIN scrollbar -->
			<vue-custom-scrollbar class="app-sidebar-content" v-bind:class="{ 'h-100 ps': appOptions.appSidebarFixed }">
				<old-side-bar></old-side-bar>
			</vue-custom-scrollbar>
			<!-- END scrollbar -->
		</div>
		<div class="app-sidebar-bg"></div>
		<div class="app-sidebar-mobile-backdrop"><a href="#" v-on:click="dismissSidebarMobile" class="stretched-link"></a></div>
		
		<div class="app-sidebar-float-submenu-container" 
			@mouseover="clearHideFloatSubmenu"
			@mouseleave="handleHideFloatSubmenu"
			v-if="this.appOptions.appSidebarMinified" 
			v-bind:class="{ 
				'd-none': !this.floatSubmenu
			}"
			v-bind:style="{
				top: this.floatSubmenuTop,
				left: this.floatSubmenuLeft,
				bottom: this.floatSubmenuBottom,
				right: this.floatSubmenuRight
			}">
			<div class="app-sidebar-float-submenu-arrow" v-bind:style="{
				top: this.floatSubmenuArrowTop,
				bottom: this.floatSubmenuArrowBottom,
			}"></div>
			<div class="app-sidebar-float-submenu-line" v-bind:style="{
				top: this.floatSubmenuLineTop,
				bottom: this.floatSubmenuLineBottom,
			}"></div>
			<div class="app-sidebar-float-submenu">
				<template v-for="menu in this.floatSubmenuMenu">
					<sidebar-nav-list 
						ref="sidebarNavList" 
						v-bind:menu="menu" 
						v-bind:key="menu.path" 
						v-bind:status="menu.status"
						v-on:calc-float-submenu="handleCalcFloatSubmenu"></sidebar-nav-list>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import SidebarNav from './SidebarNav.vue'
import SidebarNavProfile from './SidebarNavProfile.vue'
import SidebarNavList from './SidebarNavList.vue'
import AppOptions from '../../config/AppOptions.vue'
import OldSideBar from '../old-git/layout/SideBar/SideBar.vue'

export default {
	name: 'Sidebar',
	components: {
		SidebarNav,
		SidebarNavProfile,
		SidebarNavList,
		OldSideBar
	},
	data() {
		return {
			scrollTop: '',
			appOptions: AppOptions,
			floatSubmenu: false,
			floatSubmenuMenu: '',
			floatSubmenuTop: '',
			floatSubmenuBottom: '',
			floatSubmenuLeft: '',
			floatSubmenuRight: '',
			floatSubmenuArrowTop: '',
			floatSubmenuArrowBottom: '',
			floatSubmenuLineTop: '',
			floatSubmenuLineBottom: '',
			clearSubmenu: '',
			subMenuOffset: ''
		}
	},
	directives: {
		scroll: {
			inserted: function (el, binding) {
				let f = function (evt) {
					if (binding.value(evt, el)) {
						el.removeEventListener('scroll', f)
					}
				}
				el.addEventListener('scroll', f)
				
				if (typeof(Storage) !== 'undefined') {
					if (localStorage.sidebarScroll) {
						el.scrollTop = localStorage.sidebarScroll;
					}
				}
			}
		}
	},
	methods: {
		handleCalcFloatSubmenu: function() {
			setTimeout(() => {
				var targetTop = this.subMenuOffset.top;
				var windowHeight = window.innerHeight;
				var targetHeight = document.querySelector('.app-sidebar-float-submenu-container').offsetHeight;
				
				if ((windowHeight - targetTop) > targetHeight) {
					this.floatSubmenuTop = this.subMenuOffset.top + 'px';
					this.floatSubmenuBottom = 'auto';
					this.floatSubmenuArrowTop = '20px';
					this.floatSubmenuArrowBottom = 'auto';
					this.floatSubmenuLineTop = '20px';
					this.floatSubmenuLineBottom = 'auto';
				} else {
					this.floatSubmenuTop = 'auto';
					this.floatSubmenuBottom = '0';
					
					var arrowBottom = (windowHeight - targetTop) - 21;
					this.floatSubmenuArrowTop = 'auto';
					this.floatSubmenuArrowBottom = arrowBottom + 'px';
					this.floatSubmenuLineTop = '20px';
					this.floatSubmenuLineBottom = arrowBottom + 'px';
				}
			}, 0);
		},
		handleShowFloatSubmenu: function(data, offset) {
			this.floatSubmenuMenu = data;
			this.floatSubmenu = true;
			this.subMenuOffset = offset;
			
			var targetTop = offset.top;
			var windowHeight = window.innerHeight;
			
			setTimeout(() => {
				var targetHeight = document.querySelector('.app-sidebar-float-submenu-container').offsetHeight;
				
				if ((windowHeight - targetTop) > targetHeight) {
					this.floatSubmenuTop = offset.top + 'px';
					this.floatSubmenuBottom = 'auto';
					this.floatSubmenuArrowTop = '20px';
					this.floatSubmenuArrowBottom = 'auto';
					this.floatSubmenuLineTop = '20px';
					this.floatSubmenuLineBottom = 'auto';
				} else {
					this.floatSubmenuTop = 'auto';
					this.floatSubmenuBottom = '0';
					
					var arrowBottom = (windowHeight - targetTop) - 21;
					this.floatSubmenuArrowTop = 'auto';
					this.floatSubmenuArrowBottom = arrowBottom + 'px';
					this.floatSubmenuLineTop = '20px';
					this.floatSubmenuLineBottom = arrowBottom + 'px';
				}
			}, 0);
			
			this.floatSubmenuRight = 'auto';
			this.floatSubmenuLeft = (document.getElementById('sidebar').offsetLeft + offset.width) + 'px';
			
			clearTimeout(this.clearSubmenu);
		},
		handleHideFloatSubmenu: function() {
			this.clearSubmenu = setTimeout(() => {
				this.floatSubmenu = false;
			}, 250);
		},
		clearHideFloatSubmenu: function() {
			clearTimeout(this.clearSubmenu);
		},
		handleScroll: function(evt) {
			this.scrollTop = evt.target.scrollTop;
			if (typeof(Storage) !== 'undefined') {
				localStorage.setItem('sidebarScroll', this.scrollTop);
			}
		},
		dismissSidebarMobile: function(evt) {
			evt.preventDefault();
			this.appOptions.appSidebarMobileToggled = false;
		}
	}
}
</script>
