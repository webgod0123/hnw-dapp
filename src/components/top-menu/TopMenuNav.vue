<template>
	<!-- begin top-menu nav -->
	<div class="menu" v-if="menus" v-bind:style="{ marginLeft: '-' + margin.left + 'px', marginRight: '-'+ margin.right + 'px' }">
		<template v-for="menu in menus">
			<top-menu-nav-list ref="topMenuNavList" v-bind:menu="menu" v-bind:key="menu.path" v-bind:status="menu.status" v-on:collapse-other="handleCollapseOther(menu)"></top-menu-nav-list>
		</template>
		<div class="menu-item menu-control menu-control-start" v-bind:class="{ 'show': controls.left }" v-on:click="controlLeft">
			<a href="javascript:;" class="menu-link" data-toggle="app-top-menu-prev"><i class="fa fa-angle-left"></i></a>
		</div>
		<div class="menu-item menu-control menu-control-end" v-bind:class="{ 'show': controls.right }" v-on:click="controlRight">
			<a href="javascript:;" class="menu-link" data-toggle="app-top-menu-next"><i class="fa fa-angle-right"></i></a>
		</div>
	</div>
	<!-- end top-menu nav -->
</template>

<script>
import Menus from '../sidebar/SidebarMenu.vue'
import TopMenuNavList from './TopMenuNavList.vue'
import AppOptions from '../../config/AppOptions.vue'

export default {
	name: 'TopMenuNav',
	components: {
		TopMenuNavList
	},
	mounted() {
		var windowWidth = this.$el.clientWidth - 128;
		var listFullWidth = 0;
		var listPrevWidth = 0;
		var listActive = false;
		
		document.querySelectorAll('.app-top-menu .menu > .menu-item').forEach(function(elm) {
			listFullWidth += elm.offsetWidth;
			listPrevWidth += (!listActive) ? elm.offsetWidth : 0;
			listActive = (elm.classList.contains('active')) ? true : listActive;
		});
		
		this.nav.width = listFullWidth;
		
		listPrevWidth = (!listActive) ? 0 : listPrevWidth;
		
		if (listPrevWidth >= windowWidth) {
				var finalScrollWidth = listPrevWidth - windowWidth + 128;
				if (!document.body.classList.contains('rtl-mode')) { 
					this.margin.left = finalScrollWidth;
					this.margin.right = 0;
				} else {
					this.margin.right = finalScrollWidth;
					this.margin.left = 0;
				}
		}
		
		this.controls.right = (listPrevWidth != listFullWidth && listFullWidth >= windowWidth) ? true : false;
		this.controls.left = (listPrevWidth >= windowWidth && listFullWidth >= windowWidth) ? true : false;
	},
	data () {
		return { 
			menus: Menus,
			appOptions: AppOptions,
			controls: {
				left: false,
				right: false
			},
			margin: {
				left: 0,
				right: 0
			},
			nav: {
				width: 0
			}
		}
	},
	methods: {
		handleCollapseOther: function(menu) {
			for (var i = 0; i < this.menus.length; i++) {
				this.$refs.topMenuNavList[i].collapse(menu);
			}
		},
		controlRight: function() {
			var containerWidth = document.querySelector('.app-top-menu').offsetWidth - 88;
			var widthLeft = this.nav.width + (-this.margin.left) - containerWidth;
			var finalScrollWidth = 0;
			
			if (widthLeft <= containerWidth) {
				finalScrollWidth = widthLeft - (-this.margin.left) + 128;
				this.controls.right = false;
			} else {
				finalScrollWidth = containerWidth - (-this.margin.left) - 128;
			}
			
			if (finalScrollWidth !== 0) {
				if (!document.body.classList.contains('rtl-mode')) { 
					this.margin.left = finalScrollWidth;
					this.margin.right = 0;
				} else {
					this.margin.right = finalScrollWidth;
					this.margin.left = 0;
				}
				this.controls.left = true;
			}
		},
		controlLeft: function() {
			var widthLeft = this.margin.left;
			var containerWidth = document.querySelector('.app-top-menu').offsetWidth;
			var finalScrollWidth = 0;

			if (widthLeft <= containerWidth) {
				finalScrollWidth = 0;
				this.controls.left = false;
			} else {
				finalScrollWidth = widthLeft - containerWidth + 88;
			}

			if (!document.body.classList.contains('rtl-mode')) { 
				this.margin.left = finalScrollWidth;
				this.margin.right = 0;
				this.controls.right = true;
			} else {
				this.margin.right = finalScrollWidth;
				this.margin.left = 0;
				this.controls.right = true;
			}
		}
	}
}
</script>
