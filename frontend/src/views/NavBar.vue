<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" class="shadow-sm" fixed="top">
      <b-navbar-brand to="/">BikeOntrack</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="custom-navbar">
          <b-nav-item-dropdown text="RENT BY CATEGORIES">
            <b-dropdown-item to="/bikes">Bikes</b-dropdown-item>
            <b-dropdown-item to="/sportsbike">Sportbikes</b-dropdown-item>
            <b-dropdown-item to="/scooter">Scooters</b-dropdown-item>
            <b-dropdown-item to="/cruiser">Cruisers</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/daily-rent">Daily Rent</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto custom-navbar">
          <b-nav-item-dropdown text="Rentals">
            <b-dropdown-item to="/all-model">Fleet</b-dropdown-item>
            <b-dropdown-item to="/how-it-works">How it works</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/blogs">Blogs</b-nav-item>
          <b-nav-item to="/frequently-asked-questions">FAQ</b-nav-item>
          <b-nav-item-dropdown text="Support" right>
            <b-dropdown-item to="/complaint-form">
              <i class="fa fa-exclamation-circle text-secondary"></i> Complaints
            </b-dropdown-item>
            <b-dropdown-item to="/frequently-asked-questions">
              <i class="fa fa-question-circle text-secondary"></i> FAQ?
            </b-dropdown-item>
            <b-dropdown-item to="/about-us">
              <i class="fa fa-info-circle text-secondary"></i> About Us
            </b-dropdown-item>
            <b-dropdown-item to="/contact-us">
              <i class="fa fa-phone text-secondary"></i> Contact Us
            </b-dropdown-item>
            <b-dropdown-item to="/frequently-asked-questions">
              <i class="fa fa-file-contract text-secondary"></i> Terms and
              Conditions
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <div class="text-center">
              <a
                href="https://wa.me/7079812442"
                target="_blank"
                class="text-success mx-3"
              >
                <i class="fab fa-whatsapp fa-lg"></i>
              </a>
              <a href="tel:7079812442" class="text-primary mx-3">
                <i class="fas fa-phone fa-lg"></i>
              </a>
              <a href="mailto:bikeontrack@support.com" class="text-danger mx-3">
                <i class="fas fa-envelope fa-lg"></i>
              </a>
            </div>
          </b-nav-item-dropdown>
          <b-nav-item>
            <b-badge pill variant="light">
              <i class="fa-solid fa-phone"></i> +91 7079812442
            </b-badge>
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content>
              Hii, <em v-if="user">{{ user.name }}</em>
            </template>
            <b-dropdown-item href="#" @click="toggleSidebar"
              ><i class="fa-solid fa-user-cog text-primary"></i>
              Profile</b-dropdown-item
            >
            <b-dropdown-item to="/login">
              <i class="fa-solid fa-right-from-bracket text-danger"></i> Sign
              Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-sidebar v-model="isSidebarOpen" title="My Profile" shadow>
      <b-list-group>
        <b-list-group-item class="bg-light" v-if="user">
          <b-avatar></b-avatar> {{ user.name }}
        </b-list-group-item>
        <b-list-group-item class="bg-light" to="/signup" v-else>
          <a>SignUp or Login</a>
        </b-list-group-item>
        <b-list-group-item to="/my-bookings">
          <i class="fa-solid fa-calendar-check text-success"></i> Bookings
        </b-list-group-item>
        <b-list-group-item to="/rental-history">
          <i class="fa-solid fa-clock-rotate-left text-warning"></i> Rental
          History
        </b-list-group-item>
        <b-list-group-item to="/account-settings">
          <i class="fa-solid fa-user-cog text-primary"></i> Account Settings
        </b-list-group-item>
        <b-list-group-item to="/payment-methods">
          <i class="fa-solid fa-credit-card text-success"></i> Payment Methods
        </b-list-group-item>
        <b-list-group-item to="/notifications">
          <i class="fa-solid fa-bell text-danger"></i> Notifications
        </b-list-group-item>
        <b-list-group-item to="/contact-us">
          <i class="fa-solid fa-headset text-info"></i> Support
        </b-list-group-item>
        <b-list-group-item to="/login">
          <i class="fa-solid fa-right-from-bracket text-danger"></i> Logout
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      user: null, // Store user data
    };
  },
  mounted() {
    // Get the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    // If a user is logged in, set the user data
    if (loggedInUser) {
      this.user = loggedInUser;
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = true;
    },
  },
};
</script>

<style scoped>
.custom-navbar .nav-link {
  color: #f1f1f1; /* Change to your desired color */
  transition: color 0.3s ease;
}
.custom-navbar .nav-link:hover {
  color: #0f0c0e; /* Change on hover */
}
.b-list-group-item {
  cursor: pointer;
}
</style>
