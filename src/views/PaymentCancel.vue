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
                icon="x-circle"
                variant="danger"
                class="mb-3 animated-icon large-icon"
              />
              <h2 class="mt-3 mb-2 text-danger">Payment Cancelled</h2>
              <p class="text-muted">
                Payment failed! Please try again or contact support if you need help.
              </p>
            </div>

            <!-- <b-list-group flush>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <span>Order ID:</span>
                  <strong>#{{ orderId }}</strong>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <span>Amount Due:</span>
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
              </b-list-group> -->

            <div class="d-flex justify-content-center align-items-center mt-4">
              <b-button variant="success" @click="retryPayment" class="my-2">
                <b-icon icon="arrow-repeat" class="mr-2" />
                Retry
              </b-button>
              <b-button variant="secondary" to="/" class="ml-2">
                <b-icon icon="house" class="mr-2" />
                Home
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
  name: "PaymentCancel",
  components: {},

  methods: {
    retryPayment() {
      window.history.back();
    },
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
  background-color: #dc3545;
  border-color: #dc3545;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #b02a37;
  border-color: #b02a37;
}

.btn-secondary {
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #6c757d;
}

.large-icon {
  font-size: 4rem;
}

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

.animated-icon {
  animation: bounce 1s ease infinite;
}
</style>
