<template>
    <div style="width:400px !important;" v-bind:class="{'d-none': pool.isLoaded === false, 'd-flex': pool.isLoaded === true}">
        <div class="card bg-dark text-white mb-3 p-3 w-100">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-3 mb-3">
                        <img style="height:50px;width:50px;border-radius:50%;" v-bind:src="urls[0]">
                    </div>
                    <div class="col-9">
                        <div class="row">
                            <div class="col-12">
                                <div v-bind:class="'w-60 bg-' + statesColor[pool.poolState] + ' bg-opacity-20 text-' + statesColor[pool.poolState] + ' float-end'" style="height:30px;border-radius:15px;padding:4px;">
                                    <i v-bind:class="'ps-1 fas fa-circle text-' + statesColor[pool.poolState]"></i>
                                    <span class="ps-2">{{states[pool.poolState]}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 text-end fs-4">
                                <span class="ft-fram-l" v-bind:class="{'fs-5': pool.tokenName.length > 22, 'fs-6': pool.tokenName.length > 26}">{{pool.tokenName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <div class="card bg-gray-900 bg-opacity-70 text-white">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12 text-muted mb-3">
                                        1 {{pool.isPoolWithToken ? pool.pairedTokenSymbol : 'BNB'}} = {{pool.rate}} ${{pool.tokenSymbol}}
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <div v-bind:class="{'w-45 text-end': [0,1].includes(pool.poolType), 'w-100 text-center': [2].includes(pool.poolType)}">Softcap</div>
                                    <div class="px-2" v-bind:class="{'d-none': [2].includes(pool.poolType)}">/</div>
                                    <div class="w-45 text-start" v-bind:class="{'d-none': [2].includes(pool.poolType)}">Hardcap</div>
                                </div>
                                <div class="d-flex justify-content-center text-secondary">
                                    <div v-bind:class="{'w-45 text-end': [0,1].includes(pool.poolType), 'w-100 text-center': [2].includes(pool.poolType)}">{{pool.softCap}} {{pool.isPoolWithToken ? pool.pairedTokenSymbol : 'BNB'}}</div>
                                    <div class="px-2" v-bind:class="{'d-none': [2].includes(pool.poolType)}">/</div>
                                    <div class="w-45 text-start" v-bind:class="{'d-none': [2].includes(pool.poolType)}">{{pool.hardCap}} {{pool.isPoolWithToken ? pool.pairedTokenSymbol : 'BNB'}}</div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        Progress
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="progress" v-if="[0,1].includes(pool.poolType)">
                                            <div class="progress-bar bg-green text-dark" v-bind:style="'width: '+(pool.totalRaised * 100 / pool.hardCap)+'%;'">
                                                {{(pool.totalRaised * 100 / pool.hardCap).toFixed(0)}} %
                                            </div>
                                        </div>
                                        <div class="progress" v-if="[2].includes(pool.poolType)">
                                            <div class="progress-bar bg-green text-dark" v-bind:style="'width: '+(pool.totalRaised * 100 / pool.softCap)+'%;'">
                                                {{(pool.totalRaised * 100 / pool.softCap).toFixed(0)}} %
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-12" v-if="[0,1].includes(pool.poolType)">
                                        <span class="float-start text-muted fs-6">{{pool.totalRaised}} {{pool.isPoolWithToken ? pool.pairedTokenSymbol : 'BNB'}}</span>
                                        <span class="float-end text-muted fs-6">{{pool.hardCap}} {{pool.isPoolWithToken ? pool.pairedTokenSymbol : 'BNB'}}</span>
                                    </div>
                                    <div class="col-12" v-if="[2].includes(pool.poolType)">
                                        <span class="float-start text-muted fs-6">{{pool.totalRaised}} {{pool.isPoolWithToken ? pool.pairedTokenSymbol : 'BNB'}}</span>
                                        <span class="float-end text-muted fs-6">{{pool.softCap}} {{pool.isPoolWithToken ? pool.pairedTokenSymbol : 'BNB'}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        Liquidity: <span class="float-end">{{pool.liquidityPercent}} %</span>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-12">
                                        Liquidity lock: <span class="float-end">{{(pool.liquidityLockDays / 24 / 60 / 60 > 1) ? (pool.liquidityLockDays / 24 / 60 / 60).toFixed(0) + ' days' : pool.liquidityLockDays / 60 + ' minutes'}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-center" style="height: 30px;">
                                        <a v-if="urls[1] !== undefined && urls[1] !== 'none'" class="text-primary fs-5 p-1 mx-2" v-bind:href="urls[1]" target="_blank"><i class="fa fa-globe"></i></a>
                                        <a v-if="urls[2] !== undefined && urls[2] !== 'none'" class="text-primary fs-5 p-1 mx-2" v-bind:href="urls[2]" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                        <a v-if="urls[3] !== undefined && urls[3] !== 'none'" class="text-primary fs-5 p-1 mx-2" v-bind:href="urls[3]" target="_blank"><i class="fab fa-twitter"></i></a>
                                        <a v-if="urls[4] !== undefined && urls[4] !== 'none'" class="text-primary fs-5 p-1 mx-2" v-bind:href="urls[4]" target="_blank"><i class="fab fa-github"></i></a>
                                        <a v-if="urls[5] !== undefined && urls[5] !== 'none'" class="text-primary fs-5 p-1 mx-2" v-bind:href="urls[5]" target="_blank"><i class="fab fa-telegram-plane"></i></a>
                                        <a v-if="urls[6] !== undefined && urls[6] !== 'none'" class="text-primary fs-5 p-1 mx-2" v-bind:href="urls[6]" target="_blank"><i class="fab fa-instagram"></i></a>
                                        <a v-if="urls[7] !== undefined && urls[7] !== 'none'" class="text-primary fs-5 p-1 mx-2" v-bind:href="urls[7]" target="_blank"><i class="fab fa-discord"></i></a>
                                        <a v-if="urls[8] !== undefined && urls[8] !== 'none'" class="text-primary fs-5 p-1 mx-2" v-bind:href="urls[8]" target="_blank"><i class="fab fa-reddit-alien"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6" v-if="[3].includes(pool.poolState)">
                        {{poolType[pool.poolType]}} start in:
                        <vue-countdown :time="remainingStartTime" :interval="100" tag="p">
                            <template slot-scope="props">{{ props.days }}d {{ props.hours.padLeft() }}:{{ props.minutes.padLeft() }}</template>
                        </vue-countdown>
                    </div>
                    <div class="col-6" v-if="[0,4].includes(pool.poolState)">
                        {{poolType[pool.poolType]}} end in:
                        <vue-countdown :time="remainingEndTime" :interval="100" tag="p">
                            <template slot-scope="props">{{ props.days }}d {{ props.hours.padLeft() }}:{{ props.minutes.padLeft() }}</template>
                        </vue-countdown>
                    </div>
                    <div class="col-6" v-if="![0,3,4].includes(pool.poolState)">
                        {{poolType[pool.poolType]}}:<br>
                        {{states[pool.poolState]}}
                    </div>
                    <div class="col-6 text-end">
                        <router-link v-bind:to="'/launchpad/list/'+address">
                            <a class="btn btn-primary text-dark">View presale</a>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import moment from 'moment';
    import VueCountdown from '@chenfengyuan/vue-countdown';
    const salesStates = require('../../../../forms/SalesStates');
    const salesStatesColors = require('../../../../forms/SalesStatesColors');

    export default {
        components: { VueCountdown },

        props: {
            address: {},
            pool: {},
        },

        data() {
            return {
                cardState: 0,
                states: salesStates,
                statesColor: salesStatesColors,
                poolType: [
                    "Presale",
                    "Presale",
                    "MGE"
                ],
                urls: this.pool.urls.split(" "),
                offSet: (new Date().getTimezoneOffset() / 60)
            }
        },
 //v-bind:class="{'d-none': pool.isLoaded === false, 'd-flex': pool.isLoaded === true}">
        created() {
        },

        updated () {
        },

        computed: {
            ...mapState(['wallet']),
            remainingStartTime: function() {
                return Math.abs(moment(this.pool.startTime).subtract(this.offSet, 'hours').diff(moment()));
            },

            remainingEndTime: function() {
                return Math.abs(moment(this.pool.endTime).subtract(this.offSet, 'hours').diff(moment()));
            }
        },

        watch: {
        },

        methods: {
        },

        mounted() {
        }
    }
</script>