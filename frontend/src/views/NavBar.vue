<template>
  <div>
    <!-- ── Main Navbar ─────────────────────────────────────── -->
    <nav class="app-navbar" :class="{ 'navbar-scrolled': isScrolled }">
      <div class="nav-container">
        <!-- Brand -->
        <router-link to="/" class="nav-brand">
          <div class="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle
                cx="5.5"
                cy="17.5"
                r="3.5"
                stroke="currentColor"
                stroke-width="2"
              />
              <circle
                cx="18.5"
                cy="17.5"
                r="3.5"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M15 17.5H9M9 17.5L7 8l4 1 2-4 4 3 1 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="brand-name">BikeOntrack</span>
        </router-link>

        <!-- Desktop Nav -->
        <div class="nav-links" :class="{ 'nav-open': mobileOpen }">
          <!-- Left links -->
          <div class="nav-group">
            <!-- Categories dropdown -->
            <div
              class="nav-dropdown-wrap"
              @mouseenter="openDropdown('categories')"
              @mouseleave="closeDropdown"
            >
              <button class="nav-link-btn">
                Rent by Category
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="chevron"
                  :class="{ 'chevron-up': activeDropdown === 'categories' }"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div
                class="dropdown-panel"
                v-show="activeDropdown === 'categories'"
              >
                <router-link to="/bikes" class="dropdown-item-app"
                  ><span class="ditem-icon"
                    ><i class="fa-solid fa-motorcycle"></i
                  ></span>
                  <div>
                    <strong>Bikes</strong
                    ><small>Commuter &amp; standard bikes</small>
                  </div></router-link
                >
                <router-link to="/sportsbike" class="dropdown-item-app"
                  ><span class="ditem-icon"
                    ><i class="fa-solid fa-bolt"></i
                  ></span>
                  <div>
                    <strong>Sportbikes</strong
                    ><small>High-speed performance</small>
                  </div></router-link
                >
                <router-link to="/scooter" class="dropdown-item-app"
                  ><span class="ditem-icon"
                    ><i class="fa-solid fa-motorcycle"></i
                  ></span>
                  <div>
                    <strong>Scooters</strong><small>Easy city rides</small>
                  </div></router-link
                >
                <router-link to="/cruiser" class="dropdown-item-app"
                  ><span class="ditem-icon"
                    ><i class="fa-solid fa-motorcycle"></i
                  ></span>
                  <div>
                    <strong>Cruisers</strong
                    ><small>Long-distance comfort</small>
                  </div></router-link
                >
              </div>
            </div>

            <router-link to="/daily-rent" class="nav-link-btn"
              >Daily Rent</router-link
            >
          </div>

          <!-- Right links -->
          <div class="nav-group nav-group-right">
            <!-- Rentals dropdown -->
            <div
              class="nav-dropdown-wrap"
              @mouseenter="openDropdown('rentals')"
              @mouseleave="closeDropdown"
            >
              <button class="nav-link-btn">
                Rentals
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="chevron"
                  :class="{ 'chevron-up': activeDropdown === 'rentals' }"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div class="dropdown-panel" v-show="activeDropdown === 'rentals'">
                <router-link to="/all-model" class="dropdown-item-app"
                  ><span class="ditem-icon">
                    <i class="fa-solid fa-motorcycle"></i
                  ></span>
                  <div>
                    <strong>Fleet</strong><small>Browse all models</small>
                  </div></router-link
                >
                <router-link to="/how-it-works" class="dropdown-item-app"
                  ><span class="ditem-icon"
                    ><i class="fa-solid fa-file-lines"></i
                  ></span>
                  <div>
                    <strong>How it works</strong
                    ><small>Step-by-step guide</small>
                  </div></router-link
                >
              </div>
            </div>

            <router-link to="/blogs" class="nav-link-btn">Blogs</router-link>
            <router-link to="/frequently-asked-questions" class="nav-link-btn"
              >FAQ</router-link
            >

            <!-- Support dropdown -->
            <div
              class="nav-dropdown-wrap"
              @mouseenter="openDropdown('support')"
              @mouseleave="closeDropdown"
            >
              <button class="nav-link-btn">
                Support
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="chevron"
                  :class="{ 'chevron-up': activeDropdown === 'support' }"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div
                class="dropdown-panel dropdown-panel-right"
                v-show="activeDropdown === 'support'"
              >
                <router-link to="/complaint-form" class="dropdown-item-app"
                  ><span class="ditem-icon"
                    ><i class="fa-solid fa-file-pen"></i
                  ></span>
                  <div>
                    <strong>Complaints</strong><small>Report an issue</small>
                  </div></router-link
                >
                <router-link to="/about-us" class="dropdown-item-app"
                  ><span class="ditem-icon"
                    ><i class="fa-solid fa-circle-info"></i
                  ></span>
                  <div>
                    <strong>About Us</strong><small>Our story</small>
                  </div></router-link
                >
                <router-link to="/contact-us" class="dropdown-item-app"
                  ><span class="ditem-icon"
                    ><i class="fa-solid fa-phone"></i
                  ></span>
                  <div>
                    <strong>Contact Us</strong><small>Get in touch</small>
                  </div></router-link
                >
                <router-link
                  to="/frequently-asked-questions"
                  class="dropdown-item-app"
                  ><span class="ditem-icon"
                    ><i class="fa-solid fa-file-lines"></i
                  ></span>
                  <div>
                    <strong>Terms &amp; Conditions</strong
                    ><small>Legal info</small>
                  </div></router-link
                >
                <div class="dropdown-divider-app"></div>
                <div class="dropdown-contact-row">
                  <a
                    href="https://wa.me/7079812442"
                    target="_blank"
                    rel="noopener"
                    class="contact-icon-btn whatsapp"
                    title="WhatsApp"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                      />
                    </svg>
                  </a>
                  <a
                    href="tel:7079812442"
                    class="contact-icon-btn phone"
                    title="Call Us"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .87h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                  </a>
                  <a
                    href="mailto:bikeontrack@support.com"
                    class="contact-icon-btn email"
                    title="Email Us"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <polyline
                        points="22,6 12,13 2,6"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Phone badge -->
            <a href="tel:7079812442" class="phone-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .87h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              +91 70798 12442
            </a>

            <!-- User dropdown -->
            <div
              class="nav-dropdown-wrap"
              @mouseenter="openDropdown('user')"
              @mouseleave="closeDropdown"
            >
              <!-- USER BUTTON -->
              <button class="user-btn">
                <div class="user-avatar">
                  <span>
                    <span>
                      {{
                        LoggedIn && user
                          ? user.name.charAt(0).toUpperCase()
                          : "A"
                      }}
                    </span>
                  </span>
                </div>

                <span class="user-greeting">
                  {{ LoggedIn && user ? user.name.split(" ")[0] : "Account" }}
                </span>

                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="chevron"
                  :class="{ 'chevron-up': activeDropdown === 'user' }"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>

              <!-- DROPDOWN -->
              <div
                class="dropdown-panel dropdown-panel-right user-panel"
                v-show="activeDropdown === 'user'"
              >
                <!-- Logged In -->
                <template v-if="LoggedIn && user">
                  <div class="user-panel-header">
                    <div class="user-avatar user-avatar-lg">
                      <span>
                        {{ user?.name?.charAt(0).toUpperCase() || "G" }}
                      </span>
                    </div>

                    <div>
                      <p class="user-name mb-0">{{ user.name }}</p>

                      <span class="text-sm">{{ user.email }}</span>

                      <!-- <span
                        class="badge-app badge-primary"
                        style="font-size: 0.7rem"
                      >
                        Verified Rider
                      </span> -->
                    </div>
                  </div>

                  <div class="dropdown-divider-app"></div>

                  <router-link to="/my-profile" class="dropdown-item-app">
                    <span class="ditem-icon">
                      <i class="fa-solid fa-user"></i>
                    </span>

                    <div>
                      <strong>My Profile</strong>
                      <small>View & edit profile</small>
                    </div>
                  </router-link>

                  <router-link to="/my-bookings" class="dropdown-item-app">
                    <span class="ditem-icon">
                      <i class="fa-solid fa-calendar"></i>
                    </span>

                    <div>
                      <strong>My Bookings</strong>
                      <small>View active rentals</small>
                    </div>
                  </router-link>

                  <!-- <router-link to="/rental-history" class="dropdown-item-app">
                    <span class="ditem-icon">
                      <i class="fa-solid fa-clock"></i>
                    </span>

                    <div>
                      <strong>Rental History</strong>
                      <small>Past trips</small>
                    </div>
                  </router-link> -->

                  <div class="dropdown-divider-app"></div>

                  <div
                    @click="signOut"
                    class="dropdown-item-app dropdown-item-danger"
                  >
                    <span class="ditem-icon">
                      <i class="fa-solid fa-right-from-bracket text-danger"></i>
                    </span>

                    <div>
                      <strong>Sign Out</strong>
                    </div>
                  </div>
                </template>

                <!-- Guest -->
                <template v-else>
                  <div class="guest-user-box">
                    <div class="guest-icon">
                      <i class="fa-solid fa-user"></i>
                    </div>

                    <h5>Welcome Guest</h5>

                    <p>Login to manage bookings, profile and rentals.</p>

                    <router-link
                      to="/login"
                      class="btn-primary-app guest-login-btn"
                    >
                      Login / Sign Up
                    </router-link>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="hamburger"
          @click="toggleMobile"
          :class="{ 'is-open': mobileOpen }"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <!-- /nav-container -->
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  data() {
    return {
      mobileOpen: false,
      activeDropdown: null,
      isScrolled: false,
      user: null,
      LoggedIn: false,
    };
  },

  mounted() {
    this.checkAuth();

    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  watch: {
    $route() {
      this.checkAuth();
    },
  },

  methods: {
    checkAuth() {
      const loggedIn = JSON.parse(localStorage.getItem("logged-in"));

      const user = JSON.parse(localStorage.getItem("user"));

      this.LoggedIn = loggedIn || false;
      this.user = user || null;
    },

    toggleMobile() {
      this.mobileOpen = !this.mobileOpen;
    },

    openDropdown(name) {
      this.activeDropdown = name;
    },

    closeDropdown() {
      this.activeDropdown = null;
    },

    handleScroll() {
      this.isScrolled = window.scrollY > 12;
    },

    signOut() {
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
/* ── Navbar Shell ─────────────────────────────────────────── */
.app-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-nav);
  height: 64px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-gray-100);
  transition: var(--transition-base);
}
.app-navbar.navbar-scrolled {
  box-shadow: 0 2px 24px rgba(0, 0, 0, 0.07);
  border-bottom-color: var(--color-gray-200);
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* ── Brand ── */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  flex-shrink: 0;
}
.brand-icon {
  width: 34px;
  height: 34px;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.brand-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-dark);
  letter-spacing: -0.02em;
}

/* ── Nav Links ── */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0;
  flex: 1;
}
.nav-group {
  display: flex;
  align-items: center;
  gap: 2px;
}
.nav-group-right {
  margin-left: auto;
}

.nav-link-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-600);
  padding: 6px 12px;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: var(--transition-fast);
  white-space: nowrap;
  text-decoration: none;
}
.nav-link-btn:hover {
  background: var(--color-gray-50);
  color: var(--color-dark);
}
/* Active route */
.router-link-active.nav-link-btn,
.router-link-exact-active.nav-link-btn {
  color: var(--color-primary);
  background: var(--color-primary-bg);
}

.chevron {
  transition: transform 0.2s ease;
  opacity: 0.5;
}
.chevron-up {
  transform: rotate(-180deg);
}

/* ── Dropdown Panel ── */
.nav-dropdown-wrap {
  position: relative;
}
.dropdown-panel {
  position: absolute;
  top: calc(100%);
  left: 0;
  background: var(--color-white);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-xl);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  padding: 8px;
  min-width: 230px;
  z-index: var(--z-overlay);
  animation: fadeInUp 0.15s ease;
}
.dropdown-panel-right {
  left: auto;
  right: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item-app {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 10px;
  border-radius: var(--radius-md);
  text-decoration: none !important;
  color: var(--color-gray-700);
  transition: var(--transition-fast);
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  font-family: var(--font-body);
  text-align: left;
}
.dropdown-item-app:hover {
  background: var(--color-gray-50);
  color: var(--color-dark);
}
.dropdown-item-app strong {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-dark);
  line-height: 1.3;
}
.dropdown-item-app small {
  display: block;
  font-size: 0.75rem;
  color: var(--color-gray-400);
  line-height: 1.3;
}
.dropdown-item-danger:hover {
  background: var(--color-danger-bg);
}
.dropdown-item-danger strong {
  color: var(--color-danger);
}

.ditem-icon {
  font-size: 1.1rem;
  width: 26px;
  text-align: center;
  flex-shrink: 0;
}

.dropdown-divider-app {
  height: 1px;
  background: var(--color-gray-100);
  margin: 6px 0;
}

/* Support contact icons row */
.dropdown-contact-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 6px 10px 4px;
}
.contact-icon-btn {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
  text-decoration: none;
}
.contact-icon-btn.whatsapp {
  background: #f0fdf4;
  color: #16a34a;
}
.contact-icon-btn.whatsapp:hover {
  background: #dcfce7;
}
.contact-icon-btn.phone {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}
.contact-icon-btn.phone:hover {
  background: var(--color-primary-border);
}
.contact-icon-btn.email {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}
.contact-icon-btn.email:hover {
  background: #fecaca;
}

/* ── Phone Badge ── */
.phone-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
  background: var(--color-primary-bg);
  border: 1px solid var(--color-primary-border);
  padding: 5px 12px;
  border-radius: var(--radius-full);
  text-decoration: none;
  white-space: nowrap;
  transition: var(--transition-fast);
}
.phone-badge:hover {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

/* ── User Button ── */
.user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1.5px solid var(--color-gray-200);
  border-radius: var(--radius-full);
  padding: 4px 10px 4px 4px;
  cursor: pointer;
  transition: var(--transition-fast);
}
.user-btn:hover {
  background: var(--color-gray-50);
  border-color: var(--color-gray-300);
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}
.user-avatar-lg {
  width: 44px;
  height: 44px;
  font-size: 1.1rem;
}

.user-greeting {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-gray-700);
}

/* User dropdown header */
.user-panel {
  min-width: 250px;
}
.user-panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px 6px;
}
.user-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0 0 4px;
  line-height: 1;
}

/* ── Hamburger ── */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}
.hamburger:hover {
  background: var(--color-gray-50);
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-dark);
  border-radius: 2px;
  transition: var(--transition-base);
  transform-origin: center;
}
.hamburger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.is-open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Responsive ── */
@media (max-width: 991px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    display: none;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--color-white);
    border-bottom: 1px solid var(--color-gray-100);
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
    gap: 4px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    overflow-y: auto;
    max-height: calc(100vh - 64px);
  }
  .nav-links.nav-open {
    display: flex;
  }

  .nav-group {
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
  }
  .nav-group-right {
    margin-left: 0;
    margin-top: 8px;
    border-top: 1px solid var(--color-gray-100);
    padding-top: 8px;
  }
  .nav-link-btn {
    justify-content: space-between;
    padding: 10px 14px;
    font-size: 0.95rem;
  }

  .nav-dropdown-wrap {
    position: static;
  }
  .dropdown-panel {
    position: static;
    box-shadow: none;
    border: none;
    border-radius: 0;
    background: var(--color-gray-50);
    padding: 4px 4px 4px 16px;
    margin-bottom: 4px;
  }
  .dropdown-panel-right {
    right: auto;
  }

  .phone-badge {
    display: none;
  }
  .user-btn {
    width: 100%;
    border-radius: var(--radius-lg);
    padding: 10px 14px;
  }
}

@media (max-width: 575px) {
  .sidebar-panel {
    width: 100%;
  }
}

.guest-user-box {
  padding: 1.5rem 1rem;
  text-align: center;
}

.guest-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.guest-user-box h5 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--color-dark);
}

.guest-user-box p {
  font-size: 0.82rem;
  color: var(--color-gray-500);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.guest-login-btn {
  width: 100%;
  justify-content: center;
}
</style>
