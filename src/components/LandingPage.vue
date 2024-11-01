<template>
  <div>
    <NavBar />
    <b-container class="my-5">
      <b-row>
        <b-col lg="7" class="my-4 text-center mt-5">
          <h1 class="mb-3">Rent it Out to</h1>
          <h1 class="display-4 text-primary my-4">EXPLORE THE WORLD</h1>
          <h3 class="font-weight-bold my-4">
            India's favourite two-wheeler super app
          </h3>
          <h5 class="text-secondary mb-4">
            Your trusted platform for affordable and hassle-free bike rentals
          </h5>
          <b-button variant="primary" class="my-3" href="/rent">
            Rent Now
          </b-button>
        </b-col>

        <b-col lg="5" class="text-center">
          <b-img
            fluid
            src="https://img.freepik.com/free-vector/rockers-concept-illustration_114360-12698.jpg?ga=GA1.1.880112540.1690776464&semt=ais_user"
            alt="Bike Image"
            class="img-fluid"
          ></b-img>
          <!-- https://img.freepik.com/free-vector/motocross-abstract-concept-vector-illustration-adventure-sport-motorsport-championship-motorbike-race-extreme-track-motorcross-rally-enduro-dirt-bike-bicycle-rider-moto-abstract-metaphor_335657-4273.jpg?ga=GA1.1.880112540.1690776464&semt=ais_user -->
        </b-col>
      </b-row>

      <b-row>
        <b-col style="padding-top: 60px"
          ><b-card
            class="my-5"
            bg-variant="primary"
            text-variant="white"
            outlined
          >
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h1 class="ml-2">Monthly Rentals</h1>
                <p class="ml-2">
                  Rent a bike for a month starting at ₹ 2,999.00 only.
                </p>
                <b-button class="ml-2" variant="light" href="/bikes"
                  >Rent Now</b-button
                >
              </div>
              <div>
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/online-food-delivery-in-pandemic-illustration-download-svg-png-gif-file-formats--order-service-pack-e-commerce-shopping-illustrations-4161852.png?f=webp"
                  alt="Bike Rental"
                  class="img-fluid"
                  style="max-height: 200px"
                />
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <h2 class="text-center mb-4">Rent by Categories</h2>
      <b-row>
        <b-col md="3" v-for="category in categories" :key="category.title">
          <b-card class="text-center my-2">
            <b-img :src="category.image" alt="Image" class="my-2" fluid/>
            <b-card-title>{{ category.title }}</b-card-title>
            <b-card-text>
              {{ category.description }}
            </b-card-text>
            <b-button variant="primary" :to="category.link">View All</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from "@/views/NavBar.vue";

export default {
  name: "LandingPage",
  components: {
    NavBar,
  },
  data() {
    return {
      categories: [
        {
          title: "Bikes",
          link: "/bikes",
          description: "Explore BikeOntrack range of bikes.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-decent-blue-metallic-2023-1687260642123.png?q=80",
        },
        {
          title: "Sportbikes",
          link: "/sportsbike",
          description: "High-speed sportbikes for adrenaline lovers.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-red-1704802630538.png?q=80",
        },
        {
          title: "Scooters",
          link: "/scooter",
          description: "Convenient scooters for city travel.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80",
        },
        {
          title: "Cruisers",
          link: "/cruiser",
          description: "Comfortable cruisers for long rides.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/royalenfield-classic-350-heritage1725274941405.jpg?q=80",
        },
      ],
    };
  },
  methods: {
    viewCategory(title) {
      // Logic to view the category, e.g., redirecting to a category page
      console.log(`Viewing ${title}`);
    },
  },
};
</script>

<style scoped>

</style>
