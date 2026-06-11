<template>
  <div class="bookings-page section gradient-light">
    <b-container>
      <div class="listing-top-area">
        <b-breadcrumb class="custom-breadcrumb">
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item to="/my-profile">Profile</b-breadcrumb-item>
          <b-breadcrumb-item to="/my-bookings" active
            >Bookings</b-breadcrumb-item
          >
        </b-breadcrumb>
      </div>

      <!-- TABS -->
      <div class="booking-tabs mb-4">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'current' }"
          @click="activeTab = 'current'"
        >
          Current & Upcoming
        </button>

        <button
          class="tab-btn"
          :class="{ active: activeTab === 'past' }"
          @click="activeTab = 'past'"
        >
          Past Bookings
        </button>
      </div>

      <!-- CURRENT BOOKINGS -->
      <div v-if="activeTab === 'current'">
        <div
          v-for="booking in currentAndUpcomingBookings"
          :key="booking.id"
          class="card-app booking-card mb-4"
        >
          <b-row align-v="center">
            <!-- IMAGE -->
            <b-col lg="3" md="4" class="mb-3 mb-md-0">
              <img :src="booking.bikeImage" class="booking-image" alt="Bike" />
            </b-col>

            <!-- INFO -->
            <b-col lg="6" md="5">
              <div class="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <h4 class="mb-0">{{ booking.bikeModel }}</h4>

                <span
                  class="status-badge ml-2"
                  :class="getStatusClass(booking.status)"
                >
                  {{ booking.status }}
                </span>
              </div>

              <div class="booking-info">
                <div class="info-row">
                  <i class="fa-solid fa-calendar-days"></i>
                  <span>
                    {{ formatDateRange(booking.startDate, booking.endDate) }}
                  </span>
                </div>

                <div class="info-row">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>{{ booking.pickupLocation }}</span>
                </div>

                <div class="info-row">
                  <i class="fa-solid fa-wallet"></i>
                  <span>₹ {{ booking.totalPrice }}</span>
                </div>
              </div>
            </b-col>

            <!-- ACTIONS -->
            <b-col lg="3" md="3">
              <div class="booking-actions">
                <!-- <button
                  class="btn-secondary-app w-100"
                  @click="showModifyModal(booking)"
                >
                  Modify Booking
                </button> -->

                <button
                  v-if="booking.status === 'Pending'"
                  class="btn-danger-app w-100"
                  @click="showCancelModal(booking)"
                >
                  Cancel Booking
                </button>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>

      <!-- PAST BOOKINGS -->
      <div v-if="activeTab === 'past'">
        <div
          v-for="booking in pastBookings"
          :key="booking.id"
          class="card-app booking-card mb-4"
        >
          <b-row align-v="center">
            <!-- IMAGE -->
            <b-col lg="3" md="4" class="mb-3 mb-md-0">
              <img :src="booking.bikeImage" class="booking-image" alt="Bike" />
            </b-col>

            <!-- INFO -->
            <b-col lg="6" md="5">
              <div class="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <h4 class="mb-0">{{ booking.bikeModel }}</h4>

                <span class="status-badge status-completed ml-2">
                  Completed
                </span>
              </div>

              <div class="booking-info">
                <div class="info-row">
                  <i class="fa-solid fa-calendar-days"></i>
                  <span>
                    {{ formatDateRange(booking.startDate, booking.endDate) }}
                  </span>
                </div>

                <div class="info-row">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>{{ booking.pickupLocation }}</span>
                </div>

                <div class="info-row">
                  <i class="fa-solid fa-wallet"></i>
                  <span>₹ {{ booking.totalPrice }}</span>
                </div>
              </div>
            </b-col>

            <!-- ACTION -->
            <b-col lg="3" md="3">
              <button
                v-if="!booking.reviewed"
                class="btn-primary-app w-100 mt-3"
                @click="showReviewModal(booking)"
              >
                Write Review
              </button>

              <div v-else class="reviewed-box mt-3">
                <i class="fa-solid fa-circle-check"></i>
                Reviewed
              </div>
            </b-col>
          </b-row>
        </div>
      </div>

      <!-- MODIFY MODAL -->
      <b-modal
        id="modify-modal"
        centered
        title="Modify Booking"
        @ok="modifyBooking"
      >
        <div class="mb-3">
          <label class="form-label-app">Start Date</label>
          <b-form-datepicker
            v-model="modifiedBooking.startDate"
          ></b-form-datepicker>
        </div>

        <div class="mb-3">
          <label class="form-label-app">End Date</label>
          <b-form-datepicker
            v-model="modifiedBooking.endDate"
          ></b-form-datepicker>
        </div>

        <div>
          <label class="form-label-app">Pickup Location</label>

          <b-form-select
            v-model="modifiedBooking.pickupLocation"
            :options="pickupLocations"
          ></b-form-select>
        </div>
      </b-modal>

      <!-- CANCEL MODAL -->
      <b-modal
        id="cancel-modal"
        centered
        title="Cancel Booking"
        @ok="cancelBooking"
      >
        <div class="text-center py-3">
          <div class="cancel-icon mb-3">
            <i class="fa-solid fa-circle-xmark"></i>
          </div>

          <h5>{{ selectedBooking.bikeModel }}</h5>

          <p class="text-muted mb-0">
            Are you sure you want to cancel this booking?
          </p>
        </div>
      </b-modal>

      <!-- REVIEW MODAL -->
      <b-modal
        id="review-modal"
        centered
        title="Write Review"
        @ok="submitReview"
      >
        <div class="mb-3">
          <label class="form-label-app">Rating</label>

          <b-form-rating
            v-model="review.rating"
            variant="warning"
          ></b-form-rating>
        </div>

        <div>
          <label class="form-label-app">Comments</label>

          <textarea
            class="input-app"
            rows="4"
            placeholder="Share your experience..."
            v-model="review.comments"
          ></textarea>
        </div>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "MyBookings",

  components: {},

  data() {
    return {
      activeTab: "current",

      currentAndUpcomingBookings: [
        {
          id: 1,
          bikeModel: "Honda Dio",
          bikeImage:
            "https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fscooter%2Fdio-110%2Fdio-110-get-to-know-your-ride.png%3Fh%3D450%26iar%3D0%26w%3D584&w=1200&q=75&dpl=dpl_EhQodG3bD29Cmhqe3rsY7FF6P4Dd",
          startDate: "2026-05-10",
          endDate: "2026-05-12",
          status: "Ongoing",
          pickupLocation: "Koramangala",
          totalPrice: 1299,
        },
        {
          id: 2,
          bikeModel: "Honda NX200",
          bikeImage:
            "https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fmotorcycle%2Fnx200%2Fget-to-know-your-ride.png%3Fh%3D450%26iar%3D0%26w%3D584&w=1200&q=75&dpl=dpl_EhQodG3bD29Cmhqe3rsY7FF6P4Dd",
          startDate: "2026-05-18",
          endDate: "2026-05-20",
          status: "Pending",
          pickupLocation: "Airport Location",
          totalPrice: 2400,
        },
      ],

      pastBookings: [
        {
          id: 3,
          bikeModel: "Honda Shine",
          bikeImage:
            "https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fmotorcycle%2FShine-100%2Fshine100-get-to-know-your-ride.png%3Fh%3D450%26iar%3D0%26w%3D584&w=1200&q=75&dpl=dpl_EhQodG3bD29Cmhqe3rsY7FF6P4Dd",
          startDate: "2026-04-10",
          endDate: "2026-04-12",
          pickupLocation: "Indiranagar",
          totalPrice: 1400,
          reviewed: false,
        },

        {
          id: 4,
          bikeModel: "Honda Activa",
          bikeImage:
            "https://www.honda2wheelersindia.com/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fhondamotorc388f-hmsi8ece-prodb777-e813%2Fmedia%2FProject%2FHONDA2WI%2Fhonda2wheelersindia%2Fscooter%2FActiva-110%2FGet-to-know-your-ride%2FGet-to-know-your-ride-584x450.png%3Fh%3D450%26iar%3D0%26w%3D584&w=1200&q=75&dpl=dpl_EhQodG3bD29Cmhqe3rsY7FF6P4Dd",
          startDate: "2026-05-18",
          endDate: "2026-05-21",
          pickupLocation: "Koramangala",
          totalPrice: 2899,
          reviewed: true,
        },
      ],

      modifiedBooking: {},
      selectedBooking: {},

      review: {
        rating: 0,
        comments: "",
      },

      pickupLocations: [
        { value: "Koramangala", text: "Koramangala" },
        { value: "Airport Location", text: "Airport Location" },
        { value: "Indiranagar", text: "Indiranagar" },
        { value: "MG Road", text: "MG Road" },
      ],
    };
  },

  methods: {
    formatDateRange(start, end) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };

      return `${new Date(start).toLocaleDateString(
        undefined,
        options,
      )} - ${new Date(end).toLocaleDateString(undefined, options)}`;
    },

    getStatusClass(status) {
      if (status === "Ongoing") return "status-confirmed";
      if (status === "Pending") return "status-pending";
      if (status === "Cancelled") return "status-cancelled";

      return "";
    },

    showModifyModal(booking) {
      this.modifiedBooking = { ...booking };
      this.$bvModal.show("modify-modal");
    },

    modifyBooking() {
      const index = this.currentAndUpcomingBookings.findIndex(
        (b) => b.id === this.modifiedBooking.id,
      );

      if (index !== -1) {
        this.currentAndUpcomingBookings[index] = {
          ...this.modifiedBooking,
        };
      }

      this.$bvToast.toast("Booking updated successfully", {
        title: "Success",
        variant: "success",
        solid: true,
        toaster: "b-toaster-bottom-right",
      });
    },

    showCancelModal(booking) {
      this.selectedBooking = booking;
      this.$bvModal.show("cancel-modal");
    },

    cancelBooking() {
      const index = this.currentAndUpcomingBookings.findIndex(
        (b) => b.id === this.selectedBooking.id,
      );

      if (index !== -1) {
        this.currentAndUpcomingBookings[index].status = "Cancelled";
      }

      this.$bvToast.toast("Booking cancelled successfully", {
        title: "Cancelled",
        variant: "success",
        solid: true,
        toaster: "b-toaster-bottom-right",
      });
    },

    showReviewModal(booking) {
      this.selectedBooking = booking;

      this.review = {
        rating: 0,
        comments: "",
      };

      this.$bvModal.show("review-modal");
    },

    submitReview() {
      const index = this.pastBookings.findIndex(
        (b) => b.id === this.selectedBooking.id,
      );

      if (index !== -1) {
        this.pastBookings[index].reviewed = true;
      }

      this.$bvToast.toast("Review submitted successfully", {
        title: "Success",
        variant: "success",
        solid: true,
        toaster: "b-toaster-bottom-right",
      });
    },
  },
};
</script>

<style scoped>
.booking-tabs {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tab-btn {
  border: none;
  background: white;
  padding: 0.85rem 1.3rem;
  border-radius: 14px;
  font-weight: 600;
  transition: 0.2s ease;
}

.tab-btn.active {
  background: var(--color-primary);
  color: white;
}

.booking-card {
  overflow: hidden;
}

.booking-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 18px;
}

.booking-info {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-gray-600);
}

.info-row i {
  color: var(--color-primary);
}

.booking-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-badge {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.status-confirmed {
  background: #dcfce7;
  color: #15803d;
}

.status-pending {
  background: #fef3c7;
  color: #b45309;
}

.status-cancelled {
  background: #fee2e2;
  color: #dc2626;
}

.status-completed {
  background: #dbeafe;
  color: #1d4ed8;
}

.reviewed-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem;
  border-radius: 14px;
  background: #dcfce7;
  color: #15803d;
  font-weight: 700;
}

.cancel-icon {
  font-size: 3rem;
  color: #ef4444;
}

@media (max-width: 768px) {
  .booking-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .booking-stats {
    width: 100%;
  }

  .stat-box {
    flex: 1;
  }

  .booking-image {
    height: 220px;
  }

  .booking-actions {
    margin-top: 1rem;
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

/* ===== Attractive Minimal Modal Design ===== */

::v-deep .modal-content {
  border: none;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

::v-deep .modal-header {
  border-bottom: 1px solid #f1f5f9;
  padding: 1.2rem 1.5rem;
}

::v-deep .modal-title {
  font-weight: 700;
  font-size: 1.1rem;
}

::v-deep .modal-body {
  padding: 1.5rem;
}

::v-deep .modal-footer {
  border-top: 1px solid #f1f5f9;
  padding: 1rem 1.5rem;
}

::v-deep .modal-footer .btn {
  border-radius: 14px;
  font-weight: 600;
  padding: 0.7rem 1.2rem;
  border: none;
  transition: 0.2s ease;
}

::v-deep .modal-footer .btn-primary {
  background: var(--color-primary);
}

::v-deep .modal-footer .btn-primary:hover {
  transform: translateY(-2px);
}

::v-deep .modal-footer .btn-secondary {
  background: #f1f5f9;
  color: #111827;
}

/* Inputs */
::v-deep .form-control,
::v-deep .custom-select,
.input-app {
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  padding: 0.8rem 1rem;
  transition: 0.2s ease;
}

::v-deep .form-control:focus,
::v-deep .custom-select:focus,
.input-app:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
}

/* Cancel Dialog */
.cancel-icon {
  width: 75px;
  height: 75px;
  margin: auto;
  border-radius: 50%;
  background: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel-icon i {
  font-size: 2.3rem;
  color: #ef4444;
}

/* Rating */
::v-deep .b-rating {
  justify-content: center;
}
</style>
