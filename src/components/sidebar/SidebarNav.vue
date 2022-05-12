<template>
	<!-- begin sidebar nav -->
	<div class="menu" v-if="menus">
		<div class="menu-search mb-n3" v-if="appOptions.appSidebarSearch">
			<input type="text" v-on:keyup="handleSidebarFilter" class="form-control" placeholder="Sidebar menu filter..." />
		</div>
		<div class="menu-header">Navigation</div>
		<template v-for="menu in menus">
			<sidebar-nav-list 
				ref="sidebarNavList" 
				v-bind:menu="menu" 
				v-bind:scrollTop="scrollTop" 
				v-bind:key="menu.path" 
				v-bind:status="menu.status" 
				v-on:collapse-other="handleCollapseOther(menu)"
				v-on:show-float-submenu="handleShowFloatSubmenu"
				v-on:hide-float-submenu="handleHideFloatSubmenu"></sidebar-nav-list>
		</template>
		
		<!-- BEGIN minify-button -->
		<div class="menu-item d-flex">
			<a href="javascript:;" class="app-sidebar-minify-btn ms-auto" v-on:click="handleSidebarMinify()"><i class="fa fa-angle-double-left"></i></a>
		</div>
		<!-- END minify-button -->
	</div>
	<!-- end sidebar nav -->
</template>

<script>
import SidebarMenu from './SidebarMenu.vue'
import SidebarNavList from './SidebarNavList.vue'
import AppOptions from '../../config/AppOptions.vue'

export default {
	name: 'SidebarNav',
	props: ['scrollTop'],
	components: {
		SidebarNavList
	},
	data () {
		return { 
			menus: SidebarMenu,
			appOptions: AppOptions
		}
	},
	methods: {
		handleShowFloatSubmenu: function(menu, offset) {
			this.$emit('show-float-submenu', menu, offset);
		},
		handleHideFloatSubmenu: function() {
			this.$emit('hide-float-submenu');
		},
		handleCollapseOther: function(menu) {
			for (var i = 0; i < this.menus.length; i++) {
				this.$refs.sidebarNavList[i].collapse(menu);
			}
		},
		handleSidebarMinify: function() {
			this.appOptions.appSidebarMinified = !this.appOptions.appSidebarMinified;
		},
		handleSidebarFilter: function(e) {
			var value = e.target.value;
					value = value.toLowerCase();
			
			if (value) {
				for (var x = 0; x < this.menus.length; x++) {
					var title = (this.menus[x].title).toLowerCase();
					var children = this.menus[x].children;
				
					if (title.search(value) > -1) {
						this.$refs.sidebarNavList[x].show();
						
						if (children) {
							this.$refs.sidebarNavList[x].searchExpand();
						}
					} else {
						if (children) {
							var hasActive = false;
							for (var y = 0; y < children.length; y++) {
								var title2 = (children[y].title).toLowerCase();
							
								if (title2.search(value) > -1) {
									hasActive = true;
									this.$refs.sidebarNavList[x].$refs.sidebarNavList[y].show();
									this.$refs.sidebarNavList[x].searchExpand();
								} else {
									if (hasActive) {
										this.$refs.sidebarNavList[x].searchExpand();
									} else {
										this.$refs.sidebarNavList[x].hide();
									}
									this.$refs.sidebarNavList[x].$refs.sidebarNavList[y].hide();
								}
							}
						} else {
							this.$refs.sidebarNavList[x].hide();
						}
					}
				} 
			} else {
				for (var a = 0; a < this.menus.length; a++) {
					this.$refs.sidebarNavList[a].show();
					
					var submenu = this.menus[a].children;
					if (submenu) {
						for (var b = 0; b < submenu.length; b++) {
							this.$refs.sidebarNavList[a].$refs.sidebarNavList[b].show();
						}
					}
				}
			}
			console.log('------');
		}
	}
}
</script>
