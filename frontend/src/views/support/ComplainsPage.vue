<template>
  <div class="feedback-page">
    <NavBar />

    <section class="section">
      <b-container>
        <div class="listing-top-area">
          <b-breadcrumb class="custom-breadcrumb">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/complaint-form" active
              >Complaint</b-breadcrumb-item
            >
          </b-breadcrumb>
        </div>
        <b-row class="justify-content-center">
          <b-col xl="10">
            <div class="feedback-layout">
              <!-- left -->
              <div class="feedback-side">
                <div class="support-top">
                  <div class="support-icon">
                    <i class="fa-solid fa-headset"></i>
                  </div>

                  <h3 class="text-white">Need Assistance?</h3>

                  <p>
                    Facing issues with booking, payments, delivery, or bike
                    condition? We’re here to help.
                  </p>
                </div>

                <div class="support-points">
                  <div class="point-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>24/7 customer support</span>
                  </div>

                  <div class="point-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>Quick complaint resolution</span>
                  </div>

                  <div class="point-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>Transparent communication</span>
                  </div>

                  <div class="point-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>Trusted by thousands of riders</span>
                  </div>
                </div>

                <b-img
                  src="https://img.freepik.com/free-vector/customer-support-flat-design-illustration_23-2148887720.jpg"
                  fluid
                  class="support-image"
                ></b-img>
              </div>

              <!-- right -->
              <div class="feedback-form-card">
                <div class="form-top">
                  <h3>Submit Your Complaint</h3>

                  <p>
                    Fill out the form below and our team will get back to you.
                  </p>
                </div>

                <b-form @submit.prevent="onSubmit">
                  <!-- row -->
                  <b-row>
                    <b-col md="6">
                      <div class="mb-4">
                        <label class="form-label-app"> Full Name </label>

                        <div class="modern-input">
                          <i class="fa-solid fa-user"></i>

                          <b-form-input
                            v-model="form.name"
                            placeholder="Enter full name"
                            class="input-app custom-input"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                    </b-col>

                    <b-col md="6">
                      <div class="mb-4">
                        <label class="form-label-app"> Email Address </label>

                        <div class="modern-input">
                          <i class="fa-solid fa-envelope"></i>

                          <b-form-input
                            v-model="form.email"
                            type="email"
                            placeholder="Enter email address"
                            class="input-app custom-input"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <!-- rental -->
                  <div class="mb-4">
                    <label class="form-label-app"> Rental ID </label>

                    <div class="modern-input">
                      <i class="fa-solid fa-ticket"></i>

                      <b-form-input
                        v-model="form.rentalId"
                        placeholder="Enter rental ID"
                        class="input-app custom-input"
                      ></b-form-input>
                    </div>
                  </div>

                  <!-- type -->
                  <div class="mb-4">
                    <label class="form-label-app"> Complaint Type </label>

                    <div class="modern-input">
                      <i class="fa-solid fa-circle-exclamation"></i>

                      <b-form-select
                        v-model="form.complaintType"
                        :options="complaintTypes"
                        class="input-app custom-input"
                      ></b-form-select>
                    </div>
                  </div>

                  <!-- message -->
                  <div class="mb-4">
                    <label class="form-label-app"> Description </label>

                    <div class="modern-input textarea-parent">
                      <i class="fa-solid fa-message"></i>

                      <b-form-textarea
                        v-model="form.description"
                        rows="5"
                        placeholder="Write your complaint here..."
                        class="input-app custom-input textarea-input"
                        required
                      ></b-form-textarea>
                    </div>
                  </div>

                  <!-- button -->
                  <button
                    type="submit"
                    class="btn-primary-app btn-lg-app submit-btn"
                  >
                    <i class="fa-solid fa-paper-plane"></i>
                    Send Complaint
                  </button>
                </b-form>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import NavBar from "@/views/NavBar.vue";

export default {
  components: {
    NavBar,
  },

  data() {
    return {
      form: {
        name: "",
        email: "",
        rentalId: "",
        complaintType: null,
        description: "",
      },

      complaintTypes: [
        { value: null, text: "Select complaint type" },
        { value: "bike_condition", text: "Bike Condition" },
        { value: "customer_service", text: "Customer Service" },
        { value: "billing", text: "Billing Issue" },
        { value: "safety", text: "Safety Concern" },
        { value: "delivery", text: "Delivery Delay" },
        { value: "other", text: "Other" },
      ],
    };
  },

  methods: {
    onSubmit() {
      const message = `
Complaint Details

Name: ${this.form.name}
Email: ${this.form.email}
Rental ID: ${this.form.rentalId || "N/A"}
Complaint Type: ${this.form.complaintType || "N/A"}

Description:
${this.form.description}
      `;

      const whatsappURL = `https://wa.me/7079812442?text=${encodeURIComponent(
        message,
      )}`;

      window.open(whatsappURL, "_blank");

      this.$bvToast.toast("Complaint submitted successfully.", {
        title: "Success",
        variant: "success",
        solid: true,
        toaster: "b-toaster-bottom-right",
        autoHideDelay: 3000,
      });

      this.form = {
        name: "",
        email: "",
        rentalId: "",
        complaintType: null,
        description: "",
      };
    },
  },
};
</script>

<style scoped>
.feedback-page {
  background: var(--color-gray-50);
  min-height: 100vh;
}

.feedback-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  background: #fff;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-gray-100);
}

.feedback-side {
  background: var(--color-primary);
  color: white;
  padding: 2.5rem;
  position: relative;
}

.support-top h3 {
  font-size: 1.8rem;
  font-weight: var(--font-bold);
  margin-bottom: 14px;
}

.support-top p {
  opacity: 0.9;
  line-height: 1.7;
}

.support-icon {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 1.6rem;
}

.support-points {
  margin-top: 2rem;
}

.point-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.point-item i {
  color: #fff;
}

.support-image {
  margin-top: 2rem;
  border-radius: var(--radius-xl);
}

.feedback-form-card {
  padding: 2.5rem;
}

.form-top {
  margin-bottom: 2rem;
}

.form-top h3 {
  font-size: 2rem;
  font-weight: var(--font-bold);
  margin-bottom: 10px;
}

.form-top p {
  color: var(--color-gray-500);
  margin-bottom: 0;
}

.modern-input {
  position: relative;
}

.modern-input > i {
  position: absolute;
  left: 16px;
  top: 17px;
  color: var(--color-gray-400);
  z-index: 2;
}

.custom-input {
  min-height: 52px;
  padding-left: 46px !important;
  border-radius: 14px;
}

.textarea-parent i {
  top: 18px;
}

.textarea-input {
  padding-top: 14px !important;
  resize: none;
}

.submit-btn {
  width: 100%;
  justify-content: center;
}

@media (max-width: 991px) {
  .feedback-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 575px) {
  .feedback-side,
  .feedback-form-card {
    padding: 1.5rem;
  }

  .form-top h3 {
    font-size: 1.6rem;
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
