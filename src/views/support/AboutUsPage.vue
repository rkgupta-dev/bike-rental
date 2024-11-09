<template>
  <div>
    <!-- Introduction Section -->
    <b-container fluid class="intro-section">
      <b-row class="text-center text-white py-5">
        <b-col>
          <h2 class="display-4 font-weight-bold mb-4">
            Welcome to BikeOntrack
          </h2>
          <p class="lead mb-4">
            Your trusted partner for bike rentals, offering the best rides for
            your adventures!
          </p>
          <b-button variant="primary" href="#mission">Learn More</b-button>
        </b-col>
      </b-row>
    </b-container>

    <!-- Mission Statement Section -->
    <b-container id="mission" class="my-5">
      <b-row class="text-center">
        <b-col md="6">
          <b-card class="h-100 border-0 shadow-sm p-0">
            <b-img
              src="https://img.freepik.com/free-vector/rockers-concept-illustration_114360-9841.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid"
              alt="Step illustration"
              fluid
              class="rounded"
            ></b-img>
          </b-card>
        </b-col>
        <b-col md="6" class="mt-5">
          <h3 class="font-weight-bold mb-3">Our Mission</h3>
          <p class="lead">
            At BikeOntrack, we are passionate about providing high-quality bikes
            for all your riding needs, ensuring comfort, reliability, and
            adventure. Whether you're looking for an adrenaline rush on a sports
            bike or a leisurely ride on a cruiser, we have the perfect bike to
            match your needs. We believe in delivering not just bikes, but
            experiences—memories that will last long after the ride ends. Our
            goal is to make every ride an unforgettable adventure, with
            unmatched quality and service.
          </p>
        </b-col>
      </b-row>
    </b-container>

    <!-- Our Values Section -->
    <b-container class="my-5">
      <b-card class="h-100 border-0 shadow-sm p-0">
        <b-row>
          <b-col md="4" class="text-center p-4">
            <b-icon
              icon="check-circle"
              class="display-3 text-primary mb-3"
            ></b-icon>
            <h5 class="font-weight-bold mb-2">Customer Focus</h5>
            <p>
              We prioritize our customers' needs, ensuring top-notch service and
              satisfaction.
            </p>
          </b-col>
          <b-col md="4" class="text-center p-4">
            <b-icon
              icon="shield-lock"
              class="display-3 text-primary mb-3"
            ></b-icon>
            <h5 class="font-weight-bold mb-2">Safety First</h5>
            <p>
              Safety is our top priority, ensuring all bikes are well-maintained
              and roadworthy.
            </p>
          </b-col>
          <b-col md="4" class="text-center p-4">
            <b-icon icon="star" class="display-3 text-primary mb-3"></b-icon>
            <h5 class="font-weight-bold mb-2">Quality Rides</h5>
            <p>
              Only the best bikes for the best experiences, from sports bikes to
              cruisers.
            </p>
          </b-col>
        </b-row>
      </b-card>
    </b-container>

    <!-- Our Team Section -->
    <b-container class="my-5">
      <b-row class="text-center">
        <b-col>
          <h3 class="font-weight-bold mb-4">Meet Our Team</h3>
          <p class="lead mb-5">
            Our dedicated team works hard to ensure you have the best bike
            rental experience.
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" class="text-center p-4">
          <b-img
            src="https://media.licdn.com/dms/image/v2/D5603AQGTA6zhKq8uSA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1727696827510?e=1736380800&v=beta&t=JW9LlDZwoVCycyXIMiVvoVJEZzabpx0oa6rWm2Wym8o"
            alt="Team Member 1"
            rounded-circle
            class="img-fluid mb-3"
          ></b-img>
          <h5>Rohit Kr. Gupta</h5>
          <p>CEO & Founder</p>
        </b-col>
        <b-col md="4" class="text-center p-4">
          <b-img
            src="https://media.licdn.com/dms/image/v2/D4E03AQFX_8WluBwkGQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1712950005824?e=1736380800&v=beta&t=y91WtmJ6oaOIPxGgd9MHBPl4gOtFodc08ft5HNgxCMg"
            alt="Team Member 2"
            rounded-circle
            class="img-fluid mb-3"
          ></b-img>
          <h5>Divisha Jain</h5>
          <p>Operations Manager</p>
        </b-col>
        <b-col md="4" class="text-center p-4">
          <b-img
            src="https://media.licdn.com/dms/image/v2/C5603AQG89Rwlb6MiCQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1658983866670?e=1736380800&v=beta&t=EqEHeJofAhL-nenqVoQtJus6Xz3gFj5SVxE-Vglo5Iw"
            alt="Team Member 3"
            rounded-circle
            class="img-fluid mb-3"
          ></b-img>
          <h5>Shilton Rodrigues</h5>
          <p>Customer Support</p>
        </b-col>
      </b-row>
    </b-container>

    <!-- Contact Information Section -->
    <b-container class="my-5 text-center">
      <h3 class="font-weight-bold mb-3">Get In Touch</h3>
      <p class="lead mb-4">
        If you have any questions or need more information, feel free to reach
        out to us!
      </p>
      <b-button variant="primary" to="/contact-us"
        >Contact Us</b-button
      >
    </b-container>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
/* Introduction section background image */
.intro-section {
  background-image: radial-gradient(
    circle 382px at 50% 50.2%,
    rgba(73, 76, 212, 1) 0.1%,
    rgba(3, 1, 50, 1) 100.2%
  );
  background-size: cover;
}

/* Typography styling for headings */
h2,
h3 {
  font-family: "Roboto", sans-serif;
}

/* Button hover effect */
.b-button:hover {
  background-color: #0069d9;
  transform: scale(1.05);
  transition: 0.3s ease;
}

/* Card hover effect */
.b-col:hover {
  transform: scale(1.05);
  transition: 0.3s ease;
}

/* Responsiveness for mobile devices */
@media (max-width: 768px) {
  .intro-section {
    padding: 4rem 2rem;
  }
}
</style>
