<script>
import TreeItem from "./TreeItem.vue";
export default {
  name: "Tree", // necessary for self-reference
  props: {
    model: Array,
  },
  components: {
    TreeItem,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {},
  methods: {},
};
</script>

<template>
  <li style="list-style-type: none">
    <TreeItem
      class="item"
      v-for="(model, index) in model"
      :model="model"
      :key="index"
    >
    </TreeItem>
  </li>
</template>
