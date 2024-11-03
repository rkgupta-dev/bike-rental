<template>
  <div>
    <NavBar />
    <h3 class="text-center my-4 header-title">BikeOntrack Blog</h3>
    <hr />
    <b-container>
      <b-row>
        <!-- Sidebar -->
        <b-col lg="4">
          <b-card class="my-4">
            <h4>Categories</h4>
            <b-list-group>
              <b-list-group-item
                v-for="category in categories"
                :key="category"
                @click="filterPosts(category)"
              >
                {{ category }}
              </b-list-group-item>
            </b-list-group>
          </b-card>

          <b-card>
            <h4>Recent Posts</h4>
            <b-list-group>
              <b-list-group-item v-for="post in recentPosts" :key="post.id">
                {{ post.title }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>

        <!-- Blog Posts -->
        <b-col lg="8" class="my-4">
          <b-card id="blog-posts" style="height: 620px; overflow-y: auto">
            <b-card
              v-for="post in filteredPosts"
              :key="post.id"
              :title="post.title"
              :img-src="post.image"
              :img-alt="post.title"
              img-top
              class="my-2"
            >
              <b-card-text>{{ post.excerpt }}</b-card-text>
              <small class="text-muted">{{ post.date }}</small>
              <!-- Display date here --><br>
              <b-button size="sm" href="#" variant="primary" class="mt-3">Read More</b-button>
            </b-card>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Footer -->
    <b-container fluid class="bg-dark text-light py-4 mt-5">
      <b-row>
        <b-col class="text-center">
          &copy; 2023 BikeOntrack. All rights reserved.
        </b-col>
      </b-row>
    </b-container>
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
      blogPosts: [
        {
          id: 1,
          title: "Top 5 Scenic Bike Routes in the India",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRes0Kh0ENXWgnUThf3kiTMHqioTydf6gRBCg&s",
          excerpt:
            "Discover the most beautiful cycling paths our city has to offer. From riverside trails to mountain views, these routes will take your breath away.",
          category: "Bike Routes",
          date: "Oct 30, 2024 10:50 PM",
        },
        {
          id: 2,
          title: "Bike Maintenance 101: Keep Your Ride Smooth",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8fosk_DULlmQ5j31PMUW9TgfSMArDQ_gE0w&s",
          excerpt:
            "Learn essential bike maintenance tips to keep your two-wheeler in top condition. From cleaning to tuning, we've got you covered.",
          category: "Maintenance Tips",
          date: "Oct 30, 2024 10:50 PM",
        },
        {
          id: 3,
          title: "The Benefits of Riding for Your Health",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuXwe5tU2b0WKj05wfXTcS-7ECnmN8LfErkQ&s",
          excerpt:
            "Explore the numerous health benefits of regular riding. From improved cardiovascular health to stress reduction, biking is a great way to stay fit.",
          category: "Health & Fitness",
          date: "Oct 30, 2024 10:50 PM",
        },
        {
          id: 4,
          title: "Understanding Bike Technology: What You Need to Know",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWQEf8TvhpFnrF_AHr6_OGG6ecLDocAWWVpw&s",
          excerpt:
            "Stay updated on the latest bike technologies and how they can enhance your riding experience.",
          category: "Bike Technology",
          date: "Oct 30, 2024 10:50 PM",
        },
        {
          id: 5,
          title: "Join Our Community Events: Ride Together",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFJG1vcDpsf4uvF5uPo-o54W_TyZqHsIi9LQ&s",
          excerpt:
            "Participate in our community events and enjoy riding with fellow enthusiasts.",
          category: "Community Events",
          date: "Oct 30, 2024 10:50 PM",
        },
      ],
      categories: [
        "Bike Routes",
        "Maintenance Tips",
        "Health & Fitness",
        "Bike Technology",
        "Community Events",
      ],
      recentPosts: [
        { id: 6, title: "Choosing the Right Bike for Your Needs" },
        { id: 7, title: "Night Cycling: Safety Tips and Gear" },
        { id: 8, title: "BikeOntrack's Annual City Tour Announced" },
      ],
      selectedCategory: null, // To store the currently selected category
    };
  },
  computed: {
    filteredPosts() {
      // Return all posts if no category is selected, otherwise filter by selected category
      return this.selectedCategory
        ? this.blogPosts.filter(
            (post) => post.category === this.selectedCategory
          )
        : this.blogPosts;
    },
  },
  methods: {
    filterPosts(category) {
      this.selectedCategory = category; // Set the selected category
    },
  },
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
