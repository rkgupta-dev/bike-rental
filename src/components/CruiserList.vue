<template>
  <div>
    <NavBar />
    <b-container>
      <div class="my-4">
        <h4 class="text-center mb-4">"Relaxed Cruising on Our Bikes"</h4>
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
          id: 27,
          name: "Royal Enfield Classic 350",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/royalenfield-classic-350-heritage1725274941405.jpg?q=80",
          rating: 4.7,
          price: 5000,
          originalPrice: 5500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 28,
          name: "Harley-Davidson Street 750",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/harleydavidson-street-750-standard20200616012038.jpg?q=80",
          rating: 4.6,
          price: 8000,
          originalPrice: 8500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
        },
        {
          id: 29,
          name: "Bajaj Avenger Cruise 220",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-auburn-black-1669289946200.png?q=80",
          rating: 4.5,
          price: 4000,
          originalPrice: 4500,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 30,
          name: "Kawasaki Vulcan S",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--standard1728554869402.jpg?q=80",
          rating: 4.8,
          price: 9000,
          originalPrice: 9500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
        },
        {
          id: 31,
          name: "Benelli 502C",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/benelli-select-model-glossy-black-1645507335732.png?q=80",
          rating: 4.6,
          price: 7000,
          originalPrice: 7500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 32,
          name: "Yamaha VMAX",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/yamaha-vmax-standard-180.jpg?20190103151915&q=80",
          rating: 4.9,
          price: 12000,
          originalPrice: 12500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
        },
        {
          id: 33,
          name: "Harley-Davidson Iron 883",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/harleydavidson-iron-883-standard1677237126841.jpg?q=80",
          rating: 4.7,
          price: 11000,
          originalPrice: 11500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 1, // Summer Days Sale
        },
        {
          id: 34,
          name: "KTM 790 Duke",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/ktm-duke-200-standard1727961894099.jpg?q=80",
          rating: 4.4,
          price: 9000,
          originalPrice: 9500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 3, // Out of Stock
        },
        {
          id: 35,
          name: "Suzuki Intruder 150",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/suzuki-intruder-150-standard--bs-vi20200320182536.jpg?q=80",
          rating: 4.3,
          price: 3500,
          originalPrice: 4000,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 2, // Only One Left
        },
        {
          id: 36,
          name: "Triumph Bonneville Bobber",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/triumph-select-model-jet-black--ash-gray-1698486184857.png?q=80",
          rating: 4.8,
          price: 7500,
          originalPrice: 8000,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
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
