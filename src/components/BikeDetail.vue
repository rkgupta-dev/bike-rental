<template>
  <b-container>
    <div class="mt-4">
      <b-row>
        <b-col cols="12" lg="6">
          <h2>{{ bike.name }}</h2>
          <div class="d-flex flex-column align-items-start">
            <b-button variant="light" size="sm" class="p-2">
              <b-icon icon="share-fill" size="25" variant="primary"></b-icon>
            </b-button>
            <b-button variant="light" size="sm" class="p-2 my-2">
              <b-icon icon="whatsapp" size="25" variant="success"></b-icon>
            </b-button>
          </div>
          <!--if you want to set fixed image size -- style="width: 500px; height: 300px;"  -->
          <b-img class="my-4" :src="bike.image" :alt="bike.name" fluid></b-img>
          <br />
          <small class="extra-small">
            Images are for representation purposes only. Actual products
            delivered may differ from the images displayed on the website.
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
          <div>
            <div v-if="bike.status === 1" class="text-success my-2">
              Summer Days Sale
            </div>
            <div v-else-if="bike.status === 2" class="text-warning my-2">
              Only One Left
            </div>
            <div v-else-if="bike.status === 3" class="text-danger my-2">
              Out of Stock
            </div>
            <CountDown />
          </div>
          <div>
            <b-badge class="color align-items-start">
              <h6>Doorstep Delivery - Within the next few days</h6>
              <h6>In-Store Pickup - Ready in 1 hour or sooner .</h6>
            </b-badge>
          </div>
          <div class="mt-4">
            <h5>Services Included with Rental</h5>
            <ul class="list-unstyled">
              <li>
                <i class="fa-solid fa-gauge"></i>
                <strong> Unlimited Kilometers:</strong> We give you the
                flexibility to travel freely without any kilometer limit.
              </li>
              <li class="">
                <i class="fa-solid fa-shield"></i>
                <strong> Insurance Covered:</strong> Comprehensive insurance at
                no extra cost covering accidents or damages.
              </li>
              <li class="">
                <i class="fa-solid fa-screwdriver-wrench"></i>
                <strong> Maintenance Covered:</strong> Our pricing includes one
                periodic service/maintenance per rental.
              </li>
            </ul>
          </div>
          <div class="row text-center mt-4">
            <b-col cols="12" md="6" class="my-2">
              <b-button squared variant="outline-success" class="w-100">
                <i class="fa-brands fa-whatsapp"></i> Get Enquiry
              </b-button>
            </b-col>
            <b-col cols="12" md="6" class="my-2">
              <b-button squared variant="primary" class="w-100">
                <i class="fa-solid fa-bicycle"></i> Rent Now
              </b-button>
            </b-col>
          </div>
        </b-col>
      </b-row>

      <!-- Add any additional details or features here -->
    </div>
  </b-container>
</template>

<script>
import CountDown from "@/views/CountDown.vue";

export default {
  components: {
    CountDown,
  },
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
    handleEnquiry() {
      // Logic for handling enquiry
      alert("Enquiry button clicked!");
    },
    handleRentNow() {
      // Logic for handling rent now
      alert("Rent Now button clicked!");
    },
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
        {
          id: 9,
          name: "Yamaha R15",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-red-1704802630538.png?q=80",
          rating: 4.8,
          price: 10999,
          originalPrice: 12000,
          highMileage: true,
          highDemand: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 10,
          name: "Kawasaki Ninja H2R",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/kawasaki-select-model-mirror-coated-matte-spark-black-1676442407791.png?q=80",
          rating: 4.6,
          price: 14999,
          originalPrice: 16000,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 2, // Only One Left
        },
        {
          id: 11,
          name: "Suzuki GSX-R1000",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/suzuki-gsx-r1000.jpg?20190103151915&q=80",
          rating: 4.9,
          price: 10099,
          originalPrice: 11000,
          highMileage: false,
          highDemand: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 12,
          name: "KTM RC 390",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/ktm-select-model-gp-editiond-1670826275682.png?q=80",
          rating: 4.7,
          price: 13999,
          originalPrice: 15000,
          highMileage: true,
          highDemand: true,
          status: 2, // Only One Left
        },
        {
          id: 13,
          name: "Triumph Daytona 675R",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/triumph-daytona-675r-standard-532.jpg?20190103151915&q=80",
          rating: 4.6,
          price: 15000,
          originalPrice: 16000,
          highMileage: true,
          highDemand: false,
          status: 1, // Summer Days Sale
        },
        {
          id: 14,
          name: "Ducati Panigale V2",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/ducati-select-model-white-riosso-livery-1598428332689.jpg?q=80",
          rating: 4.8,
          price: 12000,
          originalPrice: 12500,
          highMileage: false,
          highDemand: true,
          status: 2, // Only One Left
        },
        {
          id: 15,
          name: "BMW S1000RR",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bmw-select-model-black-storm-metallic-1677058621251.jpg?q=80",
          rating: 4.9,
          price: 15000,
          originalPrice: 15500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 3, // Out of Stock
        },
        {
          id: 16,
          name: "Yamaha R15 V4",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-red-1704802630538.png?q=80",
          rating: 4.8,
          price: 16000,
          originalPrice: 16500,
          highMileage: false,
          highDemand: true,
          status: 3, // Out of Stock
        },
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
.color {
  background-color: darkgray;
  color: rgb(28, 41, 211);
}
</style>
