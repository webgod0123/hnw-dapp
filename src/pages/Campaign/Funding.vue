<template>
  <div>
    <campaign-breadcrumb :home="home" :title="title" />
  </div>
</template>

<script>
import CampaignBreadcrumb from "../../components/CampaignBreadcrumb.vue";
export default {
  components: { CampaignBreadcrumb },
  data() {
    return {
      home: 'Campaign',
      title: "Funding",
    };
  },
};
</script>

<style>
.container {
  width: 100%;
}
</style>
