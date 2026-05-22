<template>
  <div class="how-work-page">
    <!-- STEPS -->
    <section class="section">
      <b-container>
        <div class="listing-top-area">
          <b-breadcrumb class="custom-breadcrumb">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/how-it-works" active
              >How it works</b-breadcrumb-item
            >
          </b-breadcrumb>
        </div>
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="process-card"
          :class="{ reverse: index % 2 !== 0 }"
        >
          <!-- IMAGE -->
          <div class="process-image">
            <div class="image-wrap">
              <img :src="step.image" :alt="step.title" />
            </div>
          </div>

          <!-- CONTENT -->
          <div class="process-content">
            <div class="step-number">
              {{ step.id }}
            </div>

            <div class="step-icon">
              <i :class="step.icon"></i>
            </div>

            <h2>{{ step.title }}</h2>

            <p>
              {{ step.description }}
            </p>

            <div class="step-line"></div>
          </div>
        </div>
      </b-container>
    </section>

    <!-- CTA -->
    <section class="how-cta">
      <b-container>
        <div class="cta-box">
          <h2 class="text-white">Ready To Start Your Ride?</h2>

          <p>
            Choose your bike, complete KYC verification and ride anywhere with
            BikeOnTrack.
          </p>

          <router-link to="/all-model" class="cta-btn">
            Explore Bikes
            <i class="fa-solid fa-arrow-right"></i>
          </router-link>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      steps: [
        {
          id: "01",
          title: "Create Your Account",
          description:
            "Sign up on BikeOnTrack and complete your profile verification to start your bike rental journey smoothly.",
          image:
            "https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7963.jpg",
          icon: "fa-solid fa-user-plus",
        },

        {
          id: "02",
          title: "Choose Your Bike",
          description:
            "Browse premium bikes, compare prices, and select the perfect ride that matches your travel style.",
          image:
            "https://img.freepik.com/free-vector/vehicle-sale-concept-illustration_114360-2082.jpg",
          icon: "fa-solid fa-motorcycle",
        },

        {
          id: "03",
          title: "Verify & Ride",
          description:
            "Upload your KYC documents, complete verification, and unlock your bike instantly for the ride.",
          image:
            "https://img.freepik.com/premium-vector/vector-image-person-motorbike_1310403-495.jpg",
          icon: "fa-solid fa-shield",
        },

        {
          id: "04",
          title: "Return Or Extend",
          description:
            "Extend your rental anytime or return the bike easily at your preferred location without hassle.",
          image:
            "https://img.freepik.com/free-vector/man-woman-riding-moped-mountains_74855-10868.jpg",
          icon: "fa-solid fa-repeat",
        },
      ],
    };
  },
};
</script>

<style scoped>
.how-work-page {
  background: #f8fafc;
}

/* PROCESS CARD */
.process-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 6rem;
}

.process-card.reverse .process-image {
  order: 2;
}

.process-card.reverse .process-content {
  order: 1;
}

.image-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
}

.image-wrap img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  transition: 0.5s ease;
}

.image-wrap:hover img {
  transform: scale(1.05);
}

/* CONTENT */
.process-content {
  position: relative;
}

.step-number {
  font-size: 5rem;
  font-weight: 900;
  color: rgba(37, 99, 235, 0.08);
  line-height: 1;
  margin-bottom: -15px;
}

.step-icon {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--color-primary), #0ea5e9);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
}

.process-content h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #0f172a;
}

.process-content p {
  color: #64748b;
  line-height: 1.9;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.step-line {
  width: 80px;
  height: 5px;
  border-radius: 30px;
  background: linear-gradient(90deg, var(--color-primary), #0ea5e9);
}

/* CTA */
.how-cta {
  padding-bottom: 5rem;
}

.cta-box {
  background: linear-gradient(135deg, var(--color-primary), #0ea5e9);
  border-radius: 30px;
  padding: 4rem 2rem;
  text-align: center;
  color: #fff;
  overflow: hidden;
  position: relative;
}

.cta-box h2 {
  font-size: 2.3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-box p {
  max-width: 650px;
  margin: auto;
  opacity: 0.9;
  line-height: 1.8;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 2rem;
  background: #fff;
  color: var(--color-primary);
  padding: 14px 28px;
  border-radius: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: 0.3s;
}

.cta-btn:hover {
  transform: translateY(-3px);
  text-decoration: none;
}

/* MOBILE */
@media (max-width: 991px) {
  .process-card {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .process-card.reverse .process-image,
  .process-card.reverse .process-content {
    order: unset;
  }

  .process-content h2 {
    font-size: 1.7rem;
  }

  .image-wrap img {
    height: 300px;
  }
}

@media (max-width: 575px) {
  .how-hero {
    padding: 6rem 0 3rem;
  }

  .hero-title {
    font-size: 1.9rem;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .process-card {
    margin-bottom: 4rem;
  }

  .process-content h2 {
    font-size: 1.5rem;
  }

  .step-number {
    font-size: 4rem;
  }

  .cta-box {
    padding: 3rem 1.5rem;
  }

  .cta-box h2 {
    font-size: 1.7rem;
  }
}

/* breadcrumb */
.listing-top-area {
  margin-bottom: 2rem;
}

.custom-breadcrumb {
  background: transparent;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.custom-breadcrumb .breadcrumb {
  background: transparent !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
}

.custom-breadcrumb .breadcrumb-item a {
  color: var(--color-gray-500);
  font-weight: 500;
  text-decoration: none;
}

.custom-breadcrumb .breadcrumb-item.active {
  color: var(--color-primary);
  font-weight: 700;
}

.custom-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
  color: var(--color-gray-300);
}

.card-disabled {
  opacity: 0.55;
}
</style>
