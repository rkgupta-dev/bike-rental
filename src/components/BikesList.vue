<template>
<div>
  <NavBar/>
  <b-container>
    <div class="my-4">
      <h4 class="text-center mb-4">"Standard Bikes for Rent"</h4>
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
import NavBar from '@/views/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      bikes: [
        {
          id: 1,
          name: "Honda Shine",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-decent-blue-metallic-2023-1687260642123.png?q=80",
          rating: 4.8,
          price: 3999,
          originalPrice: 4500,
          highMileage: true,
          highDemand: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 2,
          name: "Hero Passion Pro",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/hero-passion-pro-2018.jpg?20190103151915&q=80",
          rating: 4.6,
          price: 3000,
          originalPrice: 3500,
          highMileage: true,
          highDemand: true,
          status: 2, // Only One Left
        },
        {
          id: 3,
          name: "Bajaj CT 100",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-ebony-black-with-red-decals-1669291918239.png?q=80",
          rating: 4.5,
          price: 2499,
          originalPrice: 2800,
          highMileage: true,
          highDemand: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 4,
          name: "Bajaj Platina 100",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-black--blue-1671529556548.png?q=80",
          rating: 4.4,
          price: 2600,
          originalPrice: 3000,
          highMileage: true,
          highDemand: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 5,
          name: "Hero Splendor Plus",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/hero-select-model-blue-black-1706531445236.png?q=80",
          rating: 4.6,
          price: 3100,
          originalPrice: 3600,
          highMileage: true,
          highDemand: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 6,
          name: "TVS Star City",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/113179/star-city-right-side-view-2.png?isig=0&q=80",
          rating: 4.3,
          price: 2900,
          originalPrice: 3300,
          highMileage: true,
          highDemand: true,
          status: 2, // Only One Left
        },
        {
          id: 7,
          name: "TVS Apache RTR 160",
          image:
            "https://imgd.aeplcdn.com/1056x594/n/bw/models/colors/undefined-matte-blue-1611036120368.jpg?q=80",
          rating: 4.5,
          price: 4000,
          originalPrice: 4500,
          highMileage: false,
          highDemand: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 8,
          name: "Yamaha Saluto",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/yamaha-saluto.jpg?20190103151915&q=80",
          rating: 4.2,
          price: 2700,
          originalPrice: 3100,
          highMileage: true,
          highDemand: false,
          status: 3, // Out of Stock
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
