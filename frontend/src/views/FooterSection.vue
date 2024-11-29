<template>
  <div>
    <!-- Footer Section -->
    <b-container fluid class="bg-dark text-light pt-4">
      <b-row>
        <!-- Column 1: Company Info -->
        <b-col md="3">
          <h5 class="text-warning">
            <i class="fa-solid fa-motorcycle"></i> BIKEONTRACK
          </h5>
          <p>
            Discover your city effortlessly with our bike rentals. Enjoy
            freedom, flexibility, and convenience as you explore every corner on
            two wheels.
          </p>
        </b-col>

        <!-- Column 2: Quick Links -->
        <b-col md="3">
          <h5 class="text-uppercase">Quick Links</h5>
          <ul class="list-unstyled">
            <li><b-link href="/">Home</b-link></li>
            <li><b-link to="/rent">Rent</b-link></li>
            <li><b-link to="/blogs">Blogs</b-link></li>
            <li><b-link to="/about-us">About Us</b-link></li>
            <li><b-link to="/contact-us">Contact</b-link></li>
          </ul>
        </b-col>

        <!-- Column 3: Customer Service -->
        <b-col md="3">
          <h5 class="text-uppercase">Customer Service</h5>
          <ul class="list-unstyled">
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

        <!-- Column 4: Newsletter Signup -->
        <b-col md="3">
          <h5 class="text-uppercase">Stay Connected</h5>
          <p>Subscribe to our newsletter for the latest deals and updates.</p>
          <b-form @submit.prevent="subscribe">
            <b-input-group>
              <b-form-input
                placeholder="Enter your email"
                v-model="formData.email"
                type="email"
                required
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" type="submit">
                  <i class="fa-solid fa-paper-plane"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </b-col>
      </b-row>

      <hr class="my-4" />

      <b-row>
        <!-- Social Media Icons -->
        <b-col md="6">
          <b-button variant="outline-light" href="#" class="mr-2">
            <i class="fab fa-facebook-f"></i>
          </b-button>
          <b-button variant="outline-light" href="#" class="mr-2">
            <i class="fab fa-twitter"></i>
          </b-button>
          <b-button variant="outline-light" href="#" class="mr-2">
            <i class="fab fa-instagram"></i>
          </b-button>
          <b-button variant="outline-light" href="#">
            <i class="fab fa-linkedin"></i>
          </b-button>
        </b-col>

        <!-- Footer Credits -->
        <b-col md="6" class="text-md-right">
          <p>&copy; {{ currentYear }} BikeOntrack. All Rights Reserved.</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
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
      alert(`Thank You for subscribing with ${user.email}`);
      this.formData = {
        email: "",
      };
    },
  },
};
</script>

<style scoped></style>
