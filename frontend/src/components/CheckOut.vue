<template>
  <div>
    <NavBar />
    <b-container style="margin-top: 4rem">
      <h2 class="text-center my-2">Booking Details</h2>
      <b-row>
        <b-col cols="12" md="6">
          <b-img
            class="my-5"
            :src="bike.image"
            :alt="bike.name"
            fluid
            width="400"
            height="350"
          ></b-img>
          <h5 class="my-4">{{ bike.name }}</h5>
        </b-col>
        <b-col cols="12" md="6" class="my-2">
          <b-form-group label="Select Date">
            <b-form-datepicker
              id="date-picker"
              v-model="selectedDate"
              :min="minDate"
              :max="maxDate"
              class="border-primary"
            ></b-form-datepicker>
            <b-badge
              variant="primary"
              v-if="selectedDate"
              class="font-weight-bold h5 p-2 my-2"
            >
              {{ selectedDate }} to {{ formattedDate }}
            </b-badge>
          </b-form-group>

          <b-card class="my-4 shadow-sm border-primary">
            <div class="d-flex">
              <b-form-group class="mr-4">
                <b-form-checkbox
                  v-model="isPickup"
                  @change="handlePickupChange"
                  :disabled="isDelivery"
                >
                  Pickup
                </b-form-checkbox>
                <b-collapse v-model="isPickup" class="mt-2">
                  <b-form-group v-if="isPickup">
                    <b-form-select
                      v-model="selectedPickupLocation"
                      :options="pickupLocations"
                      required
                    ></b-form-select>
                  </b-form-group>
                </b-collapse>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  v-model="isDelivery"
                  @change="handleDeliveryChange"
                  :disabled="isPickup"
                >
                  Delivery
                </b-form-checkbox>
              </b-form-group>
            </div>

            <div v-if="isPickup && selectedPickupLocation">
              <h6 class="font-weight-bold">Selected Pickup Location:</h6>
              <p class="text-primary">{{ selectedPickupLocation }}</p>
            </div>

            <div v-if="isDelivery">
              <h6 class="font-weight-bold">Delivery Address:</h6>
              <p class="text-primary">{{ deliveryAddress }}</p>
            </div>
          </b-card>

          <b-modal
            id="address-modal"
            title="Add Delivery Address"
            ok-title="Submit"
            @ok="submitAddress"
          >
            <b-form>
              <b-form-group label="Enter your address:">
                <b-form-input
                  v-model="deliveryAddress"
                  placeholder="Enter address here"
                  required
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-modal>

          <b-form-group
            label="Select Add-ons"
            label-for="addons-select"
            label-class="text-muted"
          >
            <b-form-select
              id="addons-select"
              v-model="selectedAddon"
              :options="addonOptions"
              class="border-primary"
              @change="updatePrice"
            ></b-form-select>
          </b-form-group>

          <b-card class="my-4 shadow-sm border-primary">
            <div class="d-flex justify-content-between">
              <p class="mb-1">
                <i class="fa-solid fa-tag text-success"></i> Price:
              </p>
              <p class="mb-1 font-weight-bold text-success">
                ₹ {{ bike.originalPrice }}
              </p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-1">
                <i class="fa-solid fa-percentage text-warning"></i> Discounted
                Price:
              </p>
              <p class="mb-1 text-warning">- ₹ {{ discountedPrice }}</p>
            </div>
            <div
              v-if="selectedAddonPrice > 0"
              class="d-flex justify-content-between"
            >
              <p class="mb-1">
                <i class="fa-solid fa-box text-info"></i> Add-on Price:
              </p>
              <p class="mb-1 text-info">+ ₹ {{ selectedAddonPrice }}</p>
            </div>
            <div v-if="isDelivery" class="d-flex justify-content-between">
              <p class="mb-1">
                <i class="fa-solid fa-motorcycle text-danger"></i> Delivery
                Charge:
              </p>
              <p class="mb-1 text-danger">+ ₹ 500</p>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <p class="font-weight-bold">
                <i class="fa-solid fa-calculator text-primary"></i> Total Price:
              </p>
              <p class="font-weight-bold text-primary">₹ {{ totalPrice }}</p>
            </div>
          </b-card>

          <div class="text-right">
            <b-button
              variant="primary"
              class="px-4 py-2 shadow"
              @click="proceedToPayment"
            >
              <i class="fa-solid fa-credit-card"></i> Proceed to Payment
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <FooterSectionA />
  </div>
</template>

<script>
import FooterSectionA from "@/views/FooterSectionA.vue";
import NavBar from "@/views/NavBar.vue";
import { loadStripe } from "@stripe/stripe-js";

export default {
  components: {
    NavBar,
    FooterSectionA,
  },
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
      addonOptions: [
        { value: null, text: "Choose an add-on" },
        { value: 1000, text: "BookOntrack Helmet - ₹ 1000" },
        { value: 500, text: "Other Helmet - ₹ 500" },
      ],
      selectedDate: null,
      minDate: new Date(),
      maxDate: null,
      isPickup: false,
      isDelivery: false,
      selectedPickupLocation: null,
      deliveryAddress: "",
      pickupLocations: [
        { value: null, text: "Please select a location" },
        { value: "Koramangala", text: "Koramangala" },
        { value: "Indranagar", text: "Indranagar" },
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
      // Include delivery charge if delivery is selected
      const deliveryCharge = this.isDelivery ? 500 : 0;
      return this.bike.price + this.selectedAddonPrice + deliveryCharge;
    },
    formattedDate() {
      if (this.selectedDate) {
        const date = new Date(this.selectedDate);
        date.setDate(date.getDate() + 30);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
      }
      return "";
    },
  },

  methods: {
    handlePickupChange() {
      if (!this.isPickup) {
        this.selectedPickupLocation = null;
      }
    },
    handleDeliveryChange() {
      if (this.isDelivery) {
        this.$bvModal.show("address-modal");
      } else {
        this.deliveryAddress = "";
      }
    },
    submitAddress() {
      if (this.deliveryAddress) {
        console.log("Delivery address:", this.deliveryAddress);
      }
    },
    updatePrice() {
      // Method can be enhanced to dynamically calculate price updates if needed
    },
    async proceedToPayment() {
      const stripe = await loadStripe(
        "pk_test_51QKasuB0AVnVwjeaYjRl1QzYIlQrqMohBCut4q5fUCJeBBie4PpQpIJifo0GXKYznbtAFDdr9zK3T4kKQbR9G3lR00yYbo2zJM"
      ); // Your Stripe Publishable Key

      const paymentDetails = {
        bookingDetails: `
        Bike: ${this.bike.name} 
        Price: ₹${this.bike.originalPrice}
        Discounted Price: - ₹${this.discountedPrice}
        ${
          this.selectedAddonPrice > 0
            ? `Add-on Price: ₹${this.selectedAddonPrice}`
            : ""
        }
        ${this.isDelivery ? `Delivery Charge: ₹500` : ""}
        ---------------------
        Total Price: ₹${this.totalPrice}
    `,
        amount: this.totalPrice, // Amount to be charged in INR
      };

      const bookingDetails = {
        bikeName: this.bike.name,
        originalPrice: this.bike.originalPrice,
        discountedPrice: this.discountedPrice,
        addonPrice: this.selectedAddonPrice,
        deliveryCharge: this.isDelivery ? 500 : 0,
        totalPrice: this.totalPrice,
        selectedAddon: this.addonOptions.find(
          (option) => option.value === this.selectedAddon
        )?.text,
      };

      // Save booking details to localStorage
      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

      try {
        console.log(paymentDetails);
        // Call the backend to create the Stripe session
        const response = await fetch(
          "http://localhost:8080/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentDetails),
          }
        );

        const { sessionId } = await response.json();

        // Redirect to Stripe Checkout
        await stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        console.error("Error during payment:", error);
      }
    },
  },
};
</script>
