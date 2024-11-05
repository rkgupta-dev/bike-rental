<template>
    <b-container class="d-flex justify-content-center align-items-center vh-100">
      <b-card class="p-4" title="Sign Up" style="max-width: 400px; width: 100%;">
        <b-form @submit.prevent="handleSignup">
          <b-form-group label="Name" label-for="name-input" class="mb-3">
            <b-form-input
              id="name-input"
              v-model="name"
              type="text"
              placeholder="Enter your full name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-for="email-input" class="mb-3">
            <b-form-input
              id="email-input"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Phone Number" label-for="phone-input" class="mb-3">
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
          <b-button type="submit" variant="primary" block>Sign Up</b-button>
        </b-form>
        <div class="text-center mt-3">
          <b-link href="/login">Already have an account? Login</b-link>
        </div>
      </b-card>
    </b-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        phone: '',
        password: '',
      };
    },
    methods: {
      handleSignup() {
        if (this.name && this.email && this.phone && this.password) {
          // Handle signup logic here
          console.log('Name:', this.name);
          console.log('Email:', this.email);
          console.log('Phone:', this.phone);
          console.log('Password:', this.password);
          alert('Signup submitted!');
        } else {
          alert('Please fill in all fields.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* No additional styles needed since you prefer not to use custom CSS */
  </style>
  