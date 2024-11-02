<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" sticky-top>
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
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto custom-navbar">
          <b-nav-item href="#">Rentals</b-nav-item>
          <b-nav-item href="#">Blog</b-nav-item>
          <b-nav-item href="#">FAQ</b-nav-item>
          <b-nav-item href="#">Support</b-nav-item>
          <b-nav-item>
            <b-badge pill variant="light">
              <i class="fa-solid fa-phone"></i> +91 7079812442
            </b-badge>
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content> Hii, <em>Rohit Kr. Gupta</em> </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.custom-navbar .nav-link {
  color: #f1f1f1; /* Change to your desired color */
  transition: color 0.3s ease;
}

.custom-navbar .nav-link:hover {
  color: #0f0c0e; /* Change on hover */
}
</style>
