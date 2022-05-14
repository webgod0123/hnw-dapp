<template>
  <div>
    <campaign-breadcrumb
      :title="title"
      :home="'Campaign'"
      @saveCampaign="save"
    />
    <div class="card bg-dark text-white p-4 mt-4">
      <div class="row">
        <div class="col-12 col-lg-10">
          <h2>Pitch Video or Image</h2>
          <p>
            Add a video or image to appear on the top of your campaign page.
            Campaigns with videos raise 2000% more than campaigns without
            videos. Keep your video 2-3 minutes.
          </p>
          <div class="btn-group">
            <a
              href="#"
              :class="[
                pitch === 'video'
                  ? 'btn btn-primary active'
                  : 'btn btn-primary',
              ]"
              aria-current="page"
              @click="switchPitch('video')"
              >Video</a
            >
            <a
              href="#"
              :class="[
                pitch === 'image'
                  ? 'btn btn-primary active'
                  : 'btn btn-primary',
              ]"
              @click="switchPitch('image')"
              >Image</a
            >
          </div>
          <div>
            <div v-if="pitch === 'video'" class="entreField">
              <label class="form-label fs-5"
                >Video URL <span class="entreField-required">*</span></label
              >
              <div class="my-2">
                Enter a YouTube or Vimeo URL to appear at the top of your
                campaign page. Make sure your video has closed captioning
                enabled on Youtube or Vimeo.
              </div>
              <div class="input-group w-75">
                <input
                  type="text"
                  class="
                    form-control form-control-lg
                    bg-transparent
                    border border-primary
                  "
                  placeholder="http://"
                  v-model="videoUrl"
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  :disabled="videoUrlInvalid"
                  @click="addVideoUrl"
                >
                  Add Video
                </button>
              </div>
              <div class="mt-3">
                <div
                  v-if="videoUrlInvalid === true"
                  class="videoPlaceholder"
                ></div>
                <div class="video-content" v-else>
                  <iframe :src="videoUrl" />
                </div>
              </div>
              <div class="entreField">
                <label class="form-label fs-5"
                  >Video Overlay Image (Optional)
                </label>
                <div class="my-2">
                  Choose an image to represent your video before it plays.<br />
                  695 x 460 recommended resolution.
                </div>
                <upload
                  @image="getOverlayImage"
                  :image="videoOverlayImage"
                  :className="'upload-pitch-image'"
                />
              </div>
            </div>
            <div v-if="pitch === 'image'" class="entreField">
              <label class="form-label fs-5"
                >Pitch Image <span class="entreField-required">*</span></label
              >
              <div class="my-2">
                Upload an image to appear at the top of your campaign page. 695
                x 460 recommended resolution.
              </div>
              <upload
                @image="getImage"
                :image="pitchImage"
                :className="'upload-pitch-image'"
              />
            </div>
            <span class="error-message" v-if="errors.mainImage">{{
              errors.mainImage
            }}</span>
          </div>
          <div class="mt-4">
            <h2>Story <span class="entreField-required">*</span></h2>
            <p class="fs-5">
              Tell potential contributors more about your campaign. Provide
              details that will motivate people to contribute. A good pitch is
              compelling, informative, and easy to digest.
            </p>
            <quill-editor
              v-model="story"
              :options="editorOption"
            ></quill-editor>
            <span class="error-message" v-if="errors.story">{{
              errors.story
            }}</span>
          </div>
          <div class="mt-4 pt-4">
            <h2>FAQ <span class="entreField-required">*</span></h2>
            <p class="fs-5">
              The FAQ section should provide the most common details that
              backers are looking for when evaluating your campaign. We will
              also provide common answers to questions about crowdfunding and
              how Indiegogo works.
            </p>
            <div v-for="(faq, index) in faqs" :key="index">
              <div class="d-flex justify-content-between">
                <div class="w-100">
                  <div class="entreField">
                    <label class="form-label fs-5">Question </label>
                    <input
                      class="
                        form-control form-control-lg
                        bg-transparent
                        border border-primary
                      "
                      :value="faq.question"
                      @input="faqChange($event, index, 'question')"
                    />
                  </div>
                  <div class="entreField">
                    <label class="form-label fs-5">Answer </label>
                    <textarea
                      class="
                        form-control form-control-lg
                        bg-transparent
                        border border-primary
                      "
                      :value="faq.answer"
                      @input="faqChange($event, index, 'answer')"
                      :disabled="!faq.question"
                    />
                  </div>
                </div>
                <div
                  class="upload-action-icon bg-primary ms-2 close-icon"
                  v-if="faqs.length > 1"
                  @click="faqRemove(index)"
                >
                  <img src="/assets/img/icons/icons8-close-50.png" />
                </div>
              </div>
            </div>
            <div style="margin-top: -30px; margin-bottom: 30px">
              <span class="error-message" v-if="errors.faqs">{{
                errors.faqs
              }}</span>
            </div>

            <button @click="faqAdd" class="btn btn-primary">
              + Add Another Question
            </button>
          </div>
          <div
            class="
              d-flex
              justify-content-end
              save-content
              border-top border-primary
              w-100
            "
          >
            <button class="btn btn-primary text-white fs-6" @click="save">
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CampaignBreadcrumb from "../../components/CampaignBreadcrumb.vue";
import Upload from "../../components/Upload.vue";
import Vue from "vue";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor);
Vue.component("quill-editor", VueQuillEditor.quillEditor);

export default {
  data() {
    return {
      title: "Content",
      pitch: "video",
      videoUrlInvalid: true,
      errors: {
        mainImage: "",
        story: "",
        faqs: "",
      },
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ["blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
            ["template-partediario"],
          ],
        },
      },
    };
  },
  components: { CampaignBreadcrumb, Upload },
  computed: {
    ...mapState(["campaigns"]),
    pitchImage: {
      set(pitchImage) {
        this.setCampaignContent({ pitchImage });
      },
      get() {
        return this.campaigns.content.pitchImage;
      },
    },
    story: {
      set(story) {
        this.setCampaignContent({ story });
      },
      get() {
        return this.campaigns.content.story;
      },
    },
    faqs: {
      get() {
        const faqs = this.campaigns.content.faqs;
        if (faqs.length === 0) this.faqAdd();
        return faqs;
      },
    },
    videoOverlayImage: {
      set(videoOverlayImage) {
        this.setCampaignContent({ videoOverlayImage });
      },
      get() {
        return this.campaigns.content.videoOverlayImage;
      },
    },
    videoUrl: {
      set(videoUrl) {
        this.videoUrlValidate(videoUrl);
        this.setCampaignContent({ videoUrl });
      },
      get() {
        const videoUrl = this.campaigns.content.videoUrl;
        this.videoUrlValidate(videoUrl);
        return videoUrl;
      },
    },
  },
  created() {},
  methods: {
    ...mapActions({
      setCampaignContent: "campaigns/setCampaignContent",
      addFaq: "campaigns/addFaq",
      removeFaq: "campaigns/removeFaq",
      updateFaq: "campaigns/updateFaq",
      filterFaq: "campaigns/filterFaq",
    }),
    switchPitch: function (pitch) {
      this.pitch = pitch;
    },
    getImage: function (image) {
      this.pitchImage = image;
    },
    getOverlayImage: function (image) {
      this.videoOverlayImage = image;
    },
    addVideoUrl: function () {
      // this.setCampaignContent({videoUrl: this.videoUrlStr});
    },
    videoUrlValidate: function (url) {
      let isValid = false;
      const re =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      const re1 =
        /^http:\/\/(?:.*?)\.?(youtube|vimeo)\.com\/(watch\?[^#]*v=(\w+)|(\d+)).+$/;
      if (url.match(re) || url.match(re1)) {
        isValid = true;
      }
      this.videoUrlInvalid = !isValid;
      return isValid;
    },
    faqAdd: function () {
      this.addFaq();
    },
    faqChange: function (e, index, key) {
      const value = e.target.value;
      this.updateFaq({ value, index, key });
    },
    faqRemove: function (index) {
      this.removeFaq(index);
    },
    save: function () {
      if (!this.validate()) {
        this.showAlert({
          type: "error",
          title: "Error",
          html: "Please fix the issues!",
        });
      } else {
        this.filterFaq();
        this.$router.push("/campaign_edit/perks");
      }
    },
    validate: function () {
      let isValid = true;

      if (!this.pitchImage && !this.videoUrl) {
        this.errors.mainImage =
          "Campaign must have either a main image or main video";
        isValid = false;
      } else this.errors.mainImage = "";
      if (!this.story) {
        this.errors.story = "Story cannot be blank";
        isValid = false;
      } else this.errors.story = "";
      const faqs = this.faqs;
      let n = 0;
      for (let i = 0; i < faqs.length; i++) {
        let faq = faqs[i];
        if (faq.question && faq.answer) n++;
      }
      if (n == 0) {
        this.errors.faqs = "At least one Faq(question & answer) required";
        isValid = false;
      } else this.errors.faqs = "";
      return isValid;
    },
    showAlert: function ({ title = "", type = "", html = "" }) {
      this.$swal.fire({
        icon: type,
        title,
        html,
        showConfirmButton: true,
        timer: 3000,
      });
    },
  },
};
</script>

<style>
.container {
  width: 100%;
}
.entreField {
  position: relative;
  margin: 40px 0;
}

.entreField-required,
.error-message {
  color: #ff324b;
}

.video-content {
  max-width: 695px;
  aspect-ratio: 695 / 460;
}

.video-content iframe {
  width: 100%;
  height: 100%;
}

.videoPlaceholder {
  max-width: 620px;
  aspect-ratio: 620 / 415;
  margin-top: 10px;
  border: 1px dashed #c8c8c8;
  border-radius: 2px;
}

.ck.ck-editor__main > .ck-editor__editable {
  min-height: 500px;
  background: transparent !important;
}
.ck.ck-balloon-panel {
  z-index: 9999 !important;
}
.ql-toolbar.ql-snow {
  background: white;
}
.ql-container.ql-snow {
  height: 500px;
}
.ql-snow .ql-editor h1 {
  font-size: 2em;
}
.close-icon {
  margin-top: 75px;
}
.save-content {
  margin-top: 50px;
  padding: 30px 0 10px;
}
.ql-editor .ql-video {
  width: 100%;
  aspect-ratio: 16 / 9;
}
</style>
