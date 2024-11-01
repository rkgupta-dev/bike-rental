<template>
  <div>
    <NavBar />
    <b-container>
      <div class="my-4">
        <h1 class="text-center mb-4">Sports Bikes Lists</h1>
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
                  <b-img class="my-4" :src="bike.image" :alt="bike.name" fluid></b-img>
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
