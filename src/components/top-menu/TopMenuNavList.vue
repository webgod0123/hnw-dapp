<template>
	<!-- menu with submenu -->
	<div v-if="menu.children" class="menu-item has-sub" v-bind:class="{ 'active': subIsActive(menu.path) }">
		<a href="#" class="menu-link" v-on:click.prevent.stop="expand()">
			<div v-if="menu.icon" class="menu-icon"><i v-bind:class="menu.icon"></i></div>
			<div v-if="menu.img" class="menu-icon-img"><img v-bind:src="menu.img" alt="" /></div>
			<div class="menu-text">
				{{ menu.title }}
				<i v-if="menu.highlight" class="fa fa-paper-plane text-primary"></i>
				<span v-if="menu.label" class="menu-label">{{ menu.label }}</span>
			</div>
			<div v-if="menu.badge" class="menu-badge">{{ menu.badge }}</div>
			<div v-else class="menu-caret"></div>
		</a>
		<div class="menu-submenu" v-bind:class="{ 'd-block': this.stat == 'expand', 'd-none': this.stat == 'collapse' }" v-bind:style="{ marginTop: (appOptions.pageSidebarMinified) ? - (scrollTop + 40) + 'px' : '' }">
			<template v-for="submenu in menu.children">
				<top-menu-nav-list v-bind:menu="submenu" v-bind:key="submenu.path" ref="topMenuNavList" v-on:collapse-other="handleCollapseOther(submenu)"></top-menu-nav-list>
			</template>
		</div>
	</div>
  
	<!-- menu without submenu -->
	<router-link class="menu-item" v-else v-bind:to="menu.path" active-class="active" tag="div" v-on:click.native="collapseOther()">
		<a class="menu-link">
			<div v-if="menu.icon" class="menu-icon"><i v-bind:class="menu.icon"></i></div>
			<div v-if="menu.img" class="menu-icon-img"><img v-bind:src="menu.img" alt="" /></div>
			<div class="menu-text">
				{{ menu.title }}
				<i v-if="menu.highlight" class="fa fa-paper-plane text-theme"></i>
				<span v-if="menu.label" class="menu-label">{{ menu.label }}</span>
			</div>
			<div v-if="menu.badge" class="menu-badge">{{ menu.badge }}</div>
		</a>
	</router-link>
</template>

<script>
import TopMenuNavList from './TopMenuNavList.vue'
import AppOptions from '../../config/AppOptions.vue'

export default {
	name: 'TopMenuNavList',
	props: ['menu'],
	components: {
		TopMenuNavList
	},
	data() {
		return {
			stat: '',
			appOptions: AppOptions
		}
	},
	methods: {
		expand: function() {
			if (this.stat == '') {
				this.stat = (this.subIsActive(this.menu.path)) ? 'collapse' : 'expand';
			} else {
				this.stat = (this.stat == 'expand') ? 'collapse' : 'expand'
			}
			this.$emit('collapse-other', this.menu)
		},
		collapse: function(menu) {
			if (this.menu != menu) {
				this.stat = 'collapse'
			}
		},
		collapseOther: function() {
			this.$emit('collapse-other', this.menu)
		},
		handleCollapseOther: function(menu) {
			for (var i = 0; i < this.menu.children.length; i++) {
				this.$refs.topMenuNavList[i].collapse(menu);
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
