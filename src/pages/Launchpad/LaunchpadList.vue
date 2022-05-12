<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
    
        <div class="row justify-content-center">
            <card-pool  v-for="address in requiredPools"
                        v-bind:address="address"
                        v-bind:pool="pools[address]"
                        v-bind:key="address"
                        v-if="pools[address] !== undefined && pools[address].isLoaded === true"></card-pool>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import CardPool from '../../components/old-git/Launchpad/LaunchpadList/CardPool.vue';

    export default {
        name: 'LaunchpadList',
        components: {
            CardPool
	    },
        data() {
            return {
                forceRender: 0,
                requiredContracts: ['PoolFactory', 'PoolFactoryWithToken', 'FairLaunchFactory', 'Pool', 'FairLaunch'],
                requiredBalances: [],
                requiredAllowances: [],
                requiredPairs: [],
                requiredPools: [],
                requiredMges: [],
                loaded: {
                    contracts: [],
                    balances: [],
                    allowances: [],
                    pools: []
                },
                mapping: {
                    PoolFactory: [],
                    PoolFactoryWithToken: [],
                    FairLaunchFactory: [],
                },
                interval: null,
            }
        },

        created() {
            this.$eventBus.$on("contracts/instantiateContract", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}
                if (this.loaded.contracts.includes(event.payload)) {return;}
                this.loaded.contracts.push(event.payload);
                if (["PoolFactory","PoolFactoryWithToken","FairLaunchFactory"].includes(event.payload)) {this.getPools(event.payload);}
                if (this.requiredBalances.includes(event.payload)) {
                    this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getWalletBalance', event.payload);
                }
            });

            this.$eventBus.$on("wallet/getWalletBalance", (event) => {
                if (!this.requiredBalances.includes(event.payload)) {return;}
                if (this.loaded.balances.includes(event.payload)) {return;}
                this.loaded.balances.push(event.payload);
                if (this.requiredAllowances.includes(event.payload)) {
                    this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('callAllowanceAmount', event.payload);
                }
            });

            this.$eventBus.$on("updateAllowanceAmount", (event) => {
                if (!this.requiredAllowances.includes(event.payload)) {return;}
                if (this.loaded.allowances.includes(event.payload)) {return;}
                this.loaded.allowances.push(event.payload);
            });

            this.$eventBus.$on("pools/instantiatePool", (event) => {
                if (!this.requiredPools.includes(event.payload)) {return;}
                if (this.loaded.pools.includes(event.payload)) {return;}
                this.loaded.pools.push(event.payload);
            });

            this.updatePools();
        },

        updated () {
        },

        computed: {
            ...mapState(['contracts', 'pools', 'session'])
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
            },

            getPools: async function(type) {
                this.mapping[type] = await this.contracts[type].instance.methods.getPools().call();
                // console.log(this.mapping[type]);
                // if (type === 'FairLaunchFactory') {
                //     this.requiredMges = this.mapping[type];
                //     // this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredMges', this.mapping[type]);
                //     return;
                // }
                this.mapping[type].forEach(address => {
                    if (!this.requiredPools.includes(address)) {
                        this.requiredPools.push(address);
                    }
                });
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredPools', this.mapping[type]);
            },

            updatePools: function() {
                let self = this;
                setTimeout(function() {
                    self.loaded.pools.forEach(address => {
                        self.$store.dispatch('pools/updatePool', address);
                    });
                    if (self.$route.path === '/launchpad/list/') {self.updatePools();}
                }, 3000);
            }
        },

        mounted() {
            this.initiate();
        }
    }
</script>