<template>
  <b-container>
    <h3 class="my-4 text-center">Booking Details</h3>

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
            <p class="mb-1 text-info">₹ {{ selectedAddonPrice }}</p>
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
          price: parseFloat(this.$route.query.price),
          originalPrice: parseFloat(this.$route.query.originalPrice),
        };
      },
    },
  },

  data() {
    return {
      selectedAddon: null, // Holds the selected add-on
      addonOptions: [
        { value: null, text: "Choose an add-on" },
        { value: 1000, text: "BookOntrack Helmet - ₹ 1000" },
        { value: 500, text: "Other Helmet - ₹ 500" },
      ],
    };
  },

  computed: {
    discountedPrice() {
      const originalPrice = this.bike.originalPrice || 0; // Default to 0 if not defined
      const price = this.bike.price || 0; // Default to 0 if not defined
      return originalPrice - price; // Calculate the difference
    },
    selectedAddonPrice() {
      return this.selectedAddon || 0; // Return selected add-on price or 0
    },
    totalPrice() {
      return this.bike.price + this.selectedAddonPrice; // Calculate total price including add-ons
    },
  },

  methods: {
    updatePrice() {
      // This can be left empty if you only want the computed properties to handle price updates
    },
    proceedToPayment() {
      // Format the payment details for WhatsApp
      const paymentDetails = `
        Booking Details:
        - Bike: ${this.bike.name}
        - Original Price: ₹${this.bike.originalPrice}
        - Discounted Price: - ₹${this.discountedPrice}
        ${this.selectedAddonPrice > 0 ? `- Add-on Price: ₹${this.selectedAddonPrice}` : ""}
        ---------------------
        Total Price: ₹${this.totalPrice}
        
        UPI ID for Payment: your-upi-id@bank
      `.trim();

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(paymentDetails);

      // Create the WhatsApp link
      const whatsappLink = `https://wa.me/919901362369?text=${encodedMessage}`;


      // Open WhatsApp in a new tab
      window.open(whatsappLink, "_blank");
    },
  },
};
</script>
