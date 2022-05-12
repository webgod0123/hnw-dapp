<template>
	<div class="navbar-nav">
		<div class="navbar-item me-3 my-2" v-bind:key="forceRender">
			HNW / BUSD : {{(pairs.BUSDHNW === undefined) ? '0.00' : pairs.BUSDHNW.ratio.toFixed(2)}}
		</div>

		<layout-wallet></layout-wallet>
		
	</div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                forceRender: 0,
                requiredPairs: ["BUSDHNW"],
            }
        },

        created() {
            this.$eventBus.$on("updatePairRatio", (event) => {
                if (this.requiredPairs.includes(event.pair)) {
                    this.$nextTick(function() {this.forceRender++;});
                }
            });
        },

        updated () {},

        computed: {
            ...mapState(['pairs', 'session', 'wallet'])
        },

        watch: {
            "session.isConnected": function(newVal, oldVal) {
                if (newVal === true && oldVal === false) {this.initiate();}
            }
        },

        methods: {
            initiate: function() {
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredPairs', this.requiredPairs);
            }
        },

        mounted() {
            this.initiate();
            window.setInterval(() => {
                this.initiate();
            }, 30000);
        }
    }
</script>