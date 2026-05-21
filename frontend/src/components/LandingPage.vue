<template>
  <div class="page-wrapper">
    <!-- ── Hero ─────────────────────────────────────────────── -->
    <section class="hero-section gradient-mesh">
      <b-container>
        <b-row class="align-items-center hero-row">
          <!-- Left: Copy -->
          <b-col lg="6" class="hero-copy">
            <div class="badge-app badge-primary mb-4">
              <span class="badge-dot-indicator"></span>
              India's #1 Two-Wheeler Rental Platform
            </div>

            <h1 class="hero-title font-display">
              Rent it Out to
              <span class="typewriter-line">
                <span id="typewriter-text"></span>
              </span>
            </h1>

            <p class="section-subtitle hero-sub">
              Your trusted platform for affordable, hassle-free bike rentals
              across Bangalore, Hyderabad, Delhi &amp; Mumbai.
            </p>

            <div class="hero-actions mb-5">
              <a href="/all-model" class="btn-primary-app">
                Rent Now
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
              <router-link to="/all-model" class="btn-secondary-app">
                View All Models
              </router-link>
            </div>

            <!-- Stats row only in desktop -->
            <div class="stat-row d-none d-md-flex">
              <div class="stat-row-item">
                <span class="stat-row-number">5L+</span>
                <span class="stat-row-label">Happy Riders</span>
              </div>
              <div class="stat-row-divider"></div>
              <div class="stat-row-item">
                <span class="stat-row-number">4</span>
                <span class="stat-row-label">Major Cities</span>
              </div>
              <div class="stat-row-divider"></div>
              <div class="stat-row-item">
                <span class="stat-row-number">₹0</span>
                <span class="stat-row-label">Security Deposit</span>
              </div>
            </div>
          </b-col>

          <!-- Right: Illustration -->
          <b-col lg="6" class="hero-image-col">
            <div class="hero-img-wrap">
              <!-- <div class="floating-card-app fc-top">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                4.9 Rating
              </div> -->
              <b-img
                fluid
                src="https://on-track-jarvis.s3.ap-south-1.amazonaws.com/works-1778685495987.png"
                alt="Bike Rental Illustration"
                class="hero-img"
              />
              <!-- <div class="floating-card-app fc-bottom">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#10b981"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                Doorstep Delivery
              </div> -->
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- ── Monthly Rental Banner ─────────────────────────────── -->
    <section class="section section-sm">
      <b-container>
        <div class="card-primary monthly-banner">
          <div class="banner-body">
            <span class="badge-app mb-3 badge-accent">Best Value</span>
            <h2 class="font-display text-white banner-heading">
              Monthly Rentals
            </h2>
            <p class="banner-desc">
              Lock in a full month, save more — starting at just
              <strong class="text-accent">₹2,499</strong>
            </p>
            <router-link to="/all-model" class="btn-white-app btn-sm-app">
              Explore Plans
            </router-link>
          </div>
          <div class="banner-img hide-tablet">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/online-food-delivery-in-pandemic-illustration-download-svg-png-gif-file-formats--order-service-pack-e-commerce-shopping-illustrations-4161852.png?f=webp"
              alt="Monthly Rental"
            />
          </div>
        </div>
      </b-container>
    </section>

    <!-- ── Categories ────────────────────────────────────────── -->
    <section class="section gradient-light">
      <b-container>
        <div class="section-header">
          <span class="section-tag">Browse</span>
          <h2 class="section-title">Rent by Category</h2>
          <p class="section-subtitle">
            From city commutes to highway adventures — find your perfect ride
          </p>
        </div>

        <b-row>
          <b-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="category in categories"
            :key="category.title"
            class="mb-4"
          >
            <router-link :to="category.link" class="cat-link">
              <div class="cat-card card-flat hover-lift">
                <div class="cat-img-wrap">
                  <img
                    :src="category.image"
                    :alt="category.title"
                    class="cat-img"
                  />
                  <div class="cat-overlay">
                    <span class="text-white">Rent Now →</span>
                  </div>
                </div>
                <div class="cat-body">
                  <h3 class="cat-title font-display">{{ category.title }}</h3>
                  <p class="cat-desc text-muted text-sm">
                    {{ category.description }}
                  </p>
                </div>
              </div>
            </router-link>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- ── Trust Strip ────────────────────────────────────────── -->
    <div class="trust-strip">
      <b-container>
        <div class="trust-inner">
          <img
            src="https://cdn-icons-png.flaticon.com/128/17146/17146950.png"
            alt="Trusted"
            class="trust-icon"
          />
          <p class="text-muted trust-text">
            Trusted by over <strong class="text-dark">5 lakh+ riders</strong>
            across Bangalore, Hyderabad, Delhi and Mumbai
          </p>
        </div>
      </b-container>
    </div>

    <!-- ── Features ──────────────────────────────────────────── -->
    <section class="section">
      <b-container>
        <div class="section-header">
          <span class="section-tag">Why BikeOntrack</span>
          <h2 class="section-title">Everything included. Nothing hidden.</h2>
        </div>
        <b-row>
          <b-col
            v-for="(feature, index) in features"
            :key="index"
            cols="12"
            md="6"
            lg="4"
            class="mb-4"
          >
            <div class="card-app feature-card">
              <div class="icon-wrap icon-wrap-md icon-wrap-primary mb-3">
                <i :class="feature.icon" style="font-size: 1.2rem"></i>
              </div>
              <h3 class="feature-title font-display">{{ feature.title }}</h3>
              <p class="feature-desc text-muted text-sm">
                {{ feature.description }}
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- ── App Download ───────────────────────────────────────── -->
    <section class="section app-section">
      <b-container>
        <b-row class="align-items-center">
          <!-- Mockup -->
          <b-col md="5" class="text-center mb-5 mb-md-0">
            <div class="app-mockup animate-float">
              <b-img
                fluid
                src="https://on-track-jarvis.s3.ap-south-1.amazonaws.com/Untitled_design__1_-removebg-preview-1778738748037.png"
                alt="BikeOntrack App"
                class="app-mockup-img"
              />
            </div>
          </b-col>

          <!-- Content -->
          <b-col md="7" class="app-content">
            <span class="section-tag section-tag-dark d-inline-block mb-3"
              >Mobile App</span
            >

            <h2 class="font-display app-title">
              Get the <span class="text-primary-light">BikeOntrack</span> App
            </h2>
            <p class="app-subtitle">
              We'll send you a magic link. Open it on your phone to download the
              app and start your journey!
            </p>

            <b-form @submit.prevent="sendLink" class="mb-4">
              <div class="phone-group">
                <span class="phone-prefix">+91</span>
                <b-form-input
                  v-model="formData.phoneNumber"
                  placeholder="Enter mobile number"
                  type="number"
                  class="phone-input"
                />
                <b-button type="submit" class="phone-submit">Get Link</b-button>
              </div>
            </b-form>

            <p class="store-label">Download directly from</p>
            <div class="store-row">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener"
                class="btn-dark-ghost"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199a1 1 0 010 1.984L15.396 12l2.302-2.302zM5.864 3.658l10.937 6.333-2.302 2.302-8.635-8.635z"
                  />
                </svg>
                Google Play
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener"
                class="btn-dark-ghost"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                  />
                </svg>
                App Store
              </a>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "LandingPage",

  data() {
    return {
      formData: { phoneNumber: "" },
      categories: [
        {
          title: "Bikes",
          link: "/bikes",
          description: "Explore BikeOntrack range of bikes.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-decent-blue-metallic-2023-1687260642123.png?q=80",
        },
        {
          title: "Sportbikes",
          link: "/sportsbike",
          description: "High-speed sportbikes for adrenaline lovers.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-red-1704802630538.png?q=80",
        },
        {
          title: "Scooters",
          link: "/scooter",
          description: "Convenient scooters for city travel.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80",
        },
        {
          title: "Cruisers",
          link: "/cruiser",
          description: "Comfortable cruisers for long rides.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/royalenfield-classic-350-heritage1725274941405.jpg?q=80",
        },
      ],
      features: [
        {
          icon: "fa-solid fa-shield-halved",
          title: "Zero Security Deposit",
          description:
            "We only ask for the rental amount — no hidden charges, ever.",
        },
        {
          icon: "fa-solid fa-motorcycle",
          title: "Doorstep Delivery",
          description:
            "Your bike arrives right at your address, on time, every time.",
        },
        {
          icon: "fa-solid fa-route",
          title: "Unlimited Kilometres",
          description:
            "Travel as far as you want — no km caps, no extra charges.",
        },
        {
          icon: "fa-solid fa-screwdriver-wrench",
          title: "Maintenance Covered",
          description:
            "One periodic service per rental included in every plan.",
        },
        {
          icon: "fa-solid fa-file-shield",
          title: "Insurance Included",
          description:
            "Commercial comprehensive insurance covers you at no extra cost.",
        },
        {
          icon: "fa-solid fa-helmet-safety",
          title: "ISI Helmets Available",
          description:
            "Certified ISI-marked helmets available at checkout for your safety.",
        },
      ],
    };
  },
  mounted() {
    const texts = ["EXPLORE ", "RIDE ", "ENJOY ", "DISCOVER", "UNLEASH "];
    let index = 0,
      charIndex = 0;
    const el = document.getElementById("typewriter-text");
    const type = () => {
      if (charIndex < texts[index].length) {
        el.textContent += texts[index].charAt(charIndex++);
        setTimeout(type, 100);
      } else {
        setTimeout(erase, 1800);
      }
    };
    const erase = () => {
      if (charIndex > 0) {
        el.textContent = texts[index].substring(0, --charIndex);
        setTimeout(erase, 50);
      } else {
        index = (index + 1) % texts.length;
        setTimeout(type, 100);
      }
    };
    type();
  },
  methods: {
    sendLink() {
      if (!this.formData.phoneNumber) return;
      alert(`Link successfully sent to +91 ${this.formData.phoneNumber}`);
      this.formData.phoneNumber = "";
    },
  },
};
</script>

<style scoped>
/* Only page-specific styles — everything reusable lives in global.css */

.page-wrapper {
  overflow-x: hidden;
}

/* ── Hero ── */
.hero-section {
  padding: 7rem 0 5rem;
  overflow: hidden;
}
.hero-row {
  min-height: 78vh;
}
.hero-copy {
  padding-right: 2.5rem;
}

.hero-title {
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-dark);
  margin: 0.75rem 0 0.5rem;
}
.typewriter-line {
  display: block;
  color: var(--color-primary);
  min-height: 1.2em;
}
#typewriter-text {
  border-right: 3px solid var(--color-primary);
  animation: blink 0.75s step-end infinite;
}
@keyframes blink {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: var(--color-primary);
  }
}
.hero-sub {
  text-align: left;
  max-width: 460px;
  margin: 1.25rem 0 2rem;
}
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.hero-img-wrap {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
}
.hero-img {
  filter: drop-shadow(0 20px 40px rgba(79, 70, 229, 0.15));
  border-radius: var(--radius-2xl);
}
.fc-top {
  position: absolute;
  top: 12%;
  right: -8px;
}
.fc-bottom {
  position: absolute;
  bottom: 14%;
  left: -8px;
}

/* ── Monthly Banner ── */
.monthly-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}
.monthly-banner::before {
  content: "";
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  top: -80px;
  right: 32%;
  pointer-events: none;
}
.banner-body {
  position: relative;
  z-index: 1;
}
.banner-heading {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.5rem;
}
.banner-desc {
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: 1.5rem;
}
.banner-img img {
  max-height: 175px;
  position: relative;
  z-index: 1;
}
.badge-accent {
  background: rgba(250, 204, 21, 0.18) !important;
  color: #fcd34d !important;
  border: 1px solid rgba(250, 204, 21, 0.3) !important;
}

/* ── Categories ── */
.cat-link {
  text-decoration: none !important;
  display: block;
}
.cat-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
}
.cat-img-wrap {
  position: relative;
  overflow: hidden;
  background: #f8faff;
  height: 165px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
}
.cat-img {
  height: 135px;
  width: auto;
  object-fit: contain;
  transition: transform 0.4s ease;
}
.cat-card:hover .cat-img {
  transform: scale(1.07);
}
.cat-overlay {
  position: absolute;
  inset: 0;
  background: rgba(79, 70, 229, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: var(--radius-xl);
}
.cat-card:hover .cat-overlay {
  opacity: 1;
}
.cat-body {
  padding: 1rem 1.25rem 1.25rem;
}
.cat-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0 0 4px;
}
.cat-desc {
  margin: 0;
  line-height: 1.5;
}

/* ── Trust Strip ── */
.trust-strip {
  background: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-100);
  border-bottom: 1px solid var(--color-gray-100);
  padding: 1.1rem 0;
}
.trust-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
.trust-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}
.trust-text {
  margin: 0;
  font-size: 0.98rem;
}

/* ── Feature Cards ── */
.feature-card {
  height: 100%;
}
.feature-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0 0 0.4rem;
}
.feature-desc {
  margin: 0;
  line-height: 1.65;
}

/* ── App Section ── */
.app-section {
  background: var(--color-dark);
}
.app-content {
  padding-left: 2rem;
}
.text-primary-light {
  color: var(--color-primary-light);
}

.app-mockup {
  max-width: 320px;
  margin: 0 auto;
}
.app-mockup-img {
  max-height: 400px;
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
}

.app-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin: 0 0 1rem;
}
.app-subtitle {
  color: #94a3b8;
  font-size: 1rem;
  line-height: 1.7;
  max-width: 420px;
  margin-bottom: 2rem;
}

/* Phone input */
.phone-group {
  display: flex;
  align-items: stretch;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  overflow: hidden;
  max-width: 420px;
  transition: var(--transition-fast);
}
.phone-group:focus-within {
  border-color: rgba(99, 102, 241, 0.6);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}
.phone-prefix {
  padding: 0 14px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #94a3b8;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
}
.phone-input {
  flex: 1;
  background: transparent !important;
  border: none !important;
  color: #fff !important;
  font-size: 0.95rem !important;
  padding: 13px 16px !important;
  box-shadow: none !important;
}
.phone-input::placeholder {
  color: #475569 !important;
}
.phone-submit {
  background: var(--color-primary) !important;
  border: none !important;
  color: #fff !important;
  font-weight: 700 !important;
  font-size: 0.9rem !important;
  padding: 0 22px !important;
  border-radius: 0 !important;
  white-space: nowrap;
  transition: var(--transition-fast) !important;
}
.phone-submit:hover {
  background: var(--color-primary-dark) !important;
}

.store-label {
  color: #475569;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}
.store-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* ── Responsive ── */
@media (max-width: 991px) {
  .hero-copy {
    padding-right: 0;
    text-align: center;
  }
  .hero-sub,
  .app-subtitle {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .hero-actions {
    justify-content: center;
  }
  .stat-row {
    justify-content: center;
  }
  .monthly-banner {
    text-align: center;
  }
  .app-content {
    padding-left: 0;
    text-align: center;
    padding-top: 2rem;
  }
  .phone-group {
    margin: 0 auto;
  }
  .store-row {
    justify-content: center;
  }
  .fc-top,
  .fc-bottom {
    display: none;
  }
  .hero-row {
    min-height: auto;
    padding: 2rem 0;
  }
}
@media (max-width: 575px) {
  .hero-section {
    padding: 5.5rem 0 3rem;
  }
}
</style>
