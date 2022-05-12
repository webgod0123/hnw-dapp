<template>
	<div>
		<!-- BEGIN #sidebar-right -->
		<div id="sidebar-right" class="app-sidebar app-sidebar-end">
			<!-- BEGIN scrollbar -->
			<vue-custom-scrollbar class="h-100">
				<div class="p-3">
					<p class="text-white">Accordion</p>
					<!-- begin #accordion -->
					<div id="accordion" class="accordion">
						<!-- begin b-card -->
						<b-card class="bg-gray-700 text-white border-0 rounded-0" no-body>
							<b-card-header header-tag="header" class="card-header bg-gray-900 rounded-0 text-white pointer-cursor d-flex align-items-center" v-b-toggle.accordion1>
								Accordion #1
								<i class="fa fa-plus-circle text-blue ms-auto me-0"></i>
							</b-card-header>
							<b-collapse id="accordion1" visible accordion="my-accordion">
								<b-card-body>
									Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
								</b-card-body>
							</b-collapse>
						</b-card>
						<!-- end b-card -->
						<!-- begin b-card -->
						<b-card class="bg-gray-700 text-white border-0 rounded-0" no-body>
							<b-card-header header-tag="header" class="card-header bg-gray-900 rounded-0 text-white pointer-cursor d-flex align-items-center" v-b-toggle.accordion2>
								Accordion #2
								<i class="fa fa-plus-circle text-purple ms-auto me-0"></i>
							</b-card-header>
							<b-collapse id="accordion2" accordion="my-accordion">
								<b-card-body>
									Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
								</b-card-body>
							</b-collapse>
						</b-card>
						<!-- end b-card -->
						<!-- begin b-card -->
						<b-card class="bg-gray-700 text-white border-0 rounded-0" no-body>
							<b-card-header header-tag="header" class="card-header bg-gray-900 rounded-0 text-white pointer-cursor d-flex align-items-center" v-b-toggle.accordion3>
								Accordion #3
								<i class="fa fa-plus-circle text-teal ms-auto me-0"></i>
							</b-card-header>
							<b-collapse id="accordion3" accordion="my-accordion">
								<b-card-body>
									Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
								</b-card-body>
							</b-collapse>
						</b-card>
						<!-- end b-card -->
						<!-- begin b-card -->
						<b-card class="bg-gray-700 text-white border-0 rounded-0" no-body>
							<b-card-header header-tag="header" class="card-header bg-gray-900 rounded-0 text-white pointer-cursor d-flex align-items-center" v-b-toggle.accordion4>
								Accordion #4
								<i class="fa fa-plus-circle text-info ms-auto me-0"></i>
							</b-card-header>
							<b-collapse id="accordion4" accordion="my-accordion">
								<b-card-body>
									Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
								</b-card-body>
							</b-collapse>
						</b-card>
						<!-- end b-card -->
						<!-- begin b-card -->
						<b-card class="bg-gray-700 text-white border-0 rounded-0" no-body>
							<b-card-header header-tag="header" class="card-header bg-gray-900 rounded-0 text-white pointer-cursor d-flex align-items-center" v-b-toggle.accordion5>
								Accordion #5
								<i class="fa fa-plus-circle text-warning ms-auto me-0"></i>
							</b-card-header>
							<b-collapse id="accordion5" accordion="my-accordion">
								<b-card-body>
									Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
								</b-card-body>
							</b-collapse>
						</b-card>
						<!-- end b-card -->
						<!-- begin b-card -->
						<b-card class="bg-gray-700 text-white border-0 rounded-0" no-body>
							<b-card-header header-tag="header" class="card-header bg-gray-900 rounded-0 text-white pointer-cursor d-flex align-items-center" v-b-toggle.accordion6>
								Accordion #6
								<i class="fa fa-plus-circle text-danger ms-auto me-0"></i>
							</b-card-header>
							<b-collapse id="accordion6" accordion="my-accordion">
								<b-card-body>
									Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
								</b-card-body>
							</b-collapse>
						</b-card>
						<!-- end b-card -->
						<!-- begin b-card -->
						<b-card class="bg-gray-700 text-white border-0 rounded-0" no-body>
							<b-card-header header-tag="header" class="card-header bg-gray-900 rounded-0 text-white pointer-cursor d-flex align-items-center" v-b-toggle.accordion7>
								Accordion #7
								<i class="fa fa-plus-circle text-muted ms-auto me-0"></i>
							</b-card-header>
							<b-collapse id="accordion7" accordion="my-accordion">
								<b-card-body>
									Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
								</b-card-body>
							</b-collapse>
						</b-card>
						<!-- end b-card -->
					</div>
					<!-- end #accordion -->
				</div>
			</vue-custom-scrollbar>
			<!-- END scrollbar -->
		</div>
		<div class="app-sidebar-bg app-sidebar-end"></div>
		<div class="app-sidebar-mobile-backdrop app-sidebar-end">
			<a href="#" v-on:click="dismissSidebarEndMobile" class="stretched-link"></a>
		</div>
		<!-- END #sidebar-right -->
	</div>
</template>

<script>
import AppOptions from '../../config/AppOptions.vue'

export default {
  name: 'SidebarRight',
  data() {
		return {
			appOptions: AppOptions
		}
  },
  methods: {
		dismissSidebarEndMobile: function(evt) {
			evt.preventDefault();
			this.appOptions.appSidebarEndMobileToggled = false;
		}
  }	
}
</script>
