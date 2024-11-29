<template>
    <b-container class="d-flex justify-content-center align-items-center vh-100">
      <b-card class="p-4" title="Forgot Password" style="max-width: 400px; width: 100%;">
        <b-form @submit.prevent="handleResetPassword">
          <b-form-group label="Email" label-for="email-input" class="mb-3">
            <b-form-input
              id="email-input"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" block>Reset Password</b-button>
        </b-form>
        <div class="text-center mt-3">
          <b-link href="/login">Remembered your password? Login</b-link>
        </div>
      </b-card>
    </b-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
      };
    },
    methods: {
      handleResetPassword() {
        // In a real scenario, you'd send the email to the server for password reset
        alert(`Password reset link sent to ${this.email}`);
        // Redirect back to the login page
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  /* No additional styles needed since you prefer not to use custom CSS */
  </style>
  