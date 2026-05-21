<template>
  <footer class="footer-wrapper gradient-primary overflow-hidden">
    <b-container class="footer-main">
      <b-row class="gy-4">
        <!-- BRAND INFO -->
        <b-col lg="4" md="6" class="mb-4 mb-lg-0">
          <router-link to="/" class="nav-brand">
            <div class="brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="5.5"
                  cy="17.5"
                  r="3.5"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle
                  cx="18.5"
                  cy="17.5"
                  r="3.5"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M15 17.5H9M9 17.5L7 8l4 1 2-4 4 3 1 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span class="brand-name">BikeOntrack</span>
          </router-link>

          <p class="footer-description">
            Discover your city effortlessly with our premium bike rentals.
            Freedom, flexibility and convenience — crafted for every urban ride,
            weekend escape and adventure trip.
          </p>

          <div class="footer-trust-row mt-4">
            <div class="trust-pill">
              <i class="fa-solid fa-circle-check"></i> Verified Vehicles
            </div>
            <div class="trust-pill">
              <i class="fa-solid fa-shield-halved"></i> Secure Booking
            </div>
          </div>
        </b-col>

        <!-- QUICK LINKS -->
        <b-col lg="2" md="6" sm="6">
          <h5 class="footer-heading">Quick Links</h5>
          <ul class="footer-links">
            <li><b-link href="/">Home</b-link></li>
            <li><b-link to="/rent">Rent Bikes</b-link></li>
            <li><b-link to="/blogs">Blogs</b-link></li>
            <li><b-link to="/about-us">About Us</b-link></li>
            <li><b-link to="/contact-us">Contact</b-link></li>
          </ul>
        </b-col>

        <!-- CUSTOMER SUPPORT -->
        <b-col lg="3" md="6" sm="6">
          <h5 class="footer-heading">Support</h5>
          <ul class="footer-links">
            <li><b-link to="/frequently-asked-questions">FAQs</b-link></li>
            <li>
              <b-link to="/frequently-asked-questions"
                >Terms & Conditions</b-link
              >
            </li>
            <li>
              <b-link to="/frequently-asked-questions">Privacy Policy</b-link>
            </li>
            <li>
              <b-link to="/frequently-asked-questions"
                >Disclaimer Policy</b-link
              >
            </li>
            <li>
              <b-link to="/frequently-asked-questions"
                >Copyright Guidelines</b-link
              >
            </li>
          </ul>
        </b-col>

        <!-- NEWSLETTER -->
        <b-col lg="3" md="6">
          <h5 class="footer-heading">Stay Connected</h5>
          <p class="footer-news-text">
            Subscribe for exclusive offers, latest discounts and travel updates.
          </p>

          <b-form @submit.prevent="subscribe" class="newsletter-box">
            <input
              class="newsletter-input"
              placeholder="Enter your email"
              v-model="formData.email"
              type="email"
              required
            />
            <button class="newsletter-btn" type="submit">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </b-form>

          <div class="social-row mt-4">
            <a href="#" class="social-btn"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-btn"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-btn"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-btn"
              ><i class="fab fa-linkedin-in"></i
            ></a>
          </div>
        </b-col>
      </b-row>

      <!-- BOTTOM BAR -->
      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <div class="footer-copy">
          © {{ currentYear }} BikeOntrack. All Rights Reserved.
        </div>

        <div class="footer-bottom-links">
          <span>Made for Riders ❤️</span>
        </div>
      </div>
    </b-container>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      formData: {
        email: "",
      },
    };
  },
  methods: {
    subscribe() {
      const user = {
        email: this.formData.email,
      };
      alert(`Thank you for subscribing with ${user.email}`);
      this.formData.email = "";
    },
  },
};
</script>

<style scoped>
.nav-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  flex-shrink: 0;
}
.brand-icon {
  width: 34px;
  height: 34px;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.brand-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
}

.footer-wrapper {
  position: relative;
  padding-top: 4.5rem;
  color: rgba(255, 255, 255, 0.88);
}

.footer-wrapper::before {
  content: "";
  position: absolute;
  top: -80px;
  right: -80px;
  width: 260px;
  height: 260px;
  background: rgba(99, 102, 241, 0.14);
  border-radius: 50%;
  filter: blur(50px);
}

.footer-wrapper::after {
  content: "";
  position: absolute;
  bottom: -100px;
  left: -60px;
  width: 240px;
  height: 240px;
  background: rgba(245, 158, 11, 0.09);
  border-radius: 50%;
  filter: blur(50px);
}

.footer-main {
  position: relative;
  z-index: 2;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-logo-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fcd34d;
  font-size: 20px;
}

.footer-brand-name {
  font-family: var(--font-display);
  font-weight: var(--font-extrabold);
  color: white;
  letter-spacing: 1px;
}

.footer-description {
  margin-top: 1rem;
  max-width: 340px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
}

.footer-heading {
  font-family: var(--font-display);
  color: white;
  margin-bottom: 1.3rem;
  font-size: 18px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.72);
  transition: 0.3s ease;
  font-size: 15px;
}

.footer-links a:hover {
  color: #ffffff;
  padding-left: 5px;
  text-decoration: none;
}

.footer-news-text {
  color: rgba(255, 255, 255, 0.68);
  font-size: 14px;
  line-height: 1.7;
}

.newsletter-box {
  margin-top: 18px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
}

.newsletter-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 13px 16px;
  color: white;
  outline: none;
  font-size: 14px;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.newsletter-btn {
  width: 50px;
  border: none;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  height: 46px;
  transition: 0.3s ease;
}

.newsletter-btn:hover {
  background: var(--color-primary-light);
}

.social-row {
  display: flex;
  gap: 12px;
}

.social-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  transition: 0.3s ease;
}

.social-btn:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-3px);
}

.footer-trust-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.trust-pill {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.78);
}

.footer-divider {
  margin: 3rem 0 1.4rem;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-copy,
.footer-bottom-links {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.58);
}

@media (max-width: 768px) {
  .footer-wrapper {
    padding-top: 3rem;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-description {
    max-width: 100%;
  }
}
</style>
