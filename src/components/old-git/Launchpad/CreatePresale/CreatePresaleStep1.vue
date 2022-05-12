<template>
    <div class="card bg-gray-900 bg-opacity-70 text-white">
        <div class="card-body">
            <validation-observer ref="step1">
                <form @submit.prevent="catchSubmitEvent()">
                    <div class="row">
                        <div class="col-12">
                            <validation-provider    name="presale rate"
                                                    ref="presaleForm_rate"
                                                    rules="required|numeric"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Presale rate - Token contributors receive per {{options.presaleTypes[forms.presale.presaleType]}}</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.presale.rate" @input="updateFormField('presale', null, 'rate', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-3">
                                <label class="form-label">Whitelist</label>
                                <div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="whitelistEnable" v-model="checkboxes.whitelistEnable"/>
                                        <label class="form-check-label" for="whitelistEnable">Enable</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="whitelistDisable" v-model="checkboxes.whitelistDisable"/>
                                        <label class="form-check-label" for="whitelistDisable">Disable</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <validation-provider    name="softcap"
                                                    ref="presaleForm_softcap"
                                                    v-bind:rules="'required|double|softcap:' + forms.presale.hardCap"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">SoftCap ({{options.presaleTypes[forms.presale.presaleType]}})</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.presale.softCap" @input="updateFormField('presale', null, 'softCap', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-6">
                            <validation-provider    name="hardcap"
                                                    ref="presaleForm_hardcap"
                                                    v-bind:rules="'required|double|hardcap:' + forms.presale.softCap"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">HardCap ({{options.presaleTypes[forms.presale.presaleType]}})</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.presale.hardCap" @input="updateFormField('presale', null, 'hardCap', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <validation-provider    name="minimum buy"
                                                    ref="presaleForm_minBuy"
                                                    v-bind:rules="'required|double|max_value:' + forms.presale.maxBuy"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Minimum buy ({{options.presaleTypes[forms.presale.presaleType]}})</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.presale.minBuy" @input="updateFormField('presale', null, 'minBuy', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-6">
                            <validation-provider    name="maximum buy"
                                                    ref="presaleForm_maxBuy"
                                                    v-bind:rules="'required|double|min_value:' + forms.presale.minBuy"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Maximum buy ({{options.presaleTypes[forms.presale.presaleType]}})</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.presale.maxBuy" @input="updateFormField('presale', null, 'maxBuy', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <validation-provider    name="refund type"
                                                    ref="presaleForm_refund"
                                                    rules="required|oneOf:0,1"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Refund type</label>
                                    <select class="form-select form-select-lg" v-bind:value="forms.presale.refund" @input="updateFormField('presale', null, 'refund', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}">
                                        <option v-bind:value="null" class="d-none">Choose a refund type</option>
                                        <option v-for="(refund, index) in options.refunds" v-bind:value="index" v-bind:key="index">{{refund}}</option>
                                    </select>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-6">
                            <validation-provider    name="router"
                                                    ref="presaleForm_router"
                                                    rules="required|oneOf:1,2"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Router</label>
                                    <select class="form-select form-select-lg" v-bind:value="forms.presale.router" @input="updateFormField('presale', null, 'router', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}">
                                        <option v-bind:value="null" class="d-none">Choose a router</option>
                                        <option v-for="(router, index) in options.routers" v-bind:value="index" v-bind:key="index">{{router}}</option>
                                    </select>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <validation-provider    name="liquidity"
                                                    ref="presaleForm_liquidity"
                                                    rules="required|between:51,100"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Liquidity (%)</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.presale.liquidity" @input="updateFormField('presale', null, 'liquidity', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-6">
                            <validation-provider    name="listing rate"
                                                    ref="presaleForm_listingRate"
                                                    rules="required|numeric"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Listing rate - Tokens per {{options.presaleTypes[forms.presale.presaleType]}} at launch</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.presale.listingRate" @input="updateFormField('presale', null, 'listingRate', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-3">
                                <label class="form-label">Start date (UTC)</label>
                                <b-input-group>
                                    <b-form-datepicker v-model="startDate" size="lg" :state="startDateState" locale="en" @context="onContextDate"></b-form-datepicker>
                                    <b-form-timepicker v-model="startTime" size="lg" :state="startDateState" locale="en" :minutes-step="15"></b-form-timepicker>
                                </b-input-group>
                                <span class="text-warning" v-bind:class="{'d-none': dateError.startTime === null}">{{ dateError.startTime }}</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label class="form-label">End date (UTC)</label>
                                <b-input-group>
                                    <b-form-datepicker v-model="endDate" size="lg" :state="endDateState" locale="en" @context="onContextDate"></b-form-datepicker>
                                    <b-form-timepicker v-model="endTime" size="lg" :state="endDateState" locale="en" :minutes-step="15"></b-form-timepicker>
                                </b-input-group>
                                <span class="text-warning" v-bind:class="{'d-none': dateError.startTime === null}">{{ dateError.endTime }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <validation-provider    name="liquidity lock time"
                                                    ref="presaleForm_liquidityLock"
                                                    rules="required|numeric|min_value:30"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Liquidity lockup (minutes)</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.presale.liquidityLock" @input="updateFormField('presale', null, 'liquidityLock', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <label class="form-label">Options</label>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="isVestingContributor" v-model="checkboxes.isVestingContributor"/>
                                <label class="form-check-label" for="isVestingContributor">Contributor Vesting</label>
                            </div>
                        </div>
                    </div>
                    <div class="row my-3 border-bottom" v-if="forms.presale.isVestingContributor">
                        <div class="col-12 col-xl-4">
                            <validation-provider    name="contributors initial percentage release"
                                                    ref="presaleForm_vestingContributorFirstPercentageRelease"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Initial percentage release</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 40" v-bind:value="forms.presale.vestingContributorFirstPercentageRelease" @input="updateFormField('presale', null, 'vestingContributorFirstPercentageRelease', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-xl-4">
                            <validation-provider    name="contributors minutes per cycle"
                                                    ref="presaleForm_vestingContributorCycleMinutes"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Minutes per cycle</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 5" v-bind:value="forms.presale.vestingContributorCycleMinutes" @input="updateFormField('presale', null, 'vestingContributorCycleMinutes', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-xl-4">
                            <validation-provider    name="contributors percentage release per cycle"
                                                    ref="presaleForm_vestingContributorCyclePercentage"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Percentage release per cycle</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 10" v-bind:value="forms.presale.vestingContributorCyclePercentage" @input="updateFormField('presale', null, 'vestingContributorCyclePercentage', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="isVestingTeam" v-model="checkboxes.isVestingTeam"/>
                                <label class="form-check-label" for="isVestingTeam">Project Team Vesting</label>
                            </div>
                        </div>
                    </div>
                    <div class="row my-3" v-if="forms.presale.isVestingTeam">
                        <div class="col-12 col-xl-6">
                            <validation-provider    name="total team vesting tokens"
                                                    ref="presaleForm_vestingTeamTotalTokens"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Total team vesting tokens</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 10000" v-bind:value="forms.presale.vestingTeamTotalTokens" @input="updateFormField('presale', null, 'vestingTeamTotalTokens', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-xl-6">
                            <validation-provider    name="minutes before first release"
                                                    ref="presaleForm_vestingTeamMinutesRelease"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Minutes before first release</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 40" v-bind:value="forms.presale.vestingTeamMinutesRelease" @input="updateFormField('presale', null, 'vestingTeamMinutesRelease', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-xl-4">
                            <validation-provider    name="team initial percentage release"
                                                    ref="presaleForm_vestingTeamFirstPercentageRelease"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Initial percentage release</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 40" v-bind:value="forms.presale.vestingTeamFirstPercentageRelease" @input="updateFormField('presale', null, 'vestingTeamFirstPercentageRelease', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-xl-4">
                            <validation-provider    name="team minutes per cycle"
                                                    ref="presaleForm_vestingTeamCycleMinutes"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Minutes per cycle</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 5" v-bind:value="forms.presale.vestingTeamCycleMinutes" @input="updateFormField('presale', null, 'vestingTeamCycleMinutes', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-xl-4">
                            <validation-provider    name="team percentage release per cycle"
                                                    ref="presaleForm_vestingTeamCyclePercentage"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Percentage release per cycle</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 10" v-bind:value="forms.presale.vestingTeamCyclePercentage" @input="updateFormField('presale', null, 'vestingTeamCyclePercentage', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-4">
                            <button class="btn btn-secondary text-dark w-100" v-on:click="$emit('previous');">PREVIOUS</button>
                        </div>
                        <div class="col-4"></div>
                        <div class="col-4">
                            <button class="btn btn-primary text-dark w-100" v-on:click="validateAndAdvance">NEXT</button>
                        </div>
                    </div>
                </form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import moment from 'moment';
    const refunds = require('../../../../forms/Refunds');
    const routers = require('../../../../forms/Routers');
    const presaleTypes = require('../../../../forms/PresaleTypes');

    export default {
        props: {
            factory: {},
            secondFactory: {}
        },

        data() {

            return {
                startDate:'',
                startTime:'',
                endDate:'',
                endTime:'',
                startDateState: null,
                endDateState: null,
                forceRender: 0,
                checkboxes: {
                    whitelistEnable: false,
                    whitelistDisable: true,
                    isVestingContributor: false,
                    isVestingTeam: false
                },
                options: {
                    refunds: refunds,
                    routers: routers,
                    presaleTypes: presaleTypes,
                },
                dateError: {
                    startTime: null,
                    endTime: null
                }
            }
        },

        created() {
        },

        updated () {
        },

        computed: {
            ...mapState(['contracts', 'forms', 'wallet', 'web3']),
        },

        watch: {
            "checkboxes.whitelistEnable": function(newVal, oldVal) {this.updateFormField('presale', null, 'whitelistEnable', newVal);},
            "checkboxes.whitelistDisable": function(newVal, oldVal) {this.updateFormField('presale', null, 'whitelistDisable', newVal);},
            "checkboxes.isVestingContributor": function(newVal, oldVal) {this.updateFormField('presale', null, 'isVestingContributor', newVal);},
            "checkboxes.isVestingTeam": function(newVal, oldVal) {this.updateFormField('presale', null, 'isVestingTeam', newVal);},
            "startDate": function(newVal, oldVal) {this.contructDate('start');},
            "startTime": function(newVal, oldVal) {this.contructDate('start');},
            "endDate": function(newVal, oldVal) {this.contructDate('end');},
            "endTime": function(newVal, oldVal) {this.contructDate('end');}
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
                let valid = await this.$refs.step1.validate();
                if (!this.validateDateTime('start')) {valid = false;}
                if (!this.validateDateTime('end')) {valid = false;}
                return valid;
            },

            updateFormField: async function(form, parent = null, field, value) {
                await this.$store.commit('forms/updateFormField', {form: form, parent: parent, field: field, value: value});
                if (field === 'whitelistEnable') {this.checkboxes.whitelistDisable = !value; await this.$store.commit('forms/updateFormField', {form: form, parent: parent, field: 'whitelistDisable', value: !value});}
                if (field === 'whitelistDisable') {this.checkboxes.whitelistEnable = !value; await this.$store.commit('forms/updateFormField', {form: form, parent: parent, field: 'whitelistEnable', value: !value});}
                if (["rate", "listingRate", "softCap", "hardCap", "liquidity", "vestingTeamTotalTokens"].includes(field)) {
                    const _rateSettings = [
                        '0x' + (this.forms.presale.rate * Math.pow(10, this.forms.presale.token.decimals)).toString(16),
                        '0x' + (this.forms.presale.listingRate * Math.pow(10, this.forms.presale.token.decimals)).toString(16)
                    ];
                    const _capSettings = [
                        '0x' + (this.forms.presale.softCap * Math.pow(10, 18)).toString(16),
                        '0x' + (this.forms.presale.hardCap * Math.pow(10, 18)).toString(16)
                    ];
                    const _liquidityPercent = this.forms.presale.liquidity / 1;
                    const _teamtoken = (this.checkboxes.isVestingTeam === true) ?
                                        '0x' + (this.forms.presale.vestingTeamTotalTokens * Math.pow(10, this.forms.presale.token.decimals)).toString(16) :
                                        0;
                    let receipt = await this.factory.instance.methods.estimateTokenAmount(
                                            _rateSettings,
                                            _capSettings,
                                            _liquidityPercent,
                                            _teamtoken
                                        ).call();

                    await this.$store.commit('forms/updateFormField', {form: form, parent: null, field: "estimateTokens", value: receipt / Math.pow(10, this.forms.presale.token.decimals)});
                }
            },

            validateDateTime: function(which) {
                if (this.forms.presale[which + 'Time'] === null) {this.dateError[which + 'Time'] = 'The ' + which + ' date can\'t be empty.';this[which + 'DateState'] = false;return false;}
                if (moment(this.forms.presale[which + 'Time']).unix() < moment.utc().unix()) {this.dateError[which + 'Time'] = 'The ' + which + ' date must be greater than current UTC time.';this[which + 'DateState'] = false;return false;}
                this.dateError[which + 'Time'] = null;
                return true;
            },

            contructDate: async function(which) {
                if (this[which + 'Date'] === '') {return;}
                if (this[which + 'Time'] === '') {return;}
                if (this[which + 'Date'] === false) {return;}
                if (this[which + 'Time'] === false) {return;}
                this[which + 'DateState'] = null;

                const date = this[which + 'Date'].split('-');
                const time = this[which + 'Time'].split(':');

                await this.updateFormField('presale', null, which + 'Time', new Date(Date.UTC(date[0], (date[1] / 1 - 1), date[2], time[0], time[1], 0)));
                this.validateDateTime(which);
            },

            onContextDate(ctx) {
                // The date formatted in the locale, or the `label-no-date-selected` string
                this.formatted = ctx.selectedFormatted;
                // The following will be an empty string until a valid date is entered
                this.selected = ctx.selectedYMD;
            },

            onContextTime(ctx) {
                this.context = ctx;
            },
        },

        mounted() {
        }
    }
</script>