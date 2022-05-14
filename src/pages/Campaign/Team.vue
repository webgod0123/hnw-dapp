<template>
  <div>
    <campaign-breadcrumb :home="home" :title="title" @saveCampaign="save" />
    <div class="card bg-dark text-white p-4 mt-4">
      <div class="row">
        <div class="col-12 col-lg-10">
          <h2>Primary Contact</h2>
          <p class="fs-5">
            Please provide your legal address and contact information, or that
            of your company's. We may share your contact information for
            reporting or disclosure requirements.
          </p>
          <div class="row my-4 py-2">
            <div class="col-md-6">
              <label class="form-label fs-5"
                >Legal First Name
                <span class="entreField-required">*</span></label
              >
              <input
                class="
                  form-control form-control-lg
                  bg-transparent
                  border border-primary
                "
                type="text"
                v-model="legalFirstName"
              />
              <span class="error-message" v-if="errors.legalFirstName">{{
                errors.legalFirstName
              }}</span>
            </div>
            <div class="col-md-6">
              <label class="form-label fs-5"
                >Legal Last Name
                <span class="entreField-required">*</span></label
              >
              <input
                class="
                  form-control form-control-lg
                  bg-transparent
                  border border-primary
                "
                type="text"
                v-model="legalLastName"
              />
              <span class="error-message" v-if="errors.legalLastName">{{
                errors.legalLastName
              }}</span>
            </div>
          </div>
          <div class="row my-4 py-2">
            <div class="col-md-6">
              <label class="form-label fs-5"
                >Date of Birth <span class="entreField-required">*</span></label
              >
              <input
                class="
                  form-control form-control-lg
                  bg-transparent
                  border border-primary
                "
                type="date"
                v-model="birth"
              />
              <span class="error-message" v-if="errors.birth">{{
                errors.birth
              }}</span>
            </div>
            <div class="col-md-6">
              <label class="form-label fs-5"
                >Phone Number <span class="entreField-required">*</span></label
              >
              <input
                class="
                  form-control form-control-lg
                  bg-transparent
                  border border-primary
                "
                type="text"
                v-model="phoneNumber"
              />
              <span class="error-message" v-if="errors.phoneNumber">{{
                errors.phoneNumber
              }}</span>
            </div>
          </div>
          <div class="my-4 py-2">
            <label class="form-label fs-5"
              >Country <span class="entreField-required">*</span></label
            >
            <input
              class="
                form-control form-control-lg
                bg-transparent
                border border-primary
              "
              type="text"
              v-model="country"
            />
            <span class="error-message" v-if="errors.country">{{
              errors.country
            }}</span>
          </div>
          <div class="my-4 py-2 pb-4">
            <label class="form-label fs-5"
              >Street Address <span class="entreField-required">*</span></label
            >
            <input
              class="
                form-control form-control-lg
                bg-transparent
                border border-primary
              "
              type="text"
              v-model="street"
            />
            <span class="error-message" v-if="errors.street">{{
              errors.street
            }}</span>
          </div>
          <div class="my-4 py-4 border-top border-primary">
            <label class="form-label fs-3"
              >Support Email Address
              <span class="entreField-required">*</span></label
            >
            <div class="fs-5 mb-4">
              If you don't want to use the Campaign Owner's Indiegogo Account
              email address to answer questions from backers, please include
              another that will be used by you or a team member to address
              backer specific concerns.
            </div>
            <input
              class="
                form-control form-control-lg
                bg-transparent
                border border-primary
              "
              type="email"
              v-model="email"
            />
            <span class="error-message" v-if="errors.email">{{
              errors.email
            }}</span>
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
export default {
  components: { CampaignBreadcrumb },
  data() {
    return {
      title: "Team",
      home: "Campaign",
      errors: {
        legalFirstName: "",
        legalLastName: "",
        birth: "",
        phoneNumber: "",
        country: "",
        street: "",
        email: "",
      },
    };
  },
  computed: {
    ...mapState(["campaigns"]),
    legalFirstName: {
      set(legalFirstName) {
        this.setCampaignTeam({legalFirstName});
      },
      get() {
        return this.campaigns.team.legalFirstName;
      },
    },
    legalLastName: {
      set(legalLastName) {
        this.setCampaignTeam({legalLastName});
      },
      get() {
        return this.campaigns.team.legalLastName;
      },
    },
    birth: {
      set(birth) {
        this.setCampaignTeam({birth});
      },
      get() {
        return this.campaigns.team.birth;
      },
    },
    phoneNumber: {
      set(phoneNumber) {
        this.setCampaignTeam({phoneNumber});
      },
      get() {
        return this.campaigns.team.phoneNumber;
      },
    },
    country: {
      set(country) {
        this.setCampaignTeam({country});
      },
      get() {
        return this.campaigns.team.country;
      },
    },
    street: {
      set(street) {
        this.setCampaignTeam({street});
      },
      get() {
        return this.campaigns.team.street;
      },
    },
    email: {
      set(email) {
        this.setCampaignTeam({email});
      },
      get() {
        return this.campaigns.team.email;
      },
    },
  },
  methods: {
    ...mapActions({
      setCampaignTeam: "campaigns/setCampaignTeam",
    }),
    save: function () {
      if (!this.validate()) {
        this.showAlert({
          type: "error",
          title: "Error",
          html: "Please fix the issues!",
        });
      } else {
        this.$router.push("/campaign_edit/funding");
      }
    },
    validate: function () {
      let isValid = true;

      if (!this.legalFirstName) {
        this.errors.legalFirstName = "First name is required";
        isValid = false;
      } else this.errors.legalFirstName = "";

      if (!this.legalLastName) {
        this.errors.legalLastName = "Last name is required";
        isValid = false;
      } else this.errors.legalLastName = "";

      if (!this.birth) {
        this.errors.birth = "Date of birth is required";
        isValid = false;
      } else this.errors.birth = "";

      if (!this.phoneNumber) {
        this.errors.phoneNumber = "Phone number is required";
        isValid = false;
      } else this.errors.phoneNumber = "";

      if (!this.country) {
        this.errors.country = "Country is required";
        isValid = false;
      } else this.errors.country = "";

      if (!this.street) {
        this.errors.street = "Street address is required";
        isValid = false;
      } else this.errors.street = "";

      if (!this.email) {
        this.errors.email = "Email is required";
        isValid = false;
      } else if (this.email) {
        let mailformat =
          /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        if (!this.email.match(mailformat)) {
          this.errors.email = "Invalid email address";
          isValid = false;
        } else this.errors.email = "";
      }

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
</style>
