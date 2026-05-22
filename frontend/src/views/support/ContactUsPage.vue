<template>
  <div class="contact-page">
    <!-- CONTACT SECTION -->
    <section class="section">
      <b-container>
        <div class="listing-top-area">
          <b-breadcrumb class="custom-breadcrumb">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/contact-us" active
              >Contact Us</b-breadcrumb-item
            >
          </b-breadcrumb>
        </div>
        <b-row class="align-items-stretch">
          <!-- LEFT -->
          <b-col lg="5" class="mb-4 mb-lg-0">
            <div class="contact-info-card h-100">
              <div class="contact-image-wrap">
                <b-img
                  src="https://img.magnific.com/free-vector/esports-coaching-abstract-concept_335657-3090.jpg?ga=GA1.1.354852518.1778131747&semt=ais_hybrid&w=740&q=80"
                  fluid
                  alt="Contact BikeOntrack"
                />
              </div>

              <div class="contact-info-content">
                <div class="info-item">
                  <div class="info-icon">
                    <i class="fa-solid fa-phone"></i>
                  </div>

                  <div>
                    <h6>Phone</h6>
                    <p>+91 70798 12442</p>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fa-solid fa-envelope"></i>
                  </div>

                  <div>
                    <h6>Email</h6>
                    <p>support@bikeontrack.com</p>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>

                  <div>
                    <h6>Location</h6>
                    <p>Ranchi, Jharkhand, India</p>
                  </div>
                </div>
              </div>
            </div>
          </b-col>

          <!-- RIGHT -->
          <b-col lg="7">
            <div class="contact-form-card">
              <div class="mb-4">
                <h3 class="form-title">Send A Message</h3>

                <p class="form-subtitle">
                  Fill out the form below and our team will get back to you
                  shortly.
                </p>
              </div>

              <b-form @submit.prevent="handleSubmit">
                <b-row>
                  <!-- NAME -->
                  <b-col md="6">
                    <div class="mb-4">
                      <label class="form-label-app">Full Name</label>

                      <div class="input-icon-wrap">
                        <i class="fa-solid fa-user"></i>

                        <b-form-input
                          v-model="form.name"
                          type="text"
                          placeholder="Enter your full name"
                          class="input-app custom-input"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                  </b-col>

                  <!-- EMAIL -->
                  <b-col md="6">
                    <div class="mb-4">
                      <label class="form-label-app">Email Address</label>

                      <div class="input-icon-wrap">
                        <i class="fa-solid fa-envelope"></i>

                        <b-form-input
                          v-model="form.email"
                          type="email"
                          placeholder="Enter your email"
                          class="input-app custom-input"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                  </b-col>
                </b-row>

                <!-- PHONE -->
                <div class="mb-4">
                  <label class="form-label-app">Phone Number</label>

                  <div class="input-icon-wrap">
                    <i class="fa-solid fa-phone"></i>

                    <b-form-input
                      v-model="form.phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      class="input-app custom-input"
                    ></b-form-input>
                  </div>
                </div>

                <!-- MESSAGE -->
                <div class="mb-4">
                  <label class="form-label-app">Message</label>

                  <div class="textarea-wrap">
                    <b-form-textarea
                      v-model="form.message"
                      rows="5"
                      placeholder="Write your message here..."
                      class="textarea-app"
                      required
                    ></b-form-textarea>
                  </div>
                </div>

                <!-- BUTTON -->
                <button
                  type="submit"
                  class="btn-primary-app btn-lg-app contact-btn"
                >
                  <i class="fa-solid fa-paper-plane"></i>
                  Send Message
                </button>
              </b-form>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- MAP -->
    <section class="section pt-0">
      <b-container>
        <div class="map-card">
          <div class="map-header">
            <h3>Our Location</h3>

            <p>
              Visit BikeOntrack office for support, rentals, and assistance.
            </p>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117223.79900189229!2d85.23892460959367!3d23.343183243026715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104aa5db7dd%3A0xdc09d49d6899f43e!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1778140688423!5m2!1sen!2sin"
            width="100%"
            height="360"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            class="map-frame"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "ContactUs",

  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
    };
  },

  methods: {
    handleSubmit() {
      this.$bvToast.toast("Your message has been sent successfully.", {
        title: "Message Sent",
        variant: "success",
        solid: true,
        autoHideDelay: 2500,
        toaster: "b-toaster-bottom-right",
      });

      this.resetForm();
    },

    resetForm() {
      this.form = {
        name: "",
        email: "",
        phone: "",
        message: "",
      };
    },
  },
};
</script>

<style scoped>
.contact-page {
  background: var(--color-background);
}

/* HERO */
.contact-hero {
  padding-top: 6rem;
  padding-bottom: 2rem;
}

.contact-hero-box {
  text-align: center;
  max-width: 760px;
  margin: auto;
}

.contact-subtitle {
  max-width: 640px;
  margin: auto;
}

/* LEFT CARD */
.contact-info-card {
  background: #fff;
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.contact-image-wrap {
  overflow: hidden;
}

.contact-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.contact-info-content {
  padding: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.info-item h6 {
  font-weight: 700;
  margin-bottom: 4px;
}

.info-item p {
  color: var(--color-gray-500);
  margin-bottom: 0;
}

/* FORM CARD */
.contact-form-card {
  background: #fff;
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-2xl);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  height: 100%;
}

.form-title {
  font-size: 1.7rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: var(--color-gray-500);
  margin-bottom: 0;
}

/* INPUTS */
.input-icon-wrap {
  position: relative;
}

.input-icon-wrap > i {
  position: absolute;
  left: 16px;
  top: 17px;
  color: var(--color-gray-400);
  z-index: 2;
}

.custom-input {
  padding-left: 46px !important;
  height: 52px;
  border-radius: 14px;
}

.textarea-app {
  border-radius: 16px;
  min-height: 140px;
  resize: none;
}

.contact-btn {
  width: 100%;
  justify-content: center;
}

/* MAP */
.map-card {
  background: #fff;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  border: 1px solid var(--color-gray-100);
  box-shadow: var(--shadow-md);
}

.map-header {
  padding: 1.5rem 1.5rem 1rem;
}

.map-header h3 {
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.map-header p {
  color: var(--color-gray-500);
  margin-bottom: 0;
}

.map-frame {
  display: block;
}

/* MOBILE */
@media (max-width: 767px) {
  .contact-form-card {
    padding: 1.5rem;
  }

  .contact-image {
    height: 220px;
  }

  .form-title {
    font-size: 1.4rem;
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
