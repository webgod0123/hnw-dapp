<template>
    <div class="card bg-gray-900 bg-opacity-70 text-white">
        <div class="card-body">
            <validation-observer ref="step1">
                <form @submit.prevent="catchSubmitEvent()">
                    <div class="row">
                        <div class="col-12">
                            <validation-provider    name="total tokens available for MGE"
                                                    ref="fairlaunchForm_sellingAmount"
                                                    rules="required|numeric"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Total Tokens Available for MGE</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.fairlaunch.sellingAmount" @input="updateFormField('fairlaunch', null, 'sellingAmount', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <validation-provider    name="softcap"
                                                    ref="fairlaunchForm_softcap"
                                                    v-bind:rules="'required|numeric'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">SoftCap (BNB)</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.fairlaunch.softCap" @input="updateFormField('fairlaunch', null, 'softCap', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <validation-provider    name="router"
                                                    ref="fairlaunchForm_router"
                                                    rules="required|oneOf:1,2"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Router</label>
                                    <select class="form-select form-select-lg" v-bind:value="forms.fairlaunch.router" @input="updateFormField('fairlaunch', null, 'router', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}">
                                        <option v-bind:value="null" class="d-none">Choose a router</option>
                                        <option v-for="(router, index) in options.routers" v-bind:value="index" v-bind:key="index">{{router}}</option>
                                    </select>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <validation-provider    name="liquidity"
                                                    ref="fairlaunchForm_liquidity"
                                                    rules="required|between:51,100"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Liquidity (%)</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.fairlaunch.liquidity" @input="updateFormField('fairlaunch', null, 'liquidity', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
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
                                                    ref="fairlaunchForm_liquidityLock"
                                                    rules="required|numeric|min_value:5"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Liquidity lockup (minutes)</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="" v-bind:value="forms.fairlaunch.liquidityLock" @input="updateFormField('fairlaunch', null, 'liquidityLock', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <label class="form-label">Options</label>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="isVestingTeam" v-model="checkboxes.isVestingTeam"/>
                                <label class="form-check-label" for="isVestingTeam">Using team vesting?</label>
                            </div>
                        </div>
                    </div>
                    <div class="row my-3" v-if="forms.fairlaunch.isVestingTeam">
                        <div class="col-12 col-xl-6">
                            <validation-provider    name="total team vesting tokens"
                                                    ref="fairlaunchForm_vestingTeamTotalTokens"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Total team vesting tokens</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 10000" v-bind:value="forms.fairlaunch.vestingTeamTotalTokens" @input="updateFormField('fairlaunch', null, 'vestingTeamTotalTokens', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-xl-6">
                            <validation-provider    name="minutes before first release"
                                                    ref="fairlaunchForm_vestingTeamMinutesRelease"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Minutes before first release</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 40" v-bind:value="forms.fairlaunch.vestingTeamMinutesRelease" @input="updateFormField('fairlaunch', null, 'vestingTeamMinutesRelease', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-xl-4">
                            <validation-provider    name="team initial percentage release"
                                                    ref="fairlaunchForm_vestingTeamFirstPercentageRelease"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Initial percentage release</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 40" v-bind:value="forms.fairlaunch.vestingTeamFirstPercentageRelease" @input="updateFormField('fairlaunch', null, 'vestingTeamFirstPercentageRelease', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-xl-4">
                            <validation-provider    name="team minutes per cycle"
                                                    ref="fairlaunchForm_vestingTeamCycleMinutes"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Minutes per cycle</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 5" v-bind:value="forms.fairlaunch.vestingTeamCycleMinutes" @input="updateFormField('fairlaunch', null, 'vestingTeamCycleMinutes', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
                                    <span v-bind:class="{'invalid-feedback': errors[0] !== undefined}">{{ errors[0] }}</span>
                                </div>
                            </validation-provider>
                        </div>
                        <div class="col-12 col-xl-4">
                            <validation-provider    name="team percentage release per cycle"
                                                    ref="fairlaunchForm_vestingTeamCyclePercentage"
                                                    v-bind:rules="'required|numeric|min_value:1'"
                                                    v-slot="{ errors }">
                                <div class="mb-3">
                                    <label class="form-label">Percentage release per cycle</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Ex: 10" v-bind:value="forms.fairlaunch.vestingTeamCyclePercentage" @input="updateFormField('fairlaunch', null, 'vestingTeamCyclePercentage', $event.target.value)" v-bind:class="{'is-invalid': errors[0] !== undefined}"/>
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

    export default {
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
            "checkboxes.whitelistEnable": function(newVal, oldVal) {this.updateFormField('fairlaunch', null, 'whitelistEnable', newVal);},
            "checkboxes.whitelistDisable": function(newVal, oldVal) {this.updateFormField('fairlaunch', null, 'whitelistDisable', newVal);},
            "checkboxes.isVestingContributor": function(newVal, oldVal) {this.updateFormField('fairlaunch', null, 'isVestingContributor', newVal);},
            "checkboxes.isVestingTeam": function(newVal, oldVal) {this.updateFormField('fairlaunch', null, 'isVestingTeam', newVal);},
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
                console.log(field);
                if (["sellingAmount", "liquidity"].includes(field)) {
                    const _saleToken = '0x' + (this.forms.fairlaunch.sellingAmount * Math.pow(10, this.forms.fairlaunch.token.decimals)).toString(16);
                    const _liquidityPercent = this.forms.fairlaunch.liquidity / 1;
                    console.log('reach')
                    let receipt = await this.contracts.FairLaunchFactory.instance.methods.estimateTokenamount(
                                            _saleToken,
                                            _liquidityPercent
                                        ).call();

                    await this.$store.commit('forms/updateFormField', {form: form, parent: null, field: "estimateTokens", value: receipt / Math.pow(10, this.forms.fairlaunch.token.decimals)});
                }
            },

            validateDateTime: function(which) {
                if (this.forms.fairlaunch[which + 'Time'] === null) {this.dateError[which + 'Time'] = 'The ' + which + ' date can\'t be empty.';this[which + 'DateState'] = false;return false;}
                if (moment(this.forms.fairlaunch[which + 'Time']).unix() < moment.utc().unix()) {this.dateError[which + 'Time'] = 'The ' + which + ' date must be greater than current UTC time.';this[which + 'DateState'] = false;return false;}
                this.dateError[which + 'Time'] = null;
                return true;
            },

            contructDate: async function(which) {
                this.dateError[which + 'Time'] = null;
                if (this[which + 'Date'] === '') {return;}
                if (this[which + 'Time'] === '') {return;}
                if (this[which + 'Date'] === false) {return;}
                if (this[which + 'Time'] === false) {return;}
                this[which + 'DateState'] = null;

                const date = this[which + 'Date'].split('-');
                const time = this[which + 'Time'].split(':');

                await this.updateFormField('fairlaunch', null, which + 'Time', new Date(Date.UTC(date[0], (date[1] / 1 - 1), date[2], time[0], time[1], 0)));
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