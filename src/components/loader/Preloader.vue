<template>
  <img :src="laoderImgSrc" :style="cssVars" />
</template>

<script>
export default {
  name: "Preloader",
  data() {
    return {
      laoderImgSrc: "https://i.gifer.com/ZZ5H.gif",
    };
  },
  props: {
    width: {
      type: String,
      default: "6%",
    },
  },
  computed: {
    cssVars() {
      return {
        "width": this.width,
      };
    },
  },
};
</script>