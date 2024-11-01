<template>
  <div>
    <NavBar />
    <b-container>
      <div class="my-4">
        <h4 class="text-center mb-4">"Scooters: Fun and Easy Travel"</h4>
        <b-row no-gutters>
          <b-col
            v-for="bike in bikes"
            :key="bike.id"
            cols="6"
            md="6"
            lg="3"
            sm="6"
            class="my-2"
          >
            <router-link
              :to="{
                name: 'BikeDetail',
                params: { id: bike.id, name: bike.name },
              }"
              class="text-decoration-none"
            >
              <b-card
                class="text-left h-100 bike-card"
                :class="{ 'out-of-stock': bike.status === 3 }"
              >
                <div>
                  <b-img
                    class="my-4"
                    :src="bike.image"
                    :alt="bike.name"
                    fluid
                  ></b-img>
                  <div
                    class="position-absolute d-flex"
                    style="top: 0.5rem; right: 0.5rem"
                  >
                    <b-badge
                      pill
                      variant="danger"
                      v-if="bike.highDemand"
                      class="mr-1"
                    >
                      High Demand
                    </b-badge>
                    <b-badge
                      pill
                      variant="primary"
                      v-if="bike.highMileage"
                      class="mr-1"
                    >
                      High Mileage
                    </b-badge>
                    <b-badge
                      pill
                      variant="success"
                      v-if="bike.bestSeller"
                      class="mr-1"
                    >
                      Bestseller
                    </b-badge>
                  </div>
                </div>
                <div>
                  <h4>{{ bike.name }}</h4>
                  <div class="d-flex align-items-center">
                    <b-icon
                      v-for="i in 5"
                      :key="i"
                      icon="star-fill"
                      :variant="
                        i <= Math.floor(bike.rating) ? 'warning' : 'secondary'
                      "
                      class="mr-1"
                    ></b-icon>
                    <span class="text-muted ml-2">{{ bike.rating }}</span>
                  </div>
                  <b-badge pill variant="secondary"
                    >Initial booking price</b-badge
                  >
                  <div class="d-flex flex-wrap align-items-center mt-2">
                    <h5 class="font-weight-bold text-dark mb-0">
                      ₹ {{ bike.price }} /m
                    </h5>
                    <h6
                      class="text-muted ml-2 mb-0"
                      style="text-decoration: line-through"
                    >
                      ₹ {{ bike.originalPrice }}
                    </h6>
                    <h6 class="text-success ml-2 mb-0">
                      {{ calculateDiscount(bike) }}% OFF
                    </h6>
                  </div>

                  <div v-if="bike.status === 1" class="text-success mt-2">
                    Summer Days Sale
                  </div>
                  <div v-else-if="bike.status === 2" class="text-warning mt-2">
                    Only One Left
                  </div>
                  <div v-else-if="bike.status === 3" class="text-danger mt-2">
                    Out of Stock
                  </div>
                </div>
              </b-card>
            </router-link>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import NavBar from "@/views/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      bikes: [
        {
          id: 17,
          name: "Honda Activa 6G",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-black-1674535477895.png?q=80",
          rating: 4.7,
          price: 4000,
          originalPrice: 4500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 1, // Summer Days Sale
        },
        {
          id: 18,
          name: "TVS Jupiter",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80",
          rating: 4.6,
          price: 3500,
          originalPrice: 4000,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
        },
        {
          id: 19,
          name: "Hero Duet",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/hero-duet-lx20190722133839.jpg?q=80",
          rating: 4.5,
          price: 3300,
          originalPrice: 3700,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 20,
          name: "Suzuki Access 125",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/suzuki-select-model-metallic-mattee-black-std-1679635807338.png?q=80",
          rating: 4.8,
          price: 4200,
          originalPrice: 4700,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
        },
        {
          id: 21,
          name: "Yamaha Fascino 125",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-white--drum-1712697907928.png?q=80",
          rating: 4.6,
          price: 3400,
          originalPrice: 3900,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 1, // Summer Days Sale
        },
        {
          id: 22,
          name: "Bajaj Chetak",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--blue-29031725625957138.jpg?q=80",
          rating: 4.4,
          price: 4800,
          originalPrice: 5000,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
          status: 2, // Only One Left
        },
        {
          id: 23,
          name: "TVS Ntorq 125",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-ntorq-125-disc1725629749318.jpg?q=80",
          rating: 4.7,
          price: 4500,
          originalPrice: 5000,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 1, // Summer Days Sale
        },
        {
          id: 24,
          name: "Honda Dio",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-jazzy-blue-metallic-1686570017642.png?q=80",
          rating: 4.5,
          price: 3700,
          originalPrice: 4100,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 1, // Summer Days Sale
        },
        {
          id: 25,
          name: "Hero Xoom",
          image:
            "https://imgd.aeplcdn.com/310x174/n/cw/ec/130411/xoom-right-side-view-11.png?isig=0&q=80",
          rating: 4.2,
          price: 2900,
          originalPrice: 3200,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
          status: 3, // Out of Stock
        },
        {
          id: 26,
          name: "Mahindra Gusto",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/mahindra-gusto-dx--cbs20190731111612.jpg?q=80",
          rating: 4.3,
          price: 3100,
          originalPrice: 3600,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
        },
      ],
    };
  },
  methods: {
    calculateDiscount(bike) {
      return Math.round(
        ((bike.originalPrice - bike.price) / bike.originalPrice) * 100
      );
    },
  },
};
</script>

<style scoped>
.bike-card {
  transition: transform 0.3s, box-shadow 0.3s;
}
.bike-card:hover {
  transform: translateY(-5px);
  /* box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); */
}
.out-of-stock {
  opacity: 0.5; /* Make the card semi-transparent */
}
</style>
