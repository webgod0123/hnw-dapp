<template>
    <div class="navbar-item me-3 my-2">
        <button class="btn btn-dark"><img style="height:15px;width:auto;" src="https://cdn.iconscout.com/icon/free/png-64/metamask-2728406-2261817.png"></button>
        <button class="btn btn-primary text-dark" v-on:click="checkConnection">{{displayWalletAccount}}</button>
    </div>
</template>

<script>

    export default {

        props: {
            wallet: {}
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
                if (this.wallet == null || this.wallet.account == undefined) {return 'Connect your wallet';}
                return this.wallet.account.substring(0, 12) + '...' + this.wallet.account.substring(this.wallet.account.length - 4);
            }
        },

        watch: {
            'wallet.account': function() {
                // console.log(this.wallet.account);
            },

            '$root.liquidityPool.ratio': function() {
                    this.ratio = this.$root.$children[0].liquidityPool.ratio;
            }
        },

        methods: {
            // init: function() {
            //     console.log("Initializing example");
            //     // console.log("WalletConnectProvider is", WalletConnectProvider);
            //     // console.log("Fortmatic is", Fortmatic);
            //     console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

                // // Check that the web page is run in a secure context,
                // // as otherwise MetaMask won't be available
                // if(location.protocol !== 'https:') {
                //     // https://ethereum.stackexchange.com/a/62217/620
                //     const alert = document.querySelector("#alert-error-https");
                //     alert.style.display = "block";
                //     document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
                //     return;
                // }

                // // Tell Web3modal what providers we have available.
                // // Built-in web browser provider (only one can exist as a time)
                // // like MetaMask, Brave or Opera is added automatically by Web3modal
                // const providerOptions = {
                //     walletconnect: {
                //     package: WalletConnectProvider,
                //     options: {
                //         // Mikko's test key - don't copy as your mileage may vary
                //         infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
                //     }
                //     },

                //     fortmatic: {
                //     package: Fortmatic,
                //     options: {
                //         // Mikko's TESTNET api key
                //         key: "pk_test_391E26A3B43A3350"
                //     }
                //     }
                // };

                // web3Modal = new Web3Modal({
                //     cacheProvider: false, // optional
                //     providerOptions, // required
                //     disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
                // });

                // console.log("Web3Modal instance is", web3Modal);
            // },

            checkConnection: function() {
                console.log('check connection');
                if (this.wallet == null || this.wallet.account == undefined) {
                    console.log('try to connect');
                    this.$root.$children[0].connectWallet();
                }
            }
        },

        mounted() {
            // this.init()
            // console.log('wallet:');
            // console.log(this.wallet);
        }
    }
</script>