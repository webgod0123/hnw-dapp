<template>
  <div>
    <campaign-breadcrumb :title="title" />
  </div>
</template>

<script>
import CampaignBreadcrumb from "../../components/CampaignBreadcrumb.vue";
export default {
  components: { CampaignBreadcrumb },
  data() {
    return {
      title: "Perks",
    };
  },
};
</script>

<style>
.container {
  width: 100%;
}
</style>
