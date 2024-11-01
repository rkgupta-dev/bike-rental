<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary" sticky="top">
        <b-navbar-brand href="#">BikeOntrack</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item-dropdown text="RENT BY CATEGORIES">
              <b-dropdown-item to="/bikes">Bikes</b-dropdown-item>
              <b-dropdown-item to="/sportsbike">Sportbikes</b-dropdown-item>
              <b-dropdown-item href="#">Scooters</b-dropdown-item>
              <b-dropdown-item href="#">Cruisers</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>Rohit Kr. Gupta</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>