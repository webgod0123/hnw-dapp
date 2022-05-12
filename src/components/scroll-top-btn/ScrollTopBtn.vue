<template>
	<div>
		<button class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" 
			v-on:click="scrollToTop"
			v-bind:class="{ 'show': appOptions.appBodyScrollTop }"
		>
			<i class="fa fa-angle-up"></i>
		</button>
	</div>
</template>

<script>
import AppOptions from '../../config/AppOptions.vue'

export default {
  name: 'ScrollToTop',
  data() {
		return {
			appOptions: AppOptions
		}
  },
	methods: {
		scrollToTop(e) {
			e.preventDefault();
			
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0; 
		}
	}
}
</script>
