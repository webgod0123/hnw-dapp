<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
        <div class="row d-none">
            <div class="col-12">
                <button v-on:click="$store.commit('pools/setPoolValue', {pool: $route.params.address, field: 'poolState', value: 0})">{{states[0]}}</button>
                <button v-on:click="$store.commit('pools/setPoolValue', {pool: $route.params.address, field: 'poolState', value: 1})">{{states[1]}}</button>
                <button v-on:click="$store.commit('pools/setPoolValue', {pool: $route.params.address, field: 'poolState', value: 2})">{{states[2]}}</button>
                <button v-on:click="$store.commit('pools/setPoolValue', {pool: $route.params.address, field: 'poolState', value: 3})">{{states[3]}}</button>
                <button v-on:click="$store.commit('pools/setPoolValue', {pool: $route.params.address, field: 'poolState', value: 4})">{{states[4]}}</button>
                <button v-on:click="$store.commit('pools/setPoolValue', {pool: $route.params.address, field: 'poolState', value: 5})">{{states[5]}}</button>
            </div>
        </div>
        <div class="text-primary text-center fs-1" v-if="pools[$route.params.address] === undefined || pools[$route.params.address].isFullyLoaded === false">
            <i class="fas fa-lg fa-circle-notch fa-spin"></i>
        </div>
        <div class="row" v-if="pools[$route.params.address] !== undefined && pools[$route.params.address].isFullyLoaded === true">
            <div class="col-12 col-xl-7">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row pt-2">
                            <div class="col-12 fs-3 ft-fram-l">
                                TOKEN
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="card bg-gray-900 bg-opacity-70 text-white">
                                    <div class="card-body">
                                        <div class="row mb-2">
                                            <div class="col-3">
                                                Address
                                            </div>
                                            <div class="col-9 text-end">
                                                <a v-bind:href="this.networks.links[web3.networkId] + '/' + pools[$route.params.address].tokenAddress" target="_tab" class="">{{pools[$route.params.address].tokenAddress}}</a>
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-3">
                                                Name
                                            </div>
                                            <div class="col-9 text-end">
                                                {{pools[$route.params.address].tokenName}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-3">
                                                Total supply
                                            </div>
                                            <div class="col-9 text-end">
                                                {{pools[$route.params.address].tokenTotalSupply}} {{pools[$route.params.address].tokenSymbol}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-3">
                                                Symbol
                                            </div>
                                            <div class="col-9 text-end">
                                                {{pools[$route.params.address].tokenSymbol}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-3">
                                                Decimals
                                            </div>
                                            <div class="col-9 text-end">
                                                {{pools[$route.params.address].tokenDecimals}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row pt-2">
                            <div class="col-12 fs-3 ft-fram-l">
                                {{poolType[pools[$route.params.address].poolType]}}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="card bg-gray-900 bg-opacity-70 text-white">
                                    <div class="card-body">
                                        <div class="row mb-2">
                                            <div class="col-3">
                                                {{poolType[pools[$route.params.address].poolType]}} address
                                            </div>
                                            <div class="col-9 text-end">
                                                <a v-bind:href="this.networks.links[web3.networkId] + '/' + $route.params.address" target="_tab" class="">{{$route.params.address}}</a>
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-6">
                                                Tokens for {{poolType[pools[$route.params.address].poolType]}}
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].tokensForPresale}} {{pools[$route.params.address].tokenSymbol}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="[0,1].includes(pools[$route.params.address].poolType)">
                                            <div class="col-6">
                                                Tokens for liquidity
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].tokensForLiquidity}} {{pools[$route.params.address].tokenSymbol}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-6">
                                                {{poolType[pools[$route.params.address].poolType]}} rate
                                            </div>
                                            <div class="col-6 text-end">
                                                1 {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}} = {{pools[$route.params.address].rate}} {{pools[$route.params.address].tokenSymbol}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="pools[$route.params.address].isVested">
                                            <div class="col-6">
                                                First release for {{poolType[pools[$route.params.address].poolType]}}
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].firstReleaseForPresale}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="pools[$route.params.address].isVested">
                                            <div class="col-6">
                                                Vesting for {{poolType[pools[$route.params.address].poolType]}}
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].vestingForPresale}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="[0,1].includes(pools[$route.params.address].poolType)">
                                            <div class="col-6">
                                                Listing rate
                                            </div>
                                            <div class="col-6 text-end">
                                                1 {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}} = {{pools[$route.params.address].liquidityListingRate}} {{pools[$route.params.address].tokenSymbol}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-6">
                                                Softcap
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].softCap}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="[0,1].includes(pools[$route.params.address].poolType)">
                                            <div class="col-6">
                                                Hardcap
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].hardCap}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="[0,1].includes(pools[$route.params.address].poolType)">
                                            <div class="col-6">
                                                Unsold token
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].unsoldToken}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-6">
                                                {{poolType[pools[$route.params.address].poolType]}} start time
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].startTimeLocal}} UTC
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-6">
                                                {{poolType[pools[$route.params.address].poolType]}} end time
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].endTimeLocal}} UTC
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-6">
                                                Listing on
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].listingOn}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-6">
                                                Liquidity lockup time
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].liquidityLockupTime}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="pools[$route.params.address].isTeamVested">
                                            <div class="col-6">
                                                Total team vesting tokens
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].totalTeamVestingTokens}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="pools[$route.params.address].isTeamVested">
                                            <div class="col-6">
                                                Team vesting release time
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].teamVestingReleaseTime}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="pools[$route.params.address].isTeamVested">
                                            <div class="col-6">
                                                Total vested tokens
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].totalVestedTokens}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="pools[$route.params.address].isTeamVested">
                                            <div class="col-6">
                                                First release after listing minutes
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].firstReleaseAfterListingMinutes}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="pools[$route.params.address].isTeamVested">
                                            <div class="col-6">
                                                First release for team
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].firstReleaseForTeam}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="pools[$route.params.address].isTeamVested">
                                            <div class="col-6">
                                                Tokens release each cycle
                                            </div>
                                            <div class="col-6 text-end">
                                                {{pools[$route.params.address].tokensReleaseEachCycle}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-5">
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-3 mb-3">
                                <img style="height:50px;width:50px;border-radius:50%;" v-bind:src="pools[$route.params.address].urls.split(' ')[0]">
                            </div>
                            <div class="col-9">
                                <div class="row">
                                    <div class="col-12">
                                        <div v-bind:class="'w-60 bg-' + statesColor[pools[$route.params.address].poolState] + ' bg-opacity-20 text-' + statesColor[pools[$route.params.address].poolState] + ' float-end'" style="height:30px;border-radius:15px;padding:4px;">
                                            <i v-bind:class="'ps-1 fas fa-circle text-' + statesColor[pools[$route.params.address].poolState]"></i>
                                            <span class="ps-2">{{states[pools[$route.params.address].poolState]}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-end fs-4">
                                        <span class="ft-fram-l" v-bind:class="{'fs-5': pools[$route.params.address].tokenName.length > 22, 'fs-6': pools[$route.params.address].tokenName.length > 26}">{{pools[$route.params.address].tokenName}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="card bg-gray-900 bg-opacity-70 text-white">
                                    <div class="card-body px-4">
                                        <div class="row" v-if="[0,3].includes(pools[$route.params.address].poolState)">
                                            <div class="col-12 text-center" v-if="[0,4].includes(pools[$route.params.address].poolState)">
                                                {{poolType[pools[$route.params.address].poolType]}} ends in:
                                            </div>
                                            <div class="col-12 text-center" v-if="[3].includes(pools[$route.params.address].poolState)">
                                                {{poolType[pools[$route.params.address].poolType]}} starts in:
                                            </div>
                                            <div class="col-12 mb-3">
                                                <pool-timer-manager v-bind:pool="pools[$route.params.address]"></pool-timer-manager>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <div v-bind:class="{'w-45 text-end': [0,1].includes(pools[$route.params.address].poolType), 'w-100 text-center': [2].includes(pools[$route.params.address].poolType)}">Softcap</div>
                                            <div class="px-2" v-bind:class="{'d-none': [2].includes(pools[$route.params.address].poolType)}">/</div>
                                            <div class="w-45 text-start" v-bind:class="{'d-none': [2].includes(pools[$route.params.address].poolType)}">Hardcap</div>
                                        </div>
                                        <div class="d-flex justify-content-center text-secondary">
                                            <div v-bind:class="{'w-45 text-end': [0,1].includes(pools[$route.params.address].poolType), 'w-100 text-center': [2].includes(pools[$route.params.address].poolType)}">{{pools[$route.params.address].softCap}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}</div>
                                            <div class="px-2" v-bind:class="{'d-none': [2].includes(pools[$route.params.address].poolType)}">/</div>
                                            <div class="w-45 text-start" v-bind:class="{'d-none': [2].includes(pools[$route.params.address].poolType)}">{{pools[$route.params.address].hardCap}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                Progress
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="progress" v-if="[0,1].includes(pools[$route.params.address].poolType)">
                                                    <div class="progress-bar bg-green text-dark" v-bind:style="'width: '+(pools[$route.params.address].totalRaised * 100 / pools[$route.params.address].hardCap)+'%;'">
                                                        {{(pools[$route.params.address].totalRaised * 100 / pools[$route.params.address].hardCap).toFixed(0)}} %
                                                    </div>
                                                </div>
                                                <div class="progress" v-if="[2].includes(pools[$route.params.address].poolType)">
                                                    <div class="progress-bar bg-green text-dark" v-bind:style="'width: '+(pools[$route.params.address].totalRaised * 100 / pools[$route.params.address].softCap)+'%;'">
                                                        {{(pools[$route.params.address].totalRaised * 100 / pools[$route.params.address].softCap).toFixed(0)}} %
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-12" v-if="[0,1].includes(pools[$route.params.address].poolType)">
                                                <span class="float-start text-muted fs-6">{{pools[$route.params.address].totalRaised}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}</span>
                                                <span class="float-end text-muted fs-6">{{pools[$route.params.address].hardCap}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}</span>
                                            </div>
                                            <div class="col-12" v-if="[2].includes(pools[$route.params.address].poolType)">
                                                <span class="float-start text-muted fs-6">{{pools[$route.params.address].totalRaised}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}</span>
                                                <span class="float-end text-muted fs-6">{{pools[$route.params.address].softCap}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}</span>
                                            </div>
                                        </div>
                                        <div class="row mb-3 mx-1" v-if="[0,1,2,4,5].includes(pools[$route.params.address].poolState)">
                                            <div class="col-6 text-start px-0">
                                                <span class="text-muted">Your contribution</span><br>
                                                {{pools[$route.params.address].contributionOf}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}
                                            </div>
                                            <div class="col-6 text-end px-0">
                                                <span class="text-muted">You will receive</span><br>
                                                {{pools[$route.params.address].contributionOf * pools[$route.params.address].rate}} {{pools[$route.params.address].tokenSymbol}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12">
                                <router-link v-bind:to="'/launchpad/list/'" class="float-end">
                                    <button class="btn btn-primary text-dark">Return</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-dark text-white mb-3 p-3">
                    <div class="card-body">
                        <div class="row pt-2">
                            <div class="col-12 fs-3 ft-fram-l">
                                Details
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="card bg-gray-900 bg-opacity-70 text-white">
                                    <div class="card-body">
                                        <div class="row mb-2">
                                            <div class="col-4">
                                                Status
                                            </div>
                                            <div class="col-8 text-end">
                                                {{states[pools[$route.params.address].poolState]}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray">
                                            <div class="col-4">
                                                Sale types
                                            </div>
                                            <div class="col-8 text-end">
                                                {{saleTypes[pools[$route.params.address].saleType]}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="pools[$route.params.address].saleType === 1">
                                            <div class="col-4">
                                                Whitelist details
                                            </div>
                                            <div class="col-8 text-end">
                                                {{pools[$route.params.address].whiteLists ? 'You are whitelisted' : 'You are not whitelisted'}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="[0,1].includes(pools[$route.params.address].poolType)">
                                            <div class="col-4">
                                                Minimum buy
                                            </div>
                                            <div class="col-8 text-end">
                                                {{pools[$route.params.address].minContribution}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}
                                            </div>
                                        </div>
                                        <div class="row pt-2 mb-2 border-top border-gray" v-if="[0,1].includes(pools[$route.params.address].poolType)">
                                            <div class="col-4">
                                                Maximum buy
                                            </div>
                                            <div class="col-8 text-end">
                                                {{pools[$route.params.address].maxContribution}} {{pools[$route.params.address].isPoolWithToken ? pools[$route.params.address].pairedTokenSymbol : 'BNB'}}
                                            </div>
                                        </div>
                                        <div class="row my-3" v-if="[0].includes(pools[$route.params.address].poolState) && (pools[$route.params.address].saleType === 0 || pools[$route.params.address].whiteLists)">
                                            <div class="col-12 text-start px-0" v-if="[0,1].includes(pools[$route.params.address].poolType)">
                                                <div class="input-group text-white bg-transparent w-100">
                                                    <input class="form-control form-control-lg bg-transparent border border-primary" type="text" placeholder="0.0" aria-label="contribute amount" v-model="contribution.amount">
                                                    <button type="button" class="btn btn-primary text-dark" v-on:click="maxContribute()">MAX</button>
                                                </div>
                                            </div>
                                            <div class="col-12 text-start px-0" v-if="[2].includes(pools[$route.params.address].poolType)">
                                                <input class="form-control form-control-lg bg-transparent border border-primary w-100" type="text" placeholder="0.0" aria-label="contribute amount" v-model="contribution.amount">
                                            </div>
                                        </div>
                                        <div class="row" v-if="[0].includes(pools[$route.params.address].poolState) && (pools[$route.params.address].saleType === 0 || pools[$route.params.address].whiteLists)">
                                            <div class="col-12 text-start px-0">
                                                <button v-if="!(allowance > 0)" class="btn btn-info text-dark w-100" v-on:click="approve()">{{(approves.use === true) ? 'PROCESSING...' : 'APPROVE'}}</button>
                                                <button v-if="allowance > 0" class="btn btn-primary text-dark w-100" v-on:click="contribute()">{{(contribution.use === true) ? 'PROCESSING...' : 'CONTRIBUTE'}}</button>
                                            </div>
                                        </div>
                                        <div class="row" v-if="[1].includes(pools[$route.params.address].poolState) && ([2].includes(pools[$route.params.address].poolType) || pools[$route.params.address].data3[4] > 0)">
                                            <div class="col-12 text-start px-0">
                                                <button v-if="pools[$route.params.address].data3[3] < pools[$route.params.address].data3[4]" class="btn btn-primary text-dark w-100" v-on:click="claim()">{{(claimInUse === true) ? 'PROCESSING...' : 'CLAIM'}}</button>
                                                <button v-if="pools[$route.params.address].data3[3] >= pools[$route.params.address].data3[4]" class="btn btn-orange text-dark w-100 disabled">YOU CLAIMED YOUR TOKENS</button>
                                            </div>
                                        </div>
                                        <div class="row" v-if="[2].includes(pools[$route.params.address].poolState) && ([2].includes(pools[$route.params.address].poolType) || pools[$route.params.address].data3[4] > 0)">
                                            <div class="col-12 text-start px-0">
                                                <button v-if="pools[$route.params.address].data3[2] < pools[$route.params.address].data3[1]" class="btn btn-primary text-dark w-100" v-on:click="withdrawContribution()">{{(refundInUse === true) ? 'PROCESSING...' : 'REFUND'}}</button>
                                                <button v-if="pools[$route.params.address].data3[2] >= pools[$route.params.address].data3[1]" class="btn btn-orange text-dark w-100 disabled">YOU HAVE BEEN REFUNDED</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-dark text-white mb-3 p-3" v-if="pools[$route.params.address].owner === wallet.account && ![1,2].includes(pools[$route.params.address].poolState)">
                    <div class="card-body">
                        <div class="row pt-2">
                            <div class="col-12 fs-3 ft-fram-l">
                                Owner zone
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="card bg-gray-900 bg-opacity-70 text-white">
                                    <div class="card-body">
                                        <div class="row mb-3" v-if="[0,1].includes(pools[$route.params.address].poolType)">
                                            <label class="form-label">Sale type</label>
                                            <div class="col-12 col-xl-6">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="saleType1" v-model="checkboxes.saleType1"/>
                                                    <label class="form-check-label" for="saleType1">Public</label>
                                                </div>
                                            </div>
                                            <div class="col-12 col-xl-6">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="saleType2" v-model="checkboxes.saleType2"/>
                                                    <label class="form-check-label" for="saleType2">Whitelist</label>
                                                </div>
                                            </div>
                                            <div class="col-12 col-xl-4 d-none">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="saleType3" v-model="checkboxes.saleType3"/>
                                                    <label class="form-check-label" for="saleType3">Public Anti-Bot</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row border-bottom border-gray mb-3 p-3" v-if="isSwitching === true">
                                            Applying change to the contract...
                                        </div>
                                        <div class="row border-bottom border-gray mb-3" v-if="checkboxes.saleType2 === true && isSwitching === false">
                                            <div class="col-12 col-lg-6 mb-3">
                                                <button id="addUsersToWhitelistModal" class="btn btn-info text-dark w-100" data-bs-toggle="modal" data-bs-target="#addUsersToWhitelist">Add to whitelist</button>

                                                <!-- #modal-dialog -->
                                                <div class="modal fade bg-dark bg-opacity-60" id="addUsersToWhitelist">
                                                    <div class="modal-dialog modal-xl">
                                                        <div class="modal-content bg-dark bg-opacity-90">
                                                            <div class="modal-header">
                                                                <h4 class="modal-title">Add addresses to the whitelist</h4>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Addresses lists - one address per line</label>
                                                                    <textarea rows="15" type="text" class="form-control form-control-lg" placeholder="" v-model="addList"/>
                                                                </div>
                                                                <div class="text-end">
                                                                    <span class="float-start">List will be divide in chunk of {{chunkSize}} addresses. You will have one transaction per chunk.</span>
                                                                    <button class="btn btn-primary text-dark" v-on:click="pushToWhitelist">{{currentlyAddingToWhitelist ? 'Processing... ' + this.addedChunks + '/' + this.addingChunksNumber : 'Save the whitelist'}}</button>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-12 text-start">
                                                                        Seperate each address with a break line. Our system will look for duplicate addresses and remove them.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-lg-6 mb-3">
                                                <button id="removeUsersFromWhitelistModal" class="btn btn-info text-dark w-100" data-bs-toggle="modal" data-bs-target="#removeUsersFromWhitelist">Remove from whitelist</button>
                                                
                                                <!-- #modal-dialog -->
                                                <div class="modal fade bg-dark bg-opacity-60" id="removeUsersFromWhitelist">
                                                    <div class="modal-dialog modal-xl">
                                                        <div class="modal-content bg-dark bg-opacity-90">
                                                            <div class="modal-header">
                                                                <h4 class="modal-title">Remove addresses from the whitelist</h4>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Addresses lists - one address per line</label>
                                                                    <textarea rows="15" type="text" class="form-control form-control-lg" placeholder="" v-model="removeList"/>
                                                                </div>
                                                                <div class="text-end">
                                                                    <span class="float-start">List will be divide in chunk of {{chunkSize}} addresses. You will have one transaction per chunk.</span>
                                                                    <button class="btn btn-primary text-dark" v-on:click="pullFromWhitelist">{{currentlyRemovingFromWhitelist ? 'Processing... ' + this.removedChunks + '/' + this.removingChunksNumber : 'Remove from the whitelist'}}</button>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-12 text-start">
                                                                        Seperate each address with a break line. Our system will look for duplicate addresses and remove them.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-lg-6 mb-3 d-none">
                                                <button class="btn btn-info text-dark w-100">Setting time to public</button>
                                            </div>
                                            <div class="col-12 mb-3">
                                                <button class="btn btn-info text-dark w-100" v-on:click="setToPublic()">Disable whitelist</button>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="form-label">Pool Actions</label>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-lg-6 mb-3">
                                                <button class="btn btn-info text-dark w-100" v-bind:class="{'disabled': ![4,5].includes(pools[$route.params.address].poolState)}" v-on:click="finalisePool">{{finaliseInUse ? 'Processing...' : 'Finalise ' + this.poolType[this.pools[this.$route.params.address].poolType]}}</button>
                                            </div>
                                            <div class="col-12 col-lg-6">
                                                <button class="btn btn-info text-dark w-100" v-on:click="cancelPool">{{cancelInUse ? 'Processing...' : 'Cancel ' + this.poolType[this.pools[this.$route.params.address].poolType]}}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import networks from "../../config/Networks.js";
    import moment from 'moment';
    import PoolTimerManager from '../../components/utilities/PoolTimerManager.vue';
    const saleTypes = require('../../forms/SaleTypes');
    const salesStates = require('../../forms/SalesStates');
    const salesStatesColors = require('../../forms/SalesStatesColors');
    const abis = require('../../contracts/abis.js');

    export default {
        components: { PoolTimerManager },
        data() {
            return {
                chunkSize: 2,
                states: salesStates,
                statesColor: salesStatesColors,
                saleTypes: saleTypes,
                requiredContracts: ['PoolFactory', 'Pool'],
                requiredPairs: [],
                requiredPools: [this.$route.params.address],
                networks: networks,
                checkboxes: {
                    saleType1: false,
                    saleType2: false,
                    saleType3: false,
                },
                oldCheckboxes: null,
                addressesList: null,
                allowance: null,
                contribution: {
					amount: null,
					message: '',
					use: false,
				},
                approves: {
                    message: '',
                    use: false,
				},
                whitelistInUse: false,
                finaliseInUse: false,
                claimInUse: false,
                refundInUse: false,
                cancelInUse: false,
                addList: null,
                removeList: null,
                poolType: [
                    "Presale",
                    "Presale",
                    "MGE"
                ],
                addedChunks: 1,
                addingChunksNumber: 1,
                removedChunks: 1,
                removingChunksNumber: 1,
                isSwitching: false,
                interval: null,
                path: this.$route.path,
            }
        },

        created() {
            this.$eventBus.$on("pools/instantiatePool", (event) => {
                if (event.payload != this.$route.params.address) {return;}
                this.updatePool();
            });

            this.$eventBus.$on('routeChanged', (event) => {
            });
        },

        updated () {
        },

        computed: {
            ...mapState(['pools', 'session', "wallet", "web3"]),
            fullyLoaded() {
                if (this.pools[this.$route.params.address] === undefined) {return false;}
                // console.log(this.pools[this.$route.params.address].data3);
                return this.pools[this.$route.params.address].isFullyLoaded;
            },
            currentlyAddingToWhitelist() {
                return this.addingChunksNumber !== this.addedChunks;
            },
            currentlyRemovingFromWhitelist() {
                return this.removingChunksNumber !== this.removedChunks;
            }
        },

        watch: {
            "session.isConnected": function(newVal, oldVal) {
                if (newVal === true && oldVal === false) {this.initiate();}
            },

            '$route': function(to, from) {
                console.log(to);
                console.log(from);
            },

            "checkboxes.saleType1": function(newVal) {
                if (newVal === true) {
                    this.checkboxes.saleType2 = false;
                    this.checkboxes.saleType3 = false;
                    if (this.oldCheckboxes !== 'saleType1') {this.setToPublic();}
                }
            },

            "checkboxes.saleType2": function(newVal) {
                if (newVal === true) {
                    this.checkboxes.saleType1 = false;
                    this.checkboxes.saleType3 = false;
                    if (this.oldCheckboxes !== 'saleType2') {this.setToWhitelist();}
                }
            },

            "checkboxes.saleType3": function(newVal) {
                if (newVal === true) {
                    this.checkboxes.saleType1 = false;
                    this.checkboxes.saleType2 = false;
                }
            },

            fullyLoaded: function(newVal) {
                this.getAllowance();
                if (this.pools[this.$route.params.address].isWhitelist) {
                    this.checkboxes.saleType2 = true;this.oldCheckboxes = 'saleType2';
                } else {
                    this.checkboxes.saleType1 = true;this.oldCheckboxes = 'saleType1';
                }
            },

            currentlyAddingToWhitelist: function(newVal, oldVal) {
                if (!newVal) {this.addList = null;}
            },

            currentlyRemovingFromWhitelist: function(newVal, oldVal) {
                if (!newVal) {this.removeList = null;}
            },

            // getWhiteLists: function(newVal) {
            //     this.addressesList = newVal;
            // }
        },

        methods: {
            initiate: function() {
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredContracts', this.requiredContracts);
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredPools', this.requiredPools);
            },

            updatePool: function() {
                let self = this;
                const address = JSON.parse(JSON.stringify(this.$route.params.address));
                setTimeout(function() {
                    self.$store.dispatch('pools/updatePool', address);
                    if (self.$route.path === '/launchpad/list/' + address) {self.updatePool();}
                }, 1000);
            },

            maxContribute: function() {
                this.contribution.amount = this.pools[this.$route.params.address].maxContribution;
            },

            contribute: async function() {
				if (this.contribution.use === false) {
					this.contribution.use = true;
                    // console.log(this.allowance);
                    const amount = '0x' + (this.contribution.amount * Math.pow(10, 18)).toString(16);
                    let response;
					try {
                        if (!this.pools[this.$route.params.address].isPoolWithToken) {
                            response = await this.pools[this.$route.params.address].instance.methods.contribute().send({ from: this.wallet.account, value: amount });
                        } else {
                            console.log(amount);
                            response = await this.pools[this.$route.params.address].instance.methods.contribute(amount).send({ from: this.wallet.account });
                        }
					} catch (e) {
						console.log(e);
						this.contribution.use = false;
						return;
					}
                    // console.log(response);
					this.contribution.amount = null;
					this.contribution.use = false;
                    this.$store.dispatch('pools/updatePool', this.$route.params.address);
				}
            },

            getAllowance: async function() {
                if (!this.pools[this.$route.params.address].isPoolWithToken) {this.allowance = 1;return;}
                // const temp = await new this.web3.instance.eth.Contract(abis.getAbi('ERC20'), this.$route.params.address);
                this.allowance = await this.pools[this.$route.params.address].pairedTokenInstance.methods.allowance(this.wallet.account, this.$route.params.address).call();
            },

            approve: async function(contract) {
				if (this.approves.use === false) {
					this.approves.use = true;
					try {
                        // console.log(this.$root.$children[0].contracts.BUSD);
                        const root = {
                            'address': this.pools[this.$route.params.address].pairedTokenAddress,
                            'instance': this.pools[this.$route.params.address].pairedTokenInstance,
                        };
						var response = await this.$calls.approve(this.wallet.account, false, this.$route.params.address, root);
					} catch (e) {
						console.log(e);
						this.approves.use = false;
						return;
					}
					this.approves.use = false;
                    this.$nextTick(function() {this.getAllowance();});
				}
            },

            setToPublic: async function() {
                if (this.isSwitching === true) {return;}
                this.isSwitching = true;
                try {
                    await this.pools[this.$route.params.address].instance.methods.setWhiteList(0, moment.utc().unix()).send({ from: this.wallet.account });
                } catch (e) {
                    console.log(e);
                    this.checkboxes.saleType1 = false;
                    this.checkboxes.saleType2 = true;
                    this.isSwitching = false;
                    return;
                }
                this.oldCheckboxes = "saleType1";
                this.isSwitching = false;
                this.checkboxes.saleType1 = true;
                this.checkboxes.saleType2 = false;
            },

            setToWhitelist: async function() {
                if (this.isSwitching === true) {return;}
                this.isSwitching = true;
                try {
                    await this.pools[this.$route.params.address].instance.methods.setWhiteList([this.wallet.account], 0).send({ from: this.wallet.account });
                } catch (e) {
                    console.log(e);
                    this.checkboxes.saleType1 = true;
                    this.checkboxes.saleType2 = false;
                    this.isSwitching = false;
                    return;
                }
                this.oldCheckboxes = "saleType2";
                this.isSwitching = false;
                this.checkboxes.saleType1 = false;
                this.checkboxes.saleType2 = true;
            },

            pushToWhitelist: async function() {
                //Verify if there is no chunks ongoing
                if (this.currentlyAddingToWhitelist) {return;}
                this.addedChunks = 0;

                //Filter addresses to unique
                let whitelists = [];
                for (const [key, value] of this.addList.split('\n').entries()) {
                    if (!whitelists.includes(value)) {whitelists.push(value);}
                }

                //Prepare chunks
                let self = this;
                const chunks = await whitelists.chunk(this.chunkSize);
                this.addingChunksNumber = chunks.length;
                chunks.forEach(chunk => {
                    self.addAddresses(chunk);
                });
            },

            addAddresses: async function(chunk) {
                try {
                    await this.pools[this.$route.params.address].instance.methods.addWhiteLists(chunk).send({ from: this.wallet.account });
                    this.addedChunks++;
                } catch (e) {
                    console.log(e);
                    this.whitelistInUse = false;
                    return;
                }
            },

            pullFromWhitelist: async function() {
                //Verify if there is no chunks ongoing
                if (this.currentlyRemovingFromWhitelist) {return;}
                this.removedChunks = 0;

                //Filter addresses to unique
                let whitelists = [];
                for (const [key, value] of this.removeList.split('\n').entries()) {
                    if (!whitelists.includes(value)) {whitelists.push(value);}
                }

                //Prepare chunks
                let self = this;
                const chunks = await whitelists.chunk(this.chunkSize);
                this.removingChunksNumber = chunks.length;
                chunks.forEach(chunk => {
                    self.removeAddresses(chunk);
                });
            },            
                // document.getElementById('removeUsersFromWhitelistModal').click();
                // this.$nextTick(function() {this.$store.dispatch('pools/updatePool', this.$route.params.address);});

            removeAddresses: async function(chunk) {
                try {
                    await this.pools[this.$route.params.address].instance.methods.removeWhiteLists(chunk).send({ from: this.wallet.account });
                    this.removedChunks++;
                } catch (e) {
                    console.log(e);
                    this.whitelistInUse = false;
                    return;
                }
            },

            finalisePool: async function() {
                if (this.finaliseInUse) {return;}
                this.finaliseInUse = true;
                try {
                    await this.pools[this.$route.params.address].instance.methods.finalize().send({ from: this.wallet.account });
                } catch (e) {
                    console.log(e);
                    this.finaliseInUse = false;
                    return;
                }
                this.finaliseInUse = false;
                this.$nextTick(function() {this.$store.dispatch('pools/updatePool', this.$route.params.address);});
            },

            claim: async function() {
                if (this.claimInUse) {return;}
                this.claimInUse = true;
                try {
                    await this.pools[this.$route.params.address].instance.methods.claim().send({ from: this.wallet.account });
                } catch (e) {
                    console.log(e);
                    this.claimInUse = false;
                    return;
                }
                this.claimInUse = false;
                this.$nextTick(function() {this.$store.dispatch('pools/updatePool', this.$route.params.address);});
            },

            withdrawContribution: async function() {
                if (this.refundInUse) {return;}
                this.refundInUse = true;
                try {
                    await this.pools[this.$route.params.address].instance.methods.withdrawContribution().send({ from: this.wallet.account });
                } catch (e) {
                    console.log(e);
                    this.refundInUse = false;
                    return;
                }
                this.refundInUse = false;
                this.$nextTick(function() {this.$store.dispatch('pools/updatePool', this.$route.params.address);});
            },

            cancelPool: async function() {
                if (this.cancelInUse) {return;}
                this.cancelInUse = true;
                try {
                    await this.pools[this.$route.params.address].instance.methods.cancel().send({ from: this.wallet.account });
                } catch (e) {
                    console.log(e);
                    this.cancelInUse = false;
                    return;
                }
                this.cancelInUse = false;
                this.$nextTick(function() {this.$store.dispatch('pools/updatePool', this.$route.params.address);});
            },
        },

        mounted() {
            this.initiate();
        }
    }
</script>