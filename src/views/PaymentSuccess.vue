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
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span>Amount Paid:</span>
                <strong>₹ {{ bookingDetails.totalPrice }}/-</strong>
              </b-list-group-item>
            </b-list-group>

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

    this.orderId = this.generateOrderId();
  },
  methods: {
    generateOrderId() {
      return Math.floor(10000000 + Math.random() * 90000000);
    },
    downloadReceipt() {
      const doc = new jsPDF();

      // Add logo on the left
      const logoUrl =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0GP76agvcc9ML2IjYlq9HRr6crKsHAIc4Q&s"; // Replace with your logo URL or base64
      doc.addImage(logoUrl, "PNG", 10, 10, 30, 30); // Position logo at (10, 10), 30x30 size

      // Add company address on the right
      doc.setFontSize(10);
      const addressLines = [
        "BikeOntrack Techno Pvt. Ltd.",
        "123, Track Avenue, Ground Floor",
        "Giridih - 815314, Jharkhand",
        "support@bikeontrack.com",
        "+91 70798 12442",
      ];
      let addressY = 15; // Starting Y position for the address
      addressLines.forEach((line) => {
        doc.text(line, 200, addressY, { align: "right" }); // Align each line to the right
        addressY += 5; // Spacing between lines
      });
      // Add line before "Payment Receipt"
      doc.line(10, 40, 200, 40); // Adjust Y-position as needed

      // Add title below the logo and address
      doc.setFontSize(16);
      doc.text("Payment Receipt", 105, 50, { align: "center" });

      // Draw a separator
      doc.setLineWidth(0.5);

      // Get the page width
      const pageWidth = doc.internal.pageSize.width;

      // Set the new smaller line width (for example, 50)
      const lineWidth = 50;

      // Calculate the starting and ending positions for the centered line
      const lineStartX = (pageWidth - lineWidth) / 2; // Center the line
      const lineEndX = lineStartX + lineWidth; // Add the length of the line (50) to get the end X position

      // Add line in the center
      doc.line(lineStartX, 55, lineEndX, 55);

      // Add title
      doc.setFontSize(16);
      doc.text("Payment Receipt", pageWidth / 2, 50, { align: "center" });

      // Add receipt details
      const details = [
        { label: "Date & Time", value: this.formattedDateTime || "N/A" },
        { label: "Order ID", value: `#${this.orderId || "N/A"}` },
        { label: "Payment Method", value: "Credit Card" },
        {
          label: "Price",
          value: `${this.bookingDetails.originalPrice || "N/A"}`,
        },
        {
          label: "Addons Charge",
          value: `${this.bookingDetails.addonPrice || "N/A"}`,
        },
        {
          label: "Delivery Charge",
          value: `${this.bookingDetails.deliveryCharge || "N/A"}`,
        },
        {
          label: "Discounted Price",
          value: `${this.bookingDetails.discountedPrice || "N/A"}`,
        },
      ];

      let yPosition = 65; // Starting Y position for details
      doc.setFontSize(12);

      details.forEach((detail) => {
        doc.text(`${detail.label}:`, 20, yPosition); // Label on the left
        doc.text(detail.value, 190, yPosition, { align: "right" }); // Value on the right
        yPosition += 8; // Spacing between rows
      });

      // Add a separator line before Amount Paid
      doc.setLineWidth(0.3);
      doc.line(10, yPosition, 200, yPosition);
      yPosition += 5; // Space below the line

      // Add Amount Paid in bold
      doc.setFont("helvetica", "bold"); // Set font to bold
      doc.text("Amount Paid:", 20, yPosition); // Label on the left
      doc.text(`${this.bookingDetails.totalPrice || "N/A"}`, 190, yPosition, {
        align: "right",
      });

      // Reset font for the footer
      doc.setFont("helvetica", "normal");
      yPosition += 15; // Spacing for footer

      // Add footer
      doc.setFontSize(10);
      doc.text("Thank you for choosing BikeOntrack!", 105, yPosition, {
        align: "center",
      });

      // Save the file
      doc.save(`BikeOntrack-Payment_Slip-${this.orderId || "N/A"}.pdf`);
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
