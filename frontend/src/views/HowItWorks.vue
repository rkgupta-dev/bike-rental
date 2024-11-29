<template>
  <div>
    <NavBar />
    <h3 class="text-center header-title" style="margin-top: 4rem;">How It Works</h3>
    <hr />
    <b-container>
      <b-row
        v-for="(step, index) in steps"
        :key="index"
        class="align-items-center"
      >
        <b-col
          cols="12"
          md="6"
          class="my-2"
          :class="{ 'order-md-2': index % 2 !== 0 }"
        >
          <b-card :header="step.id" class="h-100 shadow-sm card-height">
            <div class="card-body text-center">
              <h3 class="card-title mb-3 font-weight-bold">
                <i :class="step.icon" class="me-2"></i>
                {{ step.title }}
              </h3>
              <p class="card-text">{{ step.description }}</p>
            </div>
          </b-card>
        </b-col>
        <b-col
          cols="12"
          md="6"
          :class="{ 'order-md-1': index % 2 !== 0 }"
          class="text-center"
        >
          <b-card class="h-100 border-0 shadow-sm p-0">
            <b-img
              :src="step.image"
              alt="Step illustration"
              fluid
              class="rounded"
            ></b-img>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      steps: [
        {
          id: "Step-01",
          title: "Sign Up",
          description:
            "Sign up and complete your profile to ride with us. Welcome to BikeOntrack!",
          image:
            "https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7963.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          icon: "fas fa-user-plus", // Font Awesome icon for Sign Up
        },
        {
          id: "Step-02",
          title: "Rent",
          description:
            "Choose a bike that fits your persona. Make your commute easy, comfortable, and fun!",
          image:
            "https://img.freepik.com/free-vector/vehicle-sale-concept-illustration_114360-2082.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          icon: "fas fa-key", // Font Awesome icon for Rent
        },
        {
          id: "Step-03",
          title: "Ride",
          description:
            "The bike is yours for a month. Make it an essential part of your everyday travel experience.",
          image:
            "https://img.freepik.com/premium-vector/vector-image-person-motorbike_1310403-495.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          icon: "fas fa-motorcycle", // Font Awesome icon for Ride
        },
        {
          id: "Step-04",
          title: "Repeat",
          description:
            "Repeat, Swap or Pause – You have the privilege to opt for whatever works best.",
          image:
            "https://img.freepik.com/free-vector/man-woman-riding-moped-mountains_74855-10868.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          icon: "fas fa-redo-alt", // Font Awesome icon for Repeat
        },
      ],
    };
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.card-height {
  min-height: 300px; /* Set your desired minimum height */
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(176, 229, 208, 1) 42%,
    rgba(92, 202, 238, 0.41) 93.6%
  );
  background-size: cover; /* Ensure the background covers the card */
}

.card-title {
  font-weight: bold;
}

.card-header {
  font-weight: bold;
  font-size: large;
  color: blue;
}
</style>
