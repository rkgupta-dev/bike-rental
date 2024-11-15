<template>
  <div>
    <NavBar />
    <b-container class="" style="margin-top: 6rem;">
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
          ><b-card class="my-5 gradient-card" text-variant="white" outlined>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h1 class="ml-2">Monthly Rentals</h1>
                <p class="ml-2">
                  Rent a bike for a month starting at ₹ 2,499.00 only.
                </p>
                <b-button class="ml-2" variant="light" to="/all-model"
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
            <b-img :src="category.image" alt="Image" class="my-2" fluid />
            <b-card-title>{{ category.title }}</b-card-title>
            <b-card-text>
              {{ category.description }}
            </b-card-text>
            <b-button variant="primary" :to="category.link">View All</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <br />
    <br />
    <b-card class="my-4">
      <b-card-text class="text-center">
        <h5>
          <b-img
            style="width: 70px; height: 60px"
            src="https://cdn-icons-gif.flaticon.com/17904/17904906.gif"
          ></b-img
          >Trusted by over 5 lakh+ riders across Bangalore, Hyderabad, Delhi and
          Mumbai.
        </h5>
      </b-card-text>
    </b-card>

    <b-card class="mt-5 gradient-bg">
      <b-container>
        <b-row>
          <b-col
            v-for="(feature, index) in features"
            :key="index"
            cols="12"
            md="6"
            lg="4"
            class="d-flex flex-column align-items-center text-center mb-4"
          >
            <div class="mb-3 p-3 rounded-circle bg-light text-primary">
              <i :class="feature.icon + ' fa-2xl'"></i>
            </div>
            <h3 class="h5 mb-2">{{ feature.title }}</h3>
            <p class="text-muted">{{ feature.description }}</p>
          </b-col>
        </b-row>
      </b-container>
    </b-card>

    <!-- App Download Section -->
    <b-container class="bg-gradient-primary" fluid>
      <b-row>
        <b-col md="6" class="my-5 d-flex justify-content-center">
          <div class="phone-mockup-wrapper text-center">
            <b-img
              src="https://img.freepik.com/free-vector/people-using-their-mobile-phones-news_52683-39976.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid"
              alt="Ontrack App Interface"
              fluid
              class="phone-mockup my-5"
            ></b-img>
          </div>
        </b-col>
        <!-- Download Form Column -->
        <b-col md="6">
          <div class="download-content text-white">
            <h1 class="display-4 my-2 font-weight-bold">
              Get the <span class="text-highlight">BikeOntrack App</span>
            </h1>
            <p class="lead mb-5">
              We'll send you a magic link. Open it on your phone to download the
              app and start your journey!
            </p>

            <!-- Phone Input Form -->
            <b-form @submit.prevent="sendLink" class="my-4 w-75">
              <b-form-group>
                <b-input-group class="">
                  <b-form-input
                    v-model="formData.phoneNumber"
                    placeholder="Enter your phone number"
                    type="number"
                    class=""
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary" type="submit" class="">
                      Get Link
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-form>

            <!-- Download Links -->
            <div>
              <p class="text-light">Download app from</p>
              <div class="d-flex my-5">
                <b-button
                  href="https://play.google.com/store/games?hl=en"
                  variant="light"
                  class="store-button d-flex align-items-center justify-content-center mr-4"
                >
                  <i class="fa-brands fa-google-play"> Google Play</i>
                </b-button>
                <b-button
                  href="https://www.apple.com/in/app-store/"
                  variant="light"
                  class="store-button d-flex align-items-center justify-content-center"
                >
                  <i class="fa-brands fa-app-store-ios"> App Store</i>
                </b-button>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <FooterSection />
  </div>
</template>

<script>
import FooterSection from "@/views/FooterSection.vue";
import NavBar from "@/views/NavBar.vue";

export default {
  name: "LandingPage",
  components: {
    NavBar,
    FooterSection,
  },
  data() {
    return {
      formData: {
        phoneNumber: "",
      },
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
      features: [
        {
          icon: "fa-solid fa-shield", // Font Awesome class for shield
          title: "Zero Security Deposit",
          description: "We only ask you for the rental amount and nothing else",
        },
        {
          icon: "fa-solid fa-motorcycle",
          title: "Doorstep Delivery",
          description: "We provide home delivery at your doorstep",
        },
        {
          icon: "fa-solid fa-stopwatch",
          title: "Unrestricted KM",
          description:
            "We give you the flexibility to travel freely without any kilometre limit.",
        },
        {
          icon: "fa-solid fa-tools",
          title: "Maintenance Covered",
          description:
            "Our pricing is inclusive of one periodic service/maintenance per rental",
        },
        {
          icon: "fa-solid fa-shield",
          title: "Insurance Covered",
          description:
            "Commercial comprehensive insurance at no extra cost which covers accidents.",
        },
        {
          icon: "fa-solid fa-hard-hat",
          title: "Helmet Available",
          description:
            "ISI Marked helmet available during checkout for your safety.",
        },
      ],
    };
  },
  methods: {
    viewCategory(title) {
      // Logic to view the category, e.g., redirecting to a category page
      console.log(`Viewing ${title}`);
    },
    sendLink() {
      const Link = {
        phoneNumber: this.formData.phoneNumber,
      };
      alert(`Link Successfully sent to ${Link.phoneNumber}`);
      this.formData = {
        phoneNumber: "",
      };
    },
  },
};
</script>

<style scoped>
.gradient-bg {
  background-image: linear-gradient(
    174.2deg,
    rgba(255, 244, 228, 1) 7.1%,
    rgba(240, 246, 238, 1) 67.4%
  );
}
.gradient-card {
  background-image: linear-gradient(
    288deg,
    rgba(0, 85, 255, 1) 1.5%,
    rgba(4, 56, 115, 1) 91.6%
  );
}
.bg-gradient-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.phone-mockup-wrapper {
  position: relative;
  max-width: 300px;
  margin: 0 auto;
  animation: float 6s ease-in-out infinite;
}

.phone-mockup {
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
