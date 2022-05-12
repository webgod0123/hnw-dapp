<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                forceRender: 0,
                requiredContracts: [],
                requiredPairs: [],
            }
        },

        created() {
            this.$eventBus.$on("updateWalletBalance", (event) => {
                if (this.requiredContracts.includes(event.token)) {
                    this.$nextTick(function() {this.forceRender++;});
                }
            });

            this.$eventBus.$on("updatePairRatio", (event) => {
                if (this.requiredPairs.includes(event.pair)) {
                    this.$nextTick(function() {this.forceRender++;});
                }
            });
        },

        updated () {
        },

        computed: {
            ...mapState([])
        },

        watch: {
            "session.isConnected": function(newVal, oldVal) {
                if (newVal === true && oldVal === false) {this.initiate();}
            }
        },

        methods: {
            initiate: function() {
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredContracts', this.requiredContracts);
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredPairs', this.requiredPairs);
            }
        },

        mounted() {
            this.initiate();
        }
    }
</script>