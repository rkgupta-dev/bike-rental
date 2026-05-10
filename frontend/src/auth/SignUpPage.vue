<template>
  <div class="login-page gradient-light">
    <b-container class="login-wrapper section">
      <div class="login-center-box animate-fade-up">
        <div class="login-card-main">
          <!-- top -->
          <div class="text-center mb-4">
            <h2 class="section-title mb-2">Create Account</h2>
            <p class="section-subtitle mb-0">
              Join BikeOntrack and start your bike rental journey
            </p>
          </div>

          <!-- form -->
          <b-form @submit.prevent="handleSignup">
            <!-- name -->
            <div class="mb-4">
              <label class="form-label-app">Full Name</label>
              <div class="input-icon-wrap">
                <i class="fa-solid fa-user"></i>
                <b-form-input
                  v-model="name"
                  type="text"
                  placeholder="Enter your full name"
                  class="input-app custom-input"
                  required
                  maxlength="40"
                ></b-form-input>
              </div>
            </div>

            <!-- email -->
            <div class="mb-4">
              <label class="form-label-app">Email Address</label>
              <div class="input-icon-wrap">
                <i class="fa-solid fa-envelope"></i>
                <b-form-input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  class="input-app custom-input"
                  required
                ></b-form-input>
              </div>
            </div>

            <!-- phone -->
            <div class="mb-4">
              <label class="form-label-app">Phone Number</label>
              <div class="input-icon-wrap">
                <i class="fa-solid fa-phone"></i>
                <b-form-input
                  v-model="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  class="input-app custom-input"
                  required
                  maxlength="10"
                ></b-form-input>
              </div>
            </div>

            <!-- password -->
            <div class="mb-4">
              <label class="form-label-app">Password</label>
              <div class="input-icon-wrap password-parent">
                <i class="fa-solid fa-lock"></i>
                <b-form-input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create your password"
                  class="input-app custom-input"
                  required
                  minlength="6"
                ></b-form-input>

                <span
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <i
                    :class="
                      showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
                    "
                  ></i>
                </span>
              </div>
            </div>

            <!-- button -->
            <button
              type="submit"
              class="btn-primary-app btn-lg-app login-btn-full"
            >
              <i class="fa-solid fa-user-plus"></i>
              Create Account
            </button>
          </b-form>

          <!-- divider -->
          <div class="divider-text my-4">or</div>

          <!-- login -->
          <div class="signup-text">
            Already have an account?
            <b-link href="/login">Login Here</b-link>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    handleSignup() {
      // Trim values
      const name = this.name.trim();
      const email = this.email.trim();
      const phone = this.phone.trim();
      const password = this.password.trim();

      // Name validation
      if (!name) {
        return this.showToast(
          "Please enter your full name.",
          "Validation Error",
        );
      }

      if (name.length < 3) {
        return this.showToast(
          "Name must be at least 3 characters.",
          "Validation Error",
        );
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        return this.showToast(
          "Please enter your email address.",
          "Validation Error",
        );
      }

      if (!emailRegex.test(email)) {
        return this.showToast(
          "Please enter a valid email address.",
          "Validation Error",
        );
      }

      // Phone validation
      const phoneRegex = /^[6-9]\d{9}$/;

      if (!phone) {
        return this.showToast(
          "Please enter your phone number.",
          "Validation Error",
        );
      }

      if (!phoneRegex.test(phone)) {
        return this.showToast(
          "Please enter a valid 10-digit Indian mobile number.",
          "Validation Error",
        );
      }

      // Password validation
      if (!password) {
        return this.showToast(
          "Please enter your password.",
          "Validation Error",
        );
      }

      if (password.length < 6) {
        return this.showToast(
          "Password must be at least 6 characters.",
          "Validation Error",
        );
      }

      // Check existing user
      const existingUser = JSON.parse(localStorage.getItem("user"));

      if (
        existingUser &&
        (existingUser.email === email || existingUser.phone === phone)
      ) {
        return this.showToast(
          "Account already exists with this email or phone number.",
          "Signup Failed",
        );
      }

      // Save user
      const signupData = {
        name,
        email,
        phone,
        password,
      };

      localStorage.setItem("user", JSON.stringify(signupData));

      this.$bvToast.toast("Your account has been created successfully.", {
        title: "Signup Successful",
        variant: "success",
        solid: true,
        autoHideDelay: 2500,
        toaster: "b-toaster-bottom-right",
      });

      // Reset form
      this.name = "";
      this.email = "";
      this.phone = "";
      this.password = "";

      setTimeout(() => {
        this.$router.push("/login");
      }, 1000);
    },

    showToast(message, title = "Error") {
      this.$bvToast.toast(message, {
        title,
        variant: "danger",
        solid: true,
        autoHideDelay: 2500,
        toaster: "b-toaster-bottom-right",
      });
    },
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-center-box {
  width: 100%;
  max-width: 460px;
}

.login-card-main {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(18px);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-2xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-xl);
}

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

.password-parent .custom-input {
  padding-right: 46px !important;
}

.password-toggle {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  color: var(--color-gray-400);
}

.login-btn-full {
  width: 100%;
  justify-content: center;
}

.signup-text {
  text-align: center;
  color: var(--color-gray-500);
  font-size: var(--text-sm);
}

.signup-text a {
  font-weight: var(--font-bold);
  margin-left: 4px;
}

@media (max-width: 575px) {
  .login-card-main {
    padding: 2rem 1.3rem;
  }

  .login-center-box {
    max-width: 100%;
  }
}
</style>
