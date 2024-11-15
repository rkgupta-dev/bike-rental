<template>
  <div
    class="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5"
  >
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" md="8" lg="6">
          <b-card class="border-0 shadow-lg">
            <div class="text-center mb-4">
              <b-icon
                icon="check-circle"
                variant="success"
                class="mb-3 animated-icon large-icon"
              />
              <h2 class="mt-3 mb-2">Payment Successful!</h2>
              <p class="text-muted">
                Thank you for choosing BikeOntrack! Your booking is confirmed,
                and your ride awaits you soon.
              </p>
              <strong class="text-muted">{{ formattedDateTime }}</strong>
            </div>

            <b-list-group flush>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span>Order ID:</span>
                <strong>#{{ orderId }}</strong>
              </b-list-group-item>
              
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span>Payment Method:</span>
                <strong>Credit Card</strong>
              </b-list-group-item>
            </b-list-group>
            <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span>Amount Paid:</span>
                <strong>₹ {{ bookingDetails.totalPrice }}/-</strong>
              </b-list-group-item>

            <div class="text-center mt-4">
              <b-button variant="primary" to="/" class="my-2 mr-2">
                <b-icon icon="house" class="mr-2" />
                Home
              </b-button>
              <b-button variant="success" @click="downloadReceipt">
                <b-icon icon="download" class="mr-2" />
                Receipt
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookingDetails: {},
      formattedDateTime: "",
      orderId: "",
    };
  },
  created() {
    // Retrieve booking details from localStorage
    const details = localStorage.getItem("bookingDetails");
    if (details) {
      this.bookingDetails = JSON.parse(details);
    }

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    this.formattedDateTime = `${date} - ${time}`;

    // Generate a random order ID
    this.orderId = this.generateOrderId();
  },
  methods: {
    generateOrderId() {
      // Generate a random 8-digit number
      return Math.floor(10000000 + Math.random() * 90000000);
    },
    downloadReceipt(){
      alert("Your Recipt Downloding.......")
    }

  },
};
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa;
}

.card {
  border-radius: 1rem;
}

.list-group-item {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
.large-icon {
  font-size: 4rem; /* Adjust the size as needed */
}

/* Animation for the icon */
@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Apply the bounce animation */
.animated-icon {
  animation: bounce 1s ease infinite;
}
</style>
