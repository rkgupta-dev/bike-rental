<template>
  <b-container class="d-flex justify-content-center align-items-center vh-100">
    <b-card
      class="p-4"
      title="Forgot Password"
      style="max-width: 400px; width: 100%"
    >
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
        <b-button type="submit" variant="primary" block
          >Reset Password</b-button
        >
      </b-form>
      <div class="text-center mt-3">
        <b-link href="/login">Remembered your password? Login</b-link>
      </div>
      <!-- <div>
        {{userData.password}}
      </div> -->
    </b-card>
  </b-container>
</template>

<script>
import emailjs from "emailjs-com"; // Import the EmailJS SDK

export default {
  data() {
    return {
      email: "",
      userData: JSON.parse(localStorage.getItem("user")) || {}, // Fetch user data from localStorage
    };
  },
  methods: {
    handleResetPassword() {
      if (this.userData && this.userData.email === this.email) {
        const templateParams = {
          to_email: this.email,
          user_name: this.userData.name,
          password: this.userData.password,
        };

        console.log("Template Parameters:", templateParams); // Debugging the template params

        // Send email via EmailJS
        emailjs
          .send(
            "service_timckqh", // Your EmailJS service ID
            "template_hdhtk0c", // Replace with your actual template ID
            templateParams,
            "ZDba4pmwJBabKeyGS" // Your EmailJS user ID (public key)
          )
          .then((response) => {
            console.log("Email sent successfully:", response);
            alert(`Password has been sent to ${this.email}`);
            this.$router.push("/login");
          })
          .catch((error) => {
            console.error("Error sending email:", error); // Detailed error logging
            alert("Failed to send the password. Please try again.");
          });
      } else {
        alert("No user found with this email address.");
      }
    },
  },
};

</script>

<style scoped>
/* No additional styles needed since you prefer not to use custom CSS */
</style>
