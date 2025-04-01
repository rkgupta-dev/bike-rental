<template>
  <div>
    <NavBar />
    <!-- Banner Section -->
    <b-jumbotron
      style="margin-top: 3rem"
      header="Bike Rental Service"
      sub-header="Ride Your Dream"
      class="text-white gradient-bg"
    >
      <template>
        <h1 class="display-5">Discover Your Perfect Ride!</h1>
        <p class="lead">
          We offer a variety of bikes to suit all your riding needs. Choose from
          our categories below and start your adventure!
        </p>
        <b-button variant="light" href="#categories">Explore Now</b-button>
      </template>
    </b-jumbotron>

    <!-- Categories Section -->
    <div id="categories" class="container my-5">
      <h2 class="text-center mb-4">Our Categories</h2>
      <b-row class="justify-content-center">
        <b-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="category in categories"
          :key="category.title"
        >
          <b-card
            class="text-center shadow-sm border-1 rounded-lg my-4"
            :to="category.link"
            tag="router-link"
            no-body
          >
            <b-img
              :src="category.image"
              alt="Image"
              class="img-fluid rounded-top"
            />
            <b-card-body class="text-decoration-none">
              <b-card-title
                class="font-weight-bold d-inline-block w-100 text-dark hover-underline"
              >
                {{ category.title }}
              </b-card-title>
              <b-card-text
                class="text-muted d-inline-block w-100 hover-underline"
              >
                {{ category.description }}
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <!-- Testimonials Section -->
    <div class="container my-5">
      <h2 class="text-center my-5">What Our Customers Say</h2>
      <div class="overflow-auto">
        <b-row class="flex-nowrap">
          <b-col
            md="3"
            sm="6"
            class="ml-2"
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            style="flex: 0 0 auto"
          >
            <b-card
              class="d-flex align-items-center"
              style="width: 16rem; height: 10rem"
            >
              <b-img
                :src="testimonial.image"
                alt="Customer Image"
                class="ml-4"
                style="width: 150px; height: 100px"
              ></b-img>
              <b-card-text class="text-center">{{
                testimonial.name
              }}</b-card-text>
              <footer class="blockquote-footer">
                {{ testimonial.comment }}
              </footer>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>

    <!-- Promotional Section -->
    <div class="container text-center my-5">
      <h2>Special Promotion!</h2>
      <p>Book now and get a 10% discount on your first rental!</p>
      <b-button variant="success" href="/special-offer"
        >Claim Your Discount</b-button
      >
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      testimonials: [
        {
          comment: "Amazing experience! The bike was in perfect condition.",
          name: "John Doe",
          image: "",
        },
        {
          comment: "Best rental service I've ever used! Highly recommended!",
          name: "Jane Smith",
          image: "",
        },
        {
          comment: "Great selection and friendly staff!",
          name: "Emily Johnson",
          image: "",
        },
        {
          comment: "Amazing experience! The bike was in perfect condition.",
          name: "John Doe",
          image: "",
        },
        {
          comment: "Best rental service I've ever used! Highly recommended!",
          name: "Jane Smith",
          image: "",
        },
        {
          comment: "Great selection and friendly staff!",
          name: "Emily Johnson",
          image: "",
        },
      ],
      categories: [
        {
          title: "Bikes",
          link: "/bikes",
          description: "Comfortable bikes for city rides.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-decent-blue-metallic-2023-1687260642123.png?q=80",
        },
        {
          title: "Sportbikes",
          link: "/sportsbike",
          description: "High-speed sportbikes for thrill seekers.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-red-1704802630538.png?q=80",
        },
        {
          title: "Scooters",
          link: "/scooter",
          description: "Easy to ride scooters for quick commutes.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80",
        },
        {
          title: "Cruisers",
          link: "/cruiser",
          description: "Stylish cruisers for a laid-back ride.",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/royalenfield-classic-350-heritage1725274941405.jpg?q=80",
        },
      ],
    };
  },
};
</script>

<style scoped>
.gradient-bg {
  background-image: linear-gradient(
    358.4deg,
    rgba(249, 151, 119, 1) -2.1%,
    rgba(98, 58, 162, 1) 90%
  );
}
</style>
