<template>
    <div class="background-container">
      <b-container>
        <b-row>
          <b-col cols="12" md="6">
            <b-card class="card shadow my-5">
              <h2 class="mb-2 text-center">Plan Your Ride Today</h2>
              <b-form @submit.prevent="onSubmit">
                <section>
                  <h5>Pickup</h5>
                  <b-row class="my-2">
                    <b-col>
                      <b-form-datepicker
                        v-model="pickup.date"
                        placeholder="Select Date"
                        :date-format-options="dateFormatOptions"
                        class="my-2"
                      ></b-form-datepicker>
                    </b-col>
                    <b-col>
                      <b-form-select v-model="pickup.time" :options="timeOptions" class="my-2">
                        <template #first>
                          <option disabled value="">Select Time</option>
                        </template>
                      </b-form-select>
                    </b-col>
                  </b-row>
                </section>
  
                <section>
                  <h5>Dropoff</h5>
                  <b-row class="my-2">
                    <b-col>
                      <b-form-datepicker
                        v-model="dropoff.date"
                        placeholder="Select Date"
                        :date-format-options="dateFormatOptions"
                        class="my-2"
                      ></b-form-datepicker>
                    </b-col>
                    <b-col>
                      <b-form-select v-model="dropoff.time" :options="timeOptions" class="my-2">
                        <template #first>
                          <option disabled value="">Select Time</option>
                        </template>
                      </b-form-select>
                    </b-col>
                  </b-row>
                </section>
  
                <b-button type="submit" variant="info" class="w-100 mt-3">
                  Search
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
          date: this.$route.query.pickupDate || "",
          time: this.$route.query.pickupTime || "",
        },
        dropoff: {
          date: this.$route.query.dropoffDate || "",
          time: this.$route.query.dropoffTime || "",
        },
        timeOptions: [
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
        dateFormatOptions: {
          year: "numeric",
          month: "short",
          day: "2-digit",
        },
      };
    },
    methods: {
      onSubmit() {
        // Update query parameters with the selected values
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
  .background-container {
    background-image: url('@/assets/bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card {
    backdrop-filter: blur(0px) saturate(200%);
    -webkit-backdrop-filter: blur(0px) saturate(200%);
    background-color: rgba(255, 255, 255, 0.14);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    padding: 20px;
    width: 100%;
    max-width: 500px;
  }
  
  h2,
  h5 {
    color: #fff;
  }
  
  h2 {
    font-weight: bold;
  }
  </style>
    