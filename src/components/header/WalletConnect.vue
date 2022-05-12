<template>
    <div class="navbar-item me-3 my-2">
        <button class="btn btn-dark d-none"><img style="height:15px;width:auto;" src="https://cdn.iconscout.com/icon/free/png-64/metamask-2728406-2261817.png"></button>
        <button class="btn btn-primary text-dark" v-on:click="checkConnection">{{displayWalletAccount}}</button>
        <button id="walletConnectModalToggle" class="d-none" data-bs-toggle="modal" data-bs-target="#walletConnectModal">Toggle Modal</button>
        <!-- #modal-dialog -->
        <div class="modal fade bg-dark bg-opacity-60" id="walletConnectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content bg-dark bg-opacity-90">
                    <div class="modal-header">
                        <h4 class="modal-title">Connect your wallet</h4>
                        <button id="walletConnectModalClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 col-lg-6">
                                <button type="button" class="btn btn-primary w-100" v-on:click="connectWithProvider('metamask')">Metamask</button>
                            </div>
                            <div class="col-12 col-lg-6">
                                <button type="button" class="btn btn-primary w-100" v-on:click="connectWithProvider('walletConnect')">Wallet Connect</button>
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

    export default {
        name: 'WalletConnect',
        components: {
        },
        data() {
            return {
            }
        },

        created() {
        },

        updated () {
        },

        computed: {
            displayWalletAccount: function() {
                if (this.session.isConnected === false || this.wallet.account === undefined) {return 'Connect your wallet';}
                return this.wallet.account.substring(0, 12) + '...' + this.wallet.account.substring(this.wallet.account.length - 4);
                // return 'Disconnect your wallet';
            },
            ...mapState(['session', 'wallet'])
        },

        watch: {
            "session.isConnected": function(newVal, oldVal) {
                if (newVal === true) {document.getElementById('walletConnectModalClose').click();}
            }
        },

        methods: {
            checkConnection: function() {
                if (this.session.isConnected === true) {
                    this.$root.$children[0].disconnectWallet();
                    return;
                }
                document.getElementById('walletConnectModalToggle').click();
                // this.$root.$children[0].connectWallet();return;
            },

            connectWithProvider: async function(providerName) {
                this.$root.$children[0].connectWallet(providerName);
            },
        },

        mounted() {
        }
    }
</script>