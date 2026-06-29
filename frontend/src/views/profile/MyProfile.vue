<template>
  <div class="profile-page section gradient-light">
    <b-container>
      <div class="listing-top-area">
        <b-breadcrumb class="custom-breadcrumb">
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item to="/my-profile" active
            >My Profile</b-breadcrumb-item
          >
        </b-breadcrumb>
      </div>
      <b-row>
        <!-- LEFT SIDEBAR -->
        <b-col cols="12" lg="4" class="mb-4 mb-lg-0">
          <div class="card-app sidebar-panel">
            <!-- Header -->
            <div
              class="sidebar-header d-flex align-items-center justify-content-between"
            >
              <div
                v-if="user"
                class="sidebar-user d-flex align-items-center gap-3"
              >
                <div
                  class="user-avatar user-avatar-lg icon-wrap icon-wrap-lg icon-wrap-primary mr-3"
                >
                  <!-- <span class="text-primary">{{
                    user?.name?.charAt(0).toUpperCase() || "G"
                  }}</span> -->
                  <b-avatar
                    :src="profilePicture || defaultAvatar"
                    size="45"
                  ></b-avatar>
                </div>
                <div>
                  <p class="user-name mb-0 font-semibold">
                    {{ user?.name || "Guest User" }}
                  </p>
                  <span
                    class="badge-app badge-primary"
                    style="font-size: 0.7rem"
                  >
                    Verified Rider
                  </span>
                </div>
              </div>

              <div v-else class="sidebar-user d-flex align-items-center gap-3">
                <div
                  class="user-avatar user-avatar-lg icon-wrap icon-wrap-lg icon-wrap-gray"
                >
                  <span>G</span>
                </div>
                <div>
                  <p class="user-name mb-1 font-semibold">Guest</p>
                  <router-link to="/signup" class="btn-primary-app btn-sm-app">
                    Sign up / Login
                  </router-link>
                </div>
              </div>
            </div>

            <div class="divider my-3"></div>

            <!-- NAV -->
            <nav class="sidebar-nav d-flex flex-column gap-2">
              <router-link
                to="/my-bookings"
                class="sidebar-item d-flex align-items-center gap-3 p-2 rounded-lg hover-lift"
              >
                <div class="icon-wrap icon-wrap-sm icon-wrap-success mr-3">
                  <i class="fa-solid fa-calendar-check"></i>
                </div>
                <div>
                  <strong>Bookings</strong><br />
                  <small class="text-muted">View active rentals</small>
                </div>
              </router-link>

              <!-- <router-link
                to="/rental-history"
                class="sidebar-item d-flex align-items-center gap-3 p-2 rounded-lg hover-lift"
              >
                <div class="icon-wrap icon-wrap-sm icon-wrap-warning mr-3">
                  <i class="fa-solid fa-clock-rotate-left"></i>
                </div>
                <div>
                  <strong>Rental History</strong><br />
                  <small class="text-muted">All past trips</small>
                </div>
              </router-link> -->

              <router-link
                to="/account-settings"
                class="sidebar-item d-flex align-items-center gap-3 p-2 rounded-lg hover-lift"
              >
                <div class="icon-wrap icon-wrap-sm icon-wrap-primary mr-3">
                  <i class="fa-solid fa-user-cog"></i>
                </div>
                <div>
                  <strong>Account Settings</strong><br />
                  <small class="text-muted">Profile & preferences</small>
                </div>
              </router-link>

              <!-- <router-link
                to="/payment-methods"
                class="sidebar-item d-flex align-items-center gap-3 p-2 rounded-lg hover-lift"
              >
                <div class="icon-wrap icon-wrap-sm icon-wrap-success mr-3">
                  <i class="fa-solid fa-credit-card"></i>
                </div>
                <div>
                  <strong>Payment Methods</strong><br />
                  <small class="text-muted">Saved cards & UPI</small>
                </div>
              </router-link> -->

              <router-link
                to="/notifications"
                class="sidebar-item d-flex align-items-center gap-3 p-2 rounded-lg hover-lift"
              >
                <div class="icon-wrap icon-wrap-sm icon-wrap-danger mr-3">
                  <i class="fa-solid fa-bell"></i>
                </div>
                <div>
                  <strong>Notifications</strong><br />
                  <small class="text-muted">Alerts & updates</small>
                </div>
              </router-link>

              <router-link
                to="/contact-us"
                class="sidebar-item d-flex align-items-center gap-3 p-2 rounded-lg hover-lift"
              >
                <div class="icon-wrap icon-wrap-sm icon-wrap-info mr-3">
                  <i class="fa-solid fa-headset"></i>
                </div>
                <div>
                  <strong>Support</strong><br />
                  <small class="text-muted">Help & contact</small>
                </div>
              </router-link>
            </nav>

            <div class="divider my-3"></div>

            <div
              @click="logout"
              class="sidebar-item d-flex align-items-center gap-3 p-2 rounded-lg text-danger hover-lift"
            >
              <div class="icon-wrap icon-wrap-sm icon-wrap-danger mr-3">
                <i class="fa-solid fa-right-from-bracket"></i>
              </div>
              <div>
                <strong>Logout</strong>
              </div>
            </div>
          </div>
        </b-col>

        <!-- RIGHT CONTENT -->
        <b-col cols="12" lg="8">
          <div class="card-app">
            <h4 class="font-bold mb-0">My Profile</h4>
            <p class="text-muted mb-4">
              Manage your account details and preferences
            </p>

            <b-row>
              <b-col cols="12" md="6" class="mb-3">
                <label class="form-label-app">Full Name</label>
                <span class="text-lg font-bold">
                  {{ user?.name || "Guest User" }}
                </span>
              </b-col>

              <b-col cols="12" md="6" class="mb-3">
                <label class="form-label-app">Email</label>
                <span class="text-lg font-bold">
                  {{ user?.email || "Not Available" }}
                </span>
              </b-col>

              <b-col cols="12" md="6" class="mb-3">
                <label class="form-label-app">Phone</label>
                <span class="text-lg font-bold">
                  {{ user?.phone || "Not Available" }}
                </span>
              </b-col>

              <b-col cols="12" md="6" class="mb-3">
                <label class="form-label-app">Member Status</label>
                <div class="mt-2">
                  <span class="badge-app badge-success">Active Rider</span>
                </div>
              </b-col>
            </b-row>

            <div class="mt-4 d-flex gap-3">
              <router-link class="btn-primary-app mr-3" to="/account-settings">
                Edit Profile
              </router-link>
              <router-link class="btn-secondary-app" to="/account-settings">
                Change Password
              </router-link>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "MyProfile",

  data() {
    return {
      user: null,
      LoggedIn: false,
      profilePicture: null,
      defaultAvatar:
        "https://ui-avatars.com/api/?name=Guest&background=2468f8&color=fff",
    };
  },

  mounted() {
    this.getUserData();
  },

  methods: {
    getUserData() {
      const loggedIn = JSON.parse(localStorage.getItem("logged-in"));
      const user = JSON.parse(localStorage.getItem("user"));
      const profilePicture = localStorage.getItem("profilePicture");

      this.LoggedIn = loggedIn || false;
      this.user = user || null;
      this.profilePicture = profilePicture || null;
    },

    logout() {
      localStorage.removeItem("logged-in");
      // localStorage.removeItem("user");

      this.LoggedIn = false;
      // this.user = null;

      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.sidebar-panel {
  position: sticky;
  top: 100px;
}
.sidebar-item {
  text-decoration: none;
  color: inherit;
}
.sidebar-item:hover {
  background: var(--color-gray-50);
}
.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
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
