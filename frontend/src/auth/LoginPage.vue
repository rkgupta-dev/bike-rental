<template>
  <div class="login-page gradient-light">
    <b-container class="login-wrapper">
      <div class="login-center-box animate-fade-up">
        <div class="login-card-main">
          <!-- top -->
          <div class="text-center mb-4">
            <h2 class="section-title mb-2">Welcome Back</h2>
            <p class="section-subtitle mb-0">
              Login to continue your BikeOntrack journey
            </p>
          </div>

          <!-- form -->
          <b-form @submit.prevent="handleLogin">
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
                ></b-form-input>
              </div>
            </div>

            <!-- password -->
            <div class="mb-3">
              <label class="form-label-app">Password</label>
              <div class="input-icon-wrap password-parent">
                <i class="fa-solid fa-lock"></i>
                <b-form-input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="input-app custom-input"
                  required
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

            <!-- extra row -->
            <div class="login-extra-row mb-4">
              <b-form-checkbox v-model="rememberMe" size="sm">
                Remember me
              </b-form-checkbox>

              <b-link href="/forgot-password">Forgot Password?</b-link>
            </div>

            <!-- button -->
            <button
              type="submit"
              class="btn-primary-app btn-lg-app login-btn-full"
            >
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
              Login Now
            </button>
          </b-form>

          <!-- divider -->
          <div class="divider-text my-4">or</div>

          <!-- signup -->
          <div class="signup-text">
            Don’t have an account?
            <b-link href="/signup">Create Account</b-link>
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
      phone: "",
      password: "",
      showPassword: false,
      rememberMe: false,
    };
  },
  methods: {
    handleLogin() {
      const user = JSON.parse(localStorage.getItem("user"));

      if (
        user &&
        user.phone === this.phone &&
        user.password === this.password
      ) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("logged-in", JSON.stringify(true));

        this.$bvToast.toast(`Welcome back ${user.name}!`, {
          title: "Login Successful",
          variant: "success",
          solid: true,
          autoHideDelay: 2500,
          toaster: "b-toaster-bottom-right",
        });

        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      } else {
        this.$bvToast.toast("Invalid phone number or password.", {
          title: "Login Failed",
          variant: "danger",
          solid: true,
          autoHideDelay: 2500,
          toaster: "b-toaster-bottom-right",
        });
      }
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

.brand-badge {
  width: 70px;
  height: 70px;
  margin: auto;
  border-radius: var(--radius-full);
  background: var(--color-primary-bg);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
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

.login-extra-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-sm);
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
