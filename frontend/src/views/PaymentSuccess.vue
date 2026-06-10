<template>
  <section class="section gradient-light">
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" lg="8">
          <div class="card-app shadow-lg success-card">
            <!-- top success -->
            <div class="success-top text-center">
              <div class="success-icon-wrap">
                <i class="fa-solid fa-circle-check"></i>
              </div>

              <h2 class="success-title mt-4">Payment Successful 🎉</h2>
              <p class="success-subtitle">
                Your BikeOntrack booking has been confirmed successfully.
              </p>
              <span class="success-time">{{ formattedDateTime }}</span>
            </div>

            <!-- bike summary -->
            <div class="bike-book-summary">
              <img :src="bookingDetails.bikeImage" class="success-bike-img" />
              <div>
                <h4>{{ bookingDetails.bikeName }}</h4>
                <p>
                  {{ bookingDetails.rentalStartDate }} →
                  {{ bookingDetails.rentalEndDate }}
                </p>
                <span class="mode-chip">{{ bookingDetails.pickupType }}</span>
              </div>
            </div>

            <!-- payment info -->
            <div class="receipt-summary">
              <div class="receipt-row">
                <span>Order ID</span>
                <strong>#{{ orderId }}</strong>
              </div>

              <div class="receipt-row">
                <span>Payment Method</span>
                <strong>Razorpay</strong>
              </div>

              <div class="receipt-row">
                <span>Bike Rent</span>
                <strong>₹ {{ bookingDetails.bikeOriginalPrice }}</strong>
              </div>

              <div class="receipt-row">
                <span>Discount</span>
                <strong class="text-success"
                  >- ₹ {{ bookingDetails.discountedPrice }}</strong
                >
              </div>

              <div class="receipt-row" v-if="bookingDetails.addonPrice > 0">
                <span>Add-on Charge</span>
                <strong>₹ {{ bookingDetails.addonPrice }}</strong>
              </div>

              <div class="receipt-row" v-if="bookingDetails.deliveryCharge > 0">
                <span>Delivery Charge</span>
                <strong>₹ {{ bookingDetails.deliveryCharge }}</strong>
              </div>

              <div class="receipt-row total-row">
                <span>Total Paid</span>
                <strong>₹ {{ bookingDetails.totalPrice }}</strong>
              </div>
            </div>

            <!-- action buttons -->
            <div class="success-actions">
              <button class="btn-secondary-app" @click="$router.push('/')">
                <i class="fa-solid fa-house"></i>
                Back Home
              </button>

              <button class="btn-primary-app" @click="downloadReceipt">
                <i class="fa-solid fa-download"></i>
                Download Receipt
              </button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import jsPDF from "jspdf";

export default {
  data() {
    return {
      bookingDetails: {},
      formattedDateTime: "",
      orderId: "",
    };
  },

  created() {
    const details = localStorage.getItem("bookingDetails");
    if (details) {
      this.bookingDetails = JSON.parse(details);
    }

    const now = new Date();

    this.formattedDateTime = now.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    this.orderId = "BOT" + Math.floor(100000 + Math.random() * 900000);
  },

  methods: {
    downloadReceipt() {
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.width;

      // ================= HEADER BG =================
      doc.setFillColor(66, 56, 202);
      doc.rect(0, 0, pageWidth, 30, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("BikeOntrack", 15, 18);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("PAYMENT RECEIPT", pageWidth - 15, 18, { align: "right" });

      // ================= PAID BADGE =================
      doc.setFillColor(22, 163, 74);
      doc.roundedRect(pageWidth - 45, 38, 28, 10, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("PAID", pageWidth - 31, 45, { align: "center" });

      // ================= RESET COLOR =================
      doc.setTextColor(0, 0, 0);

      // ================= ORDER INFO =================
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Receipt Details", 15, 48);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      doc.text(`Order ID: #${this.orderId}`, 15, 58);
      doc.text(`Date: ${this.formattedDateTime}`, pageWidth - 15, 58, {
        align: "right",
      });

      // ================= CUSTOMER BOOKING BOX =================
      doc.setDrawColor(220);
      doc.roundedRect(15, 68, pageWidth - 30, 52, 3, 3);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Booking Summary", 20, 78);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      doc.text(`Bike Name: ${this.bookingDetails.bikeName}`, 20, 88);
      doc.text(
        `Rental: ${this.bookingDetails.rentalStartDate} to ${this.bookingDetails.rentalEndDate}`,
        20,
        96,
      );
      doc.text(`Mode: ${this.bookingDetails.pickupType}`, 20, 104);

      if (this.bookingDetails.pickupType === "Pickup") {
        doc.text(
          `Pickup Location: ${this.bookingDetails.pickupLocation}`,
          20,
          112,
        );
      } else {
        doc.text(
          `Delivery Address: ${this.bookingDetails.deliveryAddress}`,
          20,
          112,
        );
      }

      // ================= PAYMENT BREAKDOWN =================
      let startY = 135;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Payment Breakdown", 15, startY);

      const paymentRows = [
        ["Bike Rental Price", "Rs. " + this.bookingDetails.bikeOriginalPrice],
        ["Discount Applied", "Rs. " + this.bookingDetails.discountedPrice],
        ["Add-on Charge", "Rs. " + this.bookingDetails.addonPrice],
        ["Delivery Charge", "Rs. " + this.bookingDetails.deliveryCharge],
      ];

      startY += 12;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      paymentRows.forEach((row) => {
        doc.text(row[0], 20, startY);
        doc.text(row[1], pageWidth - 20, startY, { align: "right" });
        startY += 10;
      });

      // ================= TOTAL BOX =================
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(15, startY + 5, pageWidth - 30, 15, 2, 2, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("TOTAL PAID", 20, startY + 15);
      doc.text(
        "Rs. " + this.bookingDetails.totalPrice,
        pageWidth - 20,
        startY + 15,
        {
          align: "right",
        },
      );

      // ================= FOOTER =================
      startY += 35;

      doc.setDrawColor(230, 230, 230);
      doc.line(15, startY, pageWidth - 15, startY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(90);

      doc.text(
        "Thank you for choosing BikeOntrack.",
        pageWidth / 2,
        startY + 12,
        {
          align: "center",
        },
      );

      doc.text(
        "For booking support contact: support@bikeontrack.com | +91 7079812442",
        pageWidth / 2,
        startY + 20,
        { align: "center" },
      );

      // ================= SAVE =================
      doc.save(`BikeOntrack_Receipt_${this.orderId}.pdf`);
    },
  },
};
</script>

<style scoped>
.success-page {
  min-height: 100vh;
}

.success-card {
  border-radius: var(--radius-2xl);
  padding: 40px;
}

.success-top {
  margin-bottom: 30px;
}

.success-icon-wrap {
  width: 95px;
  height: 95px;
  margin: auto;
  border-radius: 50%;
  background: #dcfce7;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 1.4s infinite;
}

.success-icon-wrap i {
  font-size: 48px;
  color: #16a34a;
}

.success-title {
  font-weight: 800;
}

.success-subtitle {
  color: var(--color-gray-500);
}

.success-time {
  display: inline-block;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 14px;
}

.bike-book-summary {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: #fafafa;
  border-radius: var(--radius-xl);
  margin-bottom: 25px;
}

.success-bike-img {
  width: 120px;
  height: 80px;
  object-fit: contain;
}

.mode-chip {
  background: #fee2e2;
  color: #dc2626;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
}

.receipt-summary {
  border: 1px dashed #ddd;
  border-radius: var(--radius-xl);
  padding: 20px;
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
}

.total-row {
  border-top: 1px solid #eee;
  padding-top: 14px;
  font-size: 20px;
  font-weight: 700;
}

.success-actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
</style>
