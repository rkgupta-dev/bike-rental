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
          image: "data:image/jpeg;base64,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",
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
