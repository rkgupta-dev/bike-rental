<template>
  <div class="section gradient-light">
    <b-container class="py-5 text-center w-50">
      <!-- SUCCESS -->
      <div v-if="status === 'success'" class="card-app shadow-lg success-card">
        <!-- TOP -->
        <div class="success-top">
          <div class="success-icon-wrap">
            <i class="fa-solid fa-circle-check"></i>
          </div>

          <h2 class="success-title mt-4">Payment Successful 🎉</h2>
          <p class="success-subtitle">Your BikeOntrack booking is confirmed</p>

          <span class="success-time">{{ formattedDateTime }}</span>
        </div>

        <!-- PAYMENT INFO -->
        <div class="info-card text-left">
          <h4>Payment Details</h4>
          <p><strong>Payment ID:</strong> {{ paymentId }}</p>
          <!-- <p><strong>Order ID:</strong> {{ orderId }}</p> -->
        </div>

        <!-- BOOKING INFO -->
        <div class="info-card text-left" v-if="booking">
          <h4>Booking Details</h4>

          <p><strong>Bike:</strong> {{ booking.bike.name }}</p>
          <p><strong>Type:</strong> {{ booking.bike.type }}</p>

          <p><strong>Pickup:</strong> {{ booking.pickup.location }}</p>

          <p>
            <strong>Date:</strong>
            {{ booking.pickup.date }} → {{ booking.dropoff.date }}
          </p>

          <p><strong>Rental Days:</strong> {{ booking.rentalDays }}</p>
        </div>

        <!-- PAYMENT BREAKDOWN -->
        <div class="info-card text-left" v-if="booking">
          <h4>Payment Breakdown</h4>

          <div class="row-line">
            <span>Bike Price</span>
            <span>₹{{ booking.bike.price }} × {{ booking.rentalDays }}</span>
          </div>

          <div class="row-line">
            <span>Total Amount</span>
            <span>₹{{ booking.totalPrice }}</span>
          </div>

          <div class="row-line total">
            <span>Total Paid</span>
            <span>₹{{ booking.totalPrice }}</span>
          </div>
        </div>

        <!-- ACTIONS -->
        <div class="success-actions">
          <button class="btn-secondary-app" @click="$router.push('/')">
            <i class="fa-solid fa-house"></i>
            Home
          </button>

          <button class="btn-primary-app" @click="downloadReceipt">
            <i class="fa-solid fa-download"></i>
            Download PDF
          </button>
        </div>
      </div>

      <!-- FAILED -->
      <div v-else class="card-app shadow-lg success-card">
        <div class="error-icon-wrap">
          <i class="fa-solid fa-circle-xmark"></i>
        </div>

        <h2 class="error-title mt-4">Payment Failed</h2>
        <p class="error-subtitle">{{ error }}</p>

        <button class="btn-primary-app mt-3" @click="$router.push('/')">
          Go Home
        </button>
      </div>
    </b-container>
  </div>
</template>

<script>
import jsPDF from "jspdf";

export default {
  data() {
    return {
      status: this.$route.query.status,
      paymentId: this.$route.query.paymentId,
      orderId: this.$route.query.orderId,
      error: this.$route.query.error,

      booking: null,
      formattedDateTime: "",
    };
  },

  mounted() {
    const data = localStorage.getItem("bookingDetails");

    if (data) {
      this.booking = JSON.parse(data);
    }

    const now = new Date();

    this.formattedDateTime = now.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  methods: {
    downloadReceipt() {
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.width;

      // ================= FORMAT PRICE =================
      const formatPrice = (price) => {
        return Number(price || 0).toLocaleString("en-IN");
      };

      // ================= HEADER BG =================
      doc.setFillColor(66, 56, 202);
      doc.rect(0, 0, pageWidth, 30, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("BikeOntrack", 15, 18);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("PAYMENT RECEIPT", pageWidth - 15, 18, {
        align: "right",
      });

      // ================= PAID BADGE =================
      doc.setFillColor(22, 163, 74);
      doc.roundedRect(pageWidth - 45, 38, 28, 10, 2, 2, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);

      doc.text("PAID", pageWidth - 31, 45, {
        align: "center",
      });

      // ================= RESET COLOR =================
      doc.setTextColor(0, 0, 0);

      // ================= RECEIPT DETAILS =================
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("Receipt Details", 15, 58);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      doc.text(`Payment ID: ${this.paymentId}`, 15, 68);

      // doc.text(`Order ID: #${this.orderId}`, 15, 76);

      doc.text(`Date: ${new Date().toLocaleString()}`, pageWidth - 15, 68, {
        align: "right",
      });

      // ================= BOOKING SUMMARY BOX =================
      doc.setDrawColor(220);
      doc.roundedRect(15, 88, pageWidth - 30, 60, 3, 3);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);

      doc.text("Booking Summary", 20, 100);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      doc.text(`Bike Name: ${this.booking.bike.name}`, 20, 112);

      doc.text(`Bike Type: ${this.booking.bike.type}`, 20, 120);

      doc.text(
        `Rental: ${this.booking.pickup.date} to ${this.booking.dropoff.date}`,
        20,
        128,
      );

      doc.text(`Pickup Location: ${this.booking.pickup.location}`, 20, 136);

      // ================= PAYMENT BREAKDOWN =================
      let startY = 165;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("Payment Breakdown", 15, startY);

      const paymentRows = [
        [
          "Bike Rental Price",
          `Rs. ${formatPrice(this.booking.bike.price)} × ${
            this.booking.rentalDays
          }`,
        ],
        ["Rental Days", `${this.booking.rentalDays} Days`],
        ["Total Amount Paid", `Rs. ${formatPrice(this.booking.totalPrice)}`],
      ];

      startY += 12;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      paymentRows.forEach((row) => {
        doc.text(row[0], 20, startY);

        doc.text(row[1], pageWidth - 20, startY, {
          align: "right",
        });

        startY += 10;
      });

      // ================= TOTAL BOX =================
      doc.setFillColor(245, 245, 245);

      doc.roundedRect(15, startY + 5, pageWidth - 30, 15, 2, 2, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("TOTAL PAID", 20, startY + 15);

      doc.text(
        `Rs. ${formatPrice(this.booking.totalPrice)}`,
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
        {
          align: "center",
        },
      );

      // ================= SAVE PDF =================
      doc.save(`BikeOntrack_Payment_Receipt.pdf`);
    },
  },
};
</script>

<style scoped>
.section.gradient-light {
  background: linear-gradient(135deg, #f6f7ff, #ffffff);
  min-height: 100vh;
}

/* ================= CARD ================= */
.card-app {
  background: #fff;
  border-radius: 24px;

  border: 1px solid #eee;
}

/* ================= SUCCESS ICON ================= */
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

/* ================= ERROR ICON ================= */
.error-icon-wrap {
  width: 95px;
  height: 95px;
  margin: auto;
  border-radius: 50%;
  background: #fcdcdc;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 1.4s infinite;
}

.error-icon-wrap i {
  font-size: 48px;
  color: #a31616;
}

/* ================= TEXT ================= */
.success-title {
  font-weight: 800;
  color: #111827;
}

.success-subtitle {
  color: #6b7280;
  margin-top: 6px;
}

.success-time {
  display: inline-block;
  margin-top: 12px;
  padding: 6px 14px;
  border-radius: 20px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 13px;
}

/* ================= INFO CARD ================= */
.info-card {
  background: #f9fafb;
  border-radius: 16px;
  padding: 18px;
  margin-top: 20px;
  text-align: left;
}

.info-card h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #111827;
}

.info-card p {
  margin: 6px 0;
  color: #4b5563;
}

/* ================= ROW LINE ================= */
.row-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #4b5563;
  font-size: 14px;
}

.row-line.total {
  border-top: 1px solid #e5e7eb;
  margin-top: 10px;
  padding-top: 10px;
  font-weight: 700;
  color: #111827;
}

/* ================= ACTION BUTTONS ================= */
.success-actions {
  margin-top: 30px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ================= ANIMATION ================= */
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

/* ================= FAILED STATE ================= */
.fa-circle-xmark {
  font-size: 60px;
  color: #ef4444;
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {
  .card-app {
    padding: 22px;
    border-radius: 18px;
  }

  .success-icon-wrap {
    width: 80px;
    height: 80px;
  }

  .success-icon-wrap i {
    font-size: 40px;
  }

  .success-title {
    font-size: 22px;
  }

  .error-icon-wrap {
    width: 80px;
    height: 80px;
  }

  .error-icon-wrap i {
    font-size: 40px;
  }

  .error-title {
    font-size: 22px;
  }

  .row-line {
    font-size: 13px;
  }
}
</style>
