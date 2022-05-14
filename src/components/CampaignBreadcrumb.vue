<template>
  <div class="card text-white p-3 sticky-breadcrumb">
    <div class="d-flex align-items-center justify-content-between">
      <div>{{ home }} / {{ title }}</div>
      <div v-if="!perksCreate">
        <button class="btn btn-info text-dark fs-6" @click="saveCampaign">
          SAVE CAMPAIGN
        </button>
        <button class="btn btn-primary text-white fs-6 ms-2">
          REVIEW & LAUNCH {{ $route.name }}
        </button>
      </div>
      <div v-if="perksCreate">
        <router-link to="/campaign_edit/perks"
          ><button class="btn btn-info text-dark fs-6">
            CANCEL
          </button></router-link
        >
        <button
          @click="createPerks"
          class="btn btn-primary text-white fs-6 ms-2"
        >
          SAVE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    home: {
      type: String,
      default: "",
    },
    perksCreate: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    saveCampaign: function () {
      this.$emit("saveCampaign");
    },
    createPerks: function () {
      this.$emit("createPerks");
    },
  },
};
</script>

<style>
.sticky-breadcrumb {
  position: sticky !important;
  top: 52px;
  background: rgba(0, 0, 0, 0.85) !important;
  z-index: 100;
}
</style>
