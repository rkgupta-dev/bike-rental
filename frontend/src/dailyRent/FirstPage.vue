<template>
  <div class="background-container">
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" lg="10" xl="8">
          <b-card class="rental-card shadow my-5">
            <div class="card-header-custom mb-4">
              <h2 class="text-center mb-0">Plan Your Bike Adventure</h2>
              <p class="text-center text-muted mt-2">
                Explore the city on two wheels
              </p>
            </div>

            <b-alert
              v-model="showAlert"
              variant="danger"
              dismissible
              class="mb-3"
            >
              {{ alertMessage }}
            </b-alert>

            <b-form @submit.prevent="onSubmit">
              <!-- Pickup Section -->
              <section class="mb-4">
                <h5 class="section-title">
                  <b-icon icon="box-arrow-in-down-left" class="mr-2"></b-icon>
                  Pickup Details
                </h5>
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Pickup Date" label-for="pickup-date">
                      <b-form-datepicker
                        id="pickup-date"
                        v-model="pickup.date"
                        :min="minDate"
                        placeholder="Select Date"
                        :date-format-options="dateFormatOptions"
                        class="mb-2"
                        required
                      ></b-form-datepicker>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Pickup Time" label-for="pickup-time">
                      <b-form-select
                        id="pickup-time"
                        v-model="pickup.time"
                        :options="timeOptions"
                        required
                      >
                        <template #first>
                          <option disabled value="">Select Time</option>
                        </template>
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12">
                    <b-form-group
                      label="Pickup Location"
                      label-for="pickup-location"
                    >
                      <b-form-select
                        id="pickup-location"
                        v-model="pickup.location"
                        :options="locationOptions"
                        required
                      >
                        <template #first>
                          <option disabled value="">Select Location</option>
                        </template>
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
              </section>

              <!-- Dropoff Section -->
              <section class="mb-4">
                <h5 class="section-title">
                  <b-icon icon="box-arrow-up-right" class="mr-2"></b-icon>
                  Dropoff Details
                </h5>
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Dropoff Date" label-for="dropoff-date">
                      <b-form-datepicker
                        id="dropoff-date"
                        v-model="dropoff.date"
                        :min="minDropoffDate"
                        placeholder="Select Date"
                        :date-format-options="dateFormatOptions"
                        class="mb-2"
                        required
                      ></b-form-datepicker>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Dropoff Time" label-for="dropoff-time">
                      <b-form-select
                        id="dropoff-time"
                        v-model="dropoff.time"
                        :options="timeOptions"
                        required
                      >
                        <template #first>
                          <option disabled value="">Select Time</option>
                        </template>
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="12">
                    <b-form-group
                      label="Dropoff Location"
                      label-for="dropoff-location"
                    >
                      <b-form-select
                        id="dropoff-location"
                        v-model="dropoff.location"
                        :options="locationOptions"
                        required
                      >
                        <template #first>
                          <option disabled value="">Select Location</option>
                        </template>
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
              </section>

              <!-- Rental Summary -->
              <section class="mb-4" v-if="isFormValid">
                <h5 class="section-title">
                  <b-icon icon="receipt" class="mr-2"></b-icon>
                  Rental Summary
                </h5>
                <div class="summary-card p-3 border rounded">
                  <div class="d-flex justify-content-between mb-2">
                    <span>Rental Duration:</span>
                    <span>{{ rentalDuration }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Base Price:</span>
                    <span>${{ basePrice.toFixed(2) }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Tax (8%):</span>
                    <span>${{ tax.toFixed(2) }}</span>
                  </div>
                  <hr class="my-2" />
                  <div class="d-flex justify-content-between font-weight-bold">
                    <span>Total:</span>
                    <span>${{ totalPrice.toFixed(2) }}</span>
                  </div>
                </div>
              </section>

              <!-- Submit Button -->
              <b-button
                type="submit"
                variant="primary"
                class="w-100 mt-3 py-2"
                :disabled="!isFormValid"
              >
                <b-icon icon="check-circle" class="mr-2"></b-icon>
                Reserve Your Bike
              </b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickup: {
        date: this.$route?.query?.pickupDate || "",
        time: this.$route?.query?.pickupTime || "",
        location: this.$route?.query?.pickupLocation || "",
      },
      dropoff: {
        date: this.$route?.query?.dropoffDate || "",
        time: this.$route?.query?.dropoffTime || "",
        location: this.$route?.query?.dropoffLocation || "",
      },
      showAlert: false,
      alertMessage: "",
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
      locationOptions: [
        { value: "downtown", text: "Downtown Hub" },
        { value: "waterfront", text: "Waterfront Station" },
        { value: "central_park", text: "Central Park" },
        { value: "university", text: "University Campus" },
        { value: "shopping_district", text: "Shopping District" },
      ],
      dateFormatOptions: {
        year: "numeric",
        month: "short",
        day: "2-digit",
      },
    };
  },
  computed: {
    minDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
    minDropoffDate() {
      if (!this.pickup.date) return this.minDate;
      return this.pickup.date;
    },
    isFormValid() {
      return (
        this.pickup.date &&
        this.pickup.time &&
        this.pickup.location &&
        this.dropoff.date &&
        this.dropoff.time &&
        this.dropoff.location &&
        this.isValidDateTimeRange
      );
    },
    isValidDateTimeRange() {
      if (
        !this.pickup.date ||
        !this.pickup.time ||
        !this.dropoff.date ||
        !this.dropoff.time
      ) {
        return false;
      }

      const pickupDateTime = this.getDateTime(
        this.pickup.date,
        this.pickup.time
      );
      const dropoffDateTime = this.getDateTime(
        this.dropoff.date,
        this.dropoff.time
      );

      return dropoffDateTime > pickupDateTime;
    },
    rentalDuration() {
      if (!this.isValidDateTimeRange) return "Invalid duration";

      const pickupDateTime = this.getDateTime(
        this.pickup.date,
        this.pickup.time
      );
      const dropoffDateTime = this.getDateTime(
        this.dropoff.date,
        this.dropoff.time
      );

      const durationMs = dropoffDateTime - pickupDateTime;
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

      if (hours === 0) {
        return `${minutes} minutes`;
      } else if (minutes === 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
      } else {
        return `${hours} hour${hours > 1 ? "s" : ""} and ${minutes} minutes`;
      }
    },
    basePrice() {
      if (!this.isValidDateTimeRange) return 0;

      const pickupDateTime = this.getDateTime(
        this.pickup.date,
        this.pickup.time
      );
      const dropoffDateTime = this.getDateTime(
        this.dropoff.date,
        this.dropoff.time
      );

      const durationHours =
        (dropoffDateTime - pickupDateTime) / (1000 * 60 * 60);
      // Fixed hourly rate of $15 since we removed bike selection
      return 15 * durationHours;
    },
    tax() {
      return this.basePrice * 0.08;
    },
    totalPrice() {
      return this.basePrice + this.tax;
    },
  },
  methods: {
    getDateTime(date, time) {
      const [hours, minutes, period] = time
        .match(/(\d+):(\d+)\s(AM|PM)/)
        .slice(1);
      let hour = parseInt(hours);

      if (period === "PM" && hour !== 12) {
        hour += 12;
      } else if (period === "AM" && hour === 12) {
        hour = 0;
      }

      const dateObj = new Date(date);
      dateObj.setHours(hour, parseInt(minutes), 0, 0);

      return dateObj;
    },
    validateForm() {
      if (!this.isValidDateTimeRange) {
        this.showAlert = true;
        this.alertMessage = "Dropoff time must be after pickup time";
        return false;
      }

      return true;
    },
    onSubmit() {
      if (!this.validateForm()) {
        return;
      }

      // Update query parameters with the selected values
      this.$router.push({
        name: "model-page",
        query: {
          pickupDate: this.pickup.date,
          pickupTime: this.pickup.time,
          pickupLocation: this.pickup.location,
          dropoffDate: this.dropoff.date,
          dropoffTime: this.dropoff.time,
          dropoffLocation: this.dropoff.location,
          totalPrice: this.totalPrice.toFixed(2),
        },
      });
    },
  },
};
</script>

<style scoped>
.background-container {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),
    url("https://via.placeholder.com/1920x1080?text=Bike+Rental+Background");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.rental-card {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 2rem;
}

.card-header-custom {
  position: relative;
  padding-bottom: 1.5rem;
}

.card-header-custom:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #4caf50;
  border-radius: 3px;
}

.section-title {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.summary-card {
  background-color: #f8f9fa;
}

/* Form control styling */
.form-control,
.custom-select {
  border-radius: 6px;
  border: 1px solid #ced4da;
  padding: 0.5rem 0.75rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus,
.custom-select:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
}

/* Button styling */
.btn-primary {
  background-color: #4caf50;
  border-color: #4caf50;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: #3e8e41;
  border-color: #3e8e41;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-primary:disabled {
  background-color: #9e9e9e;
  border-color: #9e9e9e;
  transform: none;
  box-shadow: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .rental-card {
    padding: 1.5rem;
  }
}
</style>
