<template>
  <div>
    <section class="section gradient-light verify-page">
      <b-container>
        <!-- STEP HEADER -->
        <div class="kyc-step-header mb-5">
          <div class="step-item active">
            <div class="step-circle">1</div>
            <span>Choose Bike</span>
          </div>

          <div class="step-line active"></div>

          <div class="step-item active">
            <div class="step-circle">2</div>
            <span>KYC</span>
          </div>

          <div class="step-line active"></div>

          <div class="step-item">
            <div class="step-circle">3</div>
            <span>Checkout</span>
          </div>
        </div>

        <b-row>
          <!-- LEFT FORM -->
          <b-col lg="7" class="mb-4">
            <div class="card-app shadow-lg verify-form-card">
              <h4 class="mb-4 font-bold">Submit Your Verification Details</h4>

              <b-form @submit.prevent="submitDocument">
                <div class="mb-4">
                  <label class="form-label-app">Document Type</label>
                  <div class="input-icon-wrap">
                    <i class="fa-solid fa-address-card"></i>
                    <b-form-select
                      v-model="form.documentType"
                      :options="documentTypes"
                      class="custom-input"
                      required
                    ></b-form-select>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="form-label-app">Document Number</label>
                  <div class="input-icon-wrap">
                    <i class="fa-solid fa-id-card"></i>
                    <b-form-input
                      v-model="form.documentNumber"
                      placeholder="Enter document number"
                      class="custom-input"
                      required
                    ></b-form-input>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="form-label-app">Full Name</label>
                  <div class="input-icon-wrap">
                    <i class="fa-solid fa-user"></i>
                    <b-form-input
                      v-model="form.fullName"
                      placeholder="Enter your full name"
                      class="custom-input"
                      required
                    ></b-form-input>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="form-label-app">Date of Birth</label>
                  <div class="input-icon-wrap">
                    <i class="fa-solid fa-calendar"></i>
                    <b-form-input
                      v-model="form.dateOfBirth"
                      placeholder="dd/mm/yyyy"
                      class="custom-input"
                      required
                    ></b-form-input>
                  </div>
                  <!-- <b-form-datepicker
                    v-model="form.dateOfBirth"
                    class="custom-input"
                    required
                  ></b-form-datepicker> -->
                </div>

                <b-row>
                  <b-col md="6" class="mb-4">
                    <label class="form-label-app">Upload Document</label>
                    <div class="upload-box" @click="$refs.docFile.click()">
                      <input
                        type="file"
                        ref="docFile"
                        hidden
                        @change="onFileChange($event, 'documentImage')"
                      />

                      <div v-if="!form.documentImage" class="upload-content">
                        <i class="fa-solid fa-file-arrow-up"></i>
                        <p>Choose Document</p>
                        <small>PNG, JPG or PDF</small>
                      </div>

                      <div v-else class="image-preview-wrap">
                        <img :src="form.documentImage" class="preview-thumb" />
                        <div class="img-overlay">
                          <i class="fa-solid fa-pen"></i>
                          Change
                        </div>
                      </div>
                    </div>
                  </b-col>

                  <b-col md="6" class="mb-4">
                    <label class="form-label-app">Passport Photo</label>
                    <div class="upload-box" @click="$refs.passFile.click()">
                      <input
                        type="file"
                        ref="passFile"
                        hidden
                        @change="onFileChange($event, 'passportPhoto')"
                      />

                      <div v-if="!form.passportPhoto" class="upload-content">
                        <i class="fa-solid fa-camera"></i>
                        <p>Choose Photo</p>
                        <small>Passport Size Image</small>
                      </div>

                      <div v-else class="image-preview-wrap">
                        <img :src="form.passportPhoto" class="preview-thumb" />
                        <div class="img-overlay">
                          <i class="fa-solid fa-pen"></i>
                          Change
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>

                <button
                  type="submit"
                  class="btn-primary-app btn-lg-app w-100 justify-content-center"
                  :disabled="isLoading"
                >
                  <span v-if="!isLoading">
                    <i class="fa-solid fa-shield"></i>
                    Verify My Document
                  </span>

                  <span v-else>
                    <i class="fa-solid fa-spinner animate-spin"></i>
                    Verifying...
                  </span>
                </button>
              </b-form>
            </div>
          </b-col>

          <!-- RIGHT STATUS -->
          <b-col lg="5" class="mb-4">
            <div class="card-app shadow-lg verify-status-card">
              <h4 class="mb-4 font-bold">Verification Status</h4>

              <div v-if="!verificationStatus" class="empty-status">
                <i class="fa-solid fa-file-shield"></i>
                <p>
                  Your submitted details will appear here after verification.
                </p>
              </div>

              <div
                v-else-if="verificationStatus.variant === 'warning'"
                class="status-processing"
              >
                <div class="loader-ring"></div>
                <h5>AI Verification In Progress</h5>

                <div class="scan-percent">{{ scanProgress }}%</div>

                <div class="progress-track">
                  <div
                    class="progress-fill"
                    :style="{ width: scanProgress + '%' }"
                  ></div>
                </div>

                <p v-if="scanProgress < 35">
                  Scanning document authenticity...
                </p>
                <p v-else-if="scanProgress < 70">
                  Matching personal details...
                </p>
                <p v-else>Validating uploaded face image...</p>
              </div>

              <div
                v-else-if="verificationStatus.variant === 'success'"
                class="status-success"
              >
                <span class="badge-app badge-success mb-3"
                  >✔ Verified Successfully</span
                >

                <div class="verified-user-box">
                  <div class="verified-line">
                    <span>Document Type</span>
                    <strong>{{ form.documentType }}</strong>
                  </div>

                  <div class="verified-line">
                    <span>Document Number</span>
                    <strong>{{ form.documentNumber }}</strong>
                  </div>

                  <div class="verified-line">
                    <span>Full Name</span>
                    <strong>{{ form.fullName }}</strong>
                  </div>

                  <div class="verified-line">
                    <span>Date of Birth</span>
                    <strong>{{ form.dateOfBirth }}</strong>
                  </div>
                </div>

                <button
                  class="btn-primary-app btn-lg-app w-100 justify-content-center mt-4"
                  @click="goToCheckout"
                >
                  <i class="fa-solid fa-angles-right"></i> Continue To Checkout
                </button>
              </div>

              <div v-else class="status-fail">
                <span class="badge-app badge-danger mb-3"
                  >Verification Failed</span
                >
                <p>{{ verificationStatus.message }}</p>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    bike: {
      type: Object,
      required: false,
      default() {
        return {
          name: this.$route.query.name,
          image: this.$route.query.image,
          price: parseFloat(this.$route.query.price) || 0,
          originalPrice: parseFloat(this.$route.query.originalPrice) || 0,
        };
      },
    },
  },

  data() {
    return {
      isLoading: false,
      scanProgress: 0,
      scanInterval: null,
      form: {
        documentType: null,
        documentNumber: "",
        fullName: "",
        dateOfBirth: "",
        documentImage: null,
        passportPhoto: null,
      },
      documentTypes: [
        { value: null, text: "Select document type" },
        { value: "Passport", text: "Passport" },
        { value: "Driver License", text: "Driver License" },
        { value: "Aadhar Card", text: "Aadhar Card" },
      ],
      verificationStatus: null,
    };
  },

  methods: {
    goToCheckout() {
      this.$router.push({
        name: "Checkout",
        query: {
          name: this.bike.name,
          image: this.bike.image,
          price: this.bike.price,
          originalPrice: this.bike.originalPrice,
        },
      });
    },

    onFileChange(event, type) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form[type] = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    validateForm() {
      const errors = [];

      if (!/^\d{10,}$/.test(this.form.documentNumber)) {
        errors.push("Document number should be minimum 10 digits.");
      }

      const dob = new Date(this.form.dateOfBirth);
      const today = new Date();

      const age =
        today.getFullYear() -
        dob.getFullYear() -
        (today < new Date(dob.setFullYear(today.getFullYear())) ? 1 : 0);

      if (age < 18) {
        errors.push("Minimum age should be 18 years.");
      }

      if (!this.form.documentImage || !this.form.passportPhoto) {
        errors.push("Please upload all required images.");
      }

      return errors;
    },

    submitDocument() {
      const errors = this.validateForm();

      if (errors.length > 0) {
        this.$bvToast.toast(errors.join(" "), {
          title: "Verification Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
          toaster: "b-toaster-bottom-right",
        });
        return;
      }

      this.isLoading = true;
      this.scanProgress = 0;

      this.verificationStatus = {
        variant: "warning",
      };

      this.scanInterval = setInterval(() => {
        if (this.scanProgress < 95) {
          this.scanProgress += 5;
        }
      }, 150);

      setTimeout(() => {
        clearInterval(this.scanInterval);
        this.scanProgress = 100;
        this.isLoading = false;

        const approved = Math.random() < 0.85;

        if (approved) {
          this.verificationStatus = {
            variant: "success",
            message: "Document verified successfully",
          };

          this.$bvToast.toast("Your KYC verification completed successfully.", {
            title: "Verified",
            variant: "success",
            solid: true,
            autoHideDelay: 2500,
            toaster: "b-toaster-bottom-right",
          });
        } else {
          this.verificationStatus = {
            variant: "danger",
            message:
              "Uploaded details did not match verification standards. Please re-upload clear images.",
          };

          this.$bvToast.toast(
            "Verification failed. Please upload valid details.",
            {
              title: "Verification Failed",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000,
              toaster: "b-toaster-bottom-right",
            },
          );
        }
      }, 3200);
    },
  },
};
</script>

<style scoped>
.verify-page {
  min-height: 100vh;
}

.verify-form-card,
.verify-status-card {
  height: 100%;
  border-radius: var(--radius-2xl);
}

.kyc-step-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-gray-400);
}

.step-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-gray-200);
  color: var(--color-gray-500);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.step-line {
  width: 45px;
  height: 2px;
  background: var(--color-gray-200);
  transition: 0.3s;
}

/* active state */
.step-item.active {
  color: var(--color-primary);
}

.step-item.active .step-circle {
  background: var(--color-primary);
  color: #fff;
}

.step-line.active {
  background: var(--color-primary);
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

@media (max-width: 575px) {
  .step-item span {
    font-size: 10px;
  }
  .step-line {
    width: 18px;
  }
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

.upload-box {
  height: 150px;
  border: 2px dashed var(--color-gray-200);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  background: var(--color-gray-50);
  transition: var(--transition-base);
  overflow: hidden;
}

.upload-box:hover {
  border-color: var(--color-primary);
}

.upload-content p {
  margin: 8px 0 2px;
  font-weight: 600;
}

.upload-content small {
  color: var(--color-gray-400);
}

.upload-content i {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.image-preview-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  opacity: 0;
  transition: 0.3s;
}

.image-preview-wrap:hover .img-overlay {
  opacity: 1;
}

.empty-status,
.status-processing,
.status-success,
.status-fail {
  text-align: center;
  padding: 2rem 1rem;
}

.empty-status i {
  font-size: 3rem;
  color: var(--color-gray-300);
  margin-bottom: 1rem;
}

.loader-ring {
  width: 55px;
  height: 55px;
  border: 4px solid #ddd;
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  margin: auto;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.scan-percent {
  font-size: 28px;
  font-weight: bold;
  color: var(--color-primary);
  margin: 12px 0;
}

.progress-track {
  width: 100%;
  height: 8px;
  border-radius: 30px;
  background: var(--color-gray-100);
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  transition: 0.2s;
}

.verified-user-box {
  margin-top: 1rem;
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.verified-line {
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-gray-100);
  font-size: 14px;
}

.verified-line:last-child {
  border-bottom: none;
}

.verified-line span {
  color: var(--color-gray-500);
}

.status-fail p {
  font-size: 14px;
  color: var(--color-gray-500);
  margin-top: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 575px) {
  .step-line {
    width: 20px;
  }
}
</style>
