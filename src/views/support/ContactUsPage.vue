<template>
  <div>
    <!-- Contact Us Header Section -->
    <b-container class="my-4 text-center">
      <h2 class="font-weight-bold text-primary">Contact Us</h2>
      <p class="lead text-muted">
        Have questions or want to reach out? We're here to assist you with
        anything you need. Feel free to drop us a message!
      </p>
    </b-container>

    <!-- Contact Form Section -->
    <b-container class="my-5">
      <b-row>
        <b-col md="6">
          <b-card
            class="h-100 border-0 shadow-sm p-0"
            style="border-radius: 20px"
          >
            <b-img
              src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-3147.jpg?t=st=1731152396~exp=1731155996~hmac=d9b30a14e1591c2d8c8ee4d5ce5c5f71d2c8cb202ecd64313c2e5e52cc350553&w=740"
              alt="Step illustration"
              fluid
              class="rounded"
            ></b-img>
          </b-card>
        </b-col>
        <b-col md="6" class="mt-2">
          <b-card
            class="shadow-lg"
            style="border-radius: 20px; background-color: #f7f7f7"
          >
            <b-form @submit.prevent="handleSubmit">
              <b-form-group label="Full Name" label-for="name">
                <b-form-input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  class="rounded-pill"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Email Address" label-for="email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  class="rounded-pill"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Phone Number" label-for="phone">
                <b-form-input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  class="rounded-pill"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Message" label-for="message">
                <b-form-textarea
                  id="message"
                  v-model="form.message"
                  required
                  placeholder="Write your message"
                  rows="5"
                  class=""
                ></b-form-textarea>
              </b-form-group>

              <b-button variant="primary" type="submit" class="w-100 py-2">
                Send Message
              </b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Google Maps Location Section -->
    <b-container class="my-5">
      <b-row>
        <b-col md="12">
          <h4 class="font-weight-bold text-primary text-center my-4">
            Our Location
          </h4>
          <!-- Google Maps Embed -->
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58231.698403573646!2d86.24825000335989!3d24.189922759679877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f155d71e2ff95d%3A0xa5bea10ff8ed8188!2sGiridih%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1731152771904!5m2!1sen!2sin"
            width="100%"
            height="300"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  components: {},
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
      // Handle form submission (e.g., send email or store data)
      alert("Your message has been sent!");
      this.resetForm();
    },
    resetForm() {
      this.form.name = "";
      this.form.email = "";
      this.form.phone = "";
      this.form.message = "";
    },
  },
};
</script>

<style scoped>
/* Custom Styling */
.text-muted {
  color: #6c757d !important;
}

.text-primary {
  color: #007bff !important;
}

.text-danger {
  color: #dc3545 !important;
}

.text-success {
  color: #28a745 !important;
}

.font-weight-bold {
  font-weight: 600;
}

.hover-effect:hover {
  transform: scale(1.2);
  transition: transform 0.3s ease;
}

.w-100 {
  width: 100%;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.shadow-lg {
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

.rounded-pill {
  border-radius: 50px;
}
</style>
