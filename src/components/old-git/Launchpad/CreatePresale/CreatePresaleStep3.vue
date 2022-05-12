<template>
    <div class="card bg-gray-900 bg-opacity-70 text-white">
        <div class="card-body" v-bind:key="forceRender">
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
                    {{forms.presale.token.totalSupply}}
                </div>
            </div>
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
                    Decimals
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.token.decimals}}
                </div>
            </div>
            <div class="row pb-2 mt-4">
                <div class="col-12 fs-3 ft-fram-l">
                    PRESALE
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Presale rate
                </div>
                <div class="col-6 text-end">
                    1 {{options.presaleTypes[forms.presale.presaleType]}} = {{forms.presale.rate}} {{forms.presale.token.symbol}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Whitelist
                </div>
                <div class="col-6 text-end">
                    {{(forms.presale.whitelistEnable) ? 'Enable' : 'Disable'}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Softcap
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.softCap}} {{options.presaleTypes[forms.presale.presaleType]}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Hardcap
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.hardCap}} {{options.presaleTypes[forms.presale.presaleType]}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Minimum buy
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.minBuy}} {{options.presaleTypes[forms.presale.presaleType]}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Maximum buy
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.maxBuy}} {{options.presaleTypes[forms.presale.presaleType]}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Refund type
                </div>
                <div class="col-6 text-end">
                    {{options.refunds[forms.presale.refund]}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Router
                </div>
                <div class="col-6 text-end">
                    {{options.routers[forms.presale.router]}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Liquidity
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.liquidity}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Listing rate
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.listingRate}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Start time
                </div>
                <div class="col-6 text-end">
                    {{(forms.presale.startTime) ? moment.utc(forms.presale.startTime).format("YYYY-MM-DD hh:mm a") + " UTC" : ''}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    End time
                </div>
                <div class="col-6 text-end">
                    {{(forms.presale.endTime) ? moment.utc(forms.presale.endTime).format("YYYY-MM-DD hh:mm a") + " UTC" : ''}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Liquidity lockup (minutes)
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.liquidityLock}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.presale.isVestingContributor">
                <div class="col-6">
                    Initial percentage release
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.vestingContributorFirstPercentageRelease}} %
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.presale.isVestingContributor">
                <div class="col-6">
                    Minutes per cycle
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.vestingContributorCycleMinutes}} minutes
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.presale.isVestingContributor">
                <div class="col-6">
                    Percentage release per cycle
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.vestingContributorCyclePercentage}} %
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.presale.isVestingTeam">
                <div class="col-6">
                    Total team vesting tokens
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.vestingTeamTotalTokens}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.presale.isVestingTeam">
                <div class="col-6">
                    Minutes before first release
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.vestingTeamMinutesRelease}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.presale.isVestingTeam">
                <div class="col-6">
                    Initial percentage release
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.vestingTeamFirstPercentageRelease}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.presale.isVestingTeam">
                <div class="col-6">
                    Minutes per cycle
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.vestingTeamCycleMinutes}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="forms.presale.isVestingTeam">
                <div class="col-6">
                    Percentage release per cycle
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.vestingTeamCyclePercentage}}
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
                    {{forms.presale.logoUrl}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Website
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.website}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.presale.facebook)">
                <div class="col-6">
                    Facebook
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.facebook}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.presale.twitter)">
                <div class="col-6">
                    Twitter
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.twitter}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.presale.github)">
                <div class="col-6">
                    GitHub
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.github}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.presale.telegram)">
                <div class="col-6">
                    Telegram
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.telegram}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.presale.instagram)">
                <div class="col-6">
                    Instagram
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.instagram}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.presale.discord)">
                <div class="col-6">
                    Discord
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.discord}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray" v-if="![null, ''].includes(forms.presale.reddit)">
                <div class="col-6">
                    Reddit
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.reddit}}
                </div>
            </div>
            <div class="row pb-2 mb-2 border-bottom border-gray">
                <div class="col-6">
                    Description
                </div>
                <div class="col-6 text-end">
                    {{forms.presale.description}}
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
    const presaleTypes = require('../../../../forms/PresaleTypes');
    import moment from 'moment';

    export default {
        props: {
            globalRender: {},
            creatingPool: {}
        },

        data() {
            return {
                moment: moment,
                forceRender: 0,
                options: {
                    refunds: refunds,
                    routers: routers,
                    presaleTypes: presaleTypes,
                },
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
            globalRender: function(newVal, oldVal) {
                if (newVal === 3) {this.forceRender++;}
            }
        },

        methods: {
        },

        mounted() {
            
        }
    }
</script>