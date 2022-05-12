<template>
    <div class="navbar-item me-3 my-2">
        <button class="btn btn-dark d-none"><img style="height:15px;width:auto;" src="https://cdn.iconscout.com/icon/free/png-64/metamask-2728406-2261817.png"></button>
        <button class="btn btn-primary text-dark" v-on:click="checkConnection">{{displayWalletAccount}}</button>
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

        watch: {},

        methods: {
            checkConnection: function() {
                if (this.session.isConnected === false) {this.$root.$children[0].connectWallet();return;}
                if (this.session.isConnected === true) {this.$root.$children[0].disconnectWallet();return;}
            }
        },

        mounted() {
        }
    }
</script>