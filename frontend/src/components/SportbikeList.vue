<template>
  <div class="bike-listing-page">
    <section class="section">
      <b-container>
        <!-- Breadcrumb + Heading -->
        <div class="listing-top-area">
          <b-breadcrumb class="custom-breadcrumb">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/sportsbike" active
              >Sports Bikes</b-breadcrumb-item
            >
          </b-breadcrumb>
        </div>

        <!-- BIKE GRID -->
        <b-row>
          <b-col
            v-for="bike in bikes"
            :key="bike.id"
            cols="12"
            sm="6"
            lg="4"
            class="mb-4"
          >
            <router-link
              :to="{
                name: 'BikeDetail',
                params: { id: bike.id, name: bike.name },
              }"
              class="bike-link"
            >
              <div
                class="card-app bike-card h-100 overflow-hidden"
                :class="{ 'card-disabled': bike.status === 3 }"
              >
                <!-- TOP BADGES -->
                <div class="bike-badge-wrap">
                  <span v-if="bike.highDemand" class="badge-app badge-danger"
                    >High Demand</span
                  >
                  <span v-if="bike.highMileage" class="badge-app badge-info"
                    >Track Beast</span
                  >
                  <span v-if="bike.bestSeller" class="badge-app badge-success"
                    >Top Pick</span
                  >
                </div>

                <!-- IMAGE -->
                <div class="bike-image-wrap sport-bg">
                  <img
                    :src="bike.image"
                    :alt="bike.name"
                    class="bike-image object-contain"
                  />
                </div>

                <!-- CONTENT -->
                <div class="bike-content">
                  <h4 class="bike-name">{{ bike.name }}</h4>

                  <div class="rating-row">
                    <b-icon
                      v-for="i in 5"
                      :key="i"
                      icon="star-fill"
                      :variant="
                        i <= Math.floor(bike.rating) ? 'success' : 'secondary'
                      "
                      class="mr-1"
                    />
                    <span class="rating-text">{{ bike.rating }}</span>
                  </div>

                  <span class="badge-app badge-gray mt-2"
                    >Initial Booking Price</span
                  >

                  <div class="price-row">
                    <h5 class="current-price">₹ {{ bike.price }}/m</h5>
                    <span class="old-price">₹ {{ bike.originalPrice }}</span>
                    <span class="discount-price"
                      >{{ calculateDiscount(bike) }}% OFF</span
                    >
                  </div>

                  <div class="availability-row">
                    <span
                      v-if="bike.status === 1"
                      class="text-success font-semibold"
                    >
                      Racing Season Offer Live
                    </span>
                    <span
                      v-else-if="bike.status === 2"
                      class="text-warning font-semibold"
                    >
                      Limited Slot Left
                    </span>
                    <span v-else class="text-danger font-semibold">
                      Currently Out of Stock
                    </span>
                  </div>

                  <button
                    class="btn-primary-app btn-sm-app w-100 mt-3"
                    :disabled="bike.status === 3"
                  >
                    {{ bike.status === 3 ? "Unavailable" : "Book This Bike" }}
                  </button>
                </div>
              </div>
            </router-link>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
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
          bestSeller: false,
          status: 1,
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
          status: 2,
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
          status: 1,
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
          status: 2,
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
          status: 1,
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
      ],
    };
  },

  methods: {
    calculateDiscount(bike) {
      return Math.round(
        ((bike.originalPrice - bike.price) / bike.originalPrice) * 100,
      );
    },
  },
};
</script>

<style scoped>
.bike-listing-page {
  background: var(--color-gray-50);
  min-height: 100vh;
}

.listing-top-area {
  margin-bottom: 2rem;
}

.custom-breadcrumb {
  background: transparent;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.custom-breadcrumb .breadcrumb {
  background: transparent !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
}

.custom-breadcrumb .breadcrumb-item a {
  color: var(--color-gray-500);
  font-weight: 500;
  text-decoration: none;
}

.custom-breadcrumb .breadcrumb-item.active {
  color: var(--color-primary);
  font-weight: 700;
}

.custom-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
  color: var(--color-gray-300);
}

.page-subtitle {
  max-width: 700px;
  margin-left: 0 !important;
  text-align: left;
}

.bike-link {
  text-decoration: none !important;
}

.bike-card {
  position: relative;
  border-radius: var(--radius-2xl);
}

.bike-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.bike-badge-wrap {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bike-image-wrap {
  height: 220px;
  padding: 1rem;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sport-bg {
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
}

.bike-image {
  max-height: 180px;
  transition: 0.4s;
}

.bike-card:hover .bike-image {
  transform: scale(1.06);
}

.bike-content {
  padding-top: 1rem;
}

.bike-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-dark);
}

.rating-row {
  display: flex;
  align-items: center;
  margin-top: 0.35rem;
}

.rating-text {
  margin-left: 8px;
  color: var(--color-gray-500);
  font-weight: 600;
}

.price-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.current-price {
  margin: 0;
  font-weight: 800;
  color: var(--color-dark);
}

.old-price {
  text-decoration: line-through;
  color: var(--color-gray-400);
}

.discount-price {
  color: var(--color-success);
  font-weight: 700;
  font-size: 0.9rem;
}

.availability-row {
  margin-top: 10px;
  min-height: 24px;
}

.card-disabled {
  opacity: 0.55;
}
</style>
