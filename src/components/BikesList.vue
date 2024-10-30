<template>
  <b-container >
    <div class="my-4">
      <h1 class="text-center mb-4">Summer Days Bike Sale</h1>
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
        <router-link :to="{ name: 'BikeDetail', params: { id: bike.id, name: bike.name } }" class="text-decoration-none">
          <b-card
            class="text-left h-100 bike-card"
            :class="{ 'out-of-stock': bike.status === 3 }"
          >
            <div>
              <b-img :src="bike.image" :alt="bike.name" fluid></b-img>
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
              <b-badge pill variant="secondary">Initial booking price</b-badge>
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
</template>

<script>
export default {
  data() {
    return {
      bikes: [
        {
          id: 1,
          name: "Honda Shine",
          image:
            "https://on-track-jarvis.s3.ap-south-1.amazonaws.com/monthly-rental/rent-TVS-sport-bangalore-min.webp",
          rating: 4.8,
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
          price: 3499,
          originalPrice: 4000,
          highMileage: false,
          highDemand: true,
          status: 1, // Summer Days Sale
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
