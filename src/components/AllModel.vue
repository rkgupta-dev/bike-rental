<template>
  <div>
    <NavBar />
    <b-container>
      <div class="my-4">
        <h4 class="text-center mb-4">
          BikeOntrack - Your Trusted Bike Rental Service
        </h4>
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
          id: 1,
          name: "Honda Shine",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-decent-blue-metallic-2023-1687260642123.png?q=80",
          rating: 4.8,
          price: 3999,
          originalPrice: 4500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
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
          bestSeller: false,
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
          bestSeller: false,
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
          bestSeller: false,
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
          bestSeller: false,
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
          bestSeller: false,
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
          bestSeller: true,
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
          bestSeller: true,
          status: 3, // Out of Stock
        },
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
          bestSeller: false,
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
          bestSeller: false,
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
          bestSeller: false,
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
          bestSeller: true,
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
          bestSeller: true,
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
          bestSeller: false,
          status: 3, // Out of Stock
        },
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
          name: "Hero Pleasure +",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/hero-select-model-sport-red-1707151003981.png?q=80",
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
