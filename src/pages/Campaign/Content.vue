<template>
  <div>
    <campaign-breadcrumb :title="title" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CampaignBreadcrumb from "../../components/CampaignBreadcrumb.vue";

export default {
  data() {
    return {
      title: "Content",
    };
  },
  components: { CampaignBreadcrumb },
  computed: {
    ...mapState(["campaigns"]),
  },
  created() {},
};
</script>

<style>
.container {
  width: 100%;
}
</style>
