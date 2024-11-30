const express = require("express");
const stripe = require("stripe")("sk_test_51QKasuB0AVnVwjea6J8NWGChD8Z2Hm9DgJsXWhtKsnApB54s31sOCJ4aoxCAvavA1cqhicCnTxcaylHZk533wxNj006EfVRWam"); // Replace with your Stripe Secret Key
const cors = require('cors'); // For Cross-Origin Request Handling

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());  // This is enough to handle JSON requests, no need for body-parser

// Route to create Stripe Checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    // Log the incoming request body for debugging
    console.log("Request Body:", req.body);

    const { amount, bookingDetails } = req.body;

    // Validate the received data
    if (!amount || !bookingDetails) {
      return res.status(400).json({ error: "Missing amount or booking details" });
    }

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Payment methods (you can add UPI, net banking if supported)
      line_items: [
        {
          price_data: {
            currency: "inr", // Currency, in your case INR (Indian Rupee)
            product_data: {
              name: "Bike Rental",
              description: bookingDetails, // Booking details
            },
            unit_amount: Number(amount) * 100, // Stripe expects the amount in cents
          },
          quantity: 1, // Quantity
        },
      ],
      mode: "payment", // Payment mode (one-time payment)
      success_url: `http://localhost:8080/payment-success?session_id={CHECKOUT_SESSION_ID}`, // Success URL after payment
      cancel_url: `http://localhost:8080/payment-cancelled`, // Cancel URL if user cancels payment
    });

    // Send back the session ID to the frontend
    return res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return res.status(500).send("Server Error");
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
