<template>
  <div class="blog-page">
    <!-- BLOG CONTENT -->
    <section class="section">
      <b-container>
        <div class="listing-top-area">
          <b-breadcrumb class="custom-breadcrumb">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/blogs" active>Blogs</b-breadcrumb-item>
          </b-breadcrumb>
        </div>
        <b-row>
          <!-- SIDEBAR -->
          <b-col lg="4" class="mb-4">
            <!-- SEARCH -->
            <div class="card-app sidebar-card mb-4">
              <div class="sidebar-title">
                <i class="fa-solid fa-magnifying-glass"></i>
                Search Blog
              </div>

              <div class="search-box">
                <i class="fa-solid fa-search"></i>

                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search articles..."
                />
              </div>
            </div>

            <!-- CATEGORIES -->
            <div class="card-app sidebar-card mb-4">
              <div class="sidebar-title">
                <i class="fa-solid fa-layer-group"></i>
                Categories
              </div>

              <div class="category-list">
                <div
                  class="category-item"
                  :class="{ active: selectedCategory === null }"
                  @click="filterPosts(null)"
                >
                  <span>All Categories</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </div>

                <div
                  v-for="category in categories"
                  :key="category"
                  class="category-item"
                  :class="{ active: selectedCategory === category }"
                  @click="filterPosts(category)"
                >
                  <span>{{ category }}</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>

            <!-- RECENT POSTS -->
            <div class="card-app sidebar-card">
              <div class="sidebar-title">
                <i class="fa-solid fa-clock-rotate-left"></i>
                Recent Posts
              </div>

              <div
                v-for="post in recentPosts"
                :key="post.id"
                class="recent-post"
                @click="$router.push(`/blogs/${post.id}`)"
                style="cursor: pointer"
              >
                <div class="recent-icon">
                  <i class="fa-solid fa-newspaper"></i>
                </div>

                <div>
                  <h6>{{ post.title }}</h6>
                  <small>Trending Article</small>
                </div>
              </div>
            </div>
          </b-col>

          <!-- BLOG POSTS -->
          <b-col lg="8">
            <!-- FEATURED -->
            <div class="featured-blog card-app mb-4">
              <b-row class="align-items-center">
                <b-col md="6">
                  <div class="featured-content">
                    <span class="featured-tag"> Featured Story </span>

                    <h2>Ride Beyond Limits With BikeOntrack</h2>

                    <p>
                      Experience freedom on every journey with premium bikes,
                      flexible rentals, and unforgettable road adventures.
                    </p>

                    <button
                      class="btn-primary-app"
                      @click="$router.push(`/blogs/1`)"
                    >
                      Explore More
                    </button>
                  </div>
                </b-col>

                <b-col md="6">
                  <img
                    src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop"
                    class="featured-img"
                    alt="Featured Bike"
                  />
                </b-col>
              </b-row>
            </div>

            <!-- BLOG GRID -->
            <div class="blog-grid">
              <div
                v-for="post in filteredPosts"
                :key="post.id"
                class="blog-card card-app"
              >
                <div class="blog-img-wrap">
                  <img :src="post.image" :alt="post.title" class="blog-img" />

                  <span class="blog-category">
                    {{ post.category }}
                  </span>
                </div>

                <div class="blog-content">
                  <div class="blog-meta">
                    <span>
                      <i class="fa-regular fa-calendar"></i>
                      {{ post.date }}
                    </span>
                  </div>

                  <h4 class="blog-title">
                    {{ post.title }}
                  </h4>

                  <p class="blog-desc">
                    {{ post.excerpt }}
                  </p>

                  <button
                    class="read-btn"
                    @click="$router.push(`/blogs/${post.id}`)"
                  >
                    Read More
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",

      selectedCategory: null,

      blogPosts: [
        {
          id: 2,
          title: "Top 5 Scenic Bike Routes in India",
          image:
            "https://img.magnific.com/free-photo/aerial-shot-twisted-roads-surrounded-by-parks-middle-city_181624-25726.jpg?t=st=1778136626~exp=1778140226~hmac=d353d54f3398ad829ae670eaafe2f58f91c0251a2d8e086d8e51cd3bcae610d4&w=2000",
          excerpt:
            "Discover breathtaking bike routes with scenic mountain roads, coastal highways, and unforgettable travel experiences.",
          category: "Bike Routes",
          date: "Oct 30, 2024",
        },

        {
          id: 3,
          title: "Bike Maintenance Tips Every Rider Should Know",
          image:
            "https://img.magnific.com/free-photo/man-fixing-motorcycle-modern-workshop_158595-8083.jpg?t=st=1778136961~exp=1778140561~hmac=0dfab32af44fdead0f7e364ece34bf6b86a71eb7e44cecd0e77fccca67a57eda&w=2000",
          excerpt:
            "Learn how to maintain your bike efficiently and improve long-term riding performance.",
          category: "Maintenance Tips",
          date: "Nov 02, 2024",
        },

        {
          id: 4,
          title: "Health Benefits of Daily Riding",
          image:
            "https://img.magnific.com/free-photo/handsome-motorbiker-with-helmet-hands-motorcycle_1150-10708.jpg?t=st=1778137183~exp=1778140783~hmac=0537e6ace5c4b8f080bdf62c4af598818a1a0c730ce5f490764cf0b87a71ee1e&w=2000",
          excerpt:
            "Riding regularly improves fitness, mental health, stamina, and overall lifestyle quality.",
          category: "Health & Fitness",
          date: "Nov 10, 2024",
        },

        {
          id: 5,
          title: "Latest Bike Technology Trends in 2025",
          image:
            "https://images.unsplash.com/photo-1769537754906-768648ce2d1e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fG1vdG9yY3ljbGUlMjBUZWNobm9sb2d5fGVufDB8fDB8fHww",
          excerpt:
            "Explore modern motorcycle technology, smart dashboards, AI safety systems, and electric innovations.",
          category: "Bike Technology",
          date: "Nov 14, 2024",
        },

        {
          id: 6,
          title: "Community Riding Events Across Bangalore",
          image:
            "https://images.unsplash.com/photo-1767868280778-d54da823abe9?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          excerpt:
            "Join exciting riding communities and group adventures organized by BikeOntrack.",
          category: "Community Events",
          date: "Nov 20, 2024",
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
        {
          id: 2,
          title: "Top 5 Scenic Bike Routes in India",
        },

        {
          id: 3,
          title: "Bike Maintenance Tips Every Rider Should Know",
        },

        {
          id: 4,
          title: "Health Benefits of Daily Riding",
        },
      ],
    };
  },

  computed: {
    filteredPosts() {
      let posts = this.selectedCategory
        ? this.blogPosts.filter(
            (post) => post.category === this.selectedCategory,
          )
        : this.blogPosts;

      if (this.searchQuery) {
        posts = posts.filter((post) =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
        );
      }

      return posts;
    },
  },

  methods: {
    filterPosts(category) {
      this.selectedCategory = category;
    },
  },
};
</script>

<style scoped>
.blog-page {
  background: var(--color-gray-50);
  min-height: 100vh;
}

/* SIDEBAR */

.sidebar-card {
  padding: 1.5rem;
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1.3rem;
}

.search-box {
  position: relative;
}

.search-box i {
  position: absolute;
  left: 16px;
  top: 16px;
  color: var(--color-gray-400);
}

.search-box input {
  width: 100%;
  height: 52px;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  padding: 0 18px 0 46px;
  outline: none;
  transition: 0.3s;
}

.search-box input:focus {
  border-color: var(--color-primary);
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 10px;
  border: 1px solid transparent;
}

.category-item:hover {
  background: var(--color-gray-100);
}

.category-item.active {
  background: var(--color-primary);
  color: #fff;
}

.recent-post {
  display: flex;
  gap: 12px;
  margin-bottom: 1rem;
  align-items: center;
}

.recent-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.recent-post h6 {
  margin-bottom: 3px;
  font-weight: 600;
}

.recent-post small {
  color: var(--color-gray-500);
}

/* FEATURED */

.featured-blog {
  padding: 2rem;
  overflow: hidden;
}

.featured-content h2 {
  font-size: 2rem;
  font-weight: 800;
  margin: 1rem 0;
}

.featured-content p {
  color: var(--color-gray-500);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.featured-tag {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 30px;
  background: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 700;
}

.featured-img {
  width: 100%;
  border-radius: var(--radius-2xl);
  height: 320px;
  object-fit: cover;
}

/* BLOG GRID */

.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.blog-card {
  overflow: hidden;
  transition: 0.3s;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-img-wrap {
  position: relative;
}

.blog-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 20px;
}

.blog-category {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 7px 14px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
}

.blog-content {
  padding: 1.4rem;
}

.blog-meta {
  color: var(--color-gray-500);
  font-size: 13px;
  margin-bottom: 10px;
}

.blog-title {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 12px;
}

.blog-desc {
  color: var(--color-gray-500);
  line-height: 1.8;
  font-size: 14px;
}

.read-btn {
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-weight: 700;
  padding: 0;
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* MOBILE */

@media (max-width: 991px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 575px) {
  .sidebar-card,
  .featured-blog {
    padding: 1.25rem;
  }

  .featured-content h2 {
    font-size: 1.5rem;
  }

  .featured-img {
    height: 240px;
    margin-top: 1rem;
  }

  .blog-img {
    height: 210px;
  }
}
/* breadcrumb */
.listing-top-area {
  margin-bottom: 2rem;
}

.custom-breadcrumb {
  background: transparent;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.custom-breadcrumb .breadcrumb {
  background: transparent !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
}

.custom-breadcrumb .breadcrumb-item a {
  color: var(--color-gray-500);
  font-weight: 500;
  text-decoration: none;
}

.custom-breadcrumb .breadcrumb-item.active {
  color: var(--color-primary);
  font-weight: 700;
}

.custom-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
  color: var(--color-gray-300);
}

.card-disabled {
  opacity: 0.55;
}
</style>
