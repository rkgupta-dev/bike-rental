<template>
  <div>
    <!-- Chat with us button -->
    <b-button
      variant="primary"
      @click="toggleSidebar"
      class="chat-btn"
      aria-label="Chat with us"
    >
    <i class="fa fa-comments chat-icon"></i> Chat

    </b-button>

    <!-- Sidebar -->
    <b-sidebar
      :width="sidebarWidth"
      v-model="isSidebarVisible"
      title="AI Assistant"
      id="chatbot-sidebar"
      bg-variant="light"
      shadow
    >
      <!-- Chatbot dialog inside sidebar -->
      <div class="chatbot-dialog">
        <b-card no-body class="h-100 d-flex flex-column">
          <b-card-body class="flex-grow-1 overflow-auto" ref="messageContainer">
            <b-list-group flush>
              <b-list-group-item
                v-for="message in messages"
                :key="message.id"
                :class="{ 'text-right': message.sender === 'user' }"
                class="border-0 py-1"
              >
                <div
                  :class="{
                    'd-flex flex-row-reverse': message.sender === 'user',
                  }"
                >
                  <b-avatar
                    src="/placeholder.svg?height=32&width=32"
                    :text="message.sender === 'user' ? 'U' : 'AI'"
                    size="sm"
                    :variant="
                      message.sender === 'user' ? 'primary' : 'success'
                    "
                    class="mr-2"
                  ></b-avatar>
                  <div
                    :class="{
                      'bg-light text-dark': message.sender === 'user',
                      'bg-light': message.sender === 'ai',
                    }"
                    class="message-bubble p-2 rounded"
                  >
                    <p class="mb-0">{{ message.text }}</p>
                    <small class="text-muted">{{
                      formatTime(message.timestamp)
                    }}</small>
                  </div>
                </div>
              </b-list-group-item>
            </b-list-group>
          </b-card-body>

          <b-card-footer>
            <b-form @submit.prevent="sendMessage" class="d-flex">
              <b-form-input
                v-model="input"
                placeholder="Type your message..."
                aria-label="Type your message"
                class="mr-2"
              ></b-form-input>
              <b-button type="submit" variant="primary">
                <b-icon icon="cursor" aria-hidden="true"></b-icon>
                <span class="sr-only">Send message</span>
              </b-button>
            </b-form>
          </b-card-footer>
        </b-card>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "ChatBot",
  data() {
    return {
      sidebarWidth: "450px",
      isSidebarVisible: false,
      messages: [
        {
          id: 1,
          text: "Hello! How can I assist you today? Do you want to rent a bike?",
          sender: "ai",
          timestamp: new Date(),
        },
      ],
      input: "",
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    sendMessage() {
      if (this.input.trim()) {
        const userMessage = {
          id: this.messages.length + 1,
          text: this.input.trim(),
          sender: "user",
          timestamp: new Date(),
        };
        this.messages.push(userMessage);
        this.input = "";

        // Generate AI response based on user input
        const aiResponse = this.generateBotResponse(userMessage.text);

        // Add AI response
        setTimeout(() => {
          const aiMessage = {
            id: this.messages.length + 1,
            text: aiResponse,
            sender: "ai",
            timestamp: new Date(),
          };
          this.messages.push(aiMessage);
          this.scrollToBottom();
        }, 1000);
      }
    },
    generateBotResponse(message) {
      const userMessage = message.toLowerCase();

      if (userMessage.includes("rent")) {
        return "Are you interested in renting a bike? I can help you with the process.";
      } else if (userMessage.includes("yes")) {
        return "Sure! What type of bike would you like to rent? We have Sportsbikes, Scooters, and Cruisers.";
      } else if (userMessage.includes("sportbike")) {
        return "Awesome! Good Choice. Now, let me know how long you'd like to rent it for (in days).";
      } else if (userMessage.includes("30 days")) {
        return "Okay! We have multiple Sports Bikes, if you want know the price of Sports Bikes then go to Category and select Sports Bike";
      } else if (userMessage.includes("bike")) {
        return "good";
      } else if (userMessage.includes("price")) {
        return "Our bike rental prices vary based on the type of bike. Please let me know which bike you are interested in.";
      } else if (userMessage.includes("how to rent")) {
        return "To rent a bike, simply choose the bike you want, provide your details, and make a payment. I'll guide you through the steps!";
      } else if (userMessage.includes("process")) {
        return "The rental process is simple: 1. Choose a bike. 2. Fill in your details. 3. Confirm your rental duration. 4. Make a payment. I'll assist you at each step.";
      } else if (userMessage.includes("what is the process")) {
        return "The process to rent a bike is as follows: 1. Select the bike you like. 2. Provide necessary details like your name and contact info. 3. Confirm rental duration. 4. Make the payment to finalize the booking.";
      } else if (userMessage.includes("types of bikes")) {
        return "We offer different types of bikes: Sportbikes, Cruisers, Scooters, and Standard Bikes. Which type are you interested in?";
      } else if (userMessage.includes("how long can i rent a bike")) {
        return "You can rent a bike for as short as 1 hour to as long as 30 days. Just let me know your rental duration!";
      } else if (userMessage.includes("insurance")) {
        return "Yes, we offer insurance for your rented bike. You can opt for it during the booking process.";
      } else if (userMessage.includes("is insurance mandatory")) {
        return "Insurance is optional, but we highly recommend it for your safety and peace of mind.";
      } else if (userMessage.includes("availability")) {
        return "Our bikes are available 24/7! Simply check availability for the bike of your choice and book it online.";
      } else if (userMessage.includes("how to cancel booking")) {
        return "To cancel a booking, simply log in to your account and visit the 'My Bookings' section to cancel or reschedule.";
      } else if (userMessage.includes("late fee")) {
        return "If you're late in returning the bike, a late fee will be charged based on the duration. Please return the bike as soon as possible to avoid extra charges.";
      } else if (userMessage.includes("what if i damage the bike")) {
        return "In case of any damages to the bike, you will be responsible for repair costs based on the extent of the damage. Please handle the bike with care.";
      } else if (userMessage.includes("delivery service")) {
        return "We offer delivery and pick-up services for an additional fee. Please check the 'Delivery Options' during the booking process.";
      } else if (userMessage.includes("pickup location")) {
        return "You can pick up your bike at our designated locations or choose delivery for convenience.";
      } else if (userMessage.includes("payment methods")) {
        return "We accept payments through credit/debit cards, net banking, and e-wallets. Choose the payment method that suits you during checkout.";
      } else if (userMessage.includes("do you provide helmets")) {
        return "Yes, we provide helmets with the rental. They are included in the bike rental package.";
      } else if (userMessage.includes("can i extend the rental")) {
        return "Yes, you can extend the rental period. Please contact our support team or update your booking online.";
      } else if (userMessage.includes("age requirement")) {
        return "You must be at least 18 years old to rent a bike. A valid ID will be required to verify your age.";
      } else if (userMessage.includes("driving license")) {
        return "A valid driving license is required to rent a bike. Ensure your license is valid for the type of bike you're renting.";
      } else if (userMessage.includes("what if i lose the bike")) {
        return "If you lose the bike, please contact our support immediately. You will be responsible for the cost of the bike as per our terms and conditions.";
      } else if (userMessage.includes("what is the best bike for beginners")) {
        return "For beginners, we recommend starting with a scooter or standard bike. They are easier to handle and perfect for learning.";
      } else if (userMessage.includes("can i rent multiple bikes")) {
        return "Yes, you can rent multiple bikes at once. Simply add them to your cart and proceed with booking.";
      } else if (userMessage.includes("are there any discounts")) {
        return "Yes, we offer seasonal discounts and promotional offers. Check out our 'Deals' page for more details!";
      } else if (userMessage.includes("can i rent a bike for a day")) {
        return "Yes, you can rent a bike for a day, or choose a longer duration as needed.";
      } else if (userMessage.includes("how do i track my booking")) {
        return "You can track your booking status through the 'My Bookings' section on your account dashboard.";
      } else if (userMessage.includes("what happens if it rains")) {
        return "If it rains, you can still rent a bike, but we recommend checking the weather and ensuring you're prepared with rain gear or a cover.";
      } else if (userMessage.includes("can i ride outside the city")) {
        return "Yes, you can ride outside the city. However, you must return the bike to the agreed-upon location on time.";
      } else if (userMessage.includes("can i change my bike after booking")) {
        return "Yes, you can change your bike before the rental period begins. Please contact our support team to make adjustments.";
      } else if (userMessage.includes("how do i get a receipt")) {
        return "You will receive a receipt via email after completing your payment and confirming the booking.";
      } else if (userMessage.includes("what types of bikes do you have")) {
        return "We have sportbikes, cruisers, scooters, and standard bikes available for rent. Let me know which one interests you!";
      } else if (
        userMessage.includes("do you offer discounts for long-term rentals")
      ) {
        return "Yes, we offer discounts for long-term rentals. The more days you rent, the more you save!";
      } else if (
        userMessage.includes("how much does it cost to rent a scooter")
      ) {
        return "Scooter rentals start at $15 per day. Pricing may vary depending on the rental duration and location.";
      } else if (userMessage.includes("how much does it cost to rent a bike")) {
        return "Bike rental prices vary by type. For sportbikes, prices start at $50 per day, while cruisers start at $40 per day.";
      } else if (userMessage.includes("can i ride the bike after dark")) {
        return "Yes, you can ride after dark. However, we recommend checking your bike's lights and safety equipment before heading out.";
      } else if (userMessage.includes("can i rent a bike without a card")) {
        return "Unfortunately, a credit or debit card is required to complete your booking. We accept various payment methods.";
      } else if (
        userMessage.includes(
          "can i rent a bike if i'm visiting from another country"
        )
      ) {
        return "Yes, you can rent a bike if you're visiting from another country. Please make sure to provide a valid international driving permit along with your passport.";
      } else if (userMessage.includes("do i need a deposit")) {
        return "A deposit may be required depending on the type of bike you rent. The deposit will be refunded when the bike is returned in good condition.";
      } else if (userMessage.includes("is there a minimum rental duration")) {
        return "Yes, the minimum rental duration is 1 hour. You can choose a longer rental duration as needed.";
      } else if (userMessage.includes("is it safe to ride at night")) {
        return "Riding at night is safe if proper precautions are taken. Ensure the bike is equipped with functional lights and wear reflective gear.";
      } else if (userMessage.includes("how do i make a payment")) {
        return "You can make a payment via credit card, debit card, or through online wallets at the checkout page.";
      } else if (
        userMessage.includes("is there an extra charge for delivery")
      ) {
        return "Yes, there is an additional charge for delivery, which depends on the location. You will be able to view the delivery charge before finalizing your booking.";
      } else if (userMessage.includes("can i get a bike for a test ride")) {
        return "Yes, we offer test rides for certain bikes. Please check with our team to schedule one in advance.";
      } else if (userMessage.includes("what's the maximum rental period")) {
        return "The maximum rental period is 30 days. You can extend your rental as needed by contacting our support.";
      } else if (userMessage.includes("how do i contact support")) {
        return "You can contact our support team through the 'Contact Us' page on our website or via the customer support number provided in your booking confirmation.";
      } else if (userMessage.includes("Thank you")) {
        return "You are most Welcome!";
      } else {
        return "I'm sorry, I didn't quite understand that. Could you please clarify?";
      }
    },
    formatTime(date) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    },
  },
  updated() {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
.chat-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  font-size: 20px;
  z-index: 100;
}

.chatbot-sidebar {
  max-width: 500px;
  height: 100%;
  padding: 0;
}

.chatbot-dialog {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat-icon {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.chat-icon:hover {
  animation: bounce 0.6s ease;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
}

</style>
