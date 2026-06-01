<template>
  <div class="section">
    <b-container fluid>
      <b-row>
        <!-- MOBILE FILTER BUTTON -->

        <!-- FILTER -->
        <b-col
          lg="3"
          class="d-none d-lg-block position-sticky align-self-start"
          style="top: 100px"
        >
          <div class="filter-card">
            <h4 class="text-xl font-bold mb-4">Filters</h4>

            <!-- MODIFY BOOKING -->
            <div class="filter-box">
              <h6 class="filter-title">Pickup</h6>

              <b-form-input
                v-model="pickup.date"
                :min="minDate"
                type="date"
                class="custom-input mb-3"
              ></b-form-input>

              <b-form-select
                v-model="pickup.time"
                :options="timeOptions"
                class="custom-input mb-3"
              ></b-form-select>

              <h6 class="filter-title">Dropoff</h6>

              <b-form-input
                v-model="dropoff.date"
                :min="pickup.date || minDate"
                type="date"
                class="custom-input mb-3"
              ></b-form-input>

              <b-form-select
                v-model="dropoff.time"
                :options="timeOptions"
                class="custom-input"
              ></b-form-select>
            </div>

            <!-- SEARCH -->
            <div class="filter-box">
              <h6 class="filter-title">Search Model</h6>

              <b-form-input
                v-model="search"
                placeholder="Search bike..."
                class="custom-input"
              ></b-form-input>
            </div>

            <!-- LOCATION -->
            <div class="filter-box">
              <h6 class="filter-title">Pickup Location</h6>

              <b-form-checkbox-group
                v-model="selectedLocations"
                stacked
                class="location-checkbox-group"
              >
                <b-form-checkbox
                  v-for="location in locationOptions"
                  :key="location.value"
                  :value="location.value"
                  class="custom-checkbox mb-2"
                >
                  {{ location.text }}
                </b-form-checkbox>
              </b-form-checkbox-group>
            </div>

            <!-- SORT -->
            <div class="filter-box">
              <h6 class="filter-title">Sort Price</h6>

              <b-form-radio-group v-model="sortBy">
                <b-form-radio value="low"> Price Low to High </b-form-radio>

                <b-form-radio value="high"> Price High to Low </b-form-radio>
              </b-form-radio-group>
            </div>
          </div>
        </b-col>

        <!-- RIGHT -->
        <b-col lg="9">
          <!-- TOP -->
          <div class="top-section">
            <div>
              <h3 class="text-xl font-bold mb-0">Available Bikes</h3>

              <p class="text-muted mb-0">
                {{ filteredBikes.length }} Bikes Available
              </p>
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <div class="duration-box">
                <strong>{{ rentalDuration }}</strong>
              </div>

              <div class="d-lg-none">
                <button
                  class="btn-secondary-app ml-2"
                  @click="showFilterSheet = true"
                >
                  <i class="fa-solid fa-sliders"></i>
                  Filters
                </button>
              </div>
            </div>
          </div>

          <!-- BIKES -->
          <b-row>
            <b-col
              xl="4"
              md="6"
              cols="12"
              v-for="bike in filteredBikes"
              :key="bike.id"
              class="mb-4"
            >
              <div class="bike-card">
                <!-- image -->
                <div class="bike-image-wrap">
                  <img :src="bike.image" class="bike-image" />
                </div>

                <!-- title -->
                <div class="bike-body">
                  <div class="d-flex justify-content-between mb-2">
                    <h5 class="bike-name">
                      {{ bike.name }}
                    </h5>

                    <span class="bike-tag">
                      {{ bike.type }}
                    </span>
                  </div>

                  <!-- location -->
                  <div class="location-area">
                    <small class="text-muted d-block mb-2">
                      Pickup Location
                    </small>

                    <b-form-select
                      v-model="bike.selectedLocation"
                      class="location-select"
                    >
                      <template #first>
                        <option disabled value="">Select Location</option>
                      </template>

                      <option
                        v-for="location in bike.locations"
                        :key="location"
                        :value="location"
                      >
                        {{ location }}
                      </option>
                    </b-form-select>
                  </div>

                  <!-- date -->
                  <div class="date-box">
                    <div>
                      <strong>{{ pickup.time }}</strong>
                      <p>{{ pickup.date }}</p>
                    </div>

                    <div class="to-circle">to</div>

                    <div class="text-right">
                      <strong>{{ dropoff.time }}</strong>
                      <p>{{ dropoff.date }}</p>
                    </div>
                  </div>

                  <!-- bottom -->
                  <div class="bottom-box">
                    <div>
                      <h4 class="bike-price">
                        ₹{{ calculateTotalPrice(bike.price) }}
                      </h4>

                      <small class="text-muted"> ₹{{ bike.price }}/day </small>
                    </div>

                    <button class="btn-primary-app" @click="bookBike(bike)">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <!-- MOBILE FILTER BOTTOM SHEET -->
    <transition name="bottom-sheet">
      <div
        v-if="showFilterSheet"
        class="bottom-sheet-overlay d-lg-none"
        @click.self="showFilterSheet = false"
      >
        <div class="bottom-sheet">
          <!-- HANDLE -->
          <div class="sheet-handle"></div>

          <!-- HEADER -->
          <div class="sheet-header">
            <h5 class="mb-0">Filters</h5>

            <button class="sheet-close" @click="showFilterSheet = false">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="sheet-body">
            <!-- MODIFY BOOKING -->
            <div class="filter-box">
              <h6 class="filter-title">Pickup</h6>

              <b-form-input
                v-model="pickup.date"
                :min="minDate"
                type="date"
                class="custom-input mb-3"
              ></b-form-input>

              <b-form-select
                v-model="pickup.time"
                :options="timeOptions"
                class="custom-input mb-3"
              ></b-form-select>

              <h6 class="filter-title">Dropoff</h6>

              <b-form-input
                v-model="dropoff.date"
                type="date"
                class="custom-input mb-3"
              ></b-form-input>

              <b-form-select
                v-model="dropoff.time"
                :options="timeOptions"
                class="custom-input"
              ></b-form-select>
            </div>

            <!-- SEARCH -->
            <div class="filter-box">
              <h6 class="filter-title">Search Model</h6>

              <b-form-input
                v-model="search"
                placeholder="Search bike..."
                class="custom-input"
              ></b-form-input>
            </div>

            <!-- LOCATION -->
            <div class="filter-box">
              <h6 class="filter-title">Pickup Location</h6>

              <b-form-checkbox-group v-model="selectedLocations" stacked>
                <b-form-checkbox
                  v-for="location in locationOptions"
                  :key="location.value"
                  :value="location.value"
                  class="mb-2"
                >
                  {{ location.text }}
                </b-form-checkbox>
              </b-form-checkbox-group>
            </div>

            <!-- SORT -->
            <div class="filter-box">
              <h6 class="filter-title">Sort Price</h6>

              <b-form-radio-group v-model="sortBy">
                <b-form-radio value="low"> Price Low to High </b-form-radio>

                <b-form-radio value="high"> Price High to Low </b-form-radio>
              </b-form-radio-group>
            </div>

            <button
              class="btn-primary-app w-100"
              @click="showFilterSheet = false"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickup: {
        date: this.$route.query.pickupDate || "",
        time: this.$route.query.pickupTime || "",
      },

      dropoff: {
        date: this.$route.query.dropoffDate || "",
        time: this.$route.query.dropoffTime || "",
      },

      search: "",

      selectedLocations: [],

      sortBy: "",

      timeOptions: [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
      ],

      locationOptions: [
        { value: "Indiranagar", text: "Indiranagar" },
        { value: "Koramangala", text: "Koramangala" },
        { value: "HSR Layout", text: "HSR Layout" },
      ],

      showFilterSheet: false,

      bikes: [
        {
          id: 1,
          name: "Honda Shine",
          type: "Bike",
          price: 800,
          locations: ["Indiranagar", "Koramangala"],
          selectedLocation: "",
          image:
            "https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fmotorcycle%2FShine-100%2Fshine100-get-to-know-your-ride.png%3Fh%3D450%26iar%3D0%26w%3D584&w=1200&q=75&dpl=dpl_EhQodG3bD29Cmhqe3rsY7FF6P4Dd",
        },

        {
          id: 2,
          name: "Honda Activa",
          type: "Scooter",
          price: 600,
          locations: ["HSR Layout", "Indiranagar"],
          selectedLocation: "",
          image:
            "https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fscooter%2FActiva-110%2FGet-to-know-your-ride%2FGet-to-know-your-ride-584x450.png%3Fh%3D450%26iar%3D0%26w%3D584&w=1200&q=75&dpl=dpl_EhQodG3bD29Cmhqe3rsY7FF6P4Dd",
        },

        {
          id: 3,
          name: "Royal Enfield",
          type: "Cruiser",
          price: 1800,
          locations: ["Koramangala"],
          selectedLocation: "",
          image:
            "https://www.royalenfield.com/content/dam/royal-enfield-revamp/book-a-test-ride/desktop/bullet-350.webp",
        },

        {
          id: 4,
          name: "Himalayan 450",
          type: "Adventure",
          price: 2000,
          locations: ["Koramangala", "Indiranagar"],
          selectedLocation: "",
          image:
            "https://www.royalenfield.com/content/dam/royal-enfield-revamp/book-a-test-ride/desktop/himalayan-450.webp",
        },

        {
          id: 5,
          name: "Meteor 350",
          type: "Cruiser",
          price: 1900,
          locations: ["Koramangala", "Indiranagar"],
          selectedLocation: "",
          image:
            "https://www.royalenfield.com/content/dam/royal-enfield-revamp/motorcycles/header/meteor-350-black-header.webp",
        },

        {
          id: 6,
          name: "Goan Classic 350",
          type: "Heritages",
          price: 2100,
          locations: ["Indiranagar"],
          selectedLocation: "",
          image:
            "https://www.royalenfield.com/content/dam/royal-enfield-revamp/book-a-test-ride/desktop/goan-classic-350.webp",
        },

        {
          id: 7,
          name: "Hunter 350",
          type: "Roadster",
          price: 2000,
          locations: ["Indiranagar"],
          selectedLocation: "",
          image:
            "https://www.royalenfield.com/content/dam/royal-enfield-revamp/book-a-test-ride/desktop/hunter-350.webp",
        },

        {
          id: 8,
          name: "Honda Dio",
          type: "Scooty",
          price: 599,
          locations: ["Indiranagar", "HSR Layout", "Koramangala"],
          selectedLocation: "",
          image:
            "https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fscooter%2Fdio-110%2Fdio-110-get-to-know-your-ride.png%3Fh%3D450%26iar%3D0%26w%3D584&w=1200&q=75&dpl=dpl_EhQodG3bD29Cmhqe3rsY7FF6P4Dd",
        },

        {
          id: 9,
          name: "Honda NX200",
          type: "Adventure",
          price: 1400,
          locations: ["Indiranagar", "Koramangala"],
          selectedLocation: "",
          image:
            "https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fmotorcycle%2Fnx200%2Fget-to-know-your-ride.png%3Fh%3D450%26iar%3D0%26w%3D584&w=1200&q=75&dpl=dpl_EhQodG3bD29Cmhqe3rsY7FF6P4Dd",
        },
      ],
    };
  },

  computed: {
    rentalDays() {
      const pickup = new Date(this.pickup.date);

      const drop = new Date(this.dropoff.date);

      const diff = drop - pickup;

      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      return days > 0 ? days : 1;
    },

    minDate() {
      return new Date().toISOString().split("T")[0];
    },

    rentalDuration() {
      return `${this.rentalDays} Days Rental`;
    },

    filteredBikes() {
      let bikes = [...this.bikes];

      // Search filter
      if (this.search) {
        bikes = bikes.filter((bike) =>
          bike.name.toLowerCase().includes(this.search.toLowerCase()),
        );
      }

      // Location filter
      if (this.selectedLocations.length) {
        bikes = bikes.filter((bike) =>
          bike.locations.some((location) =>
            this.selectedLocations.includes(location),
          ),
        );
      }

      // Price sorting
      if (this.sortBy === "low") {
        bikes.sort((a, b) => a.price - b.price);
      }

      if (this.sortBy === "high") {
        bikes.sort((a, b) => b.price - a.price);
      }

      return bikes;
    },
  },

  methods: {
    calculateTotalPrice(price) {
      return price * this.rentalDays;
    },

    isLoggedIn() {
      return !!localStorage.getItem("user");
    },

    bookBike(bike) {
      // LOGIN CHECK
      if (!this.isLoggedIn()) {
        this.$router.push({
          name: "login",
        });

        return;
      }

      // LOCATION CHECK
      if (!bike.selectedLocation) {
        this.$bvToast.toast("Please select pickup location", {
          title: "Required",
          variant: "warning",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });

        return;
      }

      const bookingData = {
        bike: {
          id: bike.id,
          name: bike.name,
          type: bike.type,
          image: bike.image,
          price: bike.price,
        },

        pickup: {
          date: this.pickup.date,
          time: this.pickup.time,
          location: bike.selectedLocation,
        },

        dropoff: {
          date: this.dropoff.date,
          time: this.dropoff.time,
        },

        rentalDays: this.rentalDays,

        totalPrice: this.calculateTotalPrice(bike.price),
      };

      // SAVE TO LOCAL STORAGE
      localStorage.setItem("bikeBooking", JSON.stringify(bookingData));

      this.$router.push({
        name: "verify-document",
      });
    },
  },
};
</script>

<style scoped>
.model-page {
  background: #f5f7fb;
  min-height: 100vh;
  padding: 24px;
}

/* LEFT */
.filter-card {
  background: #fff;
  border-radius: 22px;
  padding: 24px;
  position: sticky;
  top: 20px;
  border: 1px solid #eee;
}

.filter-header {
  margin-bottom: 24px;
}

.filter-header h4 {
  font-weight: 700;
}

.filter-box {
  margin-bottom: 30px;
}

.filter-title {
  font-weight: 700;
  margin-bottom: 14px;
}

.custom-input {
  border-radius: 14px;
  min-height: 50px;
}

/* RIGHT */
.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-weight: 700;
}

.duration-box {
  background: #fff;
  padding: 12px 18px;
  border-radius: 14px;
}

/* CARD */
.bike-card {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  height: 100%;
  border: 1px solid #eee;
  transition: 0.3s;
}

.bike-card:hover {
  transform: translateY(-5px);
}

.bike-image-wrap {
  height: 220px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.bike-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
}

.bike-body {
  padding: 20px;
}

.bike-name {
  font-weight: 700;
  margin-bottom: 0;
}

.bike-tag {
  background: #eef2ff;
  color: #4338ca;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.location-area {
  margin: 20px 0;
}

.location-select {
  border-radius: 12px;
  height: 46px;
}

.date-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 20px;
}

.date-box p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

.to-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #111827;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bike-price {
  font-weight: 700;
  margin-bottom: 0;
}

@media (max-width: 991px) {
  .filter-card {
    margin-bottom: 24px;
    position: relative;
    top: unset;
  }
}

@media (max-width: 768px) {
  .model-page {
    padding: 14px;
  }

  .top-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
}

/* OVERLAY */
.bottom-sheet-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;

  display: flex;
  align-items: flex-end;
}

/* SHEET */
.bottom-sheet {
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;

  background: #fff;

  border-top-left-radius: 26px;
  border-top-right-radius: 26px;

  padding: 18px;
}

/* HANDLE */
.sheet-handle {
  width: 70px;
  height: 5px;
  border-radius: 999px;
  background: #d1d5db;
  margin: 0 auto 18px;
}

/* HEADER */
.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
}

.sheet-close {
  border: none;
  background: #f3f4f6;

  width: 38px;
  height: 38px;

  border-radius: 50%;
}

/* ANIMATION */
.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
  transition: 0.3s ease;
}

.bottom-sheet-enter-active .bottom-sheet,
.bottom-sheet-leave-active .bottom-sheet {
  transition: transform 0.3s ease;
}

.bottom-sheet-enter,
.bottom-sheet-leave-to {
  opacity: 0;
}

.bottom-sheet-enter .bottom-sheet,
.bottom-sheet-leave-to .bottom-sheet {
  transform: translateY(100%);
}
</style>
