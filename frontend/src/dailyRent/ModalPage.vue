<template>
  <b-container>
    <div class="my-4">
      <b-row>
       
        <b-col cols="12" md="3">
          <!-- Pickup Section -->
         <b-card>
          <section>
            <h5>Pickup</h5>
            <b-form-datepicker
              v-model="pickup.date"
              placeholder="Pickup Date"
              :date-format-options="dateFormatOptions"
              class="my-2"
            ></b-form-datepicker>
            <b-form-select
              v-model="pickup.time"
              :options="timeOptions"
              class="my-2"
            >
              <option disabled value="">Pickup Time</option>
            </b-form-select>
          </section>

          <!-- Dropoff Section -->
          <section>
            <h5>Dropoff</h5>
            <b-form-datepicker
              v-model="dropoff.date"
              placeholder="Dropoff Date"
              :date-format-options="dateFormatOptions"
              class="my-2"
            ></b-form-datepicker>
            <b-form-select
              v-model="dropoff.time"
              :options="timeOptions"
              class="my-2"
            >
              <option disabled value="">Dropoff Time</option>
            </b-form-select>
          </section>

          <!-- Search by Models -->
          <section class="my-3">
            <h5>Search by Models</h5>
            <b-form-input
              v-model="searchModels"
              placeholder="Search Models"
              class="mb-3"
              size="sm"
            ></b-form-input>
            <b-form-checkbox-group
              v-model="selectedModels"
              class="mb-3"
              style="max-height: 150px; overflow-y: auto"
            >
              <b-form-checkbox
                v-for="vehicle in filteredVehicles"
                :key="vehicle.id"
                :value="vehicle.name"
              >
                {{ vehicle.name }}
              </b-form-checkbox>
            </b-form-checkbox-group>
          </section>

          <!-- Apply Filter Button -->
          <b-button variant="primary" block @click="onApplyFilter"
            >Apply Filter</b-button
          >
         </b-card>
        </b-col>
         <!-- Main Content -->
        <b-col cols="12" md="9">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5>Available Vehicles</h5>
          </div>
          <div class="d-flex flex-wrap">
            <b-card
              v-for="vehicle in displayedVehicles"
              :key="vehicle.id"
              class="m-2"
              style="width: 16rem"
            >
              <b-card-img
                :src="vehicle.image"
                alt="Vehicle image"
                class="mb-2"
              ></b-card-img>
              <b-card-title>{{ vehicle.name }}</b-card-title>
              <b-card-text> Price: ₹{{ vehicle.price }} </b-card-text>
              <b-button variant="primary" block>Book Now</b-button>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </div>

    <!-- Bottom Button -->
    <div
      class="filter-button d-md-none fixed-bottom bg-white border-top py-2 text-center"
    >
      <b-button variant="light" block @click="showFilter = true"
        >Filters</b-button
      >
    </div>

    <!-- Filter Modal -->
    <b-modal
      id="filter-modal"
      v-model="showFilter"
      title="Filters"
      hide-footer
      size="lg"
      centered
    >
      <!-- Pickup Section -->
      <section>
        <h5>Pickup</h5>
        <b-form-datepicker
          v-model="pickup.date"
          placeholder="Pickup Date"
          :date-format-options="dateFormatOptions"
          class="my-2"
        ></b-form-datepicker>
        <b-form-select
          v-model="pickup.time"
          :options="timeOptions"
          class="my-2"
        >
          <option disabled value="">Pickup Time</option>
        </b-form-select>
      </section>

      <!-- Dropoff Section -->
      <section>
        <h5>Dropoff</h5>
        <b-form-datepicker
          v-model="dropoff.date"
          placeholder="Dropoff Date"
          :date-format-options="dateFormatOptions"
          class="my-2"
        ></b-form-datepicker>
        <b-form-select
          v-model="dropoff.time"
          :options="timeOptions"
          class="my-2"
        >
          <option disabled value="">Dropoff Time</option>
        </b-form-select>
      </section>

      <!-- Search by Models -->
      <section class="my-3">
        <h5>Search by Models</h5>
        <b-form-input
          v-model="searchModels"
          placeholder="Search Models"
          class="mb-3"
          size="sm"
        ></b-form-input>
        <b-form-checkbox-group
          v-model="selectedModels"
          class="mb-3"
          style="max-height: 150px; overflow-y: auto"
        >
          <b-form-checkbox
            v-for="vehicle in filteredVehicles"
            :key="vehicle.id"
            :value="vehicle.name"
          >
            {{ vehicle.name }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </section>

      <!-- Apply Filter Button -->
      <b-button variant="primary" block @click="onApplyFilter"
        >Apply Filter</b-button
      >
    </b-modal>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      showFilter: false, // Controls the modal visibility
      pickup: {
        date: "",
        time: "",
      },
      dropoff: {
        date: "",
        time: "",
      },
      timeOptions: [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
      ],
      dateFormatOptions: {
        year: "numeric",
        month: "short",
        day: "2-digit",
      },
      vehicles: [
        {
          id: 1,
          name: "Honda Activa",
          price: 500,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Yamaha R15",
          price: 1200,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Suzuki Gixxer",
          price: 800,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "Royal Enfield",
          price: 1500,
          image: "https://via.placeholder.com/150",
        },
      ],
      searchModels: "",
      selectedModels: [],
      displayedVehicles: [],
    };
  },
  computed: {
    filteredVehicles() {
      if (!this.searchModels) {
        return this.vehicles;
      }
      return this.vehicles.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(this.searchModels.toLowerCase())
      );
    },
  },
  methods: {
    onApplyFilter() {
      // Close the modal
      this.showFilter = false;

      // Apply filter logic
      if (this.selectedModels.length === 0) {
        this.displayedVehicles = this.vehicles;
      } else {
        this.displayedVehicles = this.vehicles.filter((vehicle) =>
          this.selectedModels.includes(vehicle.name)
        );
      }
    },
  },
  mounted() {
    // Show all vehicles initially
    this.displayedVehicles = this.vehicles;
  },
};
</script>
