<template>
	<!-- BEGIN row -->
	<div class="row">
		<div class="col-12 col-xl-6 order-2 order-xl-1">
			<div class="col-12">
				<div class="card bg-dark text-white mb-3 p-3">
					<div class="card-body">
						<div class="row mb-3">
							<div class="col-12 text-center fs-4">
								<span class="ft-fram-l"><b>INFO</b></span><span class="ps-1 ft-fram-l">BOX</span>
							</div>
						</div>
						<div class="row">
							<div class="col-6 px-3">
								<div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3">
								

									<div class="col-12 fs-5 text-justify">
										<p>
											Staking your $HNW is one of the best decisions you could ever do as you're not only holding a useless token that sits idly by - but in exchange for staking your $HNW you'll be receiving a token called xHNW that can be your gateway to passive generational wealth that pays you on a weekly basis back in $HNW which is directly sourced from the fee-splitter distribution mechanism every payday.
										</p>
									</div>
								</div>
							</div>
							<div class="col-6 px-3">
								<div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3">
								

									<div class="col-12 fs-5 text-justify">
										<p>
											Example:<br>
											1xHNW : 1.5$HNW Would be the initial conversion ratio of both tokens but each time $HNW rewards are released back to our stakeholders, it will increase the ratio of the conversion such that<br>
											1xHNW : 1.6$HNW.
										</p>
									</div>

									<div class="col-6 fs-5 text-justify">
										<p>
											Ratio before rewards<br>
											1xHNW : 1.5HNW<br>
										</p>
									</div>
									<div class="col-6 fs-5 text-justify">
										<p>
											Ratio after rewards<br>
											1xHNW : 1.6HNW<br>
										</p>
									</div>
								</div>
							</div>
						</div>

						<!-- BEGIN row -->
						<div class="row">
							<!-- BEGIN col-4 -->
							<div class="col-4 ps-0">
								<p class="text-center p-3 border border-muted rounded">
									<span class="fs-1"><i class="fa fa-university"></i></span><br>
									<span class="fs-2">{{(pairs.HNWxHNW === undefined) ? Number(0).toFixed(0) : pairs.HNWxHNW.balances.HNW.toFixed(0)}}</span><br>
									<span class="fs-6">Total supply</span>
								</p>
							</div>
							<div class="col-4">
								<p class="text-center p-3 border border-muted rounded">
									<span class="fs-1"><i class="fa fa-calculator"></i></span><br>
									<span class="fs-2">1 : {{(pairs.HNWxHNW === undefined) ? Number(0).toFixed(0) : pairs.HNWxHNW.ratio.toFixed(2)}}</span><br>
									<span class="fs-6">HNW / xHNW</span>
								</p>
							</div>
							<div class="col-4 pe-0">
								<p class="text-center p-3 border border-muted rounded">
									<span class="fs-1"><i class="fa fa-percent"></i></span><br>
									<span class="fs-2">{{(pairs.HNWxHNW === undefined || balances.xHNW === undefined) ? Number(0).toFixed(0) : Number(balances.xHNW * 100 / pairs.HNWxHNW.balances.HNW).toFixed(2)}}</span><br>
									<span class="fs-6">Your stake</span>
								</p>
							</div>
							<div class="col-3 pe-0 d-none">
								<p class="text-center p-3 border border-muted rounded">
									<span class="fs-1"><i class="fa fa-piggy-bank"></i></span><br>
									<span class="fs-2">{{(balances.xHNW === undefined) ? Number(0).toFixed(0) : balances.xHNW.toFixed(0)}} xHNW</span><br>
									<span class="fs-6">Your stake</span>
								</p>
							</div>
							<!-- END col-4 -->
						</div>
						<!-- END row -->
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 col-xl-6 order-1 order-xl-2">
			<!-- BEGIN col-6 -->
			<div class="col-12">
				<div class="card bg-dark text-white mb-3 p-3">
					<div class="card-body">
						<div class="row mb-3">
							<div class="col-12 text-center fs-4">
								<span class="ft-fram-l"><b>STAKE</b></span>
							</div>
						</div>
						<div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3" v-bind:key="forceRender">
							<div class="row">
								<div class="col-12 text-start fs-5">
									<span class="ps-3">Input</span>
									<span class="pe-3 float-end">Balance: {{(balances.HNW === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : balances.HNW.toFixed($root.$children[0].displayDecimals)}} HNW</span>
								</div>
							</div>
							<div class="row">
								<div class="col-12 col-md-6 text-start fs-5">
									<div class="input-group text-white bg-transparent w-100">
										<input class="form-control form-control-lg bg-transparent border border-primary" type="text" placeholder="0.0" aria-label="staking amount" v-model="staking.amount" v-on:keyup="calculateEstimation('stake')">
										<button type="button" class="btn btn-primary text-dark" v-on:click="maxStake()">MAX</button>
									</div>
								</div>
								<div class="col-12 col-md-6 text-end fs-5 pe-3">
									<input class="form-control form-control-lg border-0 text-white bg-transparent w-100 text-end" disabled type="text" placeholder="0.0" aria-label="staking amount" v-bind:value="'≃ ' + estimated.stake + ' xHNW'">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 px-0">
								<button v-if="!(allowances.xHNW !== undefined && allowances.xHNW > 0)" class="btn btn-info text-dark fs-3 w-100" v-on:click="approve('xHNW')">{{(approves.xHNW.use === true) ? 'PROCESSING...' : 'APPROVE'}}</button>
								<button v-if="allowances.xHNW !== undefined && allowances.xHNW > 0" class="btn btn-primary text-dark fs-3 w-100" v-on:click="stakeTokens()">{{(staking.use === true) ? 'PROCESSING...' : 'STAKING'}}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- END col-6 -->
			<!-- BEGIN col-6 -->
			<div class="col-12">
				<div class="card bg-dark text-white mb-3 p-3">
					<div class="card-body">
						<div class="row mb-3">
							<div class="col-12 text-center fs-4">
								<span class="ft-fram-l"><b>UNSTAKE</b></span>
							</div>
						</div>
						<div class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3" v-bind:key="forceRender">
							<div class="row">
								<div class="col-12 text-start fs-5">
									<span class="ps-3">Input</span>
									<span class="pe-3 float-end">Balance: {{(balances.xHNW === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : balances.xHNW.toFixed($root.$children[0].displayDecimals)}} xHNW</span>
								</div>
							</div>
							<div class="row">
								<div class="col-12 col-md-6 text-start fs-5">
									<div class="input-group text-white bg-transparent w-100">
										<input class="form-control form-control-lg bg-transparent border border-secondary" type="text" placeholder="0.0" aria-label="staking amount" v-model="unstaking.amount" v-on:keyup="calculateEstimation('unstake')">
										<button type="button" class="btn btn-secondary text-dark" v-on:click="maxUnstake()">MAX</button>
									</div>
								</div>
								<div class="col-12 col-md-6 text-end fs-5 pe-3">
									<input class="form-control form-control-lg border-0 text-white bg-transparent w-100 text-end" disabled type="text" placeholder="0.0" aria-label="staking amount" v-bind:value="'≃ ' + estimated.unstake + ' HNW'">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 px-0">
								<button v-if="!(allowances.xHNW !== undefined && allowances.xHNW > 0)" class="btn btn-info text-dark fs-3 w-100" v-on:click="approve('xHNW')">{{(approves.xHNW.use === true) ? 'PROCESSING...' : 'APPROVE'}}</button>
								<button v-if="allowances.xHNW !== undefined && allowances.xHNW > 0" class="btn btn-secondary text-dark fs-3 w-100" v-on:click="unstakeTokens()">{{(unstaking.use === true) ? 'PROCESSING...' : 'UNSTAKE'}}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- END col-6 -->
	</div>
	<!-- END row -->
</template>

<script>
    // import { stakeSideKick } from '../utils/callHelpers.js'

    export default {

        props: {
        },

        data() {
            return {
                forceRender: 0,
                requiredContracts: ["HNW", "xHNW"],
                allowances: {},
                balances: {},
                requiredPairs: ["BUSDHNW","HNWxHNW"],
                pairs: {},
				estimated: {
					stake: Number(0).toFixed(this.$root.$children[0].displayDecimals),
					unstake: Number(0).toFixed(this.$root.$children[0].displayDecimals),
				},
                staking: {
					amount: null,
					message: '',
					use: false,
				},
                unstaking: {
					amount: null,
					message: '',
					use: false,
				},
                approves: {
                    xHNW: {
                        message: '',
                        use: false,
                    }
				},
            }
        },

        created() {
            this.$eventBus.$on("updateAllowanceAmount", (event) => {
                if (this.requiredContracts.includes(event.token)) {
                    this.allowances[event.token] = event.value;
                    this.$nextTick(function() {this.forceRender++;});
                }
            });

            this.$eventBus.$on("updateWalletBalance", (event) => {
                if (this.requiredContracts.includes(event.token)) {
                    this.balances[event.token] = event.value;
                    this.$nextTick(function() {this.forceRender++;});
                }
            });

            this.$eventBus.$on("updatePairRatio", (event) => {
                if (this.requiredPairs.includes(event.pair)) {
                    this.pairs[event.pair] = event.data;
                    this.$nextTick(function() {this.forceRender++;});
                }
            });
        },

        updated () {
        },

        computed: {},

        watch: {
            '$root.web3Initiate': function() {
                this.$root.$children[0].getRequiredContracts(this.requiredContracts);
                this.$root.$children[0].getRequiredPairs(this.requiredPairs);
            },
        },

        methods: {
			calculateEstimation: function(value) {
				if (this.$root.$children[0].pairs.HNWxHNW === undefined) {this.estimated[value] = Number(0).toFixed(this.$root.$children[0].displayDecimals);}
				if (value === 'stake') {this.estimated.stake = (this.staking.amount * this.$root.$children[0].pairs.HNWxHNW.ratio).toFixed(this.$root.$children[0].displayDecimals);}
				if (value === 'unstake') {this.estimated.unstake = (this.unstaking.amount * this.$root.$children[0].pairs.HNWxHNW.inverse).toFixed(this.$root.$children[0].displayDecimals);}
			},

			maxStake: function() {
				this.staking.amount = this.balances.HNW;
				this.calculateEstimation('stake');
			},

			maxUnstake: function() {
				this.unstaking.amount = this.balances.xHNW;
				this.calculateEstimation('unstake');
			},
			
			approve: async function(contract) {
				if (this.approves[contract].use === false) {
					this.approves[contract].use = true;
					try {
						var response = await this.$calls.approve(this.$root.$children[0].wallet.account, false, this.$root.$children[0].contracts[contract].address, this.$root.$children[0].contracts.HNW);
					} catch (e) {
						console.log(e);
						this.approves[contract].use = false;
						return;
					}
					this.approves[contract].use = false;
                    this.$nextTick(function() {this.$root.$children[0].callAllowanceAmount(contract);});
				}
            },

			stakeTokens: async function() {
				if (this.staking.use === false) {
					this.staking.use = true;
					try {
						var response = await this.$calls.stake(this.$root.$children[0].toWei(this.staking.amount, 'HNW'), this.$root.$children[0].wallet.account, false, this.$root.$children[0].contracts.xHNW);
					} catch (e) {
						console.log(e);
						this.staking.use = false;
						return;
					}
                	this.$root.$children[0].getRequiredContracts(this.requiredContracts);
					this.staking.amount = null;
					this.staking.use = false;
				}
			},

			unstakeTokens: async function() {
				if (this.unstaking.use === false) {
					this.unstaking.use = true;
					try {
						var response = await this.$calls.unstake(this.$root.$children[0].toWei(this.unstaking.amount, 'xHNW'), this.$root.$children[0].wallet.account, false, this.$root.$children[0].contracts.xHNW);
					} catch (e) {
						console.log(e);
						this.unstaking.use = false;
						return;
					}
                	this.$root.$children[0].getRequiredContracts(this.requiredContracts);
					this.unstaking.amount = null;
					this.unstaking.use = false;
				}
			}
		},

        mounted() {}
    }
</script>