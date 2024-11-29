<template>
  <b-container class="d-flex justify-content-center align-items-center vh-100">
    <b-card class="p-4" title="Welcome to BikeOntrack" style="max-width: 380px; width: 100%">
      <b-form @submit.prevent="handleLogin">
        <b-form-group label="Phone Number" label-for="phone-input" class="my-4">
          <b-form-input
            id="phone-input"
            v-model="phone"
            type="tel"
            placeholder="Enter your phone number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password-input" class="mb-3">
          <b-form-input
            id="password-input"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" block>Login</b-button>
      </b-form>
      <div class="text-left mt-3">
        <b-link href="/forgot-password">Forgot Password?</b-link>
      </div>
      <div class="text-left mt-2">
        <b-link href="/signup">Don't have an account? Sign Up</b-link>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      // Retrieve the user data from localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      // Check if the user exists and if the entered credentials match
      if (user && user.phone === this.phone && user.password === this.password) {
        // Optionally, store the logged-in user's info in localStorage or a global state
        localStorage.setItem("user", JSON.stringify(user));

        alert(`Hii ${user.name}! You are LoggedIn.`)
        // Redirect to the dashboard or a protected route
        this.$router.push("/");
      } else {
        // Show an alert if the login credentials are incorrect
        alert("Invalid phone number or password.");
      }
    },
  },
};
</script>

<style scoped>
/* No additional styles needed since you prefer not to use custom CSS */
</style>
