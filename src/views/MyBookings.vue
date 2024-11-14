<template>
    <div>
      <NavBar />
      <b-container style="margin-top: 4rem;">
        <b-row>
          <b-col lg="10" class="mx-auto">
            <h2 class="my-4">My Bookings</h2>
            <b-card no-body>
              <b-tabs pills card horizontal>
                <b-tab title="Current & Upcoming" active>
                  <b-list-group flush>
                    <b-list-group-item
                      v-for="booking in currentAndUpcomingBookings"
                      :key="booking.id"
                      class="py-4"
                    >
                      <b-row align-v="center">
                        <b-col md="2">
                          <b-img
                            :src="booking.bikeImage"
                            fluid
                            alt="Bike"
                            class="rounded"
                          ></b-img>
                        </b-col>
                        <b-col md="4">
                          <h5 class="mb-1">{{ booking.bikeModel }}</h5>
                          <p class="mb-1">
                            <b-icon icon="calendar" class="mr-2"></b-icon>
                            {{
                              formatDateRange(booking.startDate, booking.endDate)
                            }}
                          </p>
                          <p class="mb-0">
                            <b-icon icon="geo-alt" class="mr-2"></b-icon>
                            {{ booking.pickupLocation }}
                          </p>
                        </b-col>
                        <b-col md="3">
                          <b-badge
                            :variant="getStatusVariant(booking.status)"
                            class="mb-2"
                          >
                            {{ booking.status }}
                          </b-badge>
                          <p class="mb-0">
                            <strong>Total:</strong> ${{
                              booking.totalPrice.toFixed(2)
                            }}
                          </p>
                        </b-col>
                        <b-col md="3" class="text-right">
                          <b-button
                            variant="outline-primary"
                            size="sm"
                            class="mr-2"
                            @click="showModifyModal(booking)"
                          >
                            Modify
                          </b-button>
                          <b-button
                            variant="outline-danger"
                            size="sm"
                            @click="showCancelModal(booking)"
                          >
                            Cancel
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-list-group-item>
                  </b-list-group>
                </b-tab>
                <b-tab title="Past Bookings">
                  <b-list-group flush>
                    <b-list-group-item
                      v-for="booking in pastBookings"
                      :key="booking.id"
                      class="py-4"
                    >
                      <b-row align-v="center">
                        <b-col md="2">
                          <b-img
                            :src="booking.bikeImage"
                            fluid
                            alt="Bike"
                            class="rounded"
                          ></b-img>
                        </b-col>
                        <b-col md="4">
                          <h5 class="mb-1">{{ booking.bikeModel }}</h5>
                          <p class="mb-1">
                            <b-icon icon="calendar" class="mr-2"></b-icon>
                            {{
                              formatDateRange(booking.startDate, booking.endDate)
                            }}
                          </p>
                          <p class="mb-0">
                            <b-icon icon="geo-alt" class="mr-2"></b-icon>
                            {{ booking.pickupLocation }}
                          </p>
                        </b-col>
                        <b-col md="3">
                          <b-badge
                            :variant="getStatusVariant(booking.status)"
                            class="mb-2"
                          >
                            {{ booking.status }}
                          </b-badge>
                          <p class="mb-0">
                            <strong>Total:</strong> ${{
                              booking.totalPrice.toFixed(2)
                            }}
                          </p>
                        </b-col>
                        <b-col md="3" class="text-right">
                          <b-button
                            v-if="!booking.reviewed"
                            variant="outline-primary"
                            size="sm"
                            @click="showReviewModal(booking)"
                          >
                            Write Review
                          </b-button>
                          <b-badge v-else variant="success">Reviewed</b-badge>
                        </b-col>
                      </b-row>
                    </b-list-group-item>
                  </b-list-group>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
  
        <!-- Modify Booking Modal -->
        <b-modal id="modify-modal" title="Modify Booking" @ok="modifyBooking">
          <b-form>
            <b-form-group label="Start Date">
              <b-form-datepicker
                v-model="modifiedBooking.startDate"
                class="mb-2"
              ></b-form-datepicker>
            </b-form-group>
            <b-form-group label="End Date">
              <b-form-datepicker
                v-model="modifiedBooking.endDate"
                class="mb-2"
              ></b-form-datepicker>
            </b-form-group>
            <b-form-group label="Pickup Location">
              <b-form-select
                v-model="modifiedBooking.pickupLocation"
                :options="pickupLocations"
              ></b-form-select>
            </b-form-group>
          </b-form>
        </b-modal>
  
        <!-- Cancel Booking Modal -->
        <b-modal id="cancel-modal" title="Cancel Booking" @ok="cancelBooking">
          <p>Are you sure you want to cancel this booking?</p>
          <p><strong>Bike:</strong> {{ selectedBooking.bikeModel }}</p>
          <p>
            <strong>Dates:</strong>
            {{
              formatDateRange(selectedBooking.startDate, selectedBooking.endDate)
            }}
          </p>
          <p>
            <strong>Pickup Location:</strong> {{ selectedBooking.pickupLocation }}
          </p>
        </b-modal>
  
        <!-- Review Modal -->
        <b-modal id="review-modal" title="Write a Review" @ok="submitReview">
          <b-form>
            <b-form-group label="Rating">
              <b-form-rating
                v-model="review.rating"
                variant="warning"
                class="mb-2"
              ></b-form-rating>
            </b-form-group>
            <b-form-group label="Comments">
              <b-form-textarea
                v-model="review.comments"
                placeholder="Share your experience..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-form>
        </b-modal>
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
        currentAndUpcomingBookings: [
          {
            id: 1,
            bikeModel: "Mountain Explorer X1",
            bikeImage: "/placeholder.svg?height=80&width=120",
            startDate: "2023-05-20",
            endDate: "2023-05-22",
            status: "Confirmed",
            pickupLocation: "Koramangala",
            totalPrice: 120.0,
          },
          {
            id: 2,
            bikeModel: "City Cruiser C2",
            bikeImage: "/placeholder.svg?height=80&width=120",
            startDate: "2023-06-01",
            endDate: "2023-06-03",
            status: "Pending",
            pickupLocation: "Airport Location",
            totalPrice: 90.0,
          },
        ],
        pastBookings: [
          {
            id: 3,
            bikeModel: "Electric Rider E3",
            bikeImage: "/placeholder.svg?height=80&width=120",
            startDate: "2023-04-15",
            endDate: "2023-04-18",
            status: "Completed",
            pickupLocation: "Indranagar",
            totalPrice: 180.0,
            reviewed: true,
          },
          {
            id: 4,
            bikeModel: "Tandem Dream T1",
            bikeImage: "/placeholder.svg?height=80&width=120",
            startDate: "2023-03-10",
            endDate: "2023-03-12",
            status: "Completed",
            pickupLocation: "MG Road",
            totalPrice: 150.0,
            reviewed: false,
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
          { value: "Indranagar", text: "Indranagar" },
          { value: "MG Road", text: "MG Road" },
        ],
      };
    },
    methods: {
      formatDateRange(start, end) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        const startDate = new Date(start).toLocaleDateString(undefined, options);
        const endDate = new Date(end).toLocaleDateString(undefined, options);
        return `${startDate} - ${endDate}`;
      },
      getStatusVariant(status) {
        switch (status) {
          case "Confirmed":
            return "success";
          case "Pending":
            return "warning";
          case "Completed":
            return "info";
          case "Cancelled":
            return "danger";
          default:
            return "secondary";
        }
      },
      showModifyModal(booking) {
        this.modifiedBooking = { ...booking };
        this.$bvModal.show("modify-modal");
      },
      modifyBooking() {
        // Here you would typically send an API request to modify the booking
        console.log("Modifying booking:", this.modifiedBooking);
        const index = this.currentAndUpcomingBookings.findIndex(
          (b) => b.id === this.modifiedBooking.id
        );
        if (index !== -1) {
          this.currentAndUpcomingBookings[index] = { ...this.modifiedBooking };
        }
        this.$bvToast.toast(
          `Booking for ${this.modifiedBooking.bikeModel} has been modified`,
          {
            title: "Booking Modified",
            variant: "success",
            solid: true,
          }
        );
      },
      showCancelModal(booking) {
        this.selectedBooking = booking;
        this.$bvModal.show("cancel-modal");
      },
      cancelBooking() {
        // Here you would typically send an API request to cancel the booking
        console.log("Cancelling booking:", this.selectedBooking);
        const index = this.currentAndUpcomingBookings.findIndex(
          (b) => b.id === this.selectedBooking.id
        );
        if (index !== -1) {
          this.currentAndUpcomingBookings[index].status = "Cancelled";
        }
        this.$bvToast.toast(
          `Booking for ${this.selectedBooking.bikeModel} has been cancelled`,
          {
            title: "Booking Cancelled",
            variant: "warning",
            solid: true,
          }
        );
      },
      showReviewModal(booking) {
        this.selectedBooking = booking;
        this.review = { rating: 0, comments: "" };
        this.$bvModal.show("review-modal");
      },
      submitReview() {
        // Here you would typically send an API request to submit the review
        console.log(
          "Submitting review for booking:",
          this.selectedBooking.id,
          this.review
        );
        const index = this.pastBookings.findIndex(
          (b) => b.id === this.selectedBooking.id
        );
        if (index !== -1) {
          this.pastBookings[index].reviewed = true;
        }
        this.$bvToast.toast(
          `Review submitted for ${this.selectedBooking.bikeModel}`,
          {
            title: "Review Submitted",
            variant: "success",
            solid: true,
          }
        );
      },
    },
  };
  </script>
  