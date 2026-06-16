<template>
  <div class="section">
    <b-container>
      <div v-if="booking">
        <b-row>
          <!-- LEFT -->
          <b-col lg="8" class="mb-4">
            <div class="checkout-card">
              <h2 class="summary-title mb-4">Summary</h2>

              <div class="summary-layout">
                <!-- IMAGE -->
                <div class="bike-side">
                  <img :src="booking.bike.image" class="checkout-img" />

                  <h4 class="bike-name">
                    {{ booking.bike.name }}
                  </h4>

                  <span class="bike-type">
                    {{ booking.bike.type }}
                  </span>
                </div>

                <!-- DETAILS -->
                <div class="details-side">
                  <!-- DATE -->
                  <div class="date-row">
                    <div>
                      <h4>
                        {{ booking.pickup.time }}
                      </h4>

                      <p>
                        {{ booking.pickup.date }}
                      </p>
                    </div>

                    <div class="to-text">to</div>

                    <div class="text-right">
                      <h4>
                        {{ booking.dropoff.time }}
                      </h4>

                      <p>
                        {{ booking.dropoff.date }}
                      </p>
                    </div>
                  </div>

                  <!-- LOCATION -->
                  <div class="info-row border-top">
                    <div>
                      <h6>Pickup Location</h6>

                      <p>
                        {{ booking.pickup.location }}
                      </p>
                    </div>
                  </div>

                  <!-- HELMET -->
                  <div class="info-row border-top">
                    <div>
                      <h6>ISI-marked Helmet</h6>

                      <small> Included in booking </small>
                    </div>

                    <b-form-select
                      v-model="helmetQty"
                      :options="helmetOptions"
                      class="helmet-select"
                    ></b-form-select>
                  </div>

                  <!-- KM -->
                  <div class="info-row border-top">
                    <div>
                      <h6>Km limit</h6>

                      <small> Excess km charges </small>
                    </div>

                    <div class="text-right">
                      <h6>1336 km</h6>

                      <small> ₹6.0/km </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>

          <!-- RIGHT -->
          <b-col lg="4">
            <div class="billing-card">
              <h3 class="billing-title">Billing Details</h3>

              <!-- BILL -->
              <div class="bill-area">
                <div class="bill-row">
                  <span> Vehicle Rental Charges </span>

                  <strong> ₹{{ booking.totalPrice }} </strong>
                </div>

                <div class="bill-row">
                  <span> Taxes </span>

                  <span> ₹{{ tax }} </span>
                </div>

                <div class="bill-row">
                  <span> Refundable Deposit </span>

                  <span>₹0</span>
                </div>

                <div class="bill-row" v-if="helmetCharge > 0">
                  <span> Helmet Charges </span>
                  <span> ₹{{ helmetCharge }} </span>
                </div>

                <div class="bill-row" v-if="discount > 0">
                  <span> Discount </span>
                  <span class="text-success"> -₹{{ discount }} </span>
                </div>

                <div class="bill-row total-row">
                  <strong> Total Due </strong>

                  <strong class="total-price"> ₹{{ finalTotal }} </strong>
                </div>
              </div>

              <!-- COUPON -->
              <div class="coupon-area mb-4">
                <div class="coupon-box">
                  <input
                    v-model="couponCode"
                    type="text"
                    placeholder="Enter promo code"
                    class="coupon-input"
                  />

                  <button
                    class="apply-btn"
                    @click="applyCoupon"
                    :disabled="!couponCode"
                  >
                    Apply
                  </button>
                </div>

                <small v-if="couponApplied" class="coupon-success">
                  Coupon applied successfully
                </small>
              </div>

              <!-- BUTTON -->
              <button
                class="btn-primary-app w-100 payment-btn"
                @click="completeBooking"
              >
                <i class="fa-solid fa-credit-card"></i> Make payment
              </button>

              <!-- NOTE -->
              <!-- <div class="note-box">
                <i class="fa-solid fa-shield-halved"></i>
                <p>Secure encrypted payment.</p>
              </div> -->

              <div class="text-right mt-3">
                <a href="/frequently-asked-questions"> Terms & Conditions </a>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      booking: null,

      helmetQty: 1,

      helmetOptions: [1, 2, 3],

      couponCode: "",

      couponApplied: false,

      discount: 0,
    };
  },

  computed: {
    tax() {
      return Math.round(this.booking.totalPrice * 0.18);
    },

    helmetCharge() {
      const extra = Math.max(0, this.helmetQty - 1);
      return extra * 500;
    },

    finalTotal() {
      let total =
        this.booking.totalPrice + this.tax + this.helmetCharge - this.discount;

      return total;
    },
  },

  mounted() {
    const bookingData = localStorage.getItem("bikeBooking");

    const verificationData = localStorage.getItem("verificationData");

    if (!verificationData) {
      this.$router.push({
        name: "verify-document",
      });

      return;
    }

    if (bookingData) {
      this.booking = JSON.parse(bookingData);
    }
  },

  methods: {
    applyCoupon() {
      if (this.couponCode === "BIKE100") {
        this.discount = 100;

        this.couponApplied = true;

        this.$bvToast.toast("Coupon applied successfully", {
          title: "Success",
          variant: "success",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });
      } else {
        this.discount = 0;

        this.couponApplied = false;

        this.$bvToast.toast("Invalid coupon code", {
          title: "Invalid Coupon",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });
      }
    },

    completeBooking() {
      // ================= GET BOOKING =================
      const booking = JSON.parse(localStorage.getItem("bikeBooking"));

      if (!booking) {
        this.$bvToast.toast("Booking data missing!", {
          title: "Error",
          variant: "danger",
          solid: true,
        });
        return;
      }

      // ================= SAVE FOR SAFETY =================
      localStorage.setItem("bookingDetails", JSON.stringify(booking));

      // ================= RAZORPAY OPTIONS =================
      const options = {
        key: process.env.VUE_APP_RAZORPAY_KEY,
        amount: Math.round(booking.totalPrice * 100),
        currency: "INR",

        name: "BikeOntrack",
        description: `${booking.bike.name} Booking Payment`,
        image: booking.bike.image,

        handler: (response) => {
          // SUCCESS
          this.$router.push({
            name: "payment-verify",
            query: {
              status: "success",
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,

              // booking details passed
              bike: booking.bike.name,
              amount: booking.totalPrice,
              pickup: booking.pickup.location,
              date: booking.pickup.date,
            },
          });

          this.$bvToast.toast("Payment Successful!", {
            title: "Success",
            variant: "success",
            solid: true,
            toaster: "b-toaster-bottom-right",
          });

          localStorage.removeItem("bikeBooking");
          localStorage.removeItem("verificationData");
        },

        prefill: {
          name: "BikeOntrack User",
          email: "user@example.com",
          contact: "9999999999",
        },

        notes: {
          bike_id: booking.bike.id,
          bike_name: booking.bike.name,
          pickup_location: booking.pickup.location,
          pickup_date: booking.pickup.date,
          dropoff_date: booking.dropoff.date,
          rental_days: booking.rentalDays,
          total_price: booking.totalPrice,
        },

        theme: {
          color: "#4238ca",
        },
      };

      const rzp = new window.Razorpay(options);

      // ================= FAILED =================
      rzp.on("payment.failed", (response) => {
        this.$router.push({
          name: "payment-verify",
          query: {
            status: "failed",
            error: response.error.description,
            bike: booking.bike.name,
          },
        });
      });

      rzp.open();
    },
  },
};
</script>

<style scoped>
.checkout-page {
  background: #f5f7fb;
  min-height: 100vh;
  padding: 40px 0;
}

.checkout-card,
.billing-card {
  background: #fff;
  border-radius: 24px;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.summary-title,
.billing-title {
  font-weight: 700;
}

/* SUMMARY */
.summary-layout {
  display: flex;
  gap: 30px;
}

.bike-side {
  width: 260px;
  text-align: center;
}

.checkout-img {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.bike-name {
  font-weight: 700;
  margin-top: 20px;
}

.bike-type {
  background: #eef2ff;
  color: #4338ca;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
}

.details-side {
  flex: 1;
}

.date-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-row h4 {
  font-weight: 700;
}

.date-row p {
  margin: 0;
  color: #6b7280;
}

.to-text {
  font-size: 18px;
  color: #6b7280;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
}

.border-top {
  border-top: 1px solid #eee;
}

.info-row h6 {
  margin-bottom: 4px;
  font-weight: 600;
}

.info-row p,
.info-row small {
  margin: 0;
  color: #6b7280;
}

.helmet-select {
  width: 90px;
  border-radius: 12px;
}

/* BILLING */

.coupon-box {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  background: #fff;
  overflow: hidden;
  transition: 0.2s ease;
}

.coupon-box:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.04);
}

.coupon-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;

  padding: 0 16px;
  font-size: 15px;
  color: var(--color-dark);
}

.coupon-input::placeholder {
  color: var(--color-gray-500);
}

.apply-btn {
  border: none;
  background: #4238ca;
  color: #fff;
  height: 42px;
  padding: 0 22px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

.apply-btn:hover {
  opacity: 0.92;
}

.apply-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.coupon-success {
  display: inline-block;
  margin-top: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #16a34a;
}

.bill-area {
  margin-top: 30px;
}

.bill-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  color: #4b5563;
}

.total-row {
  border-top: 1px dashed #d1d5db;
  padding-top: 20px;
  margin-top: 20px;
}

.total-price {
  font-size: 20px;
  color: #111827;
}

.note-box {
  display: flex;
  gap: 14px;
  margin-top: 28px;
  color: #6b7280;
  font-size: 14px;
}

.note-box i {
  font-size: 22px;
  margin-top: 3px;
}

/* MOBILE */
@media (max-width: 991px) {
  .summary-layout {
    flex-direction: column;
  }

  .bike-side {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .checkout-card,
  .billing-card {
    padding: 22px;
  }

  .date-row {
    gap: 20px;
  }

  .total-price {
    font-size: 28px;
  }
}

.payment-btn {
  width: 100%;
  justify-content: center;
}
</style>
