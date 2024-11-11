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
              <h1 class="mt-3 mb-2">Payment Successful!</h1>
              <p class="text-muted">
                Thank you for your purchase. Your order has been processed
                successfully.
              </p>
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
                <span>Amount Paid:</span>
                <strong>{{ formatCurrency(amount) }}</strong>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span>Payment Method:</span>
                <strong>{{ paymentMethod }}</strong>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span>Date:</span>
                <strong>{{ formatDate(date) }}</strong>
              </b-list-group-item>
            </b-list-group>

            <div class="text-center mt-4">
              <b-button variant="primary" to="/">
                <b-icon icon="house" class="mr-2" />
                Back to Home
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "PaymentSuccessPage",
  components: {},
  setup() {
    const orderId = ref("ORD-12345");
    const amount = ref(99.99);
    const paymentMethod = ref("Credit Card");
    const date = ref(new Date());

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    };

    const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    };

    return {
      orderId,
      amount,
      paymentMethod,
      date,
      formatCurrency,
      formatDate,
    };
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
