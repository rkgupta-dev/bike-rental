<template>
    <div>
      <NavBar/>
      <b-container style="margin-top: 4rem;">
        <b-row>
          <b-col lg="10" class="mx-auto">
            <h2 class="my-4">Rental History</h2>
            <b-card>
              <b-table
                :items="rentalHistory"
                :fields="fields"
                striped
                hover
                responsive
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
              >
                <template #cell(bikeModel)="data">
                  <div class="d-flex align-items-center">
                    <b-avatar
                      :src="data.item.bikeImage"
                      size="3rem"
                      class="mr-3"
                    ></b-avatar>
                    {{ data.item.bikeModel }}
                  </div>
                </template>
  
                <template #cell(rentalDates)="data">
                  {{ formatDateRange(data.item.startDate, data.item.endDate) }}
                </template>
  
                <template #cell(status)="data">
                  <b-badge :variant="getStatusVariant(data.item.status)">
                    {{ data.item.status }}
                  </b-badge>
                </template>
  
                <template #cell(actions)="data">
                  <b-button
                    v-if="data.item.status === 'Completed'"
                    variant="outline-primary"
                    size="sm"
                    @click="showReviewModal(data.item)"
                  >
                    <i class="fas fa-star mr-1"></i> Review
                  </b-button>
                  <b-button
                    v-if="data.item.status === 'Active'"
                    variant="outline-danger"
                    size="sm"
                    @click="showCancelModal(data.item)"
                  >
                    <i class="fas fa-times mr-1"></i> Cancel
                  </b-button>
                </template>
              </b-table>
  
              <div class="d-flex justify-content-between align-items-center mt-3">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  aria-controls="rental-history-table"
                ></b-pagination>
                <b-form-select
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
                  class="w-25"
                ></b-form-select>
              </div>
            </b-card>
          </b-col>
        </b-row>
  
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
  
        <!-- Cancel Modal -->
        <b-modal id="cancel-modal" title="Cancel Rental" @ok="cancelRental">
          <p>Are you sure you want to cancel this rental?</p>
          <p><strong>Bike:</strong> {{ selectedRental.bikeModel }}</p>
          <p>
            <strong>Dates:</strong>
            {{
              formatDateRange(selectedRental.startDate, selectedRental.endDate)
            }}
          </p>
        </b-modal>
      </b-container>
    </div>
  </template>
  
  <script>
  import NavBar from './NavBar.vue';
  
  export default {
      components: {
          NavBar
      },
    data() {
      return {
        rentalHistory: [
          {
            id: 1,
            bikeModel: "Mountain Explorer X1",
            bikeImage: "/placeholder.svg?height=48&width=48",
            startDate: "2023-05-01",
            endDate: "2023-05-03",
            status: "Completed",
          },
          {
            id: 2,
            bikeModel: "City Cruiser C2",
            bikeImage: "/placeholder.svg?height=48&width=48",
            startDate: "2023-05-10",
            endDate: "2023-05-11",
            status: "Cancelled",
          },
          {
            id: 3,
            bikeModel: "Electric Rider E3",
            bikeImage: "/placeholder.svg?height=48&width=48",
            startDate: "2023-05-15",
            endDate: "2023-05-18",
            status: "Active",
          },
          {
            id: 4,
            bikeModel: "Passion PRO",
            bikeImage: "/placeholder.svg?height=48&width=48",
            startDate: "2024-06-16",
            endDate: "2024-07-17",
            status: "Completed",
          },
          // Add more rental history items here
        ],
        fields: [
          { key: "bikeModel", label: "Bike", sortable: true },
          { key: "rentalDates", label: "Rental Dates", sortable: true },
          { key: "status", label: "Status", sortable: true },
          { key: "actions", label: "Actions" },
        ],
        sortBy: "startDate",
        sortDesc: true,
        currentPage: 1,
        perPage: 10,
        pageOptions: [5, 10, 15, 20],
        review: {
          rating: 0,
          comments: "",
        },
        selectedRental: {},
      };
    },
    computed: {
      totalRows() {
        return this.rentalHistory.length;
      },
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
          case "Completed":
            return "success";
          case "Active":
            return "primary";
          case "Cancelled":
            return "danger";
          default:
            return "secondary";
        }
      },
      showReviewModal(rental) {
        this.selectedRental = rental;
        this.review = { rating: 0, comments: "" };
        this.$bvModal.show("review-modal");
      },
      submitReview() {
        // Here you would typically send an API request to submit the review
        console.log(
          "Submitting review for rental:",
          this.selectedRental.id,
          this.review
        );
        this.$bvToast.toast(
          `Review submitted for ${this.selectedRental.bikeModel}`,
          {
            title: "Review Submitted",
            variant: "success",
            solid: true,
          }
        );
      },
      showCancelModal(rental) {
        this.selectedRental = rental;
        this.$bvModal.show("cancel-modal");
      },
      cancelRental() {
        // Here you would typically send an API request to cancel the rental
        console.log("Cancelling rental:", this.selectedRental.id);
        const index = this.rentalHistory.findIndex(
          (r) => r.id === this.selectedRental.id
        );
        if (index !== -1) {
          this.rentalHistory[index].status = "Cancelled";
        }
        this.$bvToast.toast(
          `Rental for ${this.selectedRental.bikeModel} has been cancelled`,
          {
            title: "Rental Cancelled",
            variant: "warning",
            solid: true,
          }
        );
      },
    },
  };
  </script>
  
  <style scoped>
 
  </style>
  