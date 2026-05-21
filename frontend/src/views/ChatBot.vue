<template>
  <div class="chat-widget">
    <!-- Floating Button -->
    <button class="chat-toggle-btn" @click="toggleChat">
      <i class="fa-solid fa-comments"></i>
    </button>

    <!-- Chat Box -->
    <transition name="chat-fade">
      <div v-if="showChat" class="chat-box">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-user">
            <div class="chat-avatar">
              <i class="fa-solid fa-comment-dots"></i>
            </div>

            <div>
              <h6>BikeOntrack Support</h6>
              <span>Online now</span>
            </div>
          </div>

          <button class="close-btn" @click="showChat = false">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Messages -->
        <div class="chat-body" ref="messageContainer">
          <div
            v-for="message in messages"
            :key="message.id"
            class="message-row"
            :class="message.sender"
          >
            <div class="message-bubble">
              {{ message.text }}

              <small>
                {{ formatTime(message.timestamp) }}
              </small>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="chat-footer">
          <b-form @submit.prevent="sendMessage">
            <div class="chat-input-wrap">
              <b-form-input
                v-model="input"
                placeholder="Type a message..."
                class="chat-input"
              ></b-form-input>

              <button type="submit" class="send-btn">
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </b-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ChatBot",
  data() {
    return {
      showChat: false,
      input: "",
      messages: [
        {
          id: 1,
          text: "Welcome to BikeOntrack 👋 How can we help you today?",
          sender: "ai",
          timestamp: new Date(),
        },
      ],
    };
  },

  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
    },

    sendMessage() {
      if (!this.input.trim()) return;

      const userMessage = {
        id: this.messages.length + 1,
        text: this.input,
        sender: "user",
        timestamp: new Date(),
      };

      this.messages.push(userMessage);

      const userText = this.input.toLowerCase();

      this.input = "";

      setTimeout(() => {
        this.messages.push({
          id: this.messages.length + 1,
          text: this.generateBotResponse(userText),
          sender: "ai",
          timestamp: new Date(),
        });

        this.scrollToBottom();
      }, 700);
    },

    generateBotResponse(message) {
      const text = message.toLowerCase();

      // 1. Greetings & Options
      if (
        text.includes("hi") ||
        text.includes("hii") ||
        text.includes("hello")
      ) {
        return `Hello! How can I assist you with your bike rental today? 
    Here are some options for you:
    1. New Booking
    2. Booking Extension
    3. Document Approval
    4. Payment Information
    5. Contact Support`;
      }

      // 2. Rental Process & Steps
      if (
        text.includes("how to rent") ||
        text.includes("what is the process") ||
        text.includes("process")
      ) {
        return "The rental process is simple: 1. Choose a bike from our 'Bikes' section. 2. Fill in your details. 3. Confirm your rental duration. 4. Make a payment. I'll assist you at each step!";
      }

      if (text.includes("rent")) {
        return "Are you interested in renting a bike? You can easily browse and rent bikes from our Bikes section.";
      }

      if (text === "yes") {
        return "Sure! What type of bike would you like to rent? We have Sportsbikes, Scooters, and Cruisers.";
      }

      // 3. Categories & Specific Bikes
      if (
        text.includes("types of bikes") ||
        text.includes("what types of bikes")
      ) {
        return "We offer different types of bikes: Sportbikes, Cruisers, Scooters, and Standard Bikes. Which type are you interested in?";
      }

      if (text.includes("30 days")) {
        return "Okay! We have multiple Sports Bikes available for long-term rental. To see pricing, please go to Category and select Sports Bike.";
      }

      if (text.includes("sportbike") || text.includes("bike")) {
        return "Awesome! Good Choice. Now, let me know how long you'd like to rent it for (in days).";
      }

      if (text.includes("best bike for beginners")) {
        return "For beginners, we recommend starting with a scooter or standard bike. They are easier to handle and perfect for learning.";
      }

      // 4. Pricing & Payments
      if (text.includes("price") || text.includes("cost to rent a bike")) {
        return "Bike rental prices vary by type. For sportbikes, prices start at $50 per day, while cruisers start at $40 per day. Check our 'Bikes' section for real-time rates.";
      }

      if (text.includes("cost to rent a scooter")) {
        return "Scooter rentals start at $15 per day. Pricing may vary depending on the rental duration and location.";
      }

      if (
        text.includes("payment methods") ||
        text.includes("how do i make a payment")
      ) {
        return "We accept payments through credit/debit cards, net banking, and e-wallets. Choose the payment method that suits you during checkout.";
      }

      if (text.includes("deposit")) {
        return "A deposit may be required depending on the type of bike you rent. The deposit will be refunded when the bike is returned in good condition.";
      }

      if (text.includes("receipt")) {
        return "You will receive a receipt via email after completing your payment and confirming the booking.";
      }

      if (text.includes("discounts for long-term")) {
        return "Yes, we offer discounts for long-term rentals. The more days you rent, the more you save!";
      }

      if (text.includes("discounts") || text.includes("offers")) {
        return "Yes, we offer seasonal discounts and promotional offers. Check out our 'Deals' page for more details!";
      }

      // 5. Requirements & Policies
      if (text.includes("age requirement")) {
        return "You must be at least 18 years old to rent a bike. A valid ID will be required to verify your age.";
      }

      if (text.includes("driving license")) {
        return "A valid driving license is required to rent a bike. Ensure your license is valid for the type of bike you're renting.";
      }

      if (text.includes("international") || text.includes("another country")) {
        return "Yes, you can rent if you're visiting from another country. Please provide a valid international driving permit along with your passport.";
      }

      if (text.includes("insurance mandatory")) {
        return "Insurance is optional, but we highly recommend it for your safety and peace of mind.";
      }

      if (text.includes("insurance")) {
        return "Yes, we offer insurance for your rented bike. You can opt for it during the booking process.";
      }

      // 6. Logistics (Pickup, Delivery, Duration)
      if (
        text.includes("delivery service") ||
        text.includes("extra charge for delivery")
      ) {
        return "We offer delivery for an additional fee depending on location. You can view the delivery charge before finalizing your booking.";
      }

      if (text.includes("pickup location")) {
        return "You can pick up your bike at our designated locations or choose delivery for convenience.";
      }

      if (
        text.includes("how long can i rent") ||
        text.includes("minimum rental duration")
      ) {
        return "The minimum rental duration is 1 hour and the maximum is 30 days. Just let me know your preferred duration!";
      }

      if (text.includes("maximum rental period")) {
        return "The maximum rental period is 30 days. You can extend your rental as needed by contacting our support.";
      }

      if (text.includes("availability")) {
        return "Our bikes are available 24/7! Simply check availability for the bike of your choice and book it online.";
      }

      // 7. Support & Issues
      if (
        text.includes("support") ||
        text.includes("how do i contact support")
      ) {
        return "You can contact support anytime from the Contact Us page or via the support number in your booking confirmation.";
      }

      if (text.includes("cancel booking") || text.includes("how to cancel")) {
        return "To cancel a booking, log in to your account and visit 'My Bookings' to cancel or reschedule.";
      }

      if (text.includes("extend")) {
        return "Yes, you can extend the rental period. Please update your booking online or contact our support team.";
      }

      if (text.includes("track my booking")) {
        return "You can track your booking status through the 'My Bookings' section on your account dashboard.";
      }

      if (text.includes("late fee")) {
        return "Late returns incur a fee based on the duration. Please return the bike on time to avoid extra charges.";
      }

      if (text.includes("damage")) {
        return "In case of damages, you will be responsible for repair costs based on the extent of damage. Please handle the bike with care.";
      }

      if (text.includes("lose the bike") || text.includes("lost")) {
        return "If you lose the bike, contact support immediately. You will be responsible for the cost as per our terms.";
      }

      // 8. General Gear & Rules
      if (text.includes("helmets")) {
        return "Yes, we provide helmets with the rental. They are included in your bike rental package.";
      }

      if (text.includes("night") || text.includes("after dark")) {
        return "Yes, you can ride at night. Ensure lights are functional and wear reflective gear for safety.";
      }

      if (text.includes("outside the city")) {
        return "Yes, you can ride outside the city, provided you return the bike to the agreed location on time.";
      }

      if (text.includes("test ride")) {
        return "Yes, we offer test rides for certain models. Please contact our team to schedule one.";
      }

      if (text.includes("thank you") || text.includes("thanks")) {
        return "You are most welcome! Happy riding! 🏍️";
      }

      // Default Fallback
      return "I'm sorry, I didn't quite understand that. Could you please clarify or check our FAQ page?";
    },

    formatTime(date) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;

        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
  },
};
</script>

<style scoped>
.chat-toggle-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 58px;
  height: 58px;
  border: none;
  border-radius: 18px;
  background: var(--color-primary);
  color: #fff;
  font-size: 1.2rem;
  box-shadow: var(--shadow-lg);
  z-index: 999;
}

.chat-box {
  position: fixed;
  bottom: 95px;
  right: 24px;
  width: 360px;
  height: 520px;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
  z-index: 999;
  border: 1px solid var(--color-gray-100);
}

.chat-header {
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid var(--color-gray-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-avatar {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-user h6 {
  margin: 0;
  font-weight: 700;
}

.chat-user span {
  font-size: 12px;
  color: var(--color-gray-500);
}

.close-btn {
  border: none;
  background: transparent;
  color: var(--color-gray-400);
  font-size: 18px;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f8fafc;
}

.message-row {
  display: flex;
  margin-bottom: 14px;
}

.message-row.user {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 78%;
  padding: 12px 14px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
}

.message-row.ai .message-bubble {
  background: #fff;
  border: 1px solid var(--color-gray-100);
}

.message-row.user .message-bubble {
  background: var(--color-primary);
  color: #fff;
}

.message-bubble small {
  display: block;
  margin-top: 5px;
  font-size: 11px;
  opacity: 0.7;
}

.chat-footer {
  padding: 1rem;
  border-top: 1px solid var(--color-gray-100);
  background: #fff;
}

.chat-input-wrap {
  display: flex;
  gap: 10px;
}

.chat-input {
  height: 48px;
  border-radius: 14px;
  border: 1px solid var(--color-gray-200);
}

.send-btn {
  width: 68px;
  height: 46px;
  border: none;
  border-radius: 14px;
  background: var(--color-primary);
  color: #fff;
}

.chat-fade-enter-active,
.chat-fade-leave-active {
  transition: all 0.25s ease;
}

.chat-fade-enter,
.chat-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 576px) {
  .chat-box {
    width: calc(100% - 24px);
    right: 12px;
    bottom: 85px;
    height: 500px;
  }

  .chat-toggle-btn {
    right: 16px;
    bottom: 16px;
  }
}
</style>
