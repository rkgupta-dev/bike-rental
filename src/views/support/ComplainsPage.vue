<template>
  <div>
    <NavBar />
    <h4 class="text-center my-4">Complaints and Feedback</h4>
    <hr />
    <!-- Main Content -->
    <b-container>
      <b-row>
        <b-col md="6">
          <b-img
            src="https://img.freepik.com/free-vector/cancelled-event-concept-illustration_114360-2406.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid"
            style="width: 90%; height: 340px"
            class="my-4"
          >
          </b-img>
        </b-col>

        <!-- Complaint Form -->
        <b-col md="6" class="my-2">
          <b-card title="" class="p-2 shadow-sm">
            <h4 class="text-primary">Complaints? <code>Let us know</code></h4>
            <b-form @submit.prevent="onSubmit">
              <b-form-group label="Full Name:" label-for="name">
                <b-form-input
                  id="name"
                  v-model="form.name"
                  required
                  placeholder="Enter your full name"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Email:" label-for="email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter your email"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Rental ID:" label-for="rentalId">
                <b-form-input
                  id="rentalId"
                  v-model="form.rentalId"
                  placeholder="Enter your rental ID (if applicable)"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Complaint Type:" label-for="complaintType">
                <b-form-select
                  id="complaintType"
                  v-model="form.complaintType"
                  :options="complaintTypes"
                ></b-form-select>
              </b-form-group>

              <b-form-group label="Description:" label-for="description">
                <b-form-textarea
                  id="description"
                  v-model="form.description"
                  placeholder="Please describe your complaint in detail"
                  rows="4"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>

              <b-button type="submit" variant="primary"
                >Submit Complaint</b-button
              >
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
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
      showAlert: false,
      complaintTypes: [
        { value: null, text: "Select complaint type" },
        { value: "bike_condition", text: "Bike Condition" },
        { value: "customer_service", text: "Customer Service" },
        { value: "billing", text: "Billing Issue" },
        { value: "safety", text: "Safety Concern" },
        { value: "other", text: "Other" },
      ],
    };
  },
  methods: {
    onSubmit() {
      // Format the message to send via WhatsApp
      const message = `Complaint Details:
    Full Name: ${this.form.name}
    Email: ${this.form.email}
    Rental ID: ${this.form.rentalId || "N/A"}
    Complaint Type: ${this.form.complaintType || "N/A"}
    Description: ${this.form.description}`;

      // WhatsApp URL with message
      const whatsappURL = `https://wa.me/7079812442?text=${encodeURIComponent(
        message
      )}`;

      // Open WhatsApp with the message
      window.open(whatsappURL, "_blank");

      // Show feedback toast notification
      this.$bvToast.toast(
        "Thank you for your feedback. We will review your complaint and get back to you soon.",
        {
          title: "Feedback Submitted",
          variant: "success",
          solid: true,
          toaster: "b-toaster-top-right", // Position of the toast
          autoHideDelay: 5000, // Duration in milliseconds
        }
      );

      // Reset form fields
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
