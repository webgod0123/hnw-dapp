<script>
export default {
  name: "TreeItem", // necessary for self-reference
  props: {
    model: Object,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    isFolder() {
      return this.model.downline && this.model.downline.length;
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    changeType() {
      if (!this.isFolder) {
        this.model.downline = [];
        this.isOpen = true;
      }
    },
  },
};
</script>

<template>
  <li style="list-style-type: none">
    <div :class="{ bold: isFolder }" @click="toggle" @dblclick="changeType">
      <span v-if="isFolder">{{ isOpen ? "▼" : "►" }}</span>
      {{ model.value }}
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <!--
        A component can recursively render itself using its
        "value" option (inferred from filename if using SFC)
      -->
      <TreeItem class="item" v-for="(model, index) in model.downline" :model="model" :key="index">
      </TreeItem>
    </ul>
  </li>
</template>