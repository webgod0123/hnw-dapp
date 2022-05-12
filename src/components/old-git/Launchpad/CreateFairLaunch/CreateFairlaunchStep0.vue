<template>
    <div class="card bg-gray-900 bg-opacity-70 text-white">
        <div class="card-body" :key="forceRender">
            <validation-observer ref="mgeStep0">
                <form @submit.prevent="catchSubmitEvent()">
                    <div class="row">
                        <div class="col-12">
                            <validation-provider    name="token address"
                                                    ref="fairlaunchForm_tokenAddress"
                                                    :rules="{ required: true, regex: /^0x[a-fA-F0-9]{40}$/ }"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Token Address</label><button id="createTokenModal" class="btn btn-xs btn-secondary btn-block text-dark float-end" style="min-width:200px; margin-top:-5px;" data-bs-toggle="modal" data-bs-target="#createToken">Create token</button>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 0x8173ccc721111b5a93ce7fa6fec0fc077b58b1b7" v-bind:value="forms.fairlaunch.token.address" @input="updateFormField('fairlaunch', 'token', 'address', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row mb-3" v-if="error !== null">
                        <div class="col-8">
                            <div class="card border border-danger text-white">
                                <div class="card-body text-center" v-if="error !== null">
                                    {{error}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3" v-if="flags.isValid">
                        <div class="col-8" v-if="flags.isLoading">
                            <div class="card border border-primary text-white">
                                <div class="card-body text-center" v-if="error === null">
                                    Wait a moment please, we are retrieving token info.<br>
                                    <i class="fas fa-circle-notch fa-spin fs-2 mt-2 text-primary"></i>
                                </div>
                                <div class="card-body text-center" v-if="error !== null">
                                    {{error}}
                                </div>
                            </div>
                        </div>
                        <div class="col-8" v-if="flags.hasTokenInfo">
                            <div class="card border border-primary text-white">
                                <div class="card-body">
                                    <div class="row pb-2 mb-2 border-bottom border-gray">
                                        <div class="col-6">
                                            Name
                                        </div>
                                        <div class="col-6">
                                            {{forms.fairlaunch.token.name}}
                                        </div>
                                    </div>
                                    <div class="row pb-2 mb-2 border-bottom border-gray">
                                        <div class="col-6">
                                            Symbol
                                        </div>
                                        <div class="col-6">
                                            {{forms.fairlaunch.token.symbol}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            Decimals
                                        </div>
                                        <div class="col-6">
                                            {{forms.fairlaunch.token.decimals}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 align-bottom" v-if="flags.hasTokenInfo">
                            <button v-if="!(forms.fairlaunch !== undefined && forms.fairlaunch.token.allowance > 0)" class="btn btn-info text-dark w-100" v-on:click="approve()">{{(approves.fairlaunch.use === true) ? 'PROCESSING...' : 'APPROVE'}}</button>
                            <button v-if="forms.fairlaunch !== undefined && forms.fairlaunch.token.allowance > 0" class="btn btn-primary text-dark w-100" v-on:click="validateAndAdvance()">NEXT</button>
                        </div>
                    </div>
                </form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
    import { MaxUint256 } from '@ethersproject/constants';
    import {mapState} from 'vuex';
    import ERC20 from '../../../../contracts/abis/erc20.json';

    export default {
        name: 'CreateFairlaunchStep0',
        data() {
            return {
                forceRender: 0,
                tokenAddressIsValid: false,
                flags: {
                    isValid: false,
                    isLoading: false,
                    hasTokenInfo: false,
                    isApproved: false,
                },
                error: null,
                approves: {
                    fairlaunch: {
                        message: '',
                        use: false,
                    }
				},
                instance: null,
            }
        },

        created() {
            this.$eventBus.$on("createTokenReceipt", (event) => {
                this.updateFormField('fairlaunch', 'token', 'address', event.receipt.events.TokenCreated.returnValues.token);
                document.getElementById('createTokenModal').click();
            });
        },

        updated () {
        },

        computed: {
            ...mapState(['contracts', 'forms', 'wallet', 'web3']),
        },

        watch: {},

        methods: {
            catchSubmitEvent: function() {
                //Button are sending submit when click and I don't have time to fix that... So there is a catch on the form submit.
            },

            validateAndAdvance: async function() {
                const valid = await this.validate();
                if(valid) {
                    this.$emit('advance');
                }
            },

            validate: async function() {
                return await this.$refs.mgeStep0.validate();
            },

            updateFormField: async function(form, parent = null, field, value) {
                await this.$store.commit('forms/updateFormField', {form: form, parent: parent, field: field, value: value});
                if (field === 'address') {

                }
            },

            getTokenInfo: async function() {
                if (!this.forms.fairlaunch) {return;}
                this.flags.hasTokenInfo = false;
                this.flags.isLoading = true;
                this.error = null;
                this.updateFormField('fairlaunch', 'flags', 'isLoading', true);
                try {
                    this.instance = await new this.web3.instance.eth.Contract(ERC20, this.forms.fairlaunch.token.address);
                } catch(e) {
                    this.error = 'This contract doesn\'t exist.';
                    this.flags.hasTokenInfo = true;
                    this.flags.isLoading = false;
                    this.$emit('canShowFees', false);
                    return;
                }
                const isExisting = await this.$root.$children[0].doesPoolExist(this.forms.fairlaunch.token.address);
                if (isExisting) {
                    this.error = 'Token already used.';
                    this.flags.hasTokenInfo = true;
                    this.flags.isLoading = false;
                    this.$emit('canShowFees', false);
                    return;
                }
                this.flags.isValid = true;
                try {
                    this.updateFormField('fairlaunch', 'token', 'name', await this.instance.methods.name().call());
                    this.updateFormField('fairlaunch', 'token', 'symbol', await this.instance.methods.symbol().call());
                    this.updateFormField('fairlaunch', 'token', 'decimals', await this.instance.methods.decimals().call());
                    this.updateFormField('fairlaunch', 'token', 'allowance', await this.instance.methods.allowance(this.wallet.account, this.contracts.FairLaunchFactory.address).call());
                    this.updateFormField('fairlaunch', 'token', 'totalSupply', BigInt(await this.instance.methods.totalSupply().call()) / BigInt(Math.pow(10,this.forms.fairlaunch.token.decimals)));
                    this.$store.commit('wallet/setContractWeiBalance', {contract: this.forms.fairlaunch.token.symbol, balance: await this.instance.methods.balanceOf(this.wallet.account).call()});
                    this.$store.commit('wallet/setContractBalance', {contract: this.forms.fairlaunch.token.symbol, balance: Number(BigInt(this.wallet.weiBalances[this.forms.fairlaunch.token.symbol]) / BigInt(Math.pow(10,this.forms.fairlaunch.token.decimals)))});
                    this.$emit('canShowFees', true);
                } catch (error) {
                    console.log(error);
                }
                this.flags.hasTokenInfo = true;
                this.flags.isLoading = false;
            },

            approve: async function() {
				if (this.approves.fairlaunch.use === false) {
					this.approves.fairlaunch.use = true;
                    const contract = await new this.web3.instance.eth.Contract(ERC20, this.forms.fairlaunch.token.address);
					try {
						var response = await contract.methods.approve(this.contracts.FairLaunchFactory.address, MaxUint256).send( {from: this.wallet.account} );
					} catch (e) {
						console.log(e);
						this.approves.fairlaunch.use = false;
						return;
					}
					this.approves.fairlaunch.use = false;
                    this.updateFormField('fairlaunch', 'token', 'allowance', await contract.methods.allowance(this.wallet.account, this.contracts.FairLaunchFactory.address).call());
				}
            },

            resetInfos: function() {
                console.log('trigger');
            }
        },

        mounted() {
            this.$watch(
                () => {return this.$refs.fairlaunchForm_tokenAddress.flags.valid;},
                (value) => {
                    this.flags.isValid = value;
                    if (!value) {this.resetInfos();this.$emit('canShowFees', false);return;}
                    this.getTokenInfo();
                    // this.$store.commit('forms/updateFormFlagValue', {form: 'fairlaunch', flag: 'isValid', value: value});
                    // this.forceRender++;
                }
            );
        }
    }
</script>