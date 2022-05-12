<template>
  <div>
    <campaign-breadcrumb :title="pageTitle" />
    <div class="card bg-dark text-white p-4 mt-4">
      <div class="row">
        <div class="col-12 col-lg-10">
          <h2>Basics</h2>
          <p>
            Make a good first impression: introduce your campaign objectives and
            entice people to learn more. This basic information will represent
            your campaign on your campaign page, on your campaign card, and in
            searches.
          </p>
          <div>
            <div class="entreField">
              <label class="form-label fs-5"
                >Campaign Title
                <span class="entreField-required">*</span></label
              >
              <div class="my-2">What is the title of your campaign?</div>
              <input
                class="form-control form-control-lg bg-transparent border border-primary"
                type="text"
                placeholder="My Campaign Title"
                v-model="title"
              />
              <span class="error-message" v-if="errors.title">{{
                errors.title
              }}</span>
            </div>
            <div class="entreField">
              <label class="form-label fs-5"
                >Campaign Tagline
                <span class="entreField-required">*</span></label
              >
              <div class="my-2">
                Provide a short description that best describes your campaign to
                your audience.
              </div>
              <textarea
                class="form-control form-control-lg bg-transparent border border-primary"
                type="text"
                v-model="tagline"
              />
              <span class="error-message" v-if="errors.tagline">{{
                errors.tagline
              }}</span>
            </div>
            <div class="entreField">
              <label class="form-label fs-5"
                >Campaign Card Image
                <span class="entreField-required">*</span></label
              >
              <div class="my-2">
                Upload a square image that represents your campaign. 640 x 640
                recommended resolution, 220 x 220 minimum resolution.
              </div>
              <upload @image="getImage" :image="cardImage" />
              <span class="error-message" v-if="errors.cardImage">{{
                errors.cardImage
              }}</span>
            </div>
            <div class="entreField">
              <label class="form-label fs-5"
                >Location <span class="entreField-required">*</span></label
              >
              <div class="my-2">
                Choose the location where you are running the campaign. This
                location will be visible on your campaign page for your audience
                to see.
              </div>
              <div class="d-flex">
                <div class="me-2 w-100">
                  <input
                    class="form-control form-control-lg bg-transparent border border-primary w-100"
                    type="text"
                    placeholder="Country"
                    v-model="country"
                  />
                  <span class="error-message" v-if="errors.country">{{
                    errors.country
                  }}</span>
                </div>
                <div class="ms-2 w-100">
                  <input
                    class="form-control form-control-lg bg-transparent border border-primary"
                    type="text"
                    placeholder="City"
                    v-model="city"
                  />
                  <span class="error-message" v-if="errors.city">{{
                    errors.city
                  }}</span>
                </div>
              </div>
            </div>
            <div class="entreField">
              <label class="form-label fs-5"
                >Category <span class="entreField-required">*</span></label
              >
              <div class="my-2">
                To help backers find your campaign, select a category that best
                represents your project.
              </div>
              <v-select
                :options="categories"
                placeholder="Select a category"
                :reduce="(category) => category.value"
                label="label"
                v-model="category"
              />
              <span class="error-message" v-if="errors.category">{{
                errors.category
              }}</span>
            </div>
            <div class="entreField">
              <label class="form-label fs-5"
                >Tags <span class="entreField-required">*</span></label
              >
              <div class="my-2">
                Enter up to five keywords that best describe your campaign.
                These tags will help with organization and discoverability.
              </div>
              <v-select
                v-model="tags"
                :options="tagOptions"
                :reduce="(tag) => tag.value"
                label="label"
                multiple
                placeholder="Enter a few tags for your campaign"
              />
              <span class="error-message" v-if="errors.tags">{{
                errors.tags
              }}</span>
            </div>
            <div class="entreField">
              <label class="form-label fs-5"
                >Campaign Duration
                <span class="entreField-required">*</span></label
              >
              <div class="my-2">
                How many days will you be running your campaign for? You can run
                a campaign for any number of days, with a 90 day duration
                maximum.
              </div>
              <input
                class="form-control form-control-lg bg-transparent border border-primary duration-input text-center"
                type="number"
                min="1"
                max="90"
                v-model="duration"
              />
              <span class="error-message" v-if="errors.duration">{{
                errors.duration
              }}</span>
            </div>
          </div>
          <div class="d-flex justify-content-end">
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
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Upload from "../../components/Upload.vue";
import CampaignBreadcrumb from "../../components/CampaignBreadcrumb.vue";
import { mapState, mapActions } from "vuex";

Vue.component("v-select", vSelect);

export default {
  components: { Upload, CampaignBreadcrumb },
  data() {
    return {
      pageTitle: "Basics",
      categories: [
        { label: "Catetory1", value: "1" },
        { label: "Catetory2", value: "2" },
        { label: "Catetory3", value: "3" },
      ],
      tagOptions: [
        { label: "Tag1", value: "1" },
        { label: "Tag2", value: "2" },
        { label: "Tag3", value: "3" },
        { label: "Tag4", value: "4" },
        { label: "Tag5", value: "5" },
        { label: "Tag6", value: "6" },
      ],
      errors: {
        title: "",
        tagline: "",
        cardImage: "",
        country: "",
        city: "",
        category: "",
        tags: "",
        duration: "",
      },
    };
  },
  computed: {
    ...mapState(["campaigns"]),
    title: {
      set(title) {
        this.setCampaignBasics({ title });
      },
      get() {
        return this.campaigns.basics.title;
      },
    },
    tagline: {
      set(tagline) {
        this.setCampaignBasics({ tagline });
      },
      get() {
        return this.campaigns.basics.tagline;
      },
    },
    cardImage: {
      set(cardImage) {
        this.setCampaignBasics({ cardImage });
      },
      get() {
        return this.campaigns.basics.cardImage;
      },
    },
    country: {
      set(country) {
        this.setCampaignBasics({ country });
      },
      get() {
        return this.campaigns.basics.country;
      },
    },
    city: {
      set(city) {
        this.setCampaignBasics({ city });
      },
      get() {
        return this.campaigns.basics.city;
      },
    },
    category: {
      set(category) {
        this.setCampaignBasics({ category });
      },
      get() {
        return this.campaigns.basics.category;
      },
    },
    tags: {
      set(tags) {
        this.setCampaignBasics({ tags });
      },
      get() {
        return this.campaigns.basics.tags;
      },
    },
    duration: {
      set(duration) {
        this.setCampaignBasics({ duration });
      },
      get() {
        return this.campaigns.basics.duration;
      },
    },
  },
  methods: {
    ...mapActions({
      setCampaignBasics: "campaigns/setCampaignBasics",
      setInitialCampaignBasics: "campaigns/setInitialCampaignBasics",
      saveCampaignBasics: "campaigns/saveCampaignBasics",
    }),
    getImage: function (image) {
      this.cardImage = image;
    },
    save: function () {
      let isValid = this.validateData();
      if (isValid) {
        this.$router.push("/campaign_edit/content");
      } else {
        alert("error");
      }
    },
    validateData: function () {
      let isValid = true;

      if (!this.title) {
        isValid = false;
        this.errors.title = "Title is required";
      }
      if (!this.tagline) {
        isValid = false;
        this.errors.tagline = "Tagline is required";
      }
      if (!this.cardImage) {
        isValid = false;
        this.errors.cardImage = "Card image is required";
      }
      if (!this.country) {
        isValid = false;
        this.errors.country = "Country is required";
      }
      if (!this.city) {
        isValid = false;
        this.errors.city = "City is required";
      }
      if (!this.category) {
        isValid = false;
        this.errors.category = "Category is required";
      }
      if (this.tags.length === 0) {
        isValid = false;
        this.errors.tags = "You need at least 1 campaign tag";
      }
      if (!this.duration) {
        isValid = false;
        this.errors.duration = "Duration is required";
      }

      return isValid;
    },
  },
};
</script>

<style>
.entreField {
  position: relative;
  margin: 40px 0;
}

.entreField-required,
.error-message {
  color: #ff324b;
}

option {
  background-color: #4c4f54;
}

.duration-input {
  width: 60px !important;
}

body .v-select .vs__dropdown-toggle {
  border: 1px solid #bb86fc !important;
  padding: 0;
  border-radius: 6px;
}

body .v-select .vs__search {
  height: 42px !important;
}

body .v-select .vs__selected-options .vs__selected {
  background: #bb86fc;
  height: 32px;
  margin: auto 3px !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
