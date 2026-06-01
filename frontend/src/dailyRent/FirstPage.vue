<template>
  <section class="hero-booking-section">
    <!-- Background -->
    <!-- <img
      src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/9d7e01ff-667f-45be-8590-d67a8d2fdeae_3840w.jpg"
      class="hero-bg"
      alt="Bike Rental Banner"
    />

    <div class="hero-overlay"></div> -->

    <!-- Decorative Blur -->
    <!-- <div class="hero-blur blur-one"></div>
    <div class="hero-blur blur-two"></div> -->

    <b-container class="position-relative">
      <div class="hero-content-wrap">
        <!-- LEFT CONTENT -->
        <div class="hero-content">
          <span class="hero-badge">
            <i class="fa-solid fa-motorcycle"></i>
            Premium Bike Rentals
          </span>

          <h1 class="hero-title">
            Book Your
            <span class="text-gradient">Perfect Ride</span>
            Anytime
          </h1>

          <p class="hero-subtitle">
            Explore Bangalore with premium bikes, flexible pickup & drop,
            affordable pricing and a smooth booking experience.
          </p>

          <div class="hero-features">
            <div class="feature-item">
              <i class="fa-solid fa-circle-check"></i>
              Instant Booking
            </div>

            <div class="feature-item">
              <i class="fa-solid fa-circle-check"></i>
              Zero Deposit
            </div>

            <div class="feature-item">
              <i class="fa-solid fa-circle-check"></i>
              Best Prices
            </div>
          </div>
        </div>

        <!-- BOOKING CARD -->
        <div class="booking-card card-app">
          <div class="booking-card-top">
            <h4 class="booking-title">Search Your Ride</h4>

            <p class="booking-subtitle">Select your pickup and drop details</p>
          </div>

          <!-- PICKUP -->
          <div class="booking-group">
            <div class="booking-label">
              <i class="fa-solid fa-location-dot"></i>
              Pickup
            </div>

            <div class="input-grid">
              <div>
                <label class="form-label-app"> Pickup Date </label>

                <b-form-input
                  v-model="pickup.date"
                  :min="minDate"
                  type="date"
                  class="input-app"
                  @change="setPickupDefaultTime"
                ></b-form-input>
              </div>

              <div>
                <label class="form-label-app"> Pickup Time </label>

                <b-form-select
                  v-model="pickup.time"
                  :options="timeOptions"
                  class="input-app"
                >
                  <template #first>
                    <option disabled value="">Select Time</option>
                  </template>
                </b-form-select>
              </div>
            </div>
          </div>

          <!-- DROPOFF -->
          <div class="booking-group">
            <div class="booking-label">
              <i class="fa-solid fa-location-dot"></i>
              Dropoff
            </div>

            <div class="input-grid">
              <div>
                <label class="form-label-app"> Dropoff Date </label>

                <b-form-input
                  v-model="dropoff.date"
                  :min="pickup.date || minDate"
                  type="date"
                  class="input-app"
                  @change="setDropoffDefaultTime"
                ></b-form-input>
              </div>

              <div>
                <label class="form-label-app"> Dropoff Time </label>

                <b-form-select
                  v-model="dropoff.time"
                  :options="timeOptions"
                  class="input-app"
                >
                  <template #first>
                    <option disabled value="">Select Time</option>
                  </template>
                </b-form-select>
              </div>
            </div>
          </div>

          <!-- BUTTON -->
          <button
            class="btn-primary-app btn-lg-app booking-btn"
            @click="goToModels"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
            Search Bikes
          </button>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      pickup: {
        date: "",
        time: "",
      },

      dropoff: {
        date: "",
        time: "",
      },

      timeOptions: [
        { value: "09:00 AM", text: "09:00 AM" },
        { value: "10:00 AM", text: "10:00 AM" },
        { value: "11:00 AM", text: "11:00 AM" },
        { value: "12:00 PM", text: "12:00 PM" },
        { value: "01:00 PM", text: "01:00 PM" },
        { value: "02:00 PM", text: "02:00 PM" },
        { value: "03:00 PM", text: "03:00 PM" },
        { value: "04:00 PM", text: "04:00 PM" },
        { value: "05:00 PM", text: "05:00 PM" },
        { value: "06:00 PM", text: "06:00 PM" },
        { value: "07:00 PM", text: "07:00 PM" },
      ],
    };
  },

  computed: {
    minDate() {
      return new Date().toISOString().split("T")[0];
    },
  },

  methods: {
    setPickupDefaultTime() {
      if (this.pickup.date && !this.pickup.time) {
        this.pickup.time = "10:00 AM";
      }
    },

    setDropoffDefaultTime() {
      if (this.dropoff.date && !this.dropoff.time) {
        this.dropoff.time = "10:00 AM";
      }
    },

    goToModels() {
      if (
        !this.pickup.date ||
        !this.pickup.time ||
        !this.dropoff.date ||
        !this.dropoff.time
      ) {
        this.$bvToast.toast("Please select pickup and drop details", {
          title: "Required",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });

        return;
      }

      this.$router.push({
        name: "model-page",

        query: {
          pickupDate: this.pickup.date,
          pickupTime: this.pickup.time,

          dropoffDate: this.dropoff.date,
          dropoffTime: this.dropoff.time,
        },
      });
    },
  },
};
</script>

<style scoped>
.hero-booking-section {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    rgba(15, 15, 35, 0.88) 0%,
    rgba(15, 15, 35, 0.72) 45%,
    rgba(15, 15, 35, 0.5) 100%
  );
}

/* BLURS */
.hero-blur {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
}

.blur-one {
  width: 260px;
  height: 260px;
  background: rgba(79, 70, 229, 0.28);
  top: -60px;
  left: -40px;
}

.hero-content-wrap {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 460px;
  align-items: center;
  gap: 4rem;
}

/* LEFT */
.hero-content {
  max-width: 640px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(8, 8, 8, 0.12);
  backdrop-filter: blur(12px);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

/* HERO TEXT */
.hero-title {
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  font-weight: var(--font-extrabold);
  line-height: 1.05;

  margin-top: 1.3rem;
  margin-bottom: 1.2rem;
  max-width: 620px;
}

.text-gradient {
  background: linear-gradient(
    135deg,
    var(--color-primary-light),
    var(--color-primary)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  max-width: 560px;
  color: rgba(3, 3, 3, 0.78);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

.hero-features {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.feature-item i {
  color: var(--color-primary);
}

/* RIGHT CARD */
.booking-card {
  padding: 2rem;
  border-radius: var(--radius-2xl);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow-xl);
}

.booking-card-top {
  margin-bottom: 1.8rem;
}

.booking-title {
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--color-dark);
}

.booking-subtitle {
  color: var(--color-gray-500);
  margin-bottom: 0;
}

.booking-group {
  margin-bottom: 1.5rem;
}

.booking-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-dark);
}

.booking-label i {
  color: var(--color-primary);
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.booking-btn {
  width: 100%;
  justify-content: center;
  margin-top: 1rem;
}

/* bootstrap override */
::v-deep .b-form-datepicker,
::v-deep .custom-select,
::v-deep .form-control {
  min-height: 54px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-200);
  box-shadow: none !important;
}

::v-deep .b-form-datepicker:hover,
::v-deep .custom-select:hover,
::v-deep .form-control:hover {
  border-color: var(--color-primary);
}

::v-deep .b-form-datepicker.focus,
::v-deep .custom-select:focus,
::v-deep .form-control:focus {
  border-color: var(--color-primary);
}

/* MOBILE */
@media (max-width: 991px) {
  .hero-booking-section {
    padding: 100px 0 60px;
  }

  .hero-content-wrap {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-content {
    text-align: center;
    margin: auto;
  }

  .hero-features {
    justify-content: center;
  }

  .booking-card {
    max-width: 100%;
  }
}

@media (max-width: 767px) {
  .hero-title {
    font-size: 2.4rem;
  }

  .booking-card {
    padding: 1.4rem;
  }

  .input-grid {
    grid-template-columns: 1fr;
  }

  .hero-features {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
}
</style>
