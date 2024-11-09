<template>
    <div>
        <b-container fluid class="bg-dark text-light py-4 mt-5">
      <b-row>
        <b-col md="3">
          <h5 class="text-warning">
            <i class="fa-solid fa-motorcycle"></i> BIKEONTRACK
          </h5>
          <p>Explore Your City with Our Bike Rentals.</p>
          <ul class="list-unstyled">
            <li><b-link to="/bikes">Rent Bikes</b-link></li>
            <li><b-link to="/sportsbike">Rent Sports Bikes</b-link></li>
            <li><b-link to="/scooter">Rent Scooters</b-link></li>
            <li><b-link to="/cruiser">Rent Cruisers</b-link></li>
          </ul>
        </b-col>
        <b-col md="3">
          <h5 class="text-uppercase">Quick Links</h5>
          <ul class="list-unstyled">
            <li><b-link href="/">Home</b-link></li>
            <li><b-link to="/blogs">Blogs</b-link></li>
            <li><b-link to="/about-us">About Us</b-link></li>
            <li><b-link to="/contact-us">Contact</b-link></li>
          </ul>
        </b-col>
        <b-col md="3">
          <h5 class="text-uppercase">Customer Service</h5>
          <ul class="list-unstyled">
            <li>
              <b-link to="/frequently-asked-questions">Help and Support</b-link>
            </li>
            <li>
              <b-link to="/frequently-asked-questions"
                >Frequently asked questions</b-link
              >
            </li>
            <li><b-link to="/complaint-form">Complains</b-link></li>
          </ul>
        </b-col>
        <b-col md="3">
          <h5 class="text-uppercase">Stay Connected</h5>
          <div class="my-2 mb-4">
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
          </div>

          <p>
            Experience affordable and hassle-free travel with our two-wheeler
            rentals. Enjoy flexible monthly subscriptions for efficient,
            budget-friendly commuting every day.
          </p>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col class="text-center">
          &copy; 2023 BikeOntrack. All rights reserved.
        </b-col>
      </b-row>
    </b-container>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>