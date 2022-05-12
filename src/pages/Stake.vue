<template>
    <div><!-- This div is the <router-view  id="content" class="app-content {{ $appContentClass }}"></router-view> from sap.blade.php -->
		<!-- BEGIN row -->
		<div class="row">
			<div class="col-12 col-xl-6 order-2 order-xl-1">
				<div class="col-12">
					<div class="card bg-dark text-white mb-3 p-3 pb-0">
						<div class="card-body p-0">
							<div class="row mb-3">
								<div class="col-12 text-center fs-4">
									<span class="ft-fram-l"><b>INFO</b></span><span class="ps-1 ft-fram-l">BOX</span>
								</div>
							</div>
							<div class="row border border-muted bg-gray-800 bg-opacity-60 rounded p-3 mb-3">
								<div class="col-12 text-justify fs-6" v-html="textStake.infoBox[token]"></div>
								<div class="col-12 order-2 col-sm-6 order-sm-1 col-md-12 order-md-2 col-lg-6 order-lg-1 col-xl-12 order-xl-2 col-xxl-6 order-xxl-1 text-justify">
									<p class="fs-6">
										Example:<br>
										If the current ratio of is 1 {{token}} to .5 x{{token}}  (2 {{token}} = 1 x{{token}}), after a pay out the ratio will increase.  It might go to 1 {{token}} to .45 x{{token}} ( 2.22 {{token}} = 1 x{{token}}), so you will get more {{token}} if you unstake. The increase depends on the amount of {{token}} transaction activity during the week before the pay out.
									</p>
								</div>
								<div class="col-12 order-1 col-sm-6 order-sm-2 col-md-12 order-md-1 col-lg-6 order-lg-2 col-xl-12 order-xl-1 col-xxl-6 order-xxl-2">
									<div class="card bg-dark text-white my-4 p-3 pb-0">
										<div class="card-body">
											<div class="row">
												<div class="col-12 fs-5 text-center">
													<p>
														<span>1 x{{token}} : 2 {{token}}</span><br>
														<span class="fs-6 text-muted">Ratio before rewards</span>
													</p>
												</div>
												<div class="col-12 fs-5 text-center">
													<p>
														<span>1 x{{token}} : 2.22 {{token}}</span><br>
														<span class="fs-6 text-muted">Ratio after rewards</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- BEGIN row -->
							<div class="row" v-if="loaded.pairs.includes(token + 'x' + token) && loaded.contracts.includes(token) && loaded.contracts.includes('x' + token)">
								<!-- BEGIN col-4 -->
								<div class="col-12 col-md-6 col-xxl-3">
									<p class="text-center p-3 border border-muted rounded">
										<span class="fs-1"><i class="fa fa-university"></i></span><br>
										<span class="fs-2">{{(pairs[token + 'x' + token] === undefined) ? Number(0).toFixed(0) : pairs[token + 'x' + token].balances[token].toFixed(0)}}</span><br>
										<span class="fs-6">Total supply</span>
									</p>
								</div>
								<div class="col-12 col-md-6 col-xxl-3">
									<p class="text-center p-3 border border-muted rounded">
										<span class="fs-1"><i class="fa fa-percent"></i></span><br>
										<span class="fs-2">{{(pairs[token + 'x' + token] === undefined || wallet.balances['x' + token] === undefined) ? Number(0).toFixed(0) : Number(wallet.balances['x' + token] * 100 / pairs[token + 'x' + token].balances[token]).toFixed(2)}}</span><br>
										<span class="fs-6">Your stake</span>
									</p>
								</div>
								<div class="col-12 col-md-6 col-xxl-3">
									<p class="text-center p-3 border border-muted rounded">
										<span class="fs-1"><i class="fa fa-angle-double-right"></i></span><br>
										<span class="fs-2">1 : {{(pairs[token + 'x' + token] === undefined) ? Number(0).toFixed(0) : pairs[token + 'x' + token].ratio.toFixed(2)}}</span><br>
										<span class="fs-6">{{token}} / x{{token}}</span>
									</p>
								</div>
								<div class="col-12 col-md-6 col-xxl-3">
									<p class="text-center p-3 border border-muted rounded">
										<span class="fs-1"><i class="fa fa-angle-double-left"></i></span><br>
										<span class="fs-2">{{(pairs[token + 'x' + token] === undefined) ? Number(0).toFixed(0) : pairs[token + 'x' + token].inverse.toFixed(2)}} : 1</span><br>
										<span class="fs-6">{{token}} / x{{token}}</span>
									</p>
								</div>
								<!-- END col-4 -->
							</div>
							<!-- END row -->
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 col-xl-6 order-1 order-xl-2" v-if="loaded.contracts.includes(token) && loaded.contracts.includes('x'+token)">
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
										<span class="pe-3 float-end">Balance: {{(wallet.balances[token] === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : Number(wallet.balances[token]).toFixed($root.$children[0].displayDecimals)}} {{token}}</span>
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
										<input class="form-control form-control-lg border-0 text-white bg-transparent w-100 text-end" disabled type="text" placeholder="0.0" aria-label="staking amount" v-bind:value="'≃ ' + estimated.stake + ' x' + token">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-12 px-0">
									<button v-if="!(contracts['x' + token] !== undefined && contracts['x' + token].allowance > 0)" class="btn btn-info text-dark fs-3 w-100" v-on:click="approve('x' + token)">{{(approves['x' + token].use === true) ? 'PROCESSING...' : 'APPROVE'}}</button>
									<button v-if="contracts['x' + token] !== undefined && contracts['x' + token].allowance > 0" class="btn btn-primary text-dark fs-3 w-100" v-on:click="stakeTokens()">{{(staking.use === true) ? 'PROCESSING...' : 'STAKING'}}</button>
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
										<span class="pe-3 float-end">Balance: {{(wallet.balances['x' + token] === undefined) ? Number(0).toFixed($root.$children[0].displayDecimals) : Number(wallet.balances['x' + token]).toFixed($root.$children[0].displayDecimals)}} x{{token}}</span>
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
										<input class="form-control form-control-lg border-0 text-white bg-transparent w-100 text-end" disabled type="text" placeholder="0.0" aria-label="staking amount" v-bind:value="'≃ ' + estimated.unstake + ' ' + token">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-12 px-0">
									<button v-if="!(contracts['x' + token] !== undefined && contracts['x' + token].allowance > 0)" class="btn btn-info text-dark fs-3 w-100" v-on:click="approve('x' + token)">{{(approves['x' + token].use === true) ? 'PROCESSING...' : 'APPROVE'}}</button>
									<button v-if="contracts['x' + token] !== undefined && contracts['x' + token].allowance > 0" class="btn btn-secondary text-dark fs-3 w-100" v-on:click="unstakeTokens()">{{(unstaking.use === true) ? 'PROCESSING...' : 'UNSTAKE'}}</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- END col-6 -->
		</div>
		<!-- END row -->
	</div>
</template>

<script>
    import {mapState} from 'vuex';
    const textStake = require('../text/stake.json');

    export default {

        props: {
        },

        data() {
            return {
				textStake: textStake,
				token: this.$route.params.token.toUpperCase(),
                forceRender: 0,
                requiredContracts: [],
                requiredPairs: [],
				estimated: {
					stake: Number(0).toFixed(this.$root.$children[0].displayDecimals),
					unstake: Number(0).toFixed(this.$root.$children[0].displayDecimals),
				},
                staking: {
					amount: null,
					maxButtonClicked: false,
					listenChange: true,
					message: '',
					use: false,
				},
                unstaking: {
					amount: null,
					maxButtonClicked: false,
					listenChange: true,
					message: '',
					use: false,
				},
                approves: {},
				loaded: {
					contracts: [],
					pairs: [],
				}
            }
        },

        created() {
			this.requiredContracts.push(this.token);
			this.requiredContracts.push('x'+this.token);
			this.requiredPairs.push(this.token+'x'+this.token);
			this.approves['x' + this.token] = {
				message: '',
				use: false,
			};
			if (this.session.isConnected === true) {this.initiate();}

            this.$eventBus.$on("contracts/instantiateContract", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getWalletBalance', event.payload);
            });

            this.$eventBus.$on("wallet/getWalletBalance", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('callAllowanceAmount', event.payload);
            });

            this.$eventBus.$on("updateAllowanceAmount", (event) => {
                if (!this.requiredContracts.includes(event.payload)) {return;}
                if (this.loaded.contracts.includes(event.payload)) {return;}
                this.loaded.contracts.push(event.payload);
            });

            this.$eventBus.$on("pairs/instantiatePair", (event) => {
                if (!this.requiredPairs.includes(event.payload)) {return;}
                if (this.loaded.pairs.includes(event.payload)) {return;}
				this.loaded.pairs.push(event.payload);
            });
        },

        updated () {
        },

        computed: {
            ...mapState(['contracts', 'pairs', 'session', 'wallet', 'web3'])
		},

        watch: {
            "session.isConnected": function(newVal, oldVal) {
                if (newVal === true && oldVal === false) {this.initiate();}
            },

			"staking.amount": function(newVal, oldVal) {
				if (this.staking.listenChange === false) {this.staking.listenChange = true; return;}
				this.staking.maxButtonClicked = false;
			},

			"unstaking.amount": function(newVal, oldVal) {
				if (this.unstaking.listenChange === false) {this.unstaking.listenChange = true; return;}
				this.unstaking.maxButtonClicked = false;
			}
        },

        methods: {
            initiate: function() {
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredContracts', this.requiredContracts);
                this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay('getRequiredPairs', this.requiredPairs);
            },

			calculateEstimation: function(value) {
				if (this.pairs[this.token + 'x' + this.token] === undefined) {this.estimated[value] = Number(0).toFixed(this.$root.$children[0].displayDecimals);}
				if (value === 'stake') {this.estimated.stake = (this.staking.amount * this.pairs[this.token + 'x' + this.token].ratio).toFixed(this.$root.$children[0].displayDecimals);}
				if (value === 'unstake') {this.estimated.unstake = (this.unstaking.amount * this.pairs[this.token + 'x' + this.token].inverse).toFixed(this.$root.$children[0].displayDecimals);}
			},

			maxStake: function() {
				this.staking.amount = String(this.wallet.balances[this.token]);
				this.staking.maxButtonClicked = true;
				this.staking.listenChange = false;
				this.calculateEstimation('stake');
			},

			maxUnstake: function() {
				this.unstaking.amount = String(this.wallet.balances['x' + this.token]);
				this.unstaking.maxButtonClicked = true;
				this.unstaking.listenChange = false;
				this.calculateEstimation('unstake');
			},

            approve: async function(contract) {
				if (this.approves[contract].use === false) {
					this.approves[contract].use = true;
					try {
						var response = await this.$calls.approve(this.wallet.account, false, this.contracts[contract].address, this.contracts[this.token]);
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
						if (this.staking.maxButtonClicked === true) {var response = await this.$calls.stake(this.wallet.weiBalances[this.token], this.wallet.account, false, this.contracts['x' + this.token]);}
						if (response === undefined) {var response = await this.$calls.stake(this.web3.instance.utils.toWei(this.staking.amount), this.wallet.account, false, this.contracts['x' + this.token]);}
					} catch (e) {
						console.log(e);
						this.staking.use = false;
						return;
					}
					this.$store.dispatch("wallet/getWalletBalance", this.token);
					this.$store.dispatch("wallet/getWalletBalance", 'x' + this.token);
					this.staking.amount = null;
					this.staking.use = false;
				}
			},

			unstakeTokens: async function() {
				if (this.unstaking.use === false) {
					this.unstaking.use = true;
					try {
						if (this.unstaking.maxButtonClicked === true) {var response = await this.$calls.unstake(this.wallet.weiBalances['x' + this.token], this.wallet.account, false, this.contracts['x' + this.token]);}
						if (response === undefined) {var response = await this.$calls.unstake(this.web3.instance.utils.toWei(this.unstaking.amount), this.wallet.account, false, this.contracts['x' + this.token]);}
					} catch (e) {
						console.log(e);
						this.unstaking.use = false;
						return;
					}
					this.$store.dispatch("wallet/getWalletBalance", this.token);
					this.$store.dispatch("wallet/getWalletBalance", 'x' + this.token);
					this.unstaking.amount = null;
					this.unstaking.use = false;
				}
			},
		},

        mounted() {
            this.initiate();
		}
    }
</script>