<!-- NotFound.vue -->
<template>
  <div class="not-found-page">
    <!-- floating shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>

    <b-container>
      <div class="not-found-content">
        <!-- ICON -->
        <div class="error-icon">
          <i class="fa-solid fa-road-barrier"></i>
        </div>

        <!-- 404 -->
        <h1 class="error-code">404</h1>

        <!-- TITLE -->
        <h2 class="error-title">Oops! Page Not Found</h2>

        <!-- DESC -->
        <p class="error-description">
          The page you are looking for might have been removed, renamed, or
          temporarily unavailable.
        </p>

        <!-- BUTTONS -->
        <div class="action-buttons">
          <button class="btn-primary-app btn-lg-app" @click="goBack">
            <i class="fa-solid fa-arrow-left"></i>
            Go Back
          </button>

          <button class="btn-secondary-app btn-lg-app" @click="goHome">
            <i class="fa-solid fa-house"></i>
            Home
          </button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.back();
    },

    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: #fff;
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2rem 1rem;
}

/* SHAPES */

.shape {
  position: absolute;
  border-radius: 50%;
  z-index: 0;
}

.shape-1 {
  width: 280px;
  height: 280px;
  background: rgba(var(--color-primary-rgb), 0.06);

  top: -100px;
  left: -100px;
}

.shape-2 {
  width: 220px;
  height: 220px;
  background: rgba(var(--color-primary-rgb), 0.08);

  bottom: -80px;
  right: -80px;
}

/* CONTENT */

.not-found-content {
  position: relative;
  z-index: 2;

  text-align: center;
  max-width: 760px;
  margin: auto;
}

/* ICON */

.error-icon {
  width: 110px;
  height: 110px;

  margin: 0 auto 2rem;

  border-radius: 50%;

  background: rgba(var(--color-primary-rgb), 0.1);

  color: var(--color-primary);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2.8rem;
}

/* TEXT */

.error-code {
  font-size: 8rem;
  line-height: 1;
  font-weight: 900;

  color: var(--color-primary);

  margin-bottom: 1rem;
}

.error-title {
  font-size: 2.2rem;
  font-weight: 800;

  color: var(--color-dark);

  margin-bottom: 1rem;
}

.error-description {
  max-width: 600px;

  margin: auto;
  margin-bottom: 2.5rem;

  color: var(--color-gray-500);

  font-size: 1.05rem;
  line-height: 1.8;
}

/* BUTTONS */

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  flex-wrap: wrap;

  margin-bottom: 2rem;
}

.btn-secondary-app {
  height: 54px;
  padding: 0 24px;

  border-radius: var(--radius-xl);

  border: 1px solid var(--color-gray-200);

  background: #fff;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-weight: 600;

  transition: 0.3s;
}

.btn-secondary-app:hover {
  background: var(--color-gray-100);
}

/* MOBILE */

@media (max-width: 767px) {
  .error-code {
    font-size: 5rem;
  }

  .error-title {
    font-size: 1.6rem;
  }

  .error-description {
    font-size: 15px;
  }

  .error-icon {
    width: 90px;
    height: 90px;

    font-size: 2rem;
  }
}

@media (max-width: 575px) {
  .error-code {
    font-size: 4rem;
  }

  .error-title {
    font-size: 1.3rem;
  }
}
</style>
