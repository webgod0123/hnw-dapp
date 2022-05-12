<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
        <div class="row justify-content-center">
            <div class="col-12 col-xl-8 mb-3">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col text-center fs-3 ft-fram-l mb-3">
                                Create Token
                            </div>
                        </div>
                        <div class="card bg-gray-900 bg-opacity-70  text-white" v-show="creatingToken">
                            <div class="card-body">
                                <create-token-form v-on:createTokenReceipt="createTokenReceipt"></create-token-form>
                            </div>
                        </div>
                        <div class="card border border-primary bg-gray-900 bg-opacity-70 text-white" v-show="!creatingToken">
                            <div class="card-body">
                                <div class="row mb-4">
                                    <div class="col-12 text-center">
                                        <h1>Congratulations !</h1>
                                    </div>
                                </div>
                                <div class="row pb-2 mb-2 border-bottom border-gray">
                                    <div class="col-4">
                                        Address
                                    </div>
                                    <div class="col-8">
                                        {{token.address}}
                                    </div>
                                </div>
                                <div class="row pb-2 mb-2 border-bottom border-gray">
                                    <div class="col-4">
                                        Name
                                    </div>
                                    <div class="col-8">
                                        {{token.name}}
                                    </div>
                                </div>
                                <div class="row pb-2 mb-2 border-bottom border-gray">
                                    <div class="col-4">
                                        Symbol
                                    </div>
                                    <div class="col-8">
                                        {{token.symbol}}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        Decimals
                                    </div>
                                    <div class="col-8">
                                        {{token.decimals}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import CreateTokenForm from '../../components/old-git/Launchpad/CreateToken/CreateTokenForm.vue';

    export default {
        name: 'CreateToken',
        components: {
            CreateTokenForm
	    },
        data() {
            return {
                forceRender: 0,
                requiredContracts: [],
                requiredPairs: [],
                creatingToken: true,
                token: {
                    address: null,
                    name: null,
                    symbol: null,
                    decimals: null,
                }
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

            this.$eventBus.$on("createTokenReceipt", (event) => { this.createTokenReceipt(event.receipt, event.infos);});
        },

        updated () {
        },

        computed: {
            ...mapState(['session'])
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

            createTokenReceipt: function(receipt, infos) {
                this.token.address = receipt.events.TokenCreated.returnValues.token;
                this.token.name = infos.name;
                this.token.symbol = infos.symbol;
                this.token.decimals = 18;
                if (infos.decimals) {this.token.decimals = infos.decimals;}
                this.creatingToken = false;
            }
        },

        mounted() {
            this.initiate();
        }
    }
</script>