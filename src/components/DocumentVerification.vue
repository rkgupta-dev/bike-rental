<template>
  <div>
    <NavBar />
    <h2 class="text-center header-title" style="margin-top: 5rem">
      Document Verification
    </h2>
    <b-container>
      <b-row>
        <b-col md="6" class="my-4">
          <b-card title="Submit Document for Verification" class="h-100">
            <b-form @submit.prevent="submitDocument">
              <b-form-group
                id="input-group-1"
                label="Document Type:"
                label-for="input-1"
              >
                <b-form-select
                  id="input-1"
                  v-model="form.documentType"
                  :options="documentTypes"
                  required
                ></b-form-select>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Document Number:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.documentNumber"
                  required
                  placeholder="Enter document number"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Full Name:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.fullName"
                  required
                  placeholder="Enter your full name"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Date of Birth:"
                label-for="input-4"
              >
                <b-form-datepicker
                  id="input-4"
                  v-model="form.dateOfBirth"
                  required
                ></b-form-datepicker>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Upload Document Image:"
                label-for="input-5"
              >
                <b-form-file
                  id="input-5"
                  @change="onFileChange($event, 'documentImage')"
                  required
                  placeholder="Choose a document image"
                ></b-form-file>
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Upload Passport Size Photo:"
                label-for="input-6"
              >
                <b-form-file
                  id="input-6"
                  @change="onFileChange($event, 'passportPhoto')"
                  required
                  placeholder="Choose a passport-size photo"
                ></b-form-file>
              </b-form-group>

              <b-button type="submit" variant="primary" class="w-100"
                >Submit for Verification</b-button
              >
            </b-form>
          </b-card>
        </b-col>

        <b-col md="6" class="my-4">
          <b-card title="Verification Status" class="h-100">
            <div v-if="verificationStatus">
              <b-alert :variant="verificationStatus.variant" show>
                {{ verificationStatus.message }}
              </b-alert>
              <b-list-group v-if="verificationStatus.variant === 'success'">
                <b-list-group-item
                  ><strong>Document Type:</strong>
                  {{ form.documentType }}</b-list-group-item
                >
                <b-list-group-item
                  ><strong>Document Number:</strong>
                  {{ form.documentNumber }}</b-list-group-item
                >
                <b-list-group-item
                  ><strong>Full Name:</strong>
                  {{ form.fullName }}</b-list-group-item
                >
                <b-list-group-item
                  ><strong>Date of Birth:</strong>
                  {{ form.dateOfBirth }}</b-list-group-item
                >
                <b-list-group-item>
                  <strong>Document Image:</strong><br />
                  <img
                    :src="form.documentImage"
                    alt="Document Image"
                    class="img-fluid mt-2"
                  />
                </b-list-group-item>
                <b-list-group-item>
                  <strong>Passport Photo:</strong><br />
                  <img
                    :src="form.passportPhoto"
                    alt="Passport Photo"
                    class="img-fluid mt-2"
                  />
                </b-list-group-item>
              </b-list-group>
            </div>
            <p v-else class="text-muted">
              Submit a document for verification to see the status here.
            </p>
          </b-card>
        </b-col>
      </b-row>

      <div class="text-center my-4">
        <b-button
          variant="success"
          class="btn-wide"
          @click="goToCheckout"
          :disabled="!isVerified"
        >
          Next
        </b-button>
      </div>
    </b-container>
    <FooterSectionA />
  </div>
</template>

<script>
import FooterSectionA from "@/views/FooterSectionA.vue";
import NavBar from "@/views/NavBar.vue";

export default {
  components: {
    FooterSectionA,
    NavBar,
  },
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
        { value: "passport", text: "Passport" },
        { value: "driverLicense", text: "Driver's License" },
        { value: "nationalId", text: "National ID" },
      ],
      verificationStatus: null,
    };
  },
  computed: {
    isVerified() {
      return (
        this.verificationStatus && this.verificationStatus.variant === "success"
      );
    },
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
    submitDocument() {
      this.verificationStatus = {
        variant: "warning",
        message: "Verifying document...",
      };

      setTimeout(() => {
        const isVerified = Math.random() < 0.7;

        if (isVerified) {
          this.verificationStatus = {
            variant: "success",
            message: "Document verified successfully!",
          };
        } else {
          this.verificationStatus = {
            variant: "danger",
            message:
              "Document verification failed. Please check your information and try again.",
          };
        }
      }, 3000);
    },
  },
};
</script>

<style scoped>
.img-fluid {
  max-width: 100px; /* Adjust the image size as needed */
  height: auto;
}
.text-center .btn-wide {
  width: 200px; /* Adjust width as needed */
}
</style>
