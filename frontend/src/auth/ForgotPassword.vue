<template>
  <section class="section gradient-light min-vh-100 d-flex align-items-center">
    <b-container class="d-flex justify-content-center align-items-center">
      <div class="card-app shadow-lg forgot-card">
        <div class="text-center mb-4">
          <h2 class="mt-3">Forgot Password?</h2>
          <p class="text-muted">
            Enter your registered email and we'll send your login password.
          </p>
        </div>

        <b-form @submit.prevent="handleResetPassword">
          <div class="booking-block mb-4">
            <label class="form-label-app">Registered Email</label>
            <div class="input-icon-wrap">
              <i class="fa-solid fa-envelope"></i>
              <b-form-input
                v-model="email"
                type="email"
                class="custom-input"
                placeholder="Enter your email address"
                required
              ></b-form-input>
            </div>
          </div>

          <button
            type="submit"
            class="btn-primary-app w-100 justify-content-center"
            :disabled="loading"
          >
            <i class="fa-solid fa-paper-plane"></i>
            {{ loading ? "Sending Password..." : "Send Password To Email" }}
          </button>
        </b-form>

        <div class="text-center mt-4">
          <router-link to="/login" class="back-login-link">
            <i class="fa-solid fa-arrow-left"></i> Back To Login
          </router-link>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
import emailjs from "@emailjs/browser";

export default {
  data() {
    return {
      email: "",
      loading: false,
      userData: JSON.parse(localStorage.getItem("user")) || {},
    };
  },

  methods: {
    async handleResetPassword() {
      if (!this.userData || this.userData.email !== this.email) {
        this.$bvToast.toast("No account found with this email.", {
          title: "User Not Found",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });
        return;
      }

      this.loading = true;

      try {
        const templateParams = {
          to_email: this.userData.email, // Used for the "To Email" field
          to_name: this.userData.name, // Maps to {{to_name}}
          from_name: "BikeOntrack Support", // Maps to {{from_name}}
          message: `Your requested password is: ${this.userData.password}`, // Maps to {{message}}
        };

        await emailjs.send(
          "service_7ujssum", // Your EmailJS service ID
          "template_hdhtk0c", // Replace with your actual template ID
          templateParams,
          "ct_poVQrw5KV3jMW3", // Your EmailJS user ID (public key)
        );

        this.$bvToast.toast(`Password sent successfully to ${this.email}`, {
          title: "Email Sent",
          variant: "success",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });

        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);
      } catch (error) {
        console.error("EmailJS Error:", error);

        this.$bvToast.toast(
          "Unable to send email. Check EmailJS configuration.",
          {
            title: "Mail Failed",
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-right",
          },
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.input-icon-wrap {
  position: relative;
}

.input-icon-wrap > i:first-child {
  position: absolute;
  left: 16px;
  top: 17px;
  color: var(--color-gray-400);
  z-index: 2;
}

.custom-input {
  padding-left: 46px !important;
  height: 50px;
  border-radius: 12px;
}

.forgot-icon {
  width: 75px;
  height: 75px;
  margin: auto;
  border-radius: 50%;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.forgot-icon i {
  font-size: 32px;
  color: #4238ca;
}

.back-login-link {
  font-weight: 600;
  color: #4238ca;
  text-decoration: none;
}
</style>
