<template>
  <div class="container mt-4">
    <b-row>
      <b-col cols="12" lg="6">
        <h2>{{ bike.name }}</h2>
        <b-img :src="bike.image" :alt="bike.name" fluid></b-img>
        <small class="extra-small">
          Images are for representation purposes only. Actual products delivered
          may differ from the images displayed on the website.
        </small>
      </b-col>
      <b-col cols="12" lg="6" class="my-2">
        <b-badge
          variant="danger"
          v-if="bike.highDemand"
          class="mr-1 font-weight-bold h5 p-2"
        >
          High Demand
        </b-badge>
        <b-badge
          variant="primary"
          v-if="bike.highMileage"
          class="mr-1 font-weight-bold h5 p-2"
        >
          High Mileage
        </b-badge>
        <b-badge
          variant="success"
          v-if="bike.bestSeller"
          class="mr-1 font-weight-bold h5 p-2"
        >
          Bestseller
        </b-badge>
        <h6 class="text-muted">Monthly Rental</h6>
        <div class="d-flex">
          <h6 class="text-muted" style="text-decoration: line-through">
            ₹ {{ bike.originalPrice }}
          </h6>
          <h6 class="text-success ml-2">
            {{ calculateDiscount(bike) }}% off (limited offer)
          </h6>
        </div>
        <h4 class="font-weight-bold">
          Price: ₹ {{ bike.price }} /month <br />
          <p></p>
        </h4>

        <div class="d-flex align-items-center">
          <b-icon
            v-for="i in 5"
            :key="i"
            icon="star-fill"
            :variant="i <= Math.floor(bike.rating) ? 'warning' : 'secondary'"
            class="mr-1"
          ></b-icon>
          <span class="text-muted ml-2"
            >{{ bike.rating }} ({{ bike.ratingCount }})</span
          >
        </div>
        <p><strong>Status:</strong> {{ getStatusText(bike.status) }}</p>
        <p><strong>Description:</strong> {{ bike.description }}</p>
      </b-col>
    </b-row>

    <!-- Add any additional details or features here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      bike: {},
    };
  },
  created() {
    const bikeId = this.$route.params.id; // Get the bike ID from the route params
    this.fetchBikeDetails(bikeId); // Fetch the bike details using the ID
  },
  methods: {
    fetchBikeDetails(id) {
      // Fetch the bike details from your data source using the bike ID
      const bikeData = [
        {
          id: 1,
          name: "Honda Shine",
          image:
            "https://on-track-jarvis.s3.ap-south-1.amazonaws.com/monthly-rental/rent-TVS-sport-bangalore-min.webp",
          rating: 4.8,
          ratingCount: 634,
          price: 3999,
          originalPrice: 4500,
          highMileage: true,
          highDemand: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 2,
          name: "Passion PRO",
          image:
            "https://on-track-jarvis.s3.ap-south-1.amazonaws.com/monthly-rental/rent-TVS-sport-bangalore-min.webp",
          rating: 4.6,
          ratingCount: 545,
          price: 3000,
          originalPrice: 3500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 2, // Only One Left
        },
        {
          id: 3,
          name: "Passion PRO",
          image:
            "https://on-track-jarvis.s3.ap-south-1.amazonaws.com/monthly-rental/rent-TVS-sport-bangalore-min.webp",
          rating: 4.6,
          ratingCount: 234,
          price: 2999,
          originalPrice: 3499,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
          status: 3, // Out of Stock
        },
        {
          id: 4,
          name: "Passion PRO",
          image:
            "https://on-track-jarvis.s3.ap-south-1.amazonaws.com/monthly-rental/rent-TVS-sport-bangalore-min.webp",
          rating: 4.6,
          ratingCount: 469,
          price: 3499,
          originalPrice: 4000,
          highMileage: false,
          highDemand: true,
          status: 1, // Summer Days Sale
        },
        // Add more bikes as needed
      ];
      this.bike = bikeData.find((bike) => bike.id === parseInt(id)); // Find the bike by ID
    },
    calculateDiscount(bike) {
      return Math.round(
        ((bike.originalPrice - bike.price) / bike.originalPrice) * 100
      );
    },
    getStatusText(status) {
      if (status === 1) return "Summer Days Sale";
      if (status === 2) return "Only One Left";
      if (status === 3) return "Out of Stock";
      return "Available";
    },
  },
};
</script>
<style scoped>
.extra-small {
  font-size: 0.75rem; /* Adjust this size as needed */
}
</style>
