<template>
  <div>
    <section class="section gradient-light booking-page">
      <b-container>
        <!-- STEP HEADER -->
        <div class="kyc-step-header mb-5">
          <div class="step-item active">
            <div class="step-circle">1</div>
            <span>Choose Bike</span>
          </div>

          <div class="step-line active"></div>

          <div class="step-item active">
            <div class="step-circle">2</div>
            <span>KYC</span>
          </div>

          <div class="step-line active"></div>

          <div class="step-item active">
            <div class="step-circle">3</div>
            <span>Checkout</span>
          </div>
        </div>

        <b-row>
          <!-- LEFT BOOKING FORM -->
          <b-col lg="7">
            <div class="card-app shadow-lg booking-form-card">
              <!-- rental date -->
              <div class="booking-block">
                <h5 class="block-title">Rental Duration</h5>
                <div class="input-icon-wrap">
                  <i class="fa-solid fa-address-card"></i>
                  <b-form-input
                    v-model="selectedDate"
                    type="date"
                    :min="todayDate"
                    class="custom-input"
                  ></b-form-input>
                </div>

                <div v-if="selectedDate" class="date-badge mt-3">
                  {{ selectedDate }} → {{ formattedDate }}
                </div>
              </div>

              <!-- pickup delivery -->
              <div class="booking-block">
                <h5 class="block-title">Pickup / Delivery Option</h5>

                <div class="delivery-toggle-wrap">
                  <div
                    class="toggle-box"
                    :class="{ activeToggle: isPickup }"
                    @click="selectPickup"
                  >
                    <i class="fa-solid fa-store"></i>
                    Pickup
                  </div>

                  <div
                    class="toggle-box"
                    :class="{ activeToggle: isDelivery }"
                    @click="selectDelivery"
                  >
                    <i class="fa-solid fa-truck-fast"></i>
                    Delivery
                  </div>
                </div>

                <div v-if="isPickup" class="mt-3">
                  <div class="input-icon-wrap">
                    <i class="fa-solid fa-address-card"></i>
                    <b-form-select
                      v-model="selectedPickupLocation"
                      :options="pickupLocations"
                      class="custom-input"
                      required
                    ></b-form-select>
                  </div>
                </div>

                <div v-if="isDelivery" class="selected-box mt-3">
                  {{ deliveryAddress || "Delivery address will be added." }}
                </div>
              </div>

              <!-- add on -->
              <div class="booking-block">
                <h5 class="block-title">Add-ons</h5>
                <div class="input-icon-wrap">
                  <i class="fa-solid fa-address-card"></i>
                  <b-form-select
                    v-model="selectedAddon"
                    :options="addonOptions"
                    class="custom-input"
                    required
                  ></b-form-select>
                </div>
              </div>

              <!-- bill summary -->
              <div class="price-summary-card">
                <div class="summary-line">
                  <span>Bike Rental Price</span>
                  <strong>₹{{ bike.originalPrice }}</strong>
                </div>

                <div class="summary-line discount">
                  <span>Discount Applied</span>
                  <strong>- ₹{{ discountedPrice }}</strong>
                </div>

                <div v-if="selectedAddonPrice > 0" class="summary-line">
                  <span>Add-on Charge</span>
                  <strong>+ ₹{{ selectedAddonPrice }}</strong>
                </div>

                <div v-if="isDelivery" class="summary-line">
                  <span>Delivery Charge</span>
                  <strong>+ ₹500</strong>
                </div>

                <div class="summary-total">
                  <span>Total Payable</span>
                  <strong>₹{{ totalPrice }}</strong>
                </div>
              </div>

              <button
                class="btn-primary-app btn-lg-app w-100 justify-content-center mt-4"
                @click="proceedToPayment"
              >
                <i class="fa-solid fa-credit-card"></i>
                Proceed To Payment
              </button>
            </div>
          </b-col>

          <!-- RIGHT BIKE INFO -->
          <b-col lg="5" class="mb-4">
            <div class="card-app shadow-lg bike-preview-card">
              <div class="bike-image-box">
                <img :src="bike.image" :alt="bike.name" class="bike-main-img" />
              </div>

              <h4 class="font-bold mt-4">{{ bike.name }}</h4>

              <div class="price-strip">
                <span class="old-price">₹{{ bike.originalPrice }}</span>
                <span class="new-price">₹{{ bike.price }}</span>
              </div>

              <p class="bike-note">
                Selected bike is reserved for 30 days rental duration.
              </p>
            </div>
          </b-col>
        </b-row>

        <!-- modal -->
        <b-modal
          id="address-modal"
          centered
          hide-footer
          modal-class="address-modal"
        >
          <div class="text-center">
            <div class="icon-box">
              <i class="fas fa-map-marker-alt"></i>
            </div>

            <h4 class="mt-3 mb-1 font-weight-bold">Delivery Address</h4>

            <p class="text-muted small">Enter your complete address</p>
          </div>

          <b-form-textarea
            v-model="deliveryAddress"
            rows="4"
            placeholder="House no, street, city, pincode..."
            class="mt-3 address-input"
          ></b-form-textarea>

          <div class="text-right mt-4">
            <b-button
              variant="btn-secondary-app"
              class="mr-2 px-4"
              @click="$bvModal.hide('address-modal')"
            >
              Cancel
            </b-button>

            <b-button class="btn-primary-app" @click="submitAddress">
              Save
            </b-button>
          </div>
        </b-modal>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    bike: {
      type: Object,
      required: false,
      default() {
        return {
          name: this.$route.query.name,
          image: this.$route.query.image,
          price: parseFloat(this.$route.query.price) || 0,
          originalPrice: parseFloat(this.$route.query.originalPrice) || 0,
        };
      },
    },
  },

  data() {
    return {
      selectedAddon: null,
      selectedDate: null,
      todayDate: new Date().toISOString().split("T")[0],
      isPickup: true,
      isDelivery: false,
      selectedPickupLocation: null,
      deliveryAddress: "",
      addonOptions: [
        { value: null, text: "Choose add-on" },
        { value: 1000, text: "BikeOntrack Premium Helmet - ₹1000" },
        { value: 500, text: "Standard Helmet - ₹500" },
      ],
      pickupLocations: [
        { value: null, text: "Select pickup location" },
        { value: "Koramangala", text: "Koramangala" },
        { value: "Indiranagar", text: "Indiranagar" },
      ],
    };
  },

  computed: {
    discountedPrice() {
      return this.bike.originalPrice - this.bike.price;
    },

    selectedAddonPrice() {
      return this.selectedAddon || 0;
    },

    totalPrice() {
      return (
        this.bike.price + this.selectedAddonPrice + (this.isDelivery ? 500 : 0)
      );
    },

    formattedDate() {
      if (!this.selectedDate) return "";
      const date = new Date(this.selectedDate);
      date.setDate(date.getDate() + 30);
      return date.toISOString().split("T")[0];
    },
  },

  methods: {
    selectPickup() {
      this.isPickup = true;
      this.isDelivery = false;
      this.deliveryAddress = "";
    },

    selectDelivery() {
      this.isPickup = false;
      this.isDelivery = true;
      this.$bvModal.show("address-modal");
    },

    submitAddress() {
      if (!this.deliveryAddress) {
        this.$bvToast.toast("Please enter delivery address.", {
          title: "Address Required",
          variant: "danger",
          solid: true,
        });
      }
    },

    async proceedToPayment() {
      // ================= VALIDATION =================
      if (!this.selectedDate) {
        this.$bvToast.toast("Please select rental starting date.", {
          title: "Date Required",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });
        return;
      }

      if (this.isPickup && !this.selectedPickupLocation) {
        this.$bvToast.toast("Please select pickup location.", {
          title: "Pickup Location Required",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });
        return;
      }

      if (this.isDelivery && !this.deliveryAddress) {
        this.$bvToast.toast("Please enter delivery address.", {
          title: "Delivery Address Required",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });
        return;
      }

      // ================= BOOKING DETAILS SAVE =================
      const bookingDetails = {
        bikeName: this.bike.name,
        bikeImage: this.bike.image,
        rentalStartDate: this.selectedDate,
        rentalEndDate: this.formattedDate,
        pickupType: this.isPickup ? "Pickup" : "Delivery",
        pickupLocation: this.isPickup ? this.selectedPickupLocation : "",
        deliveryAddress: this.isDelivery ? this.deliveryAddress : "",
        addon:
          this.addonOptions.find((x) => x.value === this.selectedAddon)?.text ||
          "No Add-on",
        addonPrice: this.selectedAddonPrice,
        bikeOriginalPrice: this.bike.originalPrice,
        discountedPrice: this.discountedPrice,
        deliveryCharge: this.isDelivery ? 500 : 0,
        totalPrice: this.totalPrice,
      };

      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

      // ================= RAZORPAY PAYMENT =================
      const options = {
        key: process.env.VUE_APP_RAZORPAY_KEY, //  razorpay test key from .env
        amount: this.totalPrice * 100,
        currency: "INR",
        name: "BikeOntrack",
        description: "30 Days Bike Rental Booking",
        image: this.bike.image,

        handler: (response) => {
          console.log("Payment Success:", response);

          localStorage.setItem("paymentResponse", JSON.stringify(response));

          this.$bvToast.toast("Payment Successful!", {
            title: "Success",
            variant: "success",
            solid: true,
            toaster: "b-toaster-bottom-right",
          });

          setTimeout(() => {
            this.$router.push("/payment-success");
          }, 1500);
        },

        prefill: {
          name: "BikeOntrack Customer",
          email: "customer@test.com",
          contact: "9999999999",
        },

        notes: {
          bike_name: this.bike.name,
          rental_date: this.selectedDate,
          return_date: this.formattedDate,
          mode: this.isPickup ? "Pickup" : "Delivery",
        },

        theme: {
          color: "#e60013",
        },

        modal: {
          ondismiss: () => {
            this.$bvToast.toast("Payment window closed.", {
              title: "Cancelled",
              variant: "warning",
              solid: true,
              toaster: "b-toaster-bottom-right",
            });
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    },
  },
};
</script>

<style scoped>
.booking-page {
  min-height: 100vh;
}

.booking-form-card,
.bike-preview-card {
  border-radius: var(--radius-2xl);
  /* height: 100%; */
  position: sticky;
  top: 100px;
  align-self: start;
}

.bike-image-box {
  background: #fff;
  border-radius: var(--radius-xl);
  padding: 20px;
  text-align: center;
}

.bike-main-img {
  width: 100%;
  max-height: 280px;
  object-fit: contain;
}

.price-strip {
  margin-top: 12px;
  display: flex;
  gap: 14px;
  align-items: center;
}

.old-price {
  text-decoration: line-through;
  color: var(--color-gray-400);
}

.new-price {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
}

.bike-note {
  margin-top: 10px;
  color: var(--color-gray-500);
  font-size: 14px;
}

.booking-block {
  margin-bottom: 24px;
}

.block-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}

.delivery-toggle-wrap {
  display: flex;
  gap: 14px;
}

.toggle-box {
  flex: 1;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  padding: 14px;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
}

.activeToggle {
  background: var(--color-primary);
  color: #fff;
}

.selected-box {
  padding: 12px;
  border-radius: var(--radius-lg);
  background: var(--color-gray-50);
}

.price-summary-card {
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-xl);
  padding: 20px;
  background: #fff;
}

.summary-line,
.summary-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.discount strong {
  color: #16a34a;
}

.summary-total {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-gray-100);
  font-size: 18px;
}

.date-badge {
  background: var(--color-primary-bg);
  color: var(--color-primary);
  padding: 10px 14px;
  border-radius: 30px;
  display: inline-block;
}

.kyc-step-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

.step-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-line {
  width: 45px;
  height: 2px;
  background: var(--color-primary);
}

.input-icon-wrap {
  position: relative;
}

.input-icon-wrap > i:first-child {
  position: absolute;
  left: 16px;
  top: 17px;
  color: var(--color-gray-400);
  z-index: 2;
}

.custom-input {
  padding-left: 46px !important;
  height: 50px;
  border-radius: 12px;
}

.address-modal .modal-content {
  border-radius: 18px;
  border: none;
  padding: 10px;
}

.address-modal .modal-header {
  display: none;
}

.icon-box {
  width: 65px;
  height: 65px;
  margin: auto;
  border-radius: 50%;
  background: #4f46e5;
  color: #fff;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.address-input {
  border-radius: 12px !important;
  padding: 12px !important;
}

.save-btn {
  background: #4f46e5;
  border: none;
  border-radius: 10px;
  color: white;
}

@media (max-width: 575px) {
  .step-item span {
    font-size: 10px;
  }
  .step-line {
    width: 18px;
  }
}
</style>
