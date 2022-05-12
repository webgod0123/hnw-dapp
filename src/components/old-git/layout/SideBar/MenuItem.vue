<template>
	<div>
		<!-- menu with submenu -->
		<div v-if="menu.children" class="menu-item has-sub" v-bind:class="{ 'active': subIsActive(menu.path), 'expand': this.stat =='expand', 'd-none': this.stat =='hide' }">
			<a href="#" class="menu-link" v-on:click.prevent.stop="expand($event)" @mouseover="mouseOver(menu.children, $event)" @mouseleave="hideFloatSubmenu">
				<div class="menu-icon" v-if="menu.icon"><i v-bind:class="menu.icon"></i></div>
				<div v-if="menu.img" class="menu-icon-img" v-bind:class="menu.bgImg"><img v-bind:src="menu.img" alt="" /></div>
				<div class="menu-text">
					{{ menu.title }}
					<span v-if="menu.label" class="menu-label">{{ menu.label }}</span>
					<i v-if="menu.highlight" class="fa fa-paper-plane text-theme"></i>
				</div>
				<div v-if="menu.badge" class="menu-badge">{{ menu.badge }}</div>
				<div v-else class="menu-caret"></div>
			</a>
			<div class="menu-submenu" v-bind:class="{ 'd-block': this.stat == 'expand', 'd-none': this.stat == 'collapse' }" v-bind:style="{ marginTop: (appOptions.appSidebarMinified) ? - (scrollTop + 40) + 'px' : '' }">
				<template v-for="submenu in menu.children">
					<menu-item v-bind:menu="submenu" v-bind:key="submenu.path" ref="sidebarNavList" v-on:calc-float-submenu="handleCalcFloatSubmenu" v-on:collapse-other="handleCollapseOther(submenu)"></menu-item>
				</template>
			</div>
		</div>
	
		<!-- menu without submenu -->
		<router-link v-if="!menu.children && (menu.external === undefined || menu.external === false)" v-bind:to="menu.path" class="menu-item" v-bind:class="{ 'd-none': this.stat =='hide' }" active-class="active" tag="div" v-on:click.native="collapseOther()">
			<a class="menu-link">
				<div class="menu-icon" v-if="menu.icon"><i v-bind:class="menu.icon"></i></div>
				<div v-if="menu.img" class="menu-icon-img" v-bind:class="menu.bgImg"><img v-bind:src="menu.img" alt="" /></div>
				<div class="menu-text">
					{{ menu.title }}
					<span v-if="menu.label" class="menu-label">{{ menu.label }}</span>
					<i v-if="menu.highlight" class="fa fa-paper-plane text-theme"></i>
				</div>
				<div v-if="menu.badge" class="menu-badge">{{ menu.badge }}</div>
			</a>
		</router-link>
	
		<!-- menu without submenu -->
		<div v-if="!menu.children && menu.external !== undefined && menu.external === true" class="menu-item" v-bind:class="{ 'd-none': this.stat =='hide' }">
			<a class="menu-link" style="cursor:pointer !important;" v-bind:href="menu.path">
				<div class="menu-icon" v-if="menu.icon"><i v-bind:class="menu.icon"></i></div>
				<div v-if="menu.img" class="menu-icon-img" v-bind:class="menu.bgImg"><img v-bind:src="menu.img" alt="" /></div>
				<div class="menu-text">
					{{ menu.title }}
					<span v-if="menu.label" class="menu-label">{{ menu.label }}</span>
					<i v-if="menu.highlight" class="fa fa-paper-plane text-theme"></i>
				</div>
				<div v-if="menu.badge" class="menu-badge">{{ menu.badge }}</div>
			</a>
		</div>
	</div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
	name: "MenuItem",
	components: {
		MenuItem
	},
	props: ['menu', 'scrollTop'],
	data() {
		return {
			stat: '',
			appOptions: this.$root.$children[0].config.appOptions
		}
	},
	methods: {
		mouseOver: function(data, event) {
			if (this.appOptions.appSidebarMinified) {
				var offset = event.target.offsetParent.getBoundingClientRect();
				this.$emit('show-float-submenu', data, offset);
			}
		},
		hideFloatSubmenu: function() {
			if (this.appOptions.appSidebarMinified) {
				this.$emit('hide-float-submenu');
			}
		},
		expand: function() {
			if (this.stat == '') {
				this.stat = (this.subIsActive(this.menu.path)) ? 'collapse' : 'expand';
			} else {
				this.stat = (this.stat == 'expand') ? 'collapse' : 'expand'
			}
			this.$emit('collapse-other', this.menu);
			
			if (this.appOptions.appSidebarMinified) {
				this.$emit('calc-float-submenu');
			}
		},
		handleCalcFloatSubmenu: function() {
			if (this.appOptions.appSidebarMinified) {
				this.$emit('calc-float-submenu');
			}
		},
		collapse: function(menu) {
			if (this.menu != menu) {
				this.stat = 'collapse'
			}
		},
		hide: function() {
			this.stat = 'hide'
		},
		show: function() {
			this.stat = '';
		},
		searchExpand: function() {
			this.stat = 'expand'
		},
		collapseOther: function() {
			this.$emit('collapse-other', this.menu)
		},
		handleCollapseOther: function(menu) {
			for (var i = 0; i < this.menu.children.length; i++) {
				this.$refs.sidebarNavList[i].collapse(menu);
			}
		},
		subIsActive(path) {
			const paths = Array.isArray(path) ? path : [path]
			return paths.some(path => {
				return this.$route.path.indexOf(path) === 0
			})
		}
  	}
}
</script>