<template>
  <div class="upload-content border border-primary" :class="className">
    <div class="d-flex align-items-center" v-if="!image">
      <div class="icon d-flex"><img src="/assets/img/icons/icons8-camera-50.png" /></div>
      <span class="fs-4 ms-2">Upload Image</span>
    </div>
    <img v-if="image" :src="image" class="uploaded-image" />
    <input ref="fileInput" accept="image/jpg, image/jpeg, image/png" type="file" class="file-input" @change="image_change" />
    <input type="hidden" :value="image" />
    <div class="upload-action d-flex align-items-center justify-content-end p-2" v-if="image">
      <div class="upload-action-icon bg-primary" @click="image_update">
        <img src="/assets/img/icons/icons8-pencil-24.png" />
      </div>
      <div class="upload-action-icon bg-primary ms-2" @click="image_remove">
        <img src="/assets/img/icons/icons8-close-50.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    image_change: function (e) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        this.$emit('image', uploaded_image);
      });
      reader.readAsDataURL(e.target.files[0]);
    },
    image_remove: function() {
      this.$emit('image', null);
    },
    image_update: function() {
      this.$refs.fileInput.click();
    }
  }
};
</script>

<style>
.upload-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-card-image {
  max-width: 400px;
  aspect-ratio: 1 / 1;
}

.upload-pitch-image {
  max-width: 695px;
  aspect-ratio: 695 / 460;
}

.upload-perk-image {
  max-width: 330px;
  aspect-ratio: 330 / 220;
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
}

.uploaded-image {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
}

.upload-action {
  position: absolute;
  top: 0;
  right: 0;
}

.upload-action-icon {
  cursor: pointer;
  width: 30px;
  border-radius: 50%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-action-icon img {
  width: 20px;
  height: 20px;
}

.icon {
  width: 30px;
}

.icon img {
  width: 100%;
}
</style>
