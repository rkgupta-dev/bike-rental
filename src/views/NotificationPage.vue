<template>
  <div>
    <NavBar />
    <b-container>
      <b-row>
        <b-col lg="10" class="mx-auto">
          <h1 class="my-4">Notifications</h1>
          <b-card no-body>
            <b-tabs pills card horizontal>
              <!-- All Notifications Tab -->
              <b-tab title="All" active>
                <b-list-group flush>
                  <b-list-group-item
                    v-for="notification in allNotifications"
                    :key="notification.id"
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5 class="mb-1">{{ notification.title }}</h5>
                      <p class="mb-1">{{ notification.message }}</p>
                      <small class="text-muted">{{
                        formatDate(notification.date)
                      }}</small>
                    </div>
                    <b-badge :variant="getBadgeVariant(notification.type)" pill>
                      {{ notification.type }}
                    </b-badge>
                  </b-list-group-item>
                </b-list-group>
              </b-tab>
              <!-- Bookings Tab -->
              <b-tab title="Bookings">
                <b-list-group flush>
                  <b-list-group-item
                    v-for="notification in bookingNotifications"
                    :key="notification.id"
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5 class="mb-1">{{ notification.title }}</h5>
                      <p class="mb-1">{{ notification.message }}</p>
                      <small class="text-muted">{{
                        formatDate(notification.date)
                      }}</small>
                    </div>
                    <b-badge variant="success" pill>Booking</b-badge>
                  </b-list-group-item>
                </b-list-group>
              </b-tab>
              <!-- Reminders Tab -->
              <b-tab title="Reminders">
                <b-list-group flush>
                  <b-list-group-item
                    v-for="notification in reminderNotifications"
                    :key="notification.id"
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5 class="mb-1">{{ notification.title }}</h5>
                      <p class="mb-1">{{ notification.message }}</p>
                      <small class="text-muted">{{
                        formatDate(notification.date)
                      }}</small>
                    </div>
                    <b-badge variant="warning" pill>Reminder</b-badge>
                  </b-list-group-item>
                </b-list-group>
              </b-tab>
              <!-- Updates Tab -->
              <b-tab title="Updates">
                <b-list-group flush>
                  <b-list-group-item
                    v-for="notification in updateNotifications"
                    :key="notification.id"
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5 class="mb-1">{{ notification.title }}</h5>
                      <p class="mb-1">{{ notification.message }}</p>
                      <small class="text-muted">{{
                        formatDate(notification.date)
                      }}</small>
                    </div>
                    <b-badge variant="info" pill>Update</b-badge>
                  </b-list-group-item>
                </b-list-group>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- <b-container fluid class="bg-dark text-light py-4 mt-5">
      <b-row>
        <b-col class="text-center">
          &copy; {{ currentYear }} BikeOntrack. All rights reserved.
        </b-col>
      </b-row>
    </b-container> -->
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
      currentYear: new Date().getFullYear(),
      notifications: [
        {
          id: 1,
          type: "booking",
          title: "Booking Confirmed",
          message: "Your bike rental for tomorrow has been confirmed.",
          date: new Date(2023, 4, 15, 10, 30),
        },
        {
          id: 2,
          type: "reminder",
          title: "Upcoming Rental",
          message:
            "Don't forget your bike rental scheduled for tomorrow at 2 PM.",
          date: new Date(2023, 4, 14, 14, 0),
        },
        {
          id: 3,
          type: "update",
          title: "New Bikes Available",
          message:
            "We've added new electric bikes to our fleet. Check them out!",
          date: new Date(2023, 4, 13, 9, 0),
        },
        {
          id: 4,
          type: "booking",
          title: "Booking Modification",
          message: "Your rental duration has been extended as requested.",
          date: new Date(2023, 4, 12, 16, 45),
        },
        {
          id: 5,
          type: "reminder",
          title: "Return Reminder",
          message: "Please return your rented bike by 6 PM today.",
          date: new Date(2023, 4, 11, 12, 0),
        },
        {
          id: 6,
          type: "update",
          title: "Maintenance Notice",
          message: "Our shop will be closed for maintenance on May 20th.",
          date: new Date(2023, 4, 10, 11, 30),
        },
      ],
    };
  },
  computed: {
    allNotifications() {
      return [...this.notifications].sort((a, b) => b.date - a.date); // Create a copy to avoid mutating the original array
    },
    bookingNotifications() {
      return this.notifications
        .filter((n) => n.type === "booking")
        .sort((a, b) => b.date - a.date);
    },
    reminderNotifications() {
      return this.notifications
        .filter((n) => n.type === "reminder")
        .sort((a, b) => b.date - a.date);
    },
    updateNotifications() {
      return this.notifications
        .filter((n) => n.type === "update")
        .sort((a, b) => b.date - a.date);
    },
  },

  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    },
    getBadgeVariant(type) {
      switch (type) {
        case "booking":
          return "success";
        case "reminder":
          return "warning";
        case "update":
          return "info";
        default:
          return "secondary";
      }
    },
  },
};
</script>
