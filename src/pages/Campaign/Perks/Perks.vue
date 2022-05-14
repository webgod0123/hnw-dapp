<template>
  <div>
    <campaign-breadcrumb :home="'Campaign'" :title="title" />
    <div class="card bg-dark text-white p-4 mt-4">
      <div class="row">
        <div class="col-12">
          <div v-if="perks.length === 0" class="text-center">
            <h2>You haven't created any perks yet</h2>
            <p>
              Perks are incentives offered to backers in exchange for their
              support. You may edit your perk details until the perk is claimed.
            </p>
            <router-link to="/campaign_edit/perks/create">
              <button class="btn btn-primary mt-4">Create New Perk</button>
            </router-link>
          </div>
          <div v-else>
            <h2>Perks</h2>
            <p class="fs-5">
              Perks are incentives offered to backers in exchange for their
              support.<br />
              There are different types of perks you create.
            </p>
            <div class="pb-4 d-flex justify-content-end">
              <router-link to="/campaign_edit/perks/create">
                <button class="btn btn-primary mt-4">Create New Perk</button>
              </router-link>
            </div>
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>PRICE</th>
                  <th>QTY CLAIMED</th>
                  <th>EST. DELIVERY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(perk, index) in perks" :key="index">
                  <td>{{ perk.title }}</td>
                  <td>${{ perk.price }}</td>
                  <td>
                    0 <span v-if="perk.quantity">/ {{ perk.quantity }}</span>
                  </td>
                  <td>{{ perk.estDate }}</td>
                  <td>
                      <button class="btn btn-outline-primary btn-sm" @click="goToPerk(perk)">
                        UPDATE
                      </button>
                    <button
                      class="ms-2 btn btn-outline-primary btn-sm"
                      @click="deletePerk({ id: perk.id })"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CampaignBreadcrumb from '../../../components/CampaignBreadcrumb.vue';
export default {
  components: { CampaignBreadcrumb },
  data() {
    return {
      title: "Perks",
    };
  },
  computed: {
    ...mapState(["campaigns"]),
    perks: {
      get() {
        return this.campaigns.perks;
      },
    },
  },
  methods: {
    ...mapActions({
      deletePerk: "campaigns/deletePerk",
    }),
    goToPerk: function (perk) {
      this.$router.push({path: `/campaign_edit/perks/${perk.title}/update`, query: perk})
    }
  },
};
</script>

<style>
.container {
  width: 100%;
}
</style>
