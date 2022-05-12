<template>
    <div class="card bg-gray-900 bg-opacity-70 text-white">
        <div class="card-body" :key="forceRender">
            <validation-observer ref="step0">
                <form @submit.prevent="catchSubmitEvent()">
                    <div class="row">
                        <div class="col-12 col-lg-8">
                            <validation-provider    name="token address"
                                                    ref="presaleForm_tokenAddress"
                                                    :rules="{ required: true, regex: /^0x[a-fA-F0-9]{40}$/ }"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Token Address</label><button id="createTokenModal" class="btn btn-xs btn-secondary btn-block text-dark float-end" style="min-width:200px; margin-top:-5px;" data-bs-toggle="modal" data-bs-target="#createToken">Create token</button>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 0x8173ccc721111b5a93ce7fa6fec0fc077b58b1b7" v-bind:value="forms.presale.token.address" @input="updateFormField('presale', 'token', 'address', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-lg-4">
                            <validation-provider    name="presale type"
                                                    ref="presaleForm_presaleType"
                                                    rules="required|oneOf:0,1"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Presale type</label>
                                    <select class="form-select form-select-lg" v-bind:value="forms.presale.presaleType" @input="updateFormField('presale', null, 'presaleType', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}">
                                        <option v-bind:value="null" class="d-none">Choose a presale type</option>
                                        <option v-for="(presale, index) in options.presaleTypes" v-bind:value="index" v-bind:key="index">{{presale}}</option>
                                    </select>
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
                                        <div class="col-6 text-end">
                                            {{forms.presale.token.name}}
                                        </div>
                                    </div>
                                    <div class="row pb-2 mb-2 border-bottom border-gray">
                                        <div class="col-6">
                                            Symbol
                                        </div>
                                        <div class="col-6 text-end">
                                            {{forms.presale.token.symbol}}
                                        </div>
                                    </div>
                                    <div class="row pb-2 mb-2 border-bottom border-gray">
                                        <div class="col-6">
                                            Total Supply
                                        </div>
                                        <div class="col-6 text-end">
                                            {{forms.presale.token.totalSupply}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            Decimals
                                        </div>
                                        <div class="col-6 text-end">
                                            {{forms.presale.token.decimals}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 align-bottom" v-if="flags.hasTokenInfo && this.forms.presale.presaleType > 0">
                            <button v-if="!(forms.presale !== undefined && forms.presale.token.allowance > 0)" class="btn btn-info text-dark w-100" v-on:click="approve()">{{(approves.presale.use === true) ? 'PROCESSING...' : 'APPROVE'}}</button>
                            <button v-if="forms.presale !== undefined && forms.presale.token.allowance > 0" class="btn btn-primary text-dark w-100" v-on:click="validateAndAdvance()">NEXT</button>
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
    const presaleTypes = require('../../../../forms/PresaleTypes');

    export default {
        name: 'CreatePresaleStep0',
        props: {
            factory: {},
            secondFactory: {}
        },
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
                    presale: {
                        message: '',
                        use: false,
                    }
				},
                options: {
                    presaleTypes: presaleTypes,
                },
                instance: {}
            }
        },

        created() {
            this.$eventBus.$on("createTokenReceipt", (event) => {
                console.log(event);
                this.updateFormField('presale', 'token', 'address', event.receipt.events.TokenCreated.returnValues.token);
                if (document.getElementById('createTokenModal')) {
                    document.getElementById('createTokenModal').click();
                }
            });
        },

        updated () {
        },

        computed: {
            ...mapState(['contracts', 'forms', 'wallet', 'web3']),
        },

        watch: {
            "forms.presale.presaleType": function(newVal, oldVal) {
                this.flags.hasTokenInfo = false;
                this.getTokenInfo();
            }
        },

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
                return await this.$refs.step0.validate();
            },

            updateFormField: async function(form, parent = null, field, value) {
                await this.$store.commit('forms/updateFormField', {form: form, parent: parent, field: field, value: value});
            },

            getTokenInfo: async function() {
                console.log('getTokenInfo');
                if (!this.forms.presale) {return;}
                if (!this.forms.presale.presaleType) {return;}
                if (!this.forms.presale.presaleType > 0) {return;}
                console.log('getTokenInfo: 2');
                this.flags.hasTokenInfo = false;
                this.flags.isLoading = true;
                this.error = null;
                this.updateFormField('presale', 'flags', 'isLoading', true);
                try {
                    this.instance = await new this.web3.instance.eth.Contract(ERC20, this.forms.presale.token.address);
                } catch(e) {
                    this.error = 'This contract doesn\'t exist.';
                    this.flags.hasTokenInfo = true;
                    this.flags.isLoading = false;
                    this.$emit('canShowFees', false);
                    return;
                }
                console.log(this.factory);
                console.log('getTokenInfo: 3');
                const isExisting = await this.$root.$children[0].doesPoolExist(this.forms.presale.token.address);
                if (isExisting) {
                    this.error = 'Token already used.';
                    this.flags.hasTokenInfo = true;
                    this.flags.isLoading = false;
                    this.$emit('canShowFees', false);
                    return;
                }
                this.flags.isValid = true;
                try {
                    this.updateFormField('presale', 'token', 'name', await this.instance.methods.name().call());
                    this.updateFormField('presale', 'token', 'symbol', await this.instance.methods.symbol().call());
                    this.updateFormField('presale', 'token', 'decimals', await this.instance.methods.decimals().call());
                    this.updateFormField('presale', 'token', 'allowance', await this.instance.methods.allowance(this.wallet.account, this.factory.address).call());
                    this.updateFormField('presale', 'token', 'totalSupply', BigInt(await this.instance.methods.totalSupply().call()) / BigInt(Math.pow(10,this.forms.presale.token.decimals)));
                    this.$store.commit('wallet/setContractWeiBalance', {contract: this.forms.presale.token.symbol, balance: await this.instance.methods.balanceOf(this.wallet.account).call()});
                    this.$store.commit('wallet/setContractBalance', {contract: this.forms.presale.token.symbol, balance: BigInt(this.wallet.weiBalances[this.forms.presale.token.symbol]) / BigInt(Math.pow(10,this.forms.presale.token.decimals))});
                    this.$emit('setUserBalance', this.wallet.balances[this.forms.presale.token.symbol]);
                    this.$emit('canShowFees', true);
                } catch (error) {
                    console.log(error);
                }
                this.flags.hasTokenInfo = true;
                this.flags.isLoading = false;
                this.getAllowance();
            },

            approve: async function() {
				if (this.approves.presale.use === false) {
					this.approves.presale.use = true;
					try {
						var response = await this.instance.methods.approve(this.factory.address, MaxUint256).send( {from: this.wallet.account} );
					} catch (e) {
						console.log(e);
						this.approves.presale.use = false;
						return;
					}
                    this.getAllowance();
					this.approves.presale.use = false;
				}
            },

            getAllowance: async function() {
                if (!this.forms.presale) {return;}
                if (!this.forms.presale.presaleType) {return;}
                if (!this.forms.presale.presaleType > 0) {return;}
                this.updateFormField('presale', 'token', 'allowance', await this.instance.methods.allowance(this.wallet.account, this.factory.address).call());
            },

            resetInfos: function() {
                
            }
        },

        mounted() {
            this.$watch(
                () => {return this.$refs.presaleForm_tokenAddress.flags.valid;},
                (value) => {
                    this.flags.isValid = value;
                    if (!value) {this.resetInfos();this.$emit('canShowFees', false);return;}
                    this.getTokenInfo();
                }
            );
        }
    }
</script>