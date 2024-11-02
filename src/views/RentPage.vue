<template>
  <div>
    <!-- Banner Section -->
    <b-jumbotron
      header="Bike Rental Service"
      sub-header="Ride Your Dream"
      class="text-white"
      style="
        background-image: linear-gradient(358.4deg,rgba(249, 151, 119, 1) -2.1%,rgba(98, 58, 162, 1) 90%);"
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
      <b-row>
        <b-col
          md="3"
          v-for="category in categories"
          :key="category.title"
          class="mb-4"
        >
          <b-card
            :title="category.title"
            :img-src="category.image"
            img-alt="Category Image"
            img-top
            class="text-center"
            style="height: 100%"
          >
            <b-card-text>
              {{ category.description }}
            </b-card-text>
            <b-button variant="primary" :href="category.link"
              >View {{ category.title }}</b-button
            >
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
              class=" d-flex  align-items-center"
              style="width: 16rem; height: 16rem"
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
              <footer class="blockquote-footer">{{ testimonial.comment }}</footer>
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
export default {
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

<style scoped></style>
