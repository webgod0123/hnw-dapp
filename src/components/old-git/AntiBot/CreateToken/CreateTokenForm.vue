<template>
    <div v-if="forms.token !== undefined">
        <validation-observer ref="createTokenForm">
            <form @submit.prevent="catchSubmitEvent()">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-12">
                                        <validation-provider  name="type"
                                                            ref="tokenForm_type"
                                                            rules="required|oneOf:1,2,3,4"
                                                            v-slot="{ errors }">
                                            <div class="mb-3">
                                                <label class="form-label">Token type</label>
                                                <select class="form-select form-select-lg" v-bind:value="forms.token.type" @input="updateFormField('token', null, 'type', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}">
                                                    <option v-bind:value="null" class="d-none">Choose which token you want to create</option>
                                                    <option v-for="(token, index) in options.types" v-bind:value="index" v-bind:key="index">{{token}}</option>
                                                </select>
                                                <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                            </div>
                                        </validation-provider>
                                    </div>
                                </div>
                                <div v-if="forms.token.type > 0">
                                    <div class="row">
                                        <div class="col-12">
                                            <validation-provider    name="name"
                                                                    ref="tokenForm_name"
                                                                    v-bind:rules="'required'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Name</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: Ethereum" v-bind:value="forms.token.name" @input="updateFormField('token', null, 'name', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12" v-bind:class="{'col-lg-6': ['1'].includes(forms.token.type)}">
                                            <validation-provider    name="symbol"
                                                                    ref="tokenForm_symbol"
                                                                    v-bind:rules="'required|alpha_num'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Symbol</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: ETH" v-bind:value="forms.token.symbol" @input="updateFormField('token', null, 'symbol', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                        <div class="col-6" v-if="['1'].includes(forms.token.type)">
                                            <validation-provider    name="decimals"
                                                                    ref="tokenForm_decimals"
                                                                    v-bind:rules="'required|numeric|max_value:18|min_value:0'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Decimals</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 18" v-bind:value="forms.token.decimals" @input="updateFormField('token', null, 'decimals', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <validation-provider    name="totalSupply"
                                                                    ref="tokenForm_totalSupply"
                                                                    v-bind:rules="'required|numeric|min_value:0'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Total supply</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 100000000" v-bind:value="forms.token.totalSupply" @input="updateFormField('token', null, 'totalSupply', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row" v-if="['2','3', '4'].includes(forms.token.type)">
                                        <div class="col-12">
                                            <validation-provider    name="router"
                                                                    ref="tokenForm_router"
                                                                    v-bind:rules="'required|oneOf:1,2'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Router</label>
                                                    <select class="form-select form-select-lg" v-bind:value="forms.token.router" @input="updateFormField('token', null, 'router', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}">
                                                        <option v-bind:value="null" class="">Choose a router</option>
                                                        <option v-for="(router, index) in options.routers" v-bind:value="index" v-bind:key="index">{{router}}</option>
                                                    </select>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row" v-if="['2'].includes(forms.token.type)">
                                        <div class="col-6">
                                            <validation-provider    name="yieldFee"
                                                                    ref="tokenForm_yieldFee"
                                                                    v-bind:rules="'required|numeric'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Reflection percentage (%)</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 1" v-bind:value="forms.token.yieldFee" @input="updateFormField('token', null, 'yieldFee', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                        <div class="col-6">
                                            <validation-provider    name="liquidityFee"
                                                                    ref="tokenForm_liquidityFee"
                                                                    v-bind:rules="'required|numeric'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Liquidity fee (%)</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 1" v-bind:value="forms.token.liquidityFee" @input="updateFormField('token', null, 'liquidityFee', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row" v-if="['3'].includes(forms.token.type)">
                                        <div class="col-6">
                                            <validation-provider    name="rewardToken"
                                                                    ref="tokenForm_rewardToken"
                                                                    v-bind:rules="{ required: true, regex: /^0x[a-fA-F0-9]{40}$/ }"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Reward token</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 0x..." v-bind:value="forms.token.rewardToken" @input="updateFormField('token', null, 'rewardToken', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                        <div class="col-6">
                                            <validation-provider    name="minTokenHold"
                                                                    ref="tokenForm_minTokenHold"
                                                                    v-bind:rules="'required|numeric'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Minimum token balance for rewards</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 1000" v-bind:value="forms.token.minTokenHold" @input="updateFormField('token', null, 'minTokenHold', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row" v-if="['3'].includes(forms.token.type)">
                                        <div class="col-6">
                                            <validation-provider    name="rewardFee"
                                                                    ref="tokenForm_rewardFee"
                                                                    v-bind:rules="'required|numeric'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Token reward fee (%)</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 1" v-bind:value="forms.token.rewardFee" @input="updateFormField('token', null, 'rewardFee', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                        <div class="col-6">
                                            <validation-provider    name="liquidityFee"
                                                                    ref="tokenForm_liquidityFee"
                                                                    v-bind:rules="'required|numeric'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Liquidity fee (%)</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 1" v-bind:value="forms.token.liquidityFee" @input="updateFormField('token', null, 'liquidityFee', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row" v-if="['2', '3'].includes(forms.token.type)">
                                        <div v-bind:class="{'col-md-6 order-2': ['3'].includes(forms.token.type)}">
                                            <validation-provider    name="marketingWallet"
                                                                    ref="tokenForm_marketingWallet"
                                                                    v-bind:rules="{ required: true, regex: /^0x[a-fA-F0-9]{40}$/ }"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Marketing address</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 0x..." v-bind:value="forms.token.marketingWallet" @input="updateFormField('token', null, 'marketingWallet', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                        <div v-bind:class="{'col-md-6 order-1': ['3'].includes(forms.token.type)}">
                                            <validation-provider    name="marketingFee"
                                                                    ref="tokenForm_marketingFee"
                                                                    v-bind:rules="'required|numeric'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Marketing fee (%)</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 1" v-bind:value="forms.token.marketingFee" @input="updateFormField('token', null, 'marketingFee', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row" v-if="['4'].includes(forms.token.type)">
                                        <div class="col-6">
                                            <validation-provider    name="rewardToken"
                                                                    ref="tokenForm_rewardToken"
                                                                    v-bind:rules="{ required: true, regex: /^0x[a-fA-F0-9]{40}$/ }"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Reward token</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 0x..." v-bind:value="forms.token.rewardToken" @input="updateFormField('token', null, 'rewardToken', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                        <div class="col-6">
                                            <validation-provider    name="liquidityFee"
                                                                    ref="tokenForm_liquidityFee"
                                                                    v-bind:rules="'required|numeric'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Liquidity fee (%)</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 1" v-bind:value="forms.token.liquidityFee" @input="updateFormField('token', null, 'liquidityFee', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row" v-if="['4'].includes(forms.token.type)">
                                        <div class="col-6">
                                            <validation-provider    name="buybackFee"
                                                                    ref="tokenForm_buybackFee"
                                                                    v-bind:rules="'required|numeric'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Buyback Fee (%)</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 1" v-bind:value="forms.token.buybackFee" @input="updateFormField('token', null, 'buybackFee', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                        <div class="col-6">
                                            <validation-provider    name="reflectionFee"
                                                                    ref="tokenForm_reflectionFee"
                                                                    v-bind:rules="'required|numeric'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Rewards fee (%)</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 1" v-bind:value="forms.token.reflectionFee" @input="updateFormField('token', null, 'reflectionFee', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row" v-if="['4'].includes(forms.token.type)">
                                        <div class="col-12">
                                            <validation-provider    name="marketingFee"
                                                                    ref="tokenForm_marketingFee"
                                                                    v-bind:rules="'required|numeric'"
                                                                    v-slot="{ errors }">
                                                <div class="mb-3">
                                                    <label class="form-label">Marketing fee (%)</label>
                                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 1" v-bind:value="forms.token.marketingFee" @input="updateFormField('token', null, 'marketingFee', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="mb-3">
                                                <label class="form-label">Options</label>
                                                <div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="hasAntiBotSystem" v-model="checkboxes.hasAntiBotSystem"/>
                                                        <label class="form-check-label" for="hasAntiBotSystem">Implements Anti-Bot System?</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row justify-content-center">
                                        <div class="col-12 col-md-6">
                                            <button v-if="checkboxes.hasAntiBotSystem" class="btn btn-info float-end text-dark fs-3 col-4 w-100" v-on:click="createTokenFn">{{(pending) ? 'Processing...' : 'Create Token'}}</button>
                                            <button v-else class="btn btn-info float-end text-dark fs-3 col-4 w-100 disabled" >Create Token</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </validation-observer>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    const TokenTypes = require("../../../../forms/AntiBotTokenTypes");
    const Routers = require("../../../../forms/Routers");
    const contractsAddresses = require('../../../../contracts/contractsAddresses.json');
    const routersAddresses = require('../../../../contracts/routersAddresses.json');

    export default {
    data() {
        return {
            hobbs: {
                isFocus: false,
                step: "name",
            },
            requiredContracts: [
                "AntiBotStandardTokenFactory",
                "AntiBotLiquidityGeneratorTokenFactory",
                "AntiBotBabyTokenFactory",
                "AntiBotBuyBackBabyTokenFactory",
            ],
            requiredPairs: [],
            requiredForms: ["token"],
            options: {
                types: TokenTypes,
                routers: Routers,
            },
            contractsAddresses: contractsAddresses,
            routersAddresses: routersAddresses,
            checkboxes: {
                hasAntiBotSystem: true,
            },
            pending: false,
            fees: 0,
        };
    },

    created() {},

    updated() {},

    computed: {
        ...mapState(["contracts", "forms", "session", "wallet", "web3"])
    },

    watch: {
        "session.isConnected": function (newVal, oldVal) {
            if (newVal === true && oldVal === false) {
                this.initiate();
            }
        },

        "checkboxes.hasAntiBotSystem": function (newVal, oldVal) {
            this.updateFormField("token", null, "hasAntiBotSystem", newVal);
            this.getFees();
        },

        "forms.token.type": function(newVal, oldVal) {
            if (newVal == 1) {this.updateFormField('token', null, 'decimals', null);}
            if (newVal == 2) {this.updateFormField('token', null, 'decimals', 9);}
            if (newVal == 3) {this.updateFormField('token', null, 'decimals', 18);}
            if (newVal == 4) {this.updateFormField('token', null, 'decimals', 9);}
            this.getFees();
        }
    },

    methods: {
        initiate: function () {
            this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
                "getRequiredContracts",
                this.requiredContracts
            );
            this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
                "getRequiredPairs",
                this.requiredPairs
            );
            this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
                "getRequiredForms",
                this.requiredForms
            );
        },

        getFees: async function() {
            if (this.forms.token.type == 1 && this.checkboxes.hasAntiBotSystem) {this.fees = this.web3.instance.utils.fromWei(await this.contracts.AntiBotStandardTokenFactory.instance.methods.flatFee().call());}
            if (this.forms.token.type == 2 && this.checkboxes.hasAntiBotSystem) {this.fees = this.web3.instance.utils.fromWei(await this.contracts.AntiBotLiquidityGeneratorTokenFactory.instance.methods.flatFee().call());}
            if (this.forms.token.type == 3 && this.checkboxes.hasAntiBotSystem) {this.fees = this.web3.instance.utils.fromWei(await this.contracts.AntiBotBabyTokenFactory.instance.methods.flatFee().call());}
            if (this.forms.token.type == 4 && this.checkboxes.hasAntiBotSystem) {this.fees = this.web3.instance.utils.fromWei(await this.contracts.AntiBotBuyBackBabyTokenFactory.instance.methods.flatFee().call());}
        },

        setFocus: function (focus) {
            this.hobbs.isFocus = focus;
        },

        updateFormField: async function (form, parent = null, field, value) {
            await this.$store.commit("forms/updateFormField", {
                form: form,
                parent: parent,
                field: field,
                value: value,
            });
        },

        catchSubmitEvent: function() {
        },
        
        createTokenFn: async function () {
            if (this.wallet.account === null) {return;}
            if (!await this.$refs.createTokenForm.validate()) {return;}//Validate that all the field pass the restriction
            try {
                this.pending = true;
                let temp = "0x" + (BigInt(this.forms.token.totalSupply) * BigInt(Math.pow(10,this.forms.token.decimals))).toString(16);
                let receipt;
                console.log(this.forms.token.decimals);
                switch (this.forms.token.type / 1) {
                case 1:
                    receipt =
                        await this.contracts.AntiBotStandardTokenFactory.instance.methods
                        .create(
                            this.forms.token.name,
                            this.forms.token.symbol,
                            this.forms.token.decimals,
                            temp,
                            "0x2a94f63f00f2898F954868a885C27bD3174172AC"
                        )
                        .send({
                            from: this.wallet.account,
                            value: this.web3.instance.utils.toWei(this.fees),
                        });
                    break;
                case 2:
                    receipt =
                        await this.contracts.AntiBotLiquidityGeneratorTokenFactory.instance.methods
                        .create(
                            this.forms.token.name,
                            this.forms.token.symbol,
                            temp,
                            this.routersAddresses[this.forms.token.router][this.web3.networkId],
                            this.forms.token.marketingWallet,
                            this.forms.token.yieldFee,
                            this.forms.token.liquidityFee,
                            this.forms.token.marketingFee,
                            "0x2a94f63f00f2898F954868a885C27bD3174172AC"
                        )
                        .send({
                            from: this.wallet.account,
                            value: this.web3.instance.utils.toWei(this.fees),
                        });
                    break;
                case 3:
                    receipt =
                        await this.contracts.AntiBotBabyTokenFactory.instance.methods
                        .create(
                            this.forms.token.name,
                            this.forms.token.symbol,
                            temp,
                            [
                            this.forms.token.rewardToken,
                            this.routersAddresses[this.forms.token.router][this.web3.networkId],
                            this.forms.token.marketingWallet,
                            "0xC2a5ea1d4406EC5fdd5eDFE0E13F59124C7e9803",
                            "0x2a94f63f00f2898F954868a885C27bD3174172AC",
                            ],
                            [
                            this.forms.token.rewardFee,
                            this.forms.token.liquidityFee,
                            this.forms.token.marketingFee,
                            ],
                            this.forms.token.minTokenHold
                        )
                        .send({
                            from: this.wallet.account,
                            value: this.web3.instance.utils.toWei(this.fees),
                        });
                    break;
                case 4:
                    receipt =
                        await this.contracts.AntiBotBuyBackBabyTokenFactory.instance.methods
                        .create(
                            this.forms.token.name,
                            this.forms.token.symbol,
                            temp,
                            this.forms.token.rewardToken,
                            this.routersAddresses[this.forms.token.router][this.web3.networkId],
                            "0x2a94f63f00f2898F954868a885C27bD3174172AC",
                            [
                            this.forms.token.liquidityFee,
                            this.forms.token.buybackFee,
                            this.forms.token.reflectionFee,
                            this.forms.token.marketingFee,
                            50, //feeDenominator
                            ]
                        )
                        .send({
                            from: this.wallet.account,
                            value: this.web3.instance.utils.toWei(this.fees),
                        });
                    break;
                default:
                    break;
                }
                // receipt = receipt.events;
                console.log("token address = ", receipt.events.TokenCreated.returnValues.token);
                // console.log(receipt);
                this.$eventBus.$emit('createTokenReceipt', {receipt: receipt, infos: this.forms.token});
                this.$eventBus.$emit('tokenModalClose');
                this.pending = false;
            } catch (error) {
                this.pending = false;
                console.log(error);
            }
        },
    },

    mounted() {
        this.initiate();
    },
    };
</script>
