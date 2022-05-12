<template>
  <div>
    <campaign-breadcrumb :title="title" />
  </div>
</template>

<script>
import CampaignBreadcrumb from "../../components/CampaignBreadcrumb.vue";

export default {
  data() {
    return {
      title: "Extras",
    };
  },
  components: { CampaignBreadcrumb },
};
</script>

<style>
.container {
  width: 100%;
}
</style>
