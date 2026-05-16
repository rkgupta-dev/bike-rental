<template>
  <div class="bike-listing-page">
    <section class="section">
      <b-container>
        <div class="listing-top-area">
          <b-breadcrumb class="custom-breadcrumb">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/cruisers" active
              >Cruisers</b-breadcrumb-item
            >
          </b-breadcrumb>
        </div>

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
                  <span v-if="bike.highDemand" class="badge-app badge-danger">
                    High Demand
                  </span>
                  <span v-if="bike.highMileage" class="badge-app badge-info">
                    Mileage King
                  </span>
                  <span v-if="bike.bestSeller" class="badge-app badge-success">
                    Bestseller
                  </span>
                </div>

                <!-- IMAGE -->
                <div class="bike-image-wrap">
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

                  <span class="badge-app badge-gray mt-2">
                    Initial Booking Price
                  </span>

                  <div class="price-row">
                    <h5 class="current-price">₹ {{ bike.price }}/m</h5>
                    <span class="old-price">₹ {{ bike.originalPrice }}</span>
                    <span class="discount-price">
                      {{ calculateDiscount(bike) }}% OFF
                    </span>
                  </div>

                  <div class="availability-row">
                    <span
                      v-if="bike.status === 1"
                      class="text-success font-semibold"
                    >
                      Summer Days Sale Live
                    </span>

                    <span
                      v-else-if="bike.status === 2"
                      class="text-warning font-semibold"
                    >
                      Only One Left
                    </span>

                    <span v-else class="text-danger font-semibold">
                      Currently Out of Stock
                    </span>
                  </div>

                  <button
                    class="btn-primary-app btn-sm-app w-100 mt-3"
                    :disabled="bike.status === 3"
                  >
                    {{
                      bike.status === 3 ? "Unavailable" : "Book This Cruiser"
                    }}
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
      currentYear: new Date().getFullYear(),
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
          status: 1,
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
          status: 2,
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
          status: 1,
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
          status: 2,
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
          status: 1,
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
          status: 2,
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
          status: 1,
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
          status: 3,
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
          status: 2,
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
          status: 2,
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

.card-disabled {
  opacity: 0.55;
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
  height: 200px;
  padding: 1rem;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

.bike-image {
  max-height: 170px;
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
</style>
