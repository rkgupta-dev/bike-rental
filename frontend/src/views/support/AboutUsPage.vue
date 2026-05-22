<template>
  <div class="about-page">
    <!-- HERO -->
    <!-- SIMPLE ABOUT HEADER -->
    <section class="section">
      <b-container>
        <div class="listing-top-area">
          <b-breadcrumb class="custom-breadcrumb">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/about-us" active
              >About Us</b-breadcrumb-item
            >
          </b-breadcrumb>
        </div>
        <div class="about-top-content text-center">
          <span class="about-label">
            <i class="fa-solid fa-motorcycle"></i>
            About BikeOntrack
          </span>

          <h1 class="about-title">
            Making Bike Rentals
            <span>Simple, Reliable & Affordable</span>
          </h1>

          <p class="about-description">
            BikeOntrack provides premium bike rental services designed for daily
            commuters, travelers, and adventure riders. We focus on comfort,
            safety, flexibility, and smooth riding experiences.
          </p>
        </div>
      </b-container>
    </section>

    <!-- MISSION -->
    <section class="section bg-light-app">
      <b-container>
        <b-row class="align-items-center">
          <b-col lg="6" class="mb-4 mb-lg-0">
            <div class="mission-image-card">
              <b-img
                src="https://img.magnific.com/free-photo/into-success-group-young-freelancers-office-have-conversation-smiling_146671-13567.jpg?t=st=1778139096~exp=1778142696~hmac=0fdf35d319fa9e5326ac0ee32b4432a4928cedf023c307d194b5c115de56354a&w=2000"
                fluid
                class="mission-image"
              />
            </div>
          </b-col>

          <b-col lg="6">
            <span class="section-tag">Our Mission</span>

            <h2 class="section-title">Delivering Freedom Through Every Ride</h2>

            <p class="section-text">
              We aim to redefine urban mobility with safe, affordable, and
              premium-quality bike rental services. Whether it’s your daily
              commute or your next road adventure, BikeOntrack ensures you ride
              with confidence and comfort.
            </p>

            <div class="mission-points">
              <div class="mission-item">
                <i class="fa-solid fa-circle-check"></i>
                Flexible monthly and daily rentals
              </div>

              <div class="mission-item">
                <i class="fa-solid fa-circle-check"></i>
                Well-maintained premium bike fleet
              </div>

              <div class="mission-item">
                <i class="fa-solid fa-circle-check"></i>
                Fast verification and easy booking process
              </div>

              <div class="mission-item">
                <i class="fa-solid fa-circle-check"></i>
                Dedicated support for every rider
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- VALUES -->
    <section class="section">
      <b-container>
        <div class="section-heading text-center">
          <span class="section-tag">Why Choose Us</span>
          <h2 class="section-title center">Our Core Values</h2>
        </div>

        <b-row>
          <b-col md="4" class="mb-4">
            <div class="value-card">
              <div class="value-icon">
                <i class="fa-solid fa-user-shield"></i>
              </div>

              <h4>Customer First</h4>

              <p>
                We focus on delivering the best rental experience with smooth
                bookings, transparent pricing, and reliable support.
              </p>
            </div>
          </b-col>

          <b-col md="4" class="mb-4">
            <div class="value-card">
              <div class="value-icon">
                <i class="fa-solid fa-shield-heart"></i>
              </div>

              <h4>Safety Always</h4>

              <p>
                Every bike goes through quality checks and maintenance to ensure
                safe and stress-free rides.
              </p>
            </div>
          </b-col>

          <b-col md="4" class="mb-4">
            <div class="value-card">
              <div class="value-icon">
                <i class="fa-solid fa-road"></i>
              </div>

              <h4>Ride Better</h4>

              <p>
                From city rides to long-distance journeys, our bikes are chosen
                to deliver premium riding comfort.
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- TEAM -->
    <section class="section bg-light-app">
      <b-container>
        <div class="section-heading text-center">
          <span class="section-tag">Our Team</span>
          <h2 class="section-title center">
            Meet The People Behind BikeOntrack
          </h2>
        </div>

        <b-row>
          <b-col md="4" class="mb-4">
            <div class="team-card">
              <div class="team-image-wrap">
                <b-img
                  src="https://media.licdn.com/dms/image/v2/D5603AQGTA6zhKq8uSA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727696827533?e=1779926400&v=beta&t=mMjZ0HMTJkINdYOtYqNkUdpJ35TXeYFTO8FZ5ayul_Q"
                  fluid
                  class="team-image"
                />
              </div>

              <h5>Rohit Kr. Gupta</h5>
              <p>CEO & Founder</p>
            </div>
          </b-col>

          <b-col md="4" class="mb-4">
            <div class="team-card">
              <div class="team-image-wrap">
                <b-img
                  src="https://media.licdn.com/dms/image/v2/D5603AQFdty4EEu8htA/profile-displayphoto-crop_800_800/B56Zk06oUNIAAM-/0/1757529409231?e=1779926400&v=beta&t=FMSGkUHwXocim-pj7KXHPbFIxrN9VrDedkvbi_fVOH4"
                  fluid
                  class="team-image"
                />
              </div>

              <h5>Divisha Jain</h5>
              <p>Operations Manager</p>
            </div>
          </b-col>

          <b-col md="4" class="mb-4">
            <div class="team-card">
              <div class="team-image-wrap">
                <b-img
                  src="https://media.licdn.com/dms/image/v2/D5603AQHB-p_N__M7sw/profile-displayphoto-crop_800_800/B56Z2pOelKGoAI-/0/1776660640486?e=1779926400&v=beta&t=patrSfoMZqO2mtPdzi09KW3TWdcV-eWXX5-nVexAyCA"
                  fluid
                  class="team-image"
                />
              </div>

              <h5>Shilton Rodrigues</h5>
              <p>Customer Support</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- CTA -->
    <section class="section">
      <b-container>
        <div class="contact-cta">
          <span class="section-tag">Get In Touch</span>

          <h2>Ready To Start Your Journey?</h2>

          <p>
            Have questions about rentals, subscriptions, or support? Our team is
            always here to help you.
          </p>

          <button
            class="btn-primary-app btn-lg-app"
            @click="$router.push('/contact-us')"
          >
            Contact Us
          </button>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.about-page {
  background: #fff;
}

/* HERO */

.about-top {
  padding-top: 7rem;
  padding-bottom: 2rem;
}

.about-top-content {
  max-width: 760px;
  margin: auto;
}

.about-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(var(--color-primary-rgb), 0.08);
  color: var(--color-primary);
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.about-title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.2;
  color: var(--color-dark);
  margin-bottom: 1.5rem;
}

.about-title span {
  color: var(--color-primary);
}

.about-description {
  font-size: 16px;
  line-height: 1.9;
  color: var(--color-gray-500);
  margin: 0 auto;
}

/* RESPONSIVE */

@media (max-width: 991px) {
  .about-title {
    font-size: 42px;
  }
}

@media (max-width: 767px) {
  .about-top {
    padding-top: 6.5rem;
  }

  .about-title {
    font-size: 32px;
  }

  .about-description {
    font-size: 15px;
  }

  .about-label {
    font-size: 13px;
    padding: 9px 16px;
  }
}

/* SECTIONS */

.bg-light-app {
  background: var(--color-gray-50);
}

.section-heading {
  margin-bottom: 3rem;
}

.section-tag {
  display: inline-block;
  margin-bottom: 14px;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.section-title {
  font-size: 42px;
  font-weight: 800;
  color: var(--color-dark);
  margin-bottom: 1rem;
}

.section-title.center {
  max-width: 700px;
  margin-inline: auto;
}

.section-text {
  color: var(--color-gray-500);
  line-height: 1.9;
  font-size: 16px;
}

/* MISSION */

.mission-image-card {
  overflow: hidden;
  border-radius: 30px;
}

.mission-image {
  width: 100%;
  border-radius: 30px;
}

.mission-points {
  margin-top: 2rem;
}

.mission-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  color: var(--color-gray-700);
  font-weight: 500;
}

.mission-item i {
  color: var(--color-primary);
}

/* VALUES */

.value-card {
  background: #fff;
  border: 1px solid var(--color-gray-100);
  border-radius: 28px;
  padding: 2.2rem;
  height: 100%;
  transition: 0.3s ease;
}

.value-card:hover {
  transform: translateY(-8px);
}

.value-icon {
  width: 74px;
  height: 74px;
  border-radius: 22px;
  background: rgba(var(--color-primary-rgb), 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.value-icon i {
  font-size: 28px;
  /* color: var(--color-primary); */
}

.value-card h4 {
  font-weight: 700;
  margin-bottom: 1rem;
}

.value-card p {
  color: var(--color-gray-500);
  line-height: 1.8;
  margin: 0;
}

/* TEAM */

.team-card {
  background: #fff;
  border-radius: 28px;
  border: 1px solid var(--color-gray-100);
  padding: 2rem;
  text-align: center;
  height: 100%;
  transition: 0.3s ease;
}

.team-card:hover {
  transform: translateY(-8px);
}

.team-image-wrap {
  width: 110px;
  height: 110px;
  margin: auto auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
}

.team-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-card h5 {
  font-weight: 700;
  margin-bottom: 6px;
}

.team-card p {
  color: var(--color-gray-500);
  margin: 0;
}

/* CTA */

.contact-cta {
  border-radius: 36px;
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-100);
  padding: 4rem 2rem;
  text-align: center;
}

.contact-cta h2 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 1rem;
}

.contact-cta p {
  max-width: 700px;
  margin: auto auto 2rem;
  color: var(--color-gray-500);
  line-height: 1.9;
}

/* RESPONSIVE */

@media (max-width: 991px) {
  .hero-title {
    font-size: 44px;
  }

  .section-title,
  .contact-cta h2 {
    font-size: 34px;
  }
}

@media (max-width: 767px) {
  .about-hero {
    padding-top: 7rem;
  }

  .hero-title {
    font-size: 36px;
  }

  .section-title,
  .contact-cta h2 {
    font-size: 28px;
  }

  .hero-text,
  .section-text,
  .contact-cta p {
    font-size: 15px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-actions button {
    width: 100%;
  }

  .hero-stats {
    flex-direction: column;
  }

  .stat-box {
    width: 100%;
  }

  .contact-cta {
    padding: 3rem 1.5rem;
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

.brand-icon {
  width: 50px;
  height: 50px;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>
