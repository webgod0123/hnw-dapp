<template>
  <div>
    <campaign-breadcrumb
      :home="home"
      :title="title"
      :perksCreate="true"
      @createPerks="savePerks"
    />
    <div class="card bg-dark text-white p-4 mt-4">
      <div class="row">
        <div class="col-12 col-lg-10">
          <h2>Perk Details</h2>
          <p class="fs-5">
            Perks are incentives offered to backers in exchange for their
            support. Make sure your perks are not prohibited.
          </p>
          <div class="entreField">
            <label class="form-label fs-5">Visibility </label>
            <div class="my-2">
              You can change the visibility of your perks at any time. Change
              the visibility to hidden if you’re working on a perk that is not
              ready or if you no longer want backers to claim it.
            </div>
            <div class="d-flex justify-content-start align-items-center fs-5">
              <label>
                <input
                  type="radio"
                  class="radio-btn"
                  value="true"
                  v-model="perk.availableClaim"
                />
                <span class="ms-2"><strong>Visible.</strong></span>
                <span> Perk is available to claim. </span>
              </label>
            </div>
            <div class="d-flex justify-content-start mt-3 fs-5">
              <label>
                <input
                  type="radio"
                  class="radio-btn"
                  value="false"
                  v-model="perk.availableClaim"
                />
                <span class="ms-2"><strong>Hidden.</strong></span>
                <span> Perk is not available to claim. </span>
              </label>
            </div>
          </div>
          <div class="entreField">
            <label class="form-label fs-5"
              >Price <span class="entreField-required">*</span></label
            >
            <div class="my-2">
              Set an amount that you want to collect from backers who claim this
              perk. This amount should represent how much you want to receive
              for all the items included in this perk.
            </div>
            <div class="w-25 d-flex align-items-center">
              <span class="fs-4">$</span>
              <input
                class="
                  form-control form-control-lg
                  bg-transparent
                  border border-primary
                  mx-2
                "
                type="number"
                v-model="perk.price"
                @input="retailPriceChange"
              />
              <span class="fs-5">USD</span>
            </div>
            <span v-if="priceOff"
              >Approximately {{ priceOff.toFixed(2) }} % off</span
            >
            <span class="error-message" v-if="errors.price">{{
              errors.price
            }}</span>
          </div>
          <div class="entreField">
            <label class="form-label fs-5">Retail Price</label>
            <div class="w-25 d-flex align-items-center">
              <span class="fs-4">$</span>
              <input
                class="
                  form-control form-control-lg
                  bg-transparent
                  border border-primary
                  mx-2
                "
                type="number"
                v-model="perk.retailPrice"
                @input="retailPriceChange"
              />
              <span class="fs-5">USD</span>
            </div>
            <span class="error-message" v-if="errors.retailPrice">{{
              errors.retailPrice
            }}</span>
          </div>
          <div class="entreField">
            <label class="form-label fs-5"
              >Title <span class="entreField-required">*</span></label
            >
            <div class="my-2">
              The title for your perk is what will appear on your campaign page
              and throughout Indiegogo. Create a title that best describes the
              contents of what this perk is offering.
            </div>
            <input
              class="
                form-control form-control-lg
                bg-transparent
                border border-primary
              "
              type="text"
              v-model="perk.title"
            />
            <span class="error-message" v-if="errors.title">{{
              errors.title
            }}</span>
          </div>
          <div class="entreField">
            <label class="form-label fs-5"
              >Included Items <span class="entreField-required">*</span></label
            >
            <div class="my-2">
              Add the items included in this perk. Items could be physical,
              digital, experiences, or even just a thank you. Specify item
              quantity and add additional items to create bundles.
            </div>
            <div
              class="d-flex justify-content-start align-items-center my-4"
              v-for="(item, index) in perk.includedItems"
              :key="index"
            >
              <div class="d-flex w-100">
                <div class="w-75 pe-2">
                  <label>Item Selection</label>
                  <v-select
                    :options="perkItems"
                    :reduce="(tag) => tag.value"
                    :value="item.item"
                    label="label"
                    @input="updateIncludedItem(index, $event, 'item')"
                  />
                </div>
                <div class="w-25 ps-2">
                  <label>Qty</label>
                  <input
                    class="
                      form-control form-control-lg
                      bg-transparent
                      border border-primary
                    "
                    :value="item.qty"
                    :disabled="!item.item"
                    @input="updateIncludedItem(index, $event, 'qty')"
                  />
                </div>
                <div
                  class="upload-action-icon bg-primary ms-2 remove-item-icon"
                  v-if="perk.includedItems.length > 1"
                  @click="removeIncludedItem(index)"
                >
                  <img src="/assets/img/icons/icons8-close-50.png" />
                </div>
              </div>
            </div>
            <div>
              <button
                class="btn btn-primary mt-2"
                data-bs-toggle="modal"
                data-bs-target="#perkItemModal"
              >
                Add Item Option
              </button>
              <button
                v-if="perk.includedItems.length > 0"
                class="btn btn-primary mt-2 ms-2"
                @click="addIncludedItem"
              >
                Add Item
              </button>
            </div>
            <div
              class="modal fade bg-dark bg-opacity-60"
              id="perkItemModal"
              tabindex="-1"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark bg-opacity-90">
                  <div class="modal-header">
                    <h4 class="modal-title">Connect your wallet</h4>
                    <button
                      id="perkItemModalClose"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-hidden="true"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-12">
                        <h2>Item</h2>
                        <div class="entreField">
                          <label class="form-label fs-5"
                            >Item Name
                            <span class="entreField-required">*</span></label
                          >
                          <div class="my-2">
                            Use a concise and obvious name for the item.
                          </div>
                          <input
                            class="
                              form-control form-control-lg
                              bg-transparent
                              border border-primary
                            "
                            type="text"
                            v-model="itemName"
                          />
                          <span class="error-message" v-if="itemNameError">{{
                            itemNameError
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-default" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button class="btn btn-primary" @click="saveItem">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <span class="error-message" v-if="errors.includedItems">{{
              errors.includedItems
            }}</span>
          </div>
          <div class="entreField">
            <label class="form-label fs-5"
              >Description <span class="entreField-required">*</span></label
            >
            <div class="my-2">
              Describe the details of this perk. Be creative, this is your
              opportunity to educate backers on what they will be receiving
              after they claim this perk.
            </div>
            <textarea
              class="
                form-control form-control-lg
                bg-transparent
                border border-primary
              "
              type="text"
              rows="10"
              v-model="perk.description"
            />
            <span class="error-message" v-if="errors.description">{{
              errors.description
            }}</span>
          </div>
          <div class="entreField">
            <label class="form-label fs-5">Perk Image</label>
            <div class="my-2">
              Please do not use images containing text such as price and
              discount or the Indiegogo brand colors. Recommended dimensions:
              660x440 pixels. PNG or JPG supported.
            </div>
            <upload
              @image="getImage"
              :image="perk.perkImage"
              :className="'upload-perk-image'"
            />
          </div>
          <div class="entreField">
            <label class="form-label fs-5">Quantity Available</label>
            <div class="my-2">
              You can limit the quantity available to backers based on
              production volume. Leaving this field blank indicates that there
              is no quantity limit.
            </div>
            <input
              class="
                form-control form-control-lg
                bg-transparent
                border border-primary
                w-25
              "
              type="number"
              v-model="perk.quantity"
            />
          </div>
          <div class="mt-4">
            <h2>Estimated delivery date</h2>
            <p class="fs-5">
              Estimate a delivery date for this perk for your backers. This date
              and future changes to it will appear on the perk card for your
              backers to see.
            </p>
            <div class="entreField">
              <label class="form-label fs-5">Estimated date</label>
              <input
                class="
                  form-control form-control-lg
                  bg-transparent
                  border border-primary
                  w-25
                "
                type="date"
                v-model="perk.estDate"
              />
            </div>
          </div>
          <div class="entreField">
            <label class="form-label fs-3">Shipping</label>
            <div class="fs-5">
              Does this perk contain items that you need to ship?
            </div>
            <div
              class="d-flex justify-content-start align-items-center fs-5 mt-4"
            >
              <label>
                <input
                  type="radio"
                  class="radio-btn"
                  value="false"
                  v-model="perk.shipping"
                />
                <span class="ms-2"><strong>No.</strong></span>
                <span>
                  This perk does not contain items that need to be shipped.
                </span>
              </label>
            </div>
            <div class="d-flex justify-content-start mt-3 fs-5">
              <label>
                <input
                  type="radio"
                  class="radio-btn"
                  value="true"
                  v-model="perk.shipping"
                />
                <span class="ms-2"><strong>Yes.</strong></span>
                <span> This perk contains items that need to be shipped. </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CampaignBreadcrumb from "../../../components/CampaignBreadcrumb.vue";
import Upload from "../../../components/Upload.vue";
export default {
  components: { CampaignBreadcrumb, Upload },
  data() {
    return {
      home: "Perks",
      title: "Create Perk",
      priceOff: "",
      itemName: "",
      itemNameError: "",
      perk: {
        availableClaim: true,
        price: "",
        retailPrice: "",
        title: "",
        includedItems: [],
        description: "",
        perkImage: "",
        quantity: "",
        estDate: "",
        shipping: false,
      },
      errors: {
        price: "",
        description: "",
        title: "",
        retailPrice: "",
        includedItems: "",
      },
    };
  },
  computed: {
    ...mapState(["campaigns"]),
    perkItems: {
      get() {
        const perkItems = this.campaigns.perkItems;
        return perkItems;
      },
    },
  },
  created() {
    this.perk = this.$route.query;
    this.title = this.perk.title;
    if (this.perkItems.length > 0 && this.perk.includedItems.length === 0)
      this.addIncludedItem();
  },
  methods: {
    ...mapActions({
      updatePerk: "campaigns/updatePerk",
      addPerkItem: "campaigns/addPerkItem",
    }),
    retailPriceChange: function () {
      if (
        Number(this.perk.price) >= Number(this.perk.retailPrice) &&
        this.perk.retailPrice
      )
        this.errors.retailPrice = "Retail price should be higher than price";
      else this.errors.retailPrice = "";
      if (
        this.perk.price &&
        this.perk.retailPrice &&
        Number(this.perk.price) < Number(this.perk.retailPrice)
      ) {
        this.priceOff =
          ((this.perk.retailPrice - this.perk.price) / this.perk.retailPrice) *
          100;
      } else this.priceOff = "";
    },
    savePerks: function () {
      if (!this.validate()) {
        this.showAlert({
          type: "error",
          title: "Error",
          html: "Please fix the issues!",
        });
      } else {
        this.perk.includedItems = this.perk.includedItems.filter(
          (item) => item.item
        );
        this.updatePerk(this.perk);
        this.$router.push("/campaign_edit/perks");
      }
    },
    validate: function () {
      let isValid = true;

      if (!this.perk.price) {
        this.errors.price = "Price is required";
        isValid = false;
      } else this.errors.price = "";

      if (!this.perk.description) {
        this.errors.description = "Description is required";
        isValid = false;
      } else this.errors.description = "";

      if (!this.perk.title) {
        this.errors.title = "Title is required";
        isValid = false;
      } else this.errors.title = "";

      const includedItems = this.perk.includedItems;
      let n = 0;
      for (let i = 0; i < includedItems.length; i++) {
        let item = includedItems[i];
        if (item.item && item.qty) n++;
      }
      if (n == 0) {
        this.errors.includedItems = "At least one Item required";
        isValid = false;
      } else this.errors.includedItems = "";

      if (
        Number(this.perk.price) >= Number(this.perk.retailPrice) &&
        this.perk.retailPrice
      ) {
        this.errors.retailPrice = "Retail price should be higher than price";
        isValid = false;
      } else this.errors.retailPrice = "";

      return isValid;
    },
    saveItem: function () {
      if (!this.itemName) this.itemNameError = "Item name is required";
      else {
        this.addPerkItem({ item: this.itemName });
        if (this.perk.includedItems.length === 0) this.addIncludedItem();
        this.itemName = "";
      }
    },
    addIncludedItem: function () {
      this.perk.includedItems.push({ item: "", qty: 1 });
    },
    updateIncludedItem: function (index, e, key) {
      if (key === "item") {
        this.perk.includedItems.forEach((item, id) => {
          if (id === index) {
            let n = 0;
            let value = e;
            this.perk.includedItems.forEach((item) => {
              if (item.item == value) n++;
            });

            if (n === 0) item[key] = value;
          }
        });
        return;
      }
      this.perk.includedItems.forEach((item, id) => {
        if (id === index) item[key] = key == "item" ? e : e.target.value;
      });
    },
    removeIncludedItem: function (index) {
      this.perk.includedItems = this.perk.includedItems.filter(
        (item, id) => id !== index
      );
    },
    getImage: function (image) {
      this.perk.perkImage = image;
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
.radio-btn {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
.remove-item-icon {
  margin-top: 25px;
}
</style>