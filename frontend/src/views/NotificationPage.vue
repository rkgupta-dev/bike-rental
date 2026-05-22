<template>
  <div class="notifications-page gradient-light section">
    <b-container class="">
      <div class="listing-top-area">
        <b-breadcrumb class="custom-breadcrumb">
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item to="/my-profile">Profile</b-breadcrumb-item>
          <b-breadcrumb-item to="/account-settings" active
            >Notifications</b-breadcrumb-item
          >
        </b-breadcrumb>
      </div>

      <!-- FILTER -->
      <div class="filter-wrapper mb-4">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="filter-btn"
          :class="{ active: activeTab === tab.value }"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- TIMELINE -->
      <div class="timeline-wrapper">
        <div
          v-for="notification in filteredNotifications"
          :key="notification.id"
          class="timeline-item"
        >
          <!-- LINE -->
          <div class="timeline-line"></div>

          <!-- ICON -->
          <div
            class="timeline-icon"
            :class="getNotificationClass(notification.type)"
          >
            <i :class="getNotificationIcon(notification.type)"></i>
          </div>

          <!-- CARD -->
          <div class="timeline-card card-app">
            <div class="timeline-top">
              <div>
                <h5 class="mb-1">
                  {{ notification.title }}
                </h5>

                <p class="text-muted mb-0">
                  {{ notification.message }}
                </p>
              </div>

              <span
                class="type-badge"
                :class="getNotificationClass(notification.type)"
              >
                {{ notification.type }}
              </span>
            </div>

            <div class="timeline-footer">
              <small>
                <i class="fa-regular fa-clock mr-1"></i>
                {{ formatDate(notification.date) }}
              </small>

              <button class="view-btn">View</button>
            </div>
          </div>
        </div>
      </div>

      <!-- EMPTY -->
      <div
        v-if="filteredNotifications.length === 0"
        class="card-app empty-box text-center"
      >
        <div class="empty-icon mb-3">
          <i class="fa-regular fa-bell-slash"></i>
        </div>

        <h4>No Notifications</h4>

        <p class="text-muted mb-0">
          You don't have any notifications right now.
        </p>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "NotificationsPage",

  data() {
    return {
      activeTab: "all",

      tabs: [
        { label: "All", value: "all" },
        { label: "Bookings", value: "booking" },
        { label: "Reminders", value: "reminder" },
        { label: "Updates", value: "update" },
      ],

      notifications: [
        {
          id: 1,
          type: "booking",
          title: "Booking Confirmed",
          message: "Your Royal Enfield Classic 350 booking is confirmed.",
          date: new Date(2026, 4, 8, 10, 30),
        },
        {
          id: 2,
          type: "reminder",
          title: "Trip Starts Tomorrow",
          message: "Your ride starts tomorrow from Koramangala at 9:00 AM.",
          date: new Date(2026, 4, 7, 18, 15),
        },
        {
          id: 3,
          type: "update",
          title: "New Sport Bikes Added",
          message: "Check out newly added KTM and Yamaha bikes.",
          date: new Date(2026, 4, 6, 14, 20),
        },
        {
          id: 4,
          type: "booking",
          title: "Booking Cancelled",
          message: "Your KTM Duke booking was cancelled successfully.",
          date: new Date(2026, 4, 5, 12, 0),
        },

        {
          id: 4,
          type: "booking",
          title: "Booking Cancelled",
          message: "Your KTM Duke booking was cancelled successfully.",
          date: new Date(2026, 4, 5, 12, 0),
        },
      ],
    };
  },

  computed: {
    filteredNotifications() {
      if (this.activeTab === "all") {
        return [...this.notifications].sort((a, b) => b.date - a.date);
      }

      return this.notifications
        .filter((n) => n.type === this.activeTab)
        .sort((a, b) => b.date - a.date);
    },
  },

  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    },

    getNotificationIcon(type) {
      switch (type) {
        case "booking":
          return "fa-solid fa-calendar-check";

        case "reminder":
          return "fa-solid fa-bell";

        case "update":
          return "fa-solid fa-bolt";

        default:
          return "fa-solid fa-circle-info";
      }
    },

    getNotificationClass(type) {
      switch (type) {
        case "booking":
          return "success-style";

        case "reminder":
          return "warning-style";

        case "update":
          return "info-style";

        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
.filter-wrapper {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  border: none;
  background: white;
  padding: 0.85rem 1.2rem;
  border-radius: 14px;
  font-weight: 600;
  transition: 0.2s ease;
}

.filter-btn.active {
  background: var(--color-primary);
  color: white;
}

.timeline-wrapper {
  position: relative;
}

.timeline-item {
  position: relative;
  padding-left: 90px;
  margin-bottom: 2rem;
}

.timeline-line {
  position: absolute;
  left: 31px;
  top: 65px;
  width: 2px;
  bottom: -30px;
  background: var(--color-gray-200);
}

.timeline-item:last-child .timeline-line {
  display: none;
}

.timeline-icon {
  position: absolute;
  left: 0;
  top: 10px;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.success-style {
  background: #dcfce7;
  color: #15803d;
}

.warning-style {
  background: #fef3c7;
  color: #b45309;
}

.info-style {
  background: #dbeafe;
  color: #2563eb;
}

.timeline-card {
  position: relative;
}

.timeline-top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.type-badge {
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: capitalize;
  height: fit-content;
}

.timeline-footer {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.timeline-footer small {
  color: var(--color-gray-500);
}

.view-btn {
  border: none;
  background: var(--color-gray-50);
  padding: 0.55rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  transition: 0.2s ease;
}

.view-btn:hover {
  background: var(--color-primary);
  color: white;
}

.empty-box {
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 3rem;
  color: var(--color-gray-400);
}

@media (max-width: 768px) {
  .notification-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-bell {
    width: 80px;
    height: 80px;
    font-size: 2rem;
    border-radius: 22px;
  }

  .timeline-item {
    padding-left: 75px;
  }

  .timeline-icon {
    width: 54px;
    height: 54px;
    border-radius: 16px;
  }

  .timeline-line {
    left: 26px;
  }

  .timeline-top {
    flex-direction: column;
  }

  .timeline-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .view-btn {
    width: 100%;
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
