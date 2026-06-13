<template>
  <div class="section">
    <b-container>
      <b-row class="justify-content-center">
        <b-col lg="7">
          <div class="verify-card">
            <!-- HEADER -->
            <div class="text-center mb-4">
              <h2 class="verify-title">Document Verification</h2>

              <p class="text-muted">
                Verify documents using DigiLocker or upload manually
              </p>
            </div>

            <!-- BOOKING SUMMARY -->
            <div class="booking-summary mb-4" v-if="booking">
              <div class="d-flex align-items-center flex-wrap">
                <img :src="booking.bike.image" class="summary-img" />

                <div class="ml-3">
                  <h5 class="mb-1">
                    {{ booking.bike.name }}
                  </h5>

                  <p class="text-muted mb-1">
                    {{ booking.pickup.location }}
                  </p>

                  <strong> ₹{{ booking.totalPrice }} </strong>
                </div>
              </div>
            </div>

            <!-- FORM -->
            <b-form @submit.prevent="goToCheckout">
              <!-- DIGILOCKER -->
              <div class="digilocker-card mb-4">
                <div class="d-flex align-items-center">
                  <div class="digilocker-icon">
                    <i class="fa-solid fa-shield-halved"></i>
                  </div>

                  <div class="ml-3">
                    <h5 class="mb-1 text-white">DigiLocker Verification</h5>

                    <p class="mb-0 text-white-50">
                      Secure & instant document verification
                    </p>
                  </div>
                </div>

                <div class="verified-badge mt-4" v-if="digilockerVerified">
                  <i class="fa-solid fa-circle-check mr-2"></i>

                  Documents Verified Successfully
                </div>

                <button
                  v-else
                  type="button"
                  class="btn-digilocker mt-4"
                  @click="connectDigilocker"
                  :disabled="digilockerLoading"
                >
                  <span v-if="digilockerLoading">
                    <b-spinner small class="mr-2"></b-spinner>

                    Connecting...
                  </span>

                  <span v-else>
                    <i class="fa-solid fa-link mr-2"></i>

                    Connect DigiLocker
                  </span>
                </button>
              </div>

              <!-- DIVIDER -->
              <div class="divider-area mb-4">
                <span> OR Upload Documents Manually </span>
              </div>

              <!-- DL -->
              <div class="upload-box mb-4">
                <label class="upload-label"> Driving License </label>

                <b-form-file
                  v-model="documents.dl"
                  accept=".jpg,.jpeg,.png,.pdf"
                  placeholder="Upload Driving License"
                  @change="previewFile($event, 'dlPreview')"
                ></b-form-file>

                <!-- PREVIEW -->
                <div v-if="previews.dlPreview" class="preview-box mt-3">
                  <img
                    v-if="previews.dlPreview !== 'application/pdf'"
                    :src="previews.dlPreview"
                    class="preview-image"
                  />

                  <div v-else class="pdf-preview">
                    <i class="fa-solid fa-file-pdf"></i>

                    <span>
                      {{ documents.dl.name }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- ADDRESS -->
              <div class="upload-box mb-4">
                <label class="upload-label"> Aadhaar / PAN Card </label>

                <b-form-file
                  v-model="documents.addressProof"
                  accept=".jpg,.jpeg,.png,.pdf"
                  placeholder="Upload Aadhaar or PAN"
                  @change="previewFile($event, 'addressPreview')"
                ></b-form-file>

                <!-- PREVIEW -->
                <div v-if="previews.addressPreview" class="preview-box mt-3">
                  <img
                    v-if="previews.addressPreview !== 'application/pdf'"
                    :src="previews.addressPreview"
                    class="preview-image"
                  />

                  <div v-else class="pdf-preview">
                    <i class="fa-solid fa-file-pdf"></i>

                    <span>
                      {{ documents.addressProof.name }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- TERMS -->
              <b-form-checkbox v-model="accepted" class="mb-4">
                I confirm all documents are valid and belong to me.
              </b-form-checkbox>

              <!-- BUTTON -->
              <button
                class="btn-primary-app w-100 checkout-btn"
                :disabled="loading"
              >
                <span v-if="loading">
                  <b-spinner small class="mr-2"></b-spinner>

                  Verifying...
                </span>

                <span v-else>
                  <i class="fa-solid fa-angles-right"></i> Continue To Checkout
                </span>
              </button>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      booking: null,

      accepted: false,

      loading: false,

      digilockerLoading: false,

      digilockerVerified: false,

      documents: {
        dl: null,

        addressProof: null,
      },

      previews: {
        dlPreview: "",

        addressPreview: "",
      },
    };
  },

  mounted() {
    const bookingData = localStorage.getItem("bikeBooking");

    if (!bookingData) {
      this.$router.push("/");

      return;
    }

    this.booking = JSON.parse(bookingData);
  },

  methods: {
    previewFile(event, key) {
      const file = event.target.files[0];

      if (!file) return;

      // PDF
      if (file.type === "application/pdf") {
        this.previews[key] = "application/pdf";

        return;
      }

      // IMAGE PREVIEW
      const reader = new FileReader();

      reader.onload = (e) => {
        this.previews[key] = e.target.result;
      };

      reader.readAsDataURL(file);
    },

    connectDigilocker() {
      this.digilockerLoading = true;

      setTimeout(() => {
        this.digilockerLoading = false;

        this.digilockerVerified = true;

        const verificationData = {
          method: "DigiLocker",

          dlName: "Driving License Verified",

          addressProofName: "Aadhaar Verified",

          verified: true,
        };

        localStorage.setItem(
          "verificationData",
          JSON.stringify(verificationData),
        );

        this.$bvToast.toast("Documents verified successfully via DigiLocker", {
          title: "Verification Success",
          variant: "success",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });
      }, 2500);
    },

    goToCheckout() {
      // DIGILOCKER VERIFIED
      if (this.digilockerVerified) {
        this.loading = true;

        setTimeout(() => {
          this.loading = false;

          this.$router.push({
            name: "checkout-page",
          });
        }, 1200);

        return;
      }

      // MANUAL VALIDATION
      if (!this.documents.dl) {
        this.$bvToast.toast("Please upload driving license", {
          title: "Required",
          variant: "warning",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });

        return;
      }

      if (!this.documents.addressProof) {
        this.$bvToast.toast("Please upload address proof", {
          title: "Required",
          variant: "warning",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });

        return;
      }

      if (!this.accepted) {
        this.$bvToast.toast("Please accept terms", {
          title: "Required",
          variant: "warning",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });

        return;
      }

      this.loading = true;

      const verificationData = {
        method: "Manual Upload",

        dlName: this.documents.dl.name,

        addressProofName: this.documents.addressProof.name,

        verified: true,
      };

      localStorage.setItem(
        "verificationData",
        JSON.stringify(verificationData),
      );

      setTimeout(() => {
        this.loading = false;

        this.$router.push({
          name: "checkout-page",
        });
      }, 1500);
    },
  },
};
</script>

<style scoped>
.verify-card {
  background: #fff;
  border-radius: 28px;
  padding: 32px;
  border: 1px solid #eee;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
}

.verify-title {
  font-weight: 700;
}

/* SUMMARY */
.booking-summary {
  background: #f9fafb;
  padding: 20px;
  border-radius: 20px;
}

.summary-img {
  width: 130px;
  height: 90px;
  object-fit: contain;
}

/* DIGILOCKER */
.digilocker-card {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);

  border-radius: 24px;

  padding: 24px;

  color: white;
}

.digilocker-icon {
  width: 62px;
  height: 62px;

  border-radius: 18px;

  background: rgba(255, 255, 255, 0.15);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
}

.btn-digilocker {
  width: 100%;
  border: none;
  height: 52px;
  border-radius: 14px;
  background: white;
  color: #1d4ed8;
  font-weight: 600;
  transition: 0.3s;
}

.btn-digilocker:hover {
  transform: translateY(-2px);
}

.verified-badge {
  background: rgba(255, 255, 255, 0.15);

  border-radius: 14px;

  padding: 14px;

  font-weight: 600;
}

/* DIVIDER */
.divider-area {
  position: relative;
  text-align: center;
}

.divider-area::before {
  content: "";

  position: absolute;

  top: 50%;
  left: 0;

  width: 100%;
  height: 1px;

  background: #e5e7eb;
}

.divider-area span {
  position: relative;

  background: white;

  padding: 0 14px;

  color: #6b7280;

  font-size: 14px;
}

/* UPLOAD */
.upload-box {
  background: #fafafa;

  border: 1px dashed #d1d5db;

  border-radius: 20px;

  padding: 20px;
}

.upload-label {
  display: block;

  margin-bottom: 12px;

  font-weight: 600;
}

/* PREVIEW */
.preview-box {
  background: #fff;

  border-radius: 16px;

  overflow: hidden;

  border: 1px solid #eee;
}

.preview-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.pdf-preview {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 18px;

  color: #dc2626;

  font-weight: 600;
}

.pdf-preview i {
  font-size: 28px;
}

/* MOBILE */
@media (max-width: 768px) {
  .verify-page {
    padding: 20px 0;
  }

  .verify-card {
    padding: 22px;
  }

  .summary-img {
    width: 100px;
    height: 70px;
  }
}

.checkout-btn {
  width: 100%;
  justify-content: center;
}
</style>
