<template>
  <div>
    <campaign-breadcrumb :home="home" :title="title" />
    <div class="card bg-dark text-white p-4 mt-4">
      <div class="row">
        <div class="col-12 col-lg-10">
          <h2>Settings</h2>
          <p class="mb-4 pb-4 fs-5">
            We provide additional features for you that can help bolster your
            campaign. Configure the optional campaign settings below.
          </p>
          <div class="mt-4 pt-4 border-top border-primary">
            <h2>InDemand</h2>
            <p class="mb-4 pb-4 fs-5">
              InDemand makes it easy for any successful campaigner to keep
              raising funds after their campaign ends. With InDemand, you can
              accept contributions after your campaign ends, grow your community
              and reach new audiences, and get ongoing exposure on the Indiegogo
              platform. On-platform InDemand campaigns raise on average 123%
              more funds than their initial funding phase.
            </p>
            <div>
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="optIntoService"
                />
                <span class="fs-5 ms-3">Opt in to InDemand</span>
              </label>
            </div>
            <div class="mt-4 border border-primary bg-dark bg-opacity-30 p-4">
              <div class="p-4">
                <h3 class="text-primary mb-4">How to qualify for InDemand</h3>
                <div class="tip-content justify-content-start">
                  <div class="num bg-primary">
                    <span v-if="!optIntoService">1</span>
                    <svg
                      v-else
                      fill="#fff"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20px"
                      height="20px"
                    >
                      <path
                        d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"
                      />
                    </svg>
                  </div>
                  <div class="ms-3">
                    <h5 :class="[optIntoService ? 'text-overline' : '']">
                      Opt-in to InDemand
                    </h5>
                    <p class="fs-5">
                      Simply check the “Opt in to InDemand” box to get started.
                    </p>
                  </div>
                </div>
                <div class="tip-content justify-content-start">
                  <div class="num bg-primary">2</div>
                  <div class="ms-3">
                    <h5>Meet your campaign goal</h5>
                    <p class="fs-5">
                      Once your crowdfunding campaign is live, follow our
                      helpful campaign management tips to ensure you hit your
                      goal by your deadline.
                    </p>
                  </div>
                </div>
                <div class="tip-content justify-content-start">
                  <div class="num bg-primary">3</div>
                  <div class="ms-3">
                    <h5>Reach your campaign deadline</h5>
                    <p class="fs-5">
                      When your crowdfunding campaign ends, you’ll automatically
                      move into InDemand. You’ll continue raising funds without
                      setting a new fundraising goal or deadline.
                    </p>
                    <p class="fs-5 pt-4 mt-4">
                      Note: Once in InDemand, your page will remain open as long
                      as you fulfill your perks within 3 months of their
                      estimated delivery date. Your InDemand page will
                      automatically close if you do not receive contributions in
                      6 months.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                d-flex
                justify-content-end
                save-content
                border-top border-primary
                w-100
              "
            >
              <button class="btn btn-primary text-white fs-6" @click="preview">
                Preview & Launch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CampaignBreadcrumb from "../../components/CampaignBreadcrumb.vue";
export default {
  components: { CampaignBreadcrumb },
  data() {
    return {
      home: "Campaign",
      title: "Settings",
    };
  },
  computed: {
    ...mapState(["campaigns"]),
    optIntoService: {
      set(optIntoService) {
        this.setOptIntoService(optIntoService);
      },
      get() {
        return this.campaigns.optIntoService;
      },
    },
  },
  methods: {
    ...mapActions({
      setOptIntoService: "campaigns/setOptIntoService",
    }),
    preview: function () {},
  },
};
</script>

<style>
.container {
  width: 100%;
}
.checkbox {
  width: 20px;
  vertical-align: middle;
  height: 20px;
  margin-top: -5px;
}
.num {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.tip-content {
  display: -webkit-box;
}
.text-overline {
  text-decoration: line-through;
}
</style>
