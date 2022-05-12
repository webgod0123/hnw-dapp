<template>
  <div class="card bg-dark text-white p-3">
    <div class="d-flex align-items-center justify-content-between">
      <div>Campaign / {{ title }}</div>
      <div>
        <button class="btn btn-info text-dark fs-6">SAVE CAMPAIGN</button>
        <button class="btn btn-primary text-white fs-6 ms-2">
          REVIEW & LAUNCH
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
  },
};
</script>
