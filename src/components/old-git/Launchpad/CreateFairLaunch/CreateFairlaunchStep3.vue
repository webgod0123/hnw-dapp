<template>
    <div class="card bg-gray-900 bg-opacity-70 text-white">
        <div class="card-body">
            <div class="row pb-2">
                <div class="col-12 fs-3 ft-fram-l">
                    TOKEN
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Total supply
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.token.totalSupply}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Name
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.token.name}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Symbol
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.token.symbol}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Decimals
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.token.decimals}}
                </div>
            </div>
            <div class="row pb-2 mt-4">
                <div class="col-12 fs-3 ft-fram-l">
                    MGE
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Total selling amount
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.sellingAmount}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Softcap
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.softCap}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Router
                </div>
                <div class="col-6 text-end">
                    {{options.routers[forms.fairlaunch.router]}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Liquidity
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.liquidity}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Start time
                </div>
                <div class="col-6 text-end">
                    {{(forms.fairlaunch.startTime) ? forms.fairlaunch.startTime.toUTCString() : ''}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    End time
                </div>
                <div class="col-6 text-end">
                    {{(forms.fairlaunch.endTime) ? forms.fairlaunch.endTime.toUTCString() : ''}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Liquidity lockup (minutes)
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.liquidityLock}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.fairlaunch.isVestingTeam">
                <div class="col-6">
                    Total team vesting tokens
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.vestingTeamTotalTokens}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.fairlaunch.isVestingTeam">
                <div class="col-6">
                    Minutes before first release
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.vestingTeamMinutesRelease}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.fairlaunch.isVestingTeam">
                <div class="col-6">
                    Initial percentage release
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.vestingTeamFirstPercentageRelease}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.fairlaunch.isVestingTeam">
                <div class="col-6">
                    Minutes per cycle
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.vestingTeamCycleMinutes}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.fairlaunch.isVestingTeam">
                <div class="col-6">
                    Percentage release per cycle
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.vestingTeamCyclePercentage}}
                </div>
            </div>
            <div class="row pb-2 mt-4">
                <div class="col-12 fs-3 ft-fram-l">
                    SOCIALS
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Logo URL
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.logoUrl}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Website
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.website}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.fairlaunch.facebook)">
                <div class="col-6">
                    Facebook
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.facebook}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.fairlaunch.twitter)">
                <div class="col-6">
                    Twitter
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.twitter}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.fairlaunch.github)">
                <div class="col-6">
                    GitHub
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.github}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.fairlaunch.telegram)">
                <div class="col-6">
                    Telegram
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.telegram}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.fairlaunch.instagram)">
                <div class="col-6">
                    Instagram
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.instagram}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.fairlaunch.discord)">
                <div class="col-6">
                    Discord
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.discord}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.fairlaunch.reddit)">
                <div class="col-6">
                    Reddit
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.reddit}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Description
                </div>
                <div class="col-6 text-end">
                    {{forms.fairlaunch.description}}
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-4">
                    <button class="btn btn-secondary text-dark w-100" v-on:click="$emit('previous');">PREVIOUS</button>
                </div>
                <div class="col-4"></div>
                <div class="col-4">
                    <button class="btn btn-primary text-dark w-100" v-on:click="$emit('createPool');">{{creatingPool ? 'PROCESSING...' : 'SUBMIT'}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    const refunds = require('../../../../forms/Refunds');
    const routers = require('../../../../forms/Routers');

    export default {
        props: {
            globalRender: {},
            creatingPool: {}
        },

        data() {
            return {
                forceRender: 0,
                options: {
                    refunds: refunds,
                    routers: routers,
                }
            }
        },

        computed: {
            ...mapState(['contracts', 'forms', 'wallet', 'web3']),
        },
    }
</script>