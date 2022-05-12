<template>
    <div>
        <!-- BEGIN scrollbar -->
        <div class="app-sidebar-content" data-scrollbar="true" data-height="100%">
            <div class="menu">
                <template v-for="(layer) in sideBarConfig">
                    <div v-if="layer.options.addDivider !== undefined" v-bind:class="layer.options.addDivider.class"></div>
                    <div class="menu-header">{{layer.name}}</div>
                    <menu-item v-for="(menu, index) in layer.items" :key="layer.name+''+index" v-bind:menu="menu"></menu-item>
                </template>
                <div class="menu-divider my-3"></div>
                <div class="menu-item">
                    <a href="https://docs.hnwdefi.com/" target="_blank" class="menu-link">
                        <div class="menu-icon"><i class="fa fa-book"></i></div>
                        <div class="menu-text">Documentation</div>
                    </a>
                </div>
                <div class="menu-item">
                    <a href="https://t.me/HNWLaunchNetwork" target="_blank" class="menu-link">
                        <div class="menu-icon"><i class="fab fa-telegram"></i></div>
                        <div class="menu-text">Telegram</div>
                    </a>
                </div>
                <div class="menu-item mt-3 ms-3">
                    <span class="fs-6">v{{$root.$children[0].version}}</span>
                </div>
		
                <!-- BEGIN minify-button -->
                <div class="menu-item d-flex">
                    <a href="javascript:;" class="app-sidebar-minify-btn ms-auto" v-on:click="handleSidebarMinify()"><i class="fa fa-angle-double-left"></i></a>
                </div>
                <!-- END minify-button -->
            </div>
        </div>


    
    </div>
    <!-- END menu -->
</template>

<script>
    import sideBarConfig from "../../../../config/SideBar";
    import AppOptions from '../../../../config/AppOptions.vue'
    import MenuItem from "./MenuItem.vue";

    export default {
        components: {
            MenuItem
        },

        props: {
        },

        data() {
            return {
                sideBarConfig:sideBarConfig,
			    appOptions: AppOptions
            }
        },

        created() {
        },

        updated () {
        },

        computed: {
        },

        watch: {
        },

        methods: {
            handleSidebarMinify: function() {
                this.appOptions.appSidebarMinified = !this.appOptions.appSidebarMinified;
            },
        },

        mounted() {
        }
    }
</script>