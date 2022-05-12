<template>
  <div>
    <!-- BEGIN row -->
    <div class="row">
      <div class="col-12 col-xl-6 order-1 order-xl-1">
        <div class="card bg-dark text-white mb-3 p-3 pb-0">
          <div class="card-body">
            <!-- BEGIN row -->
            <div class="row">
              <!-- BEGIN col-4 -->
              <div class="col-md-3 col-sm-6 col-12">
                <p
                  class="text-center p-2 border border-muted rounded box-height"
                >
                  <span class="fs-1 refinery-icons"
                    ><img src="/assets/img/refinery-icons/Available.PNG"
                  /></span>
                  <span class="fs-6">Available</span><br />
                  <span class="fs-6">{{ this.refineryDetail.available }}</span
                  ><br />
                  <span class="fs-6"
                    >HFUEL ≈
                    {{
                      pairs.BUSDHFUEL === undefined
                        ? "0"
                        : (
                            this.refineryDetail.available *
                            pairs.BUSDHFUEL.ratio
                          ).toFixed(2)
                    }}
                    BUSD</span
                  >
                </p>
              </div>
              <div class="col-md-3 col-sm-6 col-12">
                <p
                  class="text-center p-2 border border-muted rounded box-height"
                >
                  <span class="fs-1 refinery-icons"
                    ><img src="/assets/img/refinery-icons/Deposit.PNG"
                  /></span>
                  <span class="fs-6">Deposits</span><br />
                  <span class="fs-6">{{ this.refineryDetail.deposits }}</span
                  ><br />
                  <span class="fs-6"
                    >HFUEL ≈
                    {{
                      pairs.BUSDHFUEL === undefined
                        ? "0"
                        : (
                            this.refineryDetail.deposits * pairs.BUSDHFUEL.ratio
                          ).toFixed(2)
                    }}
                    BUSD</span
                  >
                </p>
              </div>
              <div class="col-md-3 col-sm-6 col-12">
                <p
                  class="text-center p-2 border border-muted rounded box-height"
                >
                  <span class="fs-1 refinery-icons"
                    ><img src="/assets/img/refinery-icons/TotalClaimed.PNG"
                  /></span>
                  <span class="fs-6">Claimed</span><br />
                  <span class="fs-6">{{ this.refineryDetail.claimed }}</span
                  ><br />
                  <span class="fs-6">HFUEL</span>
                </p>
              </div>
              <div class="col-md-3 col-sm-6 col-12">
                <p
                  class="text-center p-2 border border-muted rounded box-height"
                >
                  <span class="fs-1 refinery-icons"
                    ><img src="/assets/img/refinery-icons/referrals.png"
                  /></span>
                  <span class="fs-6">Referral Rewards</span><br />
                  <span class="fs-6">{{
                    this.refineryDetail.referralRewards
                  }}</span
                  ><br />
                  <span class="fs-6">HFUEL</span>
                </p>
              </div>
              <div class="col-md-3 col-sm-6 col-12">
                <p
                  class="text-center p-2 border border-muted rounded box-height"
                >
                  <span class="fs-1 refinery-icons"
                    ><img src="/assets/img/refinery-icons/MaxPayout.PNG"
                  /></span>
                  <span class="fs-6">Max Payout</span><br />
                  <span class="fs-6">{{ this.refineryDetail.maxPayout }}</span
                  ><br />
                  <span class="fs-6">HFUEL</span>
                </p>
              </div>
              <div class="col-md-3 col-sm-6 col-12">
                <p
                  class="text-center p-2 border border-muted rounded box-height"
                >
                  <span class="fs-1 refinery-icons"
                    ><img src="/assets/img/refinery-icons/Team.PNG"
                  /></span>
                  <span class="fs-6">Team</span><br />
                  <span class="fs-6">{{ this.refineryDetail.team }}</span
                  ><br />
                  <span class="fs-6">Players (Direct / Total)</span>
                </p>
              </div>
              <div class="col-md-3 col-sm-6 col-12">
                <p
                  class="text-center p-2 border border-muted rounded box-height"
                >
                  <span class="fs-1 refinery-icons"
                    ><img src="/assets/img/refinery-icons/SK.PNG"
                  /></span>
                  <span class="fs-6">xSK Balance</span><br />
                  <span class="fs-6">{{
                    this.refineryDetail.skTokenBalance
                  }}</span
                  ><br />
                  <span class="fs-6">{{
                    this.refineryDetail.skCorrespondingLevel
                  }}</span>
                </p>
              </div>
              <div class="col-md-3 col-sm-6 col-12">
                <p
                  class="text-center p-2 border border-muted rounded box-height"
                >
                  <span class="fs-1 refinery-icons"
                    ><img src="/assets/img/refinery-icons/HNW.PNG"
                  /></span>
                  <span class="fs-6">xHNW Balance</span><br />
                  <span class="fs-6">{{
                    this.refineryDetail.hnwTokenBalance
                  }}</span
                  ><br />
                  <span class="fs-6">{{
                    this.refineryDetail.hnwCorrespondingLevel +
                    ` | Lvl ${this.refineryDetail.balanceLevel}`
                  }}</span>
                </p>
              </div>
              <!-- END col-4 -->
            </div>
            <!-- END row -->
            <!-- BEGIN row -->

            <!-- END row -->
            <!-- BEGIN row -->

            <!-- END row -->
            <p>
              The Refinery is an open-ended blockchain CD that allows you to
              deposit and compound HFUEL tokens daily. By holding xHNW and xSK ,
              you can increase your daily payout percentage and the total
              rewards you can earn, while also earning from transaction fees of
              both HNW and SK.
            </p>
            <!--
            <p class="row">
              <span class="col-4">HNW Contract Address: </span>

              <a
                class="col-6"
                href="https://bscscan.com/address/0x8173ccc721111b5a93ce7fa6fec0fc077b58b1b7"
              >
                <span>{{ this.contracts.HNW.address }}</span>
              </a>
              <span class="col-2">
                <button
                  class="btn btn-info meta-btn"
                  v-on:click="addToMetamask('hnw')"
                >
                  <img
                    src="../../../public/assets/img/logo/metamask-logo.png"
                  />
                </button>
              </span>
            </p> -->

            <p class="row">
              <span class="col-4">HFUEL Contract Address: </span>

              <a
                class="col-6"
                :href="
                  'https://bscscan.com/address/' + this.contracts.HFUEL.address
                "
              >
                <span>{{ this.contracts.HFUEL.address }}</span>
              </a>
              <span class="col-2">
                <button
                  class="btn btn-info meta-btn"
                  v-on:click="addToMetamask('hfuel')"
                >
                  <img
                    src="../../../public/assets/img/logo/metamask-logo.png"
                  />
                </button>
              </span>
            </p>
            <p class="row">
              <span class="col-4">xHNW Token Contract Address: </span>

              <a
                class="col-6"
                :href="
                  'https://bscscan.com/address/' + this.contracts.xHNW.address
                "
              >
                <span>{{ this.contracts.xHNW.address }}</span>
              </a>
              <span class="col-2">
                <button
                  class="btn btn-info meta-btn"
                  v-on:click="addToMetamask('xhnw')"
                >
                  <img
                    src="../../../public/assets/img/logo/metamask-logo.png"
                  />
                </button>
              </span>
            </p>

            <!--
            <p class="row">
              <span class="col-4">SK Token Contract Address: </span>

              <a
                class="col-6"
                href="https://bscscan.com/address/0x8173ccc721111b5a93ce7fa6fec0fc077b58b1b7"
              >
                <span>{{ this.contracts.SK.address }}</span>
              </a>
              <span class="col-2">
                <button
                  class="btn btn-info meta-btn"
                  v-on:click="addToMetamask('sk')"
                >
                  <img
                    src="../../../public/assets/img/logo/metamask-logo.png"
                  />
                </button>
              </span>
            </p> 
            -->
            <p class="row">
              <span class="col-4">xSK Token Contract Address: </span>

              <a
                class="col-6"
                :href="
                  'https://bscscan.com/address/' + this.contracts.xSK.address
                "
              >
                <span>{{ this.contracts.xSK.address }}</span>
              </a>
              <span class="col-2">
                <button
                  class="btn btn-info meta-btn"
                  v-on:click="addToMetamask('xsk')"
                >
                  <img
                    src="../../../public/assets/img/logo/metamask-logo.png"
                  />
                </button>
              </span>
            </p>
            <div class="row">
              <div class="col-12 text-start fs-5">
                <span class="pe-3"
                  ><a
                    target="_blank"
                    href="https://www.youtube.com/watch?v=KeGkHmg0azY"
                    >Checkout Refinery Tutorial Here!</a
                  ></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-6 order-2 order-xl-2">
        <div class="card bg-dark text-white mb-3 p-3">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-12 text-center fs-4">
                <span class="ft-fram-l"><b>Deposit</b></span>
              </div>
            </div>
            <div
              class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3"
            >
              <div class="row">
                <div class="col-12 text-start fs-5">
                  <span>Amount</span>
                  <span class="pe-3 float-end"
                    >Hfuel Balance: {{ this.hfuelBalance }}</span
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-12 text-start fs-5">
                  <div class="input-group text-white bg-transparent w-100">
                    <input
                      class="form-control form-control-lg bg-transparent border border-primary"
                      type="text"
                      placeholder="0.0"
                      aria-label="deposit amount"
                      v-model="refinery.amount"
                      v-on:keyup="manualDepositAmount()"
                    />
                    <button
                      type="button"
                      class="btn btn-primary text-dark"
                      v-on:click="maxDeposit()"
                    >
                      MAX
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <p>
                A minimum of 1 HFUEL required for deposits * <br />A 5% tax is
                charged on deposits *
              </p>
              <div class="col-md-4 col-sm-12 mb-3">
                <button
                  class="btn btn-info text-dark fs-3 w-100 deposit-btn"
                  v-on:click="depositRefinery()"
                  :disabled="isDisableButton('deposit')"
                >
                  <Preloader v-show="this.isLoading.deposit" width="6%" />
                  <span v-show="!this.isLoading.deposit">{{
                    this.refinery.label
                  }}</span>
                </button>
              </div>
              <div class="col-md-4 col-sm-12 mb-3">
                <button
                  class="btn btn-info text-dark fs-3 w-100 roll-btn"
                  v-on:click="roll()"
                  :disabled="isDisableButton('roll')"
                >
                  <Preloader v-show="this.isLoading.roll" width="6%" />
                  <span v-show="!this.isLoading.roll"> Refuel</span>
                </button>
              </div>
              <div class="col-md-4 col-sm-12 mb-3">
                <button
                  class="btn btn-info text-dark fs-3 w-100 claim-btn"
                  v-on:click="claim()"
                  :disabled="isDisableButton('claim')"
                >
                  <Preloader v-show="this.isLoading.claim" width="6%" />
                  <span v-show="!this.isLoading.claim"> Claim</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-dark text-white mb-3 p-3 pb-0">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-12 text-center fs-4">
                <span class="ft-fram-l"><b>Get a Wingman</b></span>
              </div>
            </div>
            <div
              class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3"
              v-if="allowUpdateBuddy"
            >
              <div class="row">
                <div class="col-12 text-start fs-5">
                  <h4>Wingman Lookup</h4>
                  <span>Wingman</span>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-12 text-start fs-5">
                  <div class="input-group text-white bg-transparent w-100">
                    <input
                      class="form-control form-control-lg bg-transparent border border-primary"
                      type="text"
                      placeholder="Address"
                      aria-label="staking amount"
                      v-model="inputBuddyAddress"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4"><h5>Current Wingman</h5></div>
              <div class="col-8">
                <h5>{{ this.buddyAddress }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-4"><h5>Last Checkin</h5></div>
              <div class="col-8">
                <h5>{{ this.buddyDetail.last_checkin }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-4"><h5>Inactivity Threshold</h5></div>
              <div class="col-8">
                <h5>{{ this.buddyDetail.last_heartbeat }}</h5>
              </div>
            </div>
            <div class="row" v-if="allowUpdateBuddy">
              <div class="col-12 px-0 d-flex">
                <button
                  class="btn btn-info text-dark fs-3"
                  v-on:click="updateBuddyAddress()"
                  :disabled="isDisableButton('updateBuddyAddress')"
                >
                  <Preloader
                    v-show="this.isLoading.updateBuddyAddress"
                    width="6%"
                  />
                  <span v-show="!this.isLoading.updateBuddyAddress">
                    Update</span
                  >
                </button>
                <button
                  class="btn btn-info text-dark fs-3"
                  v-on:click="setSupportBuddyAddress()"
                >
                  Support Marketing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END col-6 -->
    </div>
    <!-- END row -->
    <!-- BEGIN row -->
    <div class="row">
      <!-- <div class="col-12 col-xl-6 order-1 order-xl-1">
      </div> -->
      <div class="col-12 order-1 order-xl-2">
        <div class="card bg-dark text-white mb-3 p-3">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-12 text-center fs-4">
                <span class="ft-fram-l"><b>Checkout Refiners</b></span>
              </div>
            </div>
            <div
              class="row border border-muted bg-gray-800 bg-opacity-60 rounded py-3 mb-3"
            >
              <div class="row">
                <div class="col-12 text-start fs-5">
                  <h4>Player Lookup</h4>
                  <span>Player</span>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-12 text-start fs-5">
                  <div class="input-group text-white bg-transparent w-100">
                    <input
                      class="form-control form-control-lg bg-transparent border border-primary"
                      type="text"
                      placeholder="Address"
                      aria-label="staking amount"
                      v-model="playerInfo.address"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 px-0">
                <button
                  class="btn btn-info text-dark fs-3"
                  v-on:click="searchPlayerInfo()"
                  :disabled="isDisableButton('searchPlayerInfo')"
                >
                  <Preloader
                    v-show="this.isLoading.searchPlayerInfo"
                    width="6%"
                  />
                  <span v-show="!this.isLoading.searchPlayerInfo"> Search</span>
                </button>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-12 px-0">
                <h4>Player Info</h4>
                <br />
                <div class="row">
                  <div class="col-6"><label>Directs</label></div>
                  <div class="col-6">
                    <h4>{{ playerInfo.directs }}</h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6"><label>Team</label></div>
                  <div class="col-6">
                    <h4>{{ playerInfo.team }}</h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6"><label>Net Deposits</label></div>
                  <div class="col-6">
                    <h4>{{ playerInfo.netDeposits }} Hfuel</h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <label>Airdrop Sent / Received</label>
                  </div>
                  <div class="col-6">
                    <h4>
                      {{ playerInfo.airdropSent }} /
                      {{ playerInfo.airdropReceived }}
                      HFUEL
                    </h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6"><label>Airdrop Last Sent</label></div>
                  <div class="col-6">
                    <h4>{{ playerInfo.airdropLastSent }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END row -->
    <div class="row">
      <div class="col-12 col-xl-12 order-2 order-xl-1">
        <div class="col-12">
          <div class="card bg-dark text-white mb-3 p-3 pb-0">
            <div class="card-body">
              <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="teamviewer-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#teamviewer"
                    type="button"
                    role="tab"
                    aria-controls="teamviewer"
                    aria-selected="true"
                  >
                    Team Viewer
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="teamairdrop-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#teamairdrop"
                    type="button"
                    role="tab"
                    aria-controls="teamairdrop"
                    aria-selected="false"
                  >
                    Team Airdrop
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="directairdrop-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#directairdrop"
                    type="button"
                    role="tab"
                    aria-controls="directairdrop"
                    aria-selected="false"
                  >
                    Direct Airdrop
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade active show"
                  id="teamviewer"
                  role="tabpanel"
                  aria-labelledby="teamviewer-tab"
                >
                  <div class="row">
                    <div class="col-12 col-md-12 text-start fs-5 mb-3">
                      <div class="text-white bg-transparent w-100">
                        <label class="form-label">Player</label>
                        <input
                          class="form-control form-control-lg bg-transparent border border-primary"
                          type="text"
                          placeholder="Address"
                          aria-label="staking amount"
                          v-model="teamViewer.playerAddress"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 fs-5 d-flex justify-content-end mb-2">
                      <button
                        class="btn btn-info text-dark fs-3"
                        v-on:click="useMyAddressTeamViewer()"
                      >
                        <span>Use My Address</span>
                      </button>
                      &nbsp;&nbsp;
                      <button
                        class="btn btn-info text-dark fs-3"
                        v-on:click="
                          viewAllRefineryInfoTestnet(
                            supportBuddyAddress,
                            'viewAllRefineryInfoTestnet'
                          )
                        "
                        :disabled="
                          isDisableButton('viewAllRefineryInfoTestnet')
                        "
                      >
                        <Preloader
                          v-show="this.isLoading.viewAllRefineryInfoTestnet"
                          width="6%"
                        />
                        <span
                          v-show="!this.isLoading.viewAllRefineryInfoTestnet"
                        >
                          View All</span
                        >
                      </button>
                    </div>
                    <div class="col-12 fs-5">
                      <button
                        class="btn btn-info text-dark fs-3"
                        v-on:click="
                          viewAllRefineryInfoTestnet(
                            teamViewer.playerAddress,
                            'getRefineryInfo'
                          )
                        "
                        :disabled="isDisableButton('getRefineryInfo')"
                      >
                        <Preloader
                          v-show="this.isLoading.getRefineryInfo"
                          width="6%"
                        />
                        <span v-show="!this.isLoading.getRefineryInfo"
                          >Show</span
                        >
                      </button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 fs-5">
                      <ul style="list-style-type: none">
                        <Tree class="item" :model="teamData"></Tree>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="teamairdrop"
                  role="tabpanel"
                  aria-labelledby="teamairdrop-tab"
                >
                  <div class="row">
                    <div class="col-12 col-md-12 text-start fs-5 mb-3">
                      <div class="text-white bg-transparent w-100">
                        <label class="form-label">Player</label>
                        <input
                          class="form-control form-control-lg bg-transparent border border-primary"
                          v-model="teamAirdrop.playerAddress.value"
                          type="text"
                          placeholder="Address"
                        />
                      </div>
                      <span
                        class="error-message"
                        v-if="teamAirdrop.playerAddress.error"
                        >{{ teamAirdrop.playerAddress.error }}</span
                      >
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 fs-5 d-flex justify-content-end">
                      <button
                        class="btn btn-info text-dark fs-3"
                        v-on:click="useMyAddressTeamAirDrop()"
                      >
                        Use My Address
                      </button>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 col-md-12 text-start fs-5 mb-3">
                      <div class="text-white bg-transparent w-100">
                        <label class="form-label">Campaign</label>
                        <select
                          class="form-control form-control-lg bg-transparent border border-primary"
                          v-model="teamAirdrop.campaign.value"
                        >
                          <option value="0">
                            Divide budget between all matching players
                          </option>
                          <option value="1">
                            Divide budget to one matching player *
                          </option>
                          <option value="3">
                            Divided budget across 3 matching players *
                          </option>
                          <option value="5">
                            Divided budget across 5 matching players *
                          </option>
                          <option value="10">
                            Divided budget across 10 matching players *
                          </option>
                          <option value="20">
                            Divided budget across 20 matching players *
                          </option>
                          <option value="50">
                            Divided budget across 50 matching players *
                          </option>
                          <option value="100">
                            Divided budget across 100 matching players *
                          </option>
                        </select>
                        <small class="form-text text-muted"
                          >* Eligible matching players selected at random</small
                        >
                      </div>
                      <span
                        class="error-message"
                        v-if="teamAirdrop.campaign.error"
                        >{{ teamAirdrop.campaign.error }}</span
                      >
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-4 text-start fs-5 mb-3">
                      <div class="text-white bg-transparent w-100">
                        <label class="form-label">Minimum directs</label>
                        <select
                          class="form-control form-control-lg bg-transparent border border-primary"
                          v-model="teamAirdrop.minDirects.value"
                        >
                          <option value="1">1</option>
                          <option value="5">5</option>
                          <option value="15">15</option>
                          <option value="0">None</option>
                        </select>
                      </div>
                      <span
                        class="error-message"
                        v-if="teamAirdrop.minDirects.error"
                        >{{ teamAirdrop.minDirects.error }}</span
                      >
                    </div>
                    <div class="col-12 col-md-4 text-start fs-5 mb-3">
                      <div class="text-white bg-transparent w-100">
                        <label class="form-label">Team depth</label>
                        <select
                          class="form-control form-control-lg bg-transparent border border-primary"
                          v-model="teamAirdrop.teamDepth.value"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="30">30</option>
                        </select>
                      </div>
                      <span
                        class="error-message"
                        v-if="teamAirdrop.teamDepth.error"
                        >{{ teamAirdrop.teamDepth.error }}</span
                      >
                    </div>
                    <div class="col-12 col-md-4 text-start fs-5 mb-3">
                      <div class="text-white bg-transparent w-100">
                        <label class="form-label">Minimum net deposits</label>
                        <select
                          class="form-control form-control-lg bg-transparent border border-primary"
                          v-model="teamAirdrop.minNetDeposit.value"
                        >
                          <option value="1">1+ HFUEL</option>
                          <option value="50">50+ HFUEL</option>
                          <option value="100">100+ HFUEL</option>
                          <option value="250">250+ HFUEL</option>
                          <option value="500">500+ HFUEL</option>
                          <option value="1000">1000+ HFUEL</option>                          
                          <option value="5000">5000+ HFUEL</option>
                          <option value="10000">10000+ HFUEL</option>
                          <option value="20000">20000+ HFUEL</option>
                          <option value="30000">30000+ HFUEL</option>
                          <option value="40000">40000+ HFUEL</option>
                          <option value="50000">50000+ HFUEL</option>
                          <option value="60000">60000+ HFUEL</option>
                          <option value="70000">70000+ HFUEL</option>
                          <option value="100000">100000+ HFUEL</option>
                        </select>
                      </div>
                      <span
                        class="error-message"
                        v-if="teamAirdrop.minNetDeposit.error"
                        >{{ teamAirdrop.minNetDeposit.error }}</span
                      >
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-6 text-start fs-5">
                      <div class="text-white bg-transparent w-100 mb-3">
                        <label class="form-label">Budget</label>
                        <input
                          class="form-control form-control-lg bg-transparent border border-primary"
                          v-model="teamAirdrop.budget.value"
                          type="text"
                          value="0"
                          placeholder="HFUEL"
                        />
                        <span
                          class="error-message"
                          v-if="teamAirdrop.budget.error"
                          >{{ teamAirdrop.budget.error }}</span
                        >
                      </div>

                      <!-- [START] remove disabled -->
                      <button
                        class="btn btn-info text-dark fs-3"
                        v-on:click="executeTeamAirDrop()"
                        :disabled="isDisableButton('executeTeamAirDrop')"
                      >
                        <Preloader
                          v-show="this.isLoading.executeTeamAirDrop"
                          width="6%"
                        />
                        <span v-show="!this.isLoading.executeTeamAirDrop"
                          >Run</span
                        >
                      </button>
                    </div>
                    <div class="col-6 col-md-6 text-end fs-5">
                      Available: {{ this.hfuelBalance }} Hfuel <br />
                      Number of recipients:
                      {{
                        !this.isLoading.executeTeamAirDrop
                          ? this.compaignList.totalRecipients
                          : 0
                      }}
                      <br />
                      Estimated Hfuel per person:
                      {{
                        !this.isLoading.executeTeamAirDrop &&
                        this.compaignList.totalRecipients
                          ? this.teamAirdrop.budget.value /
                            this.compaignList.totalRecipients
                          : "N/A"
                      }}
                      <br />
                      <!-- [START] remove disabled -->
                      <button
                        class="btn btn-info text-dark fs-3"
                        v-on:click="sendTeamAirDrop()"
                        :disabled="isDisableButton('sendTeamAirDrop')"
                      >
                        <Preloader
                          v-show="this.isLoading.sendTeamAirDrop"
                          width="6%"
                        />
                        <span v-show="!this.isLoading.sendTeamAirDrop"
                          >Send</span
                        >
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-6 col-md-6 text-start fs-5">
                      <h4>Campaign Console</h4>
                      <div class="text-white bg-transparent w-100 mb-3">
                        <textarea
                          rows="15"
                          disabled
                          v-model="compaignList.logs"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-6 col-md-6 fs-5">
                      <h4>Campaign Viewer</h4>
                      <table class="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Address</th>
                            <th>Directs</th>
                            <th>Team Depth</th>
                            <th>Deposits</th>
                          </tr>
                        </thead>
                        <tbody
                          v-if="
                            !this.isLoading.executeTeamAirDrop &&
                            compaignList.filteredRecipients.length
                          "
                          key="compaignList"
                        >
                          <tr
                            v-for="(
                              item, key, index
                            ) in compaignList.filteredRecipients"
                            v-bind:key="index"
                          >
                            <td>{{ key + 1 }}</td>
                            <td>
                              <a
                                :href="
                                  'https://bscscan.com/address/' + item.address
                                "
                                class="tooltip"
                              >
                                {{ item.address.substring(0, 8) + "..." }}
                                <span class="tooltiptext">{{
                                  item.address
                                }}</span>
                              </a>
                            </td>
                            <td>{{ item.directs }}</td>
                            <td>{{ item.teamDepth }}</td>
                            <td>{{ item.deposits }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <Preloader
                        v-show="this.isLoading.executeTeamAirDrop"
                        width="6%"
                      />
                      <div
                        class="row"
                        v-if="
                          !compaignList.filteredRecipients.length &&
                          !this.isLoading.executeTeamAirDrop
                        "
                      >
                        <div class="col-12 fs-5 d-flex justify-content-center">
                          <span class="fa fa-archive fa-4x"></span>
                        </div>
                        <div class="col-12 fs-5 d-flex justify-content-center">
                          <div>No Data</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="directairdrop"
                  role="tabpanel"
                  aria-labelledby="directairdrop-tab"
                >
                  <div class="row">
                    <div class="col-12 text-start fs-5 mb-3">
                      <h4>Direct Airdrop</h4>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-12 text-start fs-5 mb-3">
                      <div class="text-white bg-transparent w-100">
                        <label class="form-label">Player</label>
                        <input
                          class="form-control form-control-lg bg-transparent border border-primary"
                          type="text"
                          placeholder="Address"
                          v-model="airDrop.player"
                        />
                      </div>
                    </div>
                    <div class="col-12 fs-5 d-flex justify-content-end">
                      <span>Available: {{ this.hfuelBalance }} Hfuel</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-12 text-start fs-5 mb-3">
                      <div class="text-white bg-transparent w-100">
                        <label class="form-label">Amount</label>
                        <input
                          class="form-control form-control-lg bg-transparent border border-primary"
                          type="number"
                          :min="0"
                          placeholder="Hfuel"
                          v-model="airDrop.amount"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 fs-5">
                      <button
                        class="btn btn-info text-dark fs-3"
                        v-on:click="sendAirDrop()"
                        :disabled="isDisableButton('sendAirDrop')"
                      >
                        <Preloader
                          v-show="this.isLoading.sendAirDrop"
                          width="6%"
                        />
                        <span v-show="!this.isLoading.sendAirDrop">Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 
    <div class="col-12 col-xl-12 order-2 order-xl-1">
      <div class="col-12">
        <div class="card bg-dark text-white mb-3 p-3 pb-0">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-12 text-center fs-4">
                <span class="ft-fram-l"><b>About</b></span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>  -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Preloader from "../../components/loader/Preloader.vue";
import Tree from "../../components/TreeView/Tree.vue";
import { MaxUint256 } from "@ethersproject/constants";
import bignumber from "bignumber.js";
import moment from "moment";

let refineryInterval = null;
export default {
  data() {
    return {
      forceRender: 0,
      requiredContracts: [
        "Refinery",
        "BuddySystem",
        "HFUEL",
        "xSK",
        "xHNW",
        "HNW",
        "SK",
      ],
      requiredPairs: ["BUSDHFUEL"],
      loaded: {
        contracts: [],
      },
      refinery: {
        amount: null,
        label: "Deposit",
        maxButtonClicked: false,
        listenChange: true,
        message: "",
        use: false,
      },
      buddyDetail: {
        beneficiary: "None",
        heartbeat_interval: "0",
        last_checkin: "0",
        manager: "None",
        last_heartbeat: "0",
      },
      refineryDetail: {
        available: "...",
        deposits: "...",
        claimed: "...",
        referralRewards: "...",
        maxPayout: "...",
        team: "...",
        skTokenBalance: "...",
        skCorrespondingLevel: "...",
        hnwTokenBalance: "...",
        hnwCorrespondingLevel: "...",
        balanceLevel: 0,
      },
      inputBuddyAddress: "",
      buddyAddress: "0x0000000000000000000000000000000000000000",
      allowUpdateBuddy: false,
      hfuelBalance: "N/A",
      supportBuddyAddress: "0x4C85973AA4D667497FEd1556eE3b3A2D27aE8224",
      isLoading: {},
      airDrop: {
        player: null,
        amount: null,
      },
      playerInfo: {
        address: null,
        directs: "0",
        team: "0",
        netDeposits: "0",
        airdropSent: "0",
        airdropReceived: "0",
        airdropLastSent: "0",
      },
      refreshInterval: 10000,
      teamData: [],
      teamViewer: {
        playerAddress: "",
      },
      teamAirdrop: {
        playerAddress: {
          value: null,
          error: "",
        },
        campaign: {
          value: null,
          error: "",
        },
        minDirects: {
          value: null,
          error: "",
        },
        teamDepth: {
          value: null,
          error: "",
        },
        minNetDeposit: {
          value: null,
          error: "",
        },
        budget: {
          value: null,
          error: "",
        },
      },
      compaignList: {
        totalCandidates: 0,
        totalEligible: 0,
        totalRecipients: 0,
        recipients: [],
        filteredRecipients: [],
        logs: "",
      },
      isMaxDeposit: false,
      currentTeamDepth: 1
    };
  },

  created() {
    this.$eventBus.$on("contracts/instantiateContract", (event) => {
      if (!this.requiredContracts.includes(event.payload)) {
        return;
      }
      this.loaded.contracts.push(event.payload);
      if (this.loaded.contracts.length === this.requiredContracts.length) {
        this.getRefineryData();
        refineryInterval = setInterval(() => {
          if (this.wallet.account && !this.isLoading.getRefineryData) {
            this.refineryDetail = {
              available: "...",
              deposits: "...",
              claimed: "...",
              referralRewards: "...",
              maxPayout: "...",
              team: "...",
              skTokenBalance: "...",
              skCorrespondingLevel: "...",
              hnwTokenBalance: "...",
              hnwCorrespondingLevel: "...",
            };
            this.getRefineryData();
          }
        }, this.refreshInterval);
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getWalletBalance",
        event.payload
      );
    });

    this.$eventBus.$on("wallet/getWalletBalance", (event) => {
      if (!this.requiredContracts.includes(event.payload)) {
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "callAllowanceAmount",
        event.payload
      );
    });

    this.$eventBus.$on("updateAllowanceAmount", (event) => {
      if (!this.requiredContracts.includes(event.payload)) {
        return;
      }
      if (this.loaded.contracts.includes(event.payload)) {
        return;
      }
    });

    this.$eventBus.$on("updatePairRatio", (event) => {
      if (this.requiredPairs.includes(event.pair)) {
        this.$nextTick(function () {
          this.forceRender++;
        });
      }
    });
  },

  updated() {},

  components: {
    Preloader,
    Tree,
  },

  computed: {
    ...mapState(["contracts", "pairs", "session", "wallet", "web3"]),
  },

  watch: {
    "session.isConnected": function (newVal, oldVal) {
      if (newVal === true && oldVal === false) {
        this.initiate();
      }
    },
    "refinery.amount": function (newVal, oldVal) {
      if (this.refinery.listenChange === false) {
        this.refinery.listenChange = true;
        return;
      }
      this.refinery.maxButtonClicked = false;
    },
  },

  methods: {
    initiate: async function () {
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredPairs",
        this.requiredPairs
      );
    },

    getToFixedNum: function (num) {
      return Number(this.web3.instance.utils.fromWei(num, "ether")).toFixed(
        this.$root.$children[0].displayDecimals
      );
    },

    useMyAddressTeamViewer: function () {
      this.teamViewer.playerAddress = this.wallet.account;
    },

    useMyAddressTeamAirDrop: function () {
      this.teamAirdrop.playerAddress.value = this.wallet.account;
    },

    getRefineryInfo: async function (address) {
      let url = `https://us-central1-projectsidekick-9feaf.cloudfunctions.net/getRefineryDownline?address=${address}`;
      return fetch(url).then((response) => response.json());
      // .then((data) => {
      //   if (data.downline) {
      //     return [data];
      //   }
      //   return data;
      // });
    },

    viewAllRefineryInfoTestnet: function (address, buttonName) {
      try {
        this.isLoading = {
          ...this.isLoading,
          [buttonName]: true,
        };
        this.teamViewer.playerAddress = address;
        this.getRefineryInfo(address).then((data) => {
          if (data.downline && data.downline.length === 0) {
            this.showAlert({
              type: "error",
              title: "Error",
              html: "No data found",
            });
          }
          this.teamData = data.downline;
          this.isLoading = {
            ...this.isLoading,
            [buttonName]: false,
          };
        });
      } catch (e) {
        console.log(e);
        this.showAlert({
          type: "error",
          title: "Error",
          html: e.message,
        });
        this.isLoading = {
          ...this.isLoading,
          [buttonName]: false,
        };
        this.getRefineryData();
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
    },

    roll: async function () {
      this.isLoading = { ...this.isLoading, roll: true };
      try {
        const { transactionHash } =
          await this.contracts.Refinery.instance.methods.roll().send({
            from: this.wallet.account,
          });
        this.showAlert({
          type: "success",
          title: "Your transaction has been completed",
          html: `Here is the <a target="_blank" href="https://bscscan.com/tx/${transactionHash}">link</a> of transaction`,
        });
        this.isLoading = { ...this.isLoading, roll: false };
      } catch (e) {
        console.log(e);
        this.showAlert({
          type: "error",
          title: "Error",
          html: e.message,
        });
        this.isLoading = { ...this.isLoading, roll: false };
        this.getRefineryData();
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
    },

    setBuddyDetail: function (custody) {
      let {
        beneficiary = "None",
        heartbeat_interval = "0",
        last_checkin = "0",
        manager = "None",
        last_heartbeat = "0",
      } = custody;
      if (/^0x0+$/.test(beneficiary)) {
        beneficiary = "None";
      }
      if (/^0x0+$/.test(manager)) {
        manager = "None";
      }
      last_checkin =
        last_checkin && parseInt(last_checkin) !== 0
          ? moment.unix(last_checkin).utc().format("YYYY-MM-DD hh:mm a") +
            " UTC"
          : "None";
      this.buddyDetail = {
        beneficiary,
        heartbeat_interval,
        last_checkin,
        manager,
        last_heartbeat,
      };
    },

    getRefineryData: function () {
      console.log("getRefineryData");
      this.isLoading = { ...this.isLoading, getRefineryData: true };
      let RefineryMethod =
        this.contracts.Refinery && this.contracts.Refinery.instance.methods;
      let SKTokenMethod =
        this.contracts.xSK && this.contracts.xSK.instance.methods;
      let HNWTokenMethod =
        this.contracts.xHNW && this.contracts.xHNW.instance.methods;
      let HfuelMethod =
        this.contracts.HFUEL && this.contracts.HFUEL.instance.methods;
      let BuddySystemMethod =
        this.contracts.BuddySystem &&
        this.contracts.BuddySystem.instance.methods;
      if (RefineryMethod && SKTokenMethod && HNWTokenMethod && HfuelMethod) {
        let promises = [
          RefineryMethod.custody(this.wallet.account).call(),
          RefineryMethod.claimsAvailable(this.wallet.account).call(),
          RefineryMethod.userInfo(this.wallet.account).call(),
          RefineryMethod.payoutOf(this.wallet.account).call(),
          SKTokenMethod.balanceOf(this.wallet.account).call(),
          HNWTokenMethod.balanceOf(this.wallet.account).call(),
          HfuelMethod.balanceOf(this.wallet.account).call(),
          HfuelMethod.allowance(
            this.wallet.account,
            this.contracts.Refinery.address
          ).call(),
          BuddySystemMethod.buddyOf(this.wallet.account).call(),
          RefineryMethod.userInfoTotals(this.wallet.account).call(),
          RefineryMethod.balanceLevel(this.wallet.account).call(),
        ];
        Promise.all(promises).then(
          ([
            custody,
            available,
            userInfo,
            payoutOf,
            skTokenBalance,
            hnwTokenBalance,
            hfuelBalance,
            allowance,
            address,
            { referrals: directs, total_structure: team },
            balanceLevel,
          ]) => {
            this.setBuddyDetail(custody);
            let {
              deposits,
              direct_bonus,
              match_bonus,
              payouts: claimed,
              upline,
            } = userInfo;
            let { max_payout: maxPayout } = payoutOf;
            skTokenBalance = this.getToFixedNum(skTokenBalance);
            hnwTokenBalance = this.getToFixedNum(hnwTokenBalance);
            if (allowance > 0) {
              this.refinery.label = "Deposit";
            } else {
              this.refinery.label = "Approve";
            }
            this.hfuelBalance = this.getToFixedNum(hfuelBalance);
            this.buddyAddress = address;
            if ("0x0000000000000000000000000000000000000000" === upline) {
              this.allowUpdateBuddy = true;
            } else {
              this.allowUpdateBuddy = false;
            }
            this.refineryDetail = {
              available: this.getToFixedNum(available),
              deposits: this.getToFixedNum(deposits),
              claimed: this.getToFixedNum(claimed),
              maxPayout: this.getToFixedNum(maxPayout),
              skTokenBalance,
              skCorrespondingLevel:
                this.getSKCorrespondingLevel(skTokenBalance),
              hnwTokenBalance,
              hnwCorrespondingLevel:
                this.getHNWCorrespondingLevel(hnwTokenBalance),
              referralRewards: (
                parseFloat(this.getToFixedNum(direct_bonus)) +
                parseFloat(this.getToFixedNum(match_bonus))
              ).toFixed(3),
              team: `${directs}/${team}`,
              balanceLevel: parseInt(balanceLevel),
            };
          }
        );
      }
      this.isLoading = { ...this.isLoading, getRefineryData: false };
    },

    showAlert: function ({ title = "", type = "", html = "" }) {
      this.$swal.fire({
        icon: type,
        title,
        html,
        showConfirmButton: true,
        timer: 5000,
      });
      // .then((result) => {
      //   this.$router.go(this.$router.currentRoute);
      // });
    },

    claim: async function () {
      this.isLoading = { ...this.isLoading, claim: true };
      try {
        const { transactionHash } =
          await this.contracts.Refinery.instance.methods.claim().send({
            from: this.wallet.account,
          });
        this.showAlert({
          type: "success",
          title: "Your transaction has been completed",
          html: `Here is the <a target="_blank" href="https://bscscan.com/tx/${transactionHash}">link</a> of transaction`,
        });
        this.isLoading = { ...this.isLoading, claim: false };
        this.getRefineryData();
      } catch (e) {
        console.log(e);
        this.isLoading = { ...this.isLoading, claim: false };
        this.showAlert({
          type: "error",
          title: "Error",
          html: e.message,
        });
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
    },

    updateBuddyAddress: async function () {
      this.isLoading = { ...this.isLoading, updateBuddyAddress: true };
      try {
        let isValidAddress = this.web3.instance.utils.isAddress(
          this.inputBuddyAddress
        );
        if (!isValidAddress) {
          this.showAlert({
            type: "error",
            title: "Error",
            html: `Invalid Buddy Address`,
          });
        } else {
          const response = await this.contracts.BuddySystem.instance.methods
            .updateBuddy(this.inputBuddyAddress)
            .send({
              from: this.wallet.account,
            });
          let { transactionHash } = response;
          this.showAlert({
            type: "success",
            title: "Your transaction has been completed",
            html: `Here is the <a target="_blank" href="https://bscscan.com/tx/${transactionHash}">link</a> of transaction`,
          });
          this.getRefineryData();
        }
        this.isLoading = { ...this.isLoading, updateBuddyAddress: false };
      } catch (e) {
        this.isLoading = { ...this.isLoading, updateBuddyAddress: false };
        console.log(e);
        this.showAlert({
          type: "error",
          title: "Error",
          html: e.message,
        });
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
    },

    setSupportBuddyAddress: function () {
      this.inputBuddyAddress = this.supportBuddyAddress;
    },

    depositRefinery: async function () {
      this.isLoading = { ...this.isLoading, deposit: true };
      let _amount = 0;
      if (this.isMaxDeposit) {
        _amount = this.wallet.weiBalances["HFUEL"];
      } else {
        _amount = this.web3.instance.utils.toWei(this.refinery.amount);
      }
      console.log(_amount);
      try {
        if (this.refinery.amount) {
          var allowance = await this.contracts.HFUEL.instance.methods
            .allowance(this.wallet.account, this.contracts.Refinery.address)
            .call();
          let response = {};
          if (Number(allowance) < Number(_amount)) {
            response = await this.contracts.HFUEL.instance.methods
              .approve(this.contracts.Refinery.address, MaxUint256)
              .send({ from: this.wallet.account });
            this.refinery.label = "Deposit";
          } else {
            response = await this.contracts.Refinery.instance.methods
              .deposit(this.buddyAddress, _amount)
              .send({
                from: this.wallet.account,
              });
          }
          let { transactionHash } = response;
          this.showAlert({
            type: "success",
            title: "Your transaction has been completed",
            html: `Here is the <a target="_blank" href="https://bscscan.com/tx/${transactionHash}">link</a> of transaction`,
          });
          this.getRefineryData();
        } else {
          this.showAlert({
            type: "error",
            title: "Error",
            html: "Please enter amount to deposit",
          });
        }
        this.isLoading = { ...this.isLoading, deposit: false };
      } catch (e) {
        console.log(e);
        this.isLoading = { ...this.isLoading, deposit: false };
        this.showAlert({
          type: "error",
          title: "Error",
          html: e.message,
        });
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
    },

    getSKCorrespondingLevel: function (value) {
      let level = 0;
      if (value >= 50000) {
        level = 1.2;
      } else if (value >= 10000) {
        level = 1.1;
      } else if (value >= 2000) {
        level = 1;
      } else if (value >= 400) {
        level = 0.9;
      } else if (value >= 0) {
        level = 0.8;
      }
      return `${level}% Daily`;
    },

    getHNWCorrespondingLevel: function (value) {
      let level = 0;
      if (value >= 250) {
        level = 365;
      } else if (value >= 200) {
        level = 343.1;
      } else if (value >= 150) {
        level = 321.2;
      } else if (value >= 100) {
        level = 299.3;
      } else if (value >= 50) {
        level = 277.4;
      } else if (value >= 0) {
        level = 255.5;
      }
      return `${level}% MP`;
    },

    isDisableButton: function (name) {
      let res = false;
      if (!this.wallet.account) {
        res = true;
      } else if (this.isLoading[`name`]) {
        res = true;
      }
      //  else if (
      //   this.allowUpdateBuddy &&
      //   ["deposit", "roll", "claim"].indexOf(name) !== -1
      // ) {
      //   res = true;
      // }
      return res;
    },

    sendAirDrop: async function () {
      this.isLoading = { ...this.isLoading, sendAirDrop: true };
      try {
        let isValidAddress = this.web3.instance.utils.isAddress(
          this.airDrop.player
        );
        let isValidNum = this.airDrop.amount > 0;
        if (!isValidAddress) {
          this.showAlert({
            type: "error",
            title: "Error",
            html: `Invalid Player Address`,
          });
        } else if (!isValidNum) {
          this.showAlert({
            type: "error",
            title: "Error",
            html: `Invalid Amount`,
          });
        } else if (isValidAddress && isValidNum) {
          let _amount = this.web3.instance.utils.toWei(this.airDrop.amount);
          const response = await this.contracts.Refinery.instance.methods
            .airdrop(this.airDrop.player, _amount)
            .send({
              from: this.wallet.account,
            });
          let { transactionHash } = response;
          this.showAlert({
            type: "success",
            title: "Your transaction has been completed",
            html: `Here is the <a target="_blank" href="https://bscscan.com/tx/${transactionHash}">link</a> of transaction`,
          });
        }
        this.isLoading = { ...this.isLoading, sendAirDrop: false };
      } catch (e) {
        this.isLoading = { ...this.isLoading, sendAirDrop: false };
        console.log(e);
        this.showAlert({
          type: "error",
          title: "Error",
          html: e.message,
        });
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
    },

    searchPlayerInfo: async function () {
      this.isLoading = { ...this.isLoading, searchPlayerInfo: true };
      try {
        let address = this.playerInfo.address;
        let isValidAddress = this.web3.instance.utils.isAddress(address);
        if (!isValidAddress) {
          this.showAlert({
            type: "error",
            title: "Error",
            html: `Invalid Player Address`,
          });
        } else if (isValidAddress) {
          const RefineryMethods = this.contracts.Refinery.instance.methods;
          let promises = [
            RefineryMethods.creditsAndDebits(address).call(),
            // RefineryMethods.users(address).call(),
            // RefineryMethods.userInfo(address).call(),
            // RefineryMethods.userInfoTotals(address).call(),
            RefineryMethods.airdrops(address).call(),
          ];
          Promise.all(promises).then(
            async ([
              creditsAndDebits,
              {
                airdrops_received: airdropReceived,
                airdrops: airdropSent,
                last_airdrop: airdropLastSent,
              },
            ]) => {
              const { referrals: directs, total_structure: team } =
                await RefineryMethods.userInfoTotals(address).call();
              const netDeposits =
                this.getToFixedNum(creditsAndDebits["_credits"]) -
                this.getToFixedNum(creditsAndDebits["_debits"]);
              airdropLastSent = airdropLastSent
                ? moment
                    .unix(airdropLastSent)
                    .utc()
                    .format("YYYY-MM-DD hh:mm a") + " UTC"
                : "0";
              this.playerInfo = {
                ...this.playerInfo,
                directs,
                team,
                netDeposits,
                airdropSent: this.getToFixedNum(airdropSent),
                airdropReceived: this.getToFixedNum(airdropReceived),
                airdropLastSent,
              };
            }
          );
        }
        this.isLoading = { ...this.isLoading, searchPlayerInfo: false };
      } catch (e) {
        this.isLoading = { ...this.isLoading, searchPlayerInfo: false };
        console.log(e);
        this.showAlert({
          type: "error",
          title: "Error",
          html: e.message,
        });
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
    },

    addToMetamask: async function (token) {
      try {
        let tokenSymbol, tokenImage, tokenAddress;
        let tokenDecimals = 18;
        switch (token) {
          case "sk":
            tokenSymbol = "SK";
            tokenImage =
              "https://app.hnwdefi.com/assets/img/logo/sidekick-small.png";
            tokenAddress = this.contracts.SK.address;
            break;
          case "hnw":
            tokenSymbol = "HNW";
            tokenImage = "https://i.imgur.com/UX5NKcV.png";
            tokenAddress = this.contracts.HNW.address;
            break;
          case "xsk":
            tokenSymbol = "XSK";
            tokenImage = "https://i.imgur.com/UDpVNHc.png";
            tokenAddress = this.contracts.xSK.address;
            break;
          case "xhnw":
            tokenSymbol = "xHNW";
            tokenImage = "https://i.imgur.com/UX5NKcV.png";
            tokenAddress = this.contracts.xHNW.address;
            break;
          case "hfuel":
            tokenSymbol = "HFUEL";
            tokenImage =
              "https://app.hnwdefi.com/assets/img/logo/hfuel-small.png";
            tokenAddress = this.contracts.HFUEL.address;
            break;
          default:
            break;
        }

        const added = await this.$ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage,
            },
          },
        });

        if (added) {
          console.log(tokenSymbol + " added!");
        }
      } catch (e) {
        console.log(e);
      }
    },

    validateTeamAirDrop: function () {
      let isValid = true;
      let isValidAddress = this.web3.instance.utils.isAddress(
        this.teamAirdrop.playerAddress.value
      );
      if (!isValidAddress) {
        isValid = false;
        this.teamAirdrop.playerAddress.error = "Invalid Token Address";
      } else {
        this.teamAirdrop.playerAddress.error = null;
      }
      if (!this.teamAirdrop.campaign.value) {
        isValid = false;
        this.teamAirdrop.campaign.error = "Invalid Campaign";
      } else {
        this.teamAirdrop.campaign.error = null;
      }
      if (!this.teamAirdrop.minDirects.value) {
        isValid = false;
        this.teamAirdrop.minDirects.error = "Invalid Minimum directs";
      } else {
        this.teamAirdrop.minDirects.error = null;
      }
      if (!this.teamAirdrop.teamDepth.value) {
        isValid = false;
        this.teamAirdrop.teamDepth.error = "Invalid Team depth";
      } else {
        this.teamAirdrop.teamDepth.error = null;
      }
      if (!this.teamAirdrop.minNetDeposit.value) {
        isValid = false;
        this.teamAirdrop.minNetDeposit.error = "Invalid Minimum net deposits";
      } else {
        this.teamAirdrop.minNetDeposit.error = null;
      }
      if (!this.teamAirdrop.budget.value) {
        isValid = false;
        this.teamAirdrop.budget.error = "Invalid Budget";
      } else {
        this.teamAirdrop.budget.error = null;
      }
      return isValid;
    },

    randomArrayShuffle: function (array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },

    getDownlineApiDetail: function ({ value, downline}, playerDepth) {      
      const RefineryMethods = this.contracts.Refinery.instance.methods;
      let promises = [
        RefineryMethods.userInfoTotals(value).call(),
        RefineryMethods.creditsAndDebits(value).call(),
      ];
      return Promise.all(promises).then(
        async ([{ referrals }, { _credits, _debits }]) => {
          _credits = this.getToFixedNum(_credits);
          _debits = this.getToFixedNum(_debits);
          _credits = new bignumber(_credits);
          _debits = new bignumber(_debits);
          const creditsAndDebits = _credits.minus(_debits).toString();
          this.compaignList.totalCandidates += 1;
          if (
            Number(creditsAndDebits) >=
              Number(this.teamAirdrop.minNetDeposit.value) &&
            Number(referrals) >= Number(this.teamAirdrop.minDirects.value) &&
            playerDepth <= Number(this.teamAirdrop.teamDepth.value)
          ) {
            this.compaignList.recipients.push({
              address: value,
              directs: referrals,
              deposits: creditsAndDebits,
              teamDepth: this.playerDepth,
            });
            this.compaignList.totalEligible += 1;
          }
          for (let index = 0; index < downline.length; index++) {
            const element = downline[index];
            await this.getDownlineApiDetail(element, playerDepth + 1);
          }
          return true;
        }
      );
    },

    executeTeamAirDrop: async function () {
      try {
        if (this.validateTeamAirDrop()) {
          this.isLoading = {
            ...this.isLoading,
            executeTeamAirDrop: true,
          };
          this.compaignList = {
            totalCandidates: 0,
            totalEligible: 0,
            totalRecipients: 0,
            recipients: [],
            filteredRecipients: [],
            logs: "",
          };
          this.compaignList.logs = `Loading: ${this.teamAirdrop.playerAddress.value}`;
          this.compaignList.logs += ` 

Finding eligible players:
Minimum directs = ${this.teamAirdrop.minDirects.value}
Team depth = ${this.teamAirdrop.teamDepth.value} 
Minimum net deposits = ${this.teamAirdrop.minNetDeposit.value} HFUEL
`;
          this.compaignList.logs += ` 
Finding players:`;
          this.getRefineryInfo(this.teamAirdrop.playerAddress.value).then(
            async (data) => {
              if (data.downline && data.downline.length === 0) {
                this.showAlert({
                  type: "error",
                  title: "Error",
                  html: "No data found",
                });
              }
              for (let index = 0; index < data.downline.length; index++) {
                const element = data.downline[index];
                await this.getDownlineApiDetail(element, 1);
              }
              const shuffleCampaignList = this.randomArrayShuffle(
                this.compaignList.recipients
              );
              let totalRecipients = 0;
              if (this.teamAirdrop.campaign.value === "0") {
                totalRecipients = this.compaignList.totalEligible;
                this.compaignList.filteredRecipients =
                  this.compaignList.recipients;
              } else {
                totalRecipients =
                  this.compaignList.totalEligible >
                  this.teamAirdrop.campaign.value
                    ? this.teamAirdrop.campaign.value
                    : this.compaignList.totalEligible;
                this.compaignList.totalRecipients = totalRecipients;
                this.compaignList.filteredRecipients =
                  shuffleCampaignList.splice(0, totalRecipients);
              }
              this.compaignList.totalRecipients = totalRecipients;
              this.compaignList.logs += ` 
Campaign results:
Total Candidates = ${this.compaignList.totalCandidates}
Total Eligible = ${this.compaignList.totalEligible}
Total Recipients = ${totalRecipients}
`;
              this.compaignList.logs += ` 
Ready to send…`;
              this.isLoading = {
                ...this.isLoading,
                executeTeamAirDrop: false,
              };
            }
          );
        }
      } catch (e) {
        console.log(e);
        this.showAlert({
          type: "error",
          title: "Error",
          html: e.message,
        });
        this.isLoading = {
          ...this.isLoading,
          executeTeamAirDrop: false,
        };
        return;
      }
      this.$root.$children[0].verifyRequestConditionsAndContinueOrDelay(
        "getRequiredContracts",
        this.requiredContracts
      );
    },

    manualDepositAmount: function () {
      this.isMaxDeposit = false;
    },

    maxDeposit: function () {
      this.refinery.amount = this.wallet.balances["HFUEL"];
      this.isMaxDeposit = true;
    },

    sendTeamAirDrop: async function () {
      try {
        this.isLoading = {
          ...this.isLoading,
          sendTeamAirDrop: true,
        };
        let estimatedHfuel = JSON.stringify(
          this.teamAirdrop.budget.value / this.compaignList.totalRecipients
        );
        estimatedHfuel = this.web3.instance.utils.toWei(estimatedHfuel);
        var allowance = await this.contracts.HFUEL.instance.methods
          .allowance(this.wallet.account, this.contracts.Refinery.address)
          .call();
        if (Number(allowance) < Number(estimatedHfuel)) {
          let response = await this.contracts.HFUEL.instance.methods
            .approve(this.contracts.Refinery.address, MaxUint256)
            .send({ from: this.wallet.account });
          let { transactionHash } = response;
          this.showAlert({
            type: "success",
            title: "Your transaction has been completed",
            html: `Here is the <a target="_blank" href="https://bscscan.com/tx/${transactionHash}">link</a> of transaction`,
          });
        }
        // let promises = [];
        const RefineryMethods = this.contracts.Refinery.instance.methods;
        for (
          let index = 0;
          index < this.compaignList.filteredRecipients.length;
          index++
        ) {
          const element = this.compaignList.filteredRecipients[index];
          // promises.push(
          //   RefineryMethods.airdrop(element["address"], estimatedHfuel).send({
          //     from: this.wallet.account,
          //   })
          // );
          RefineryMethods.airdrop(element["address"], estimatedHfuel).send({
            from: this.wallet.account,
          });
          // let { transactionHash } = response;
          // this.showAlert({
          //   type: "success",
          //   title: "Your transaction has been completed",
          //   html: `Here is the <a target="_blank" href="https://bscscan.com/tx/${transactionHash}">link</a> of transaction`,
          // });
        }
        //   this.showAlert({
        //     type: "success",
        //     title: "Your transaction has been completed",
        //     html: `Here is the <a target="_blank" href="https://bscscan.com/tx/">link</a> of transaction`,
        //   });
        this.isLoading = {
          ...this.isLoading,
          sendTeamAirDrop: false,
        };
        this.getRefineryData();
      } catch (error) {
        this.isLoading = {
          ...this.isLoading,
          sendTeamAirDrop: false,
        };
      }
    },
  },

  mounted() {
    this.initiate();
    this.getRefineryData();
  },
  destroyed() {
    clearInterval(refineryInterval);
  },
};
</script>
<style>
.error-message {
  color: red;
}
#teamairdrop textarea {
  color: white;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  opacity: 1 !important;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
