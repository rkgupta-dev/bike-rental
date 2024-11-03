<template>
  <div class="min-h-screen bg-gradient-primary d-flex align-items-center">
    <b-container class="my-5">
      <v-card>
        <b-row class="align-items-center">
          <!-- Phone Mockup Column -->
          <b-col lg="6" class="mb-5 mb-lg-0">
            <div class="phone-mockup-wrapper">
              <b-img
                src="https://img.freepik.com/free-vector/people-using-their-mobile-phones-news_52683-39976.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid"
                alt="Ontrack App Interface"
                fluid
                class="phone-mockup"
              ></b-img>
            </div>
          </b-col>

          <!-- Download Form Column -->
          <b-col lg="6">
            <div class="download-content text-white">
              <h1 class="display-4 mb-3 font-weight-bold">
                Get the <span class="text-highlight">BikeOntrack App</span>
              </h1>
              <p class="lead mb-5">
                We'll send you a magic link. Open it on your phone to download
                the app and start your journey!
              </p>

              <!-- Phone Input Form -->
              <b-form @submit.prevent="sendLink" class="mb-5">
                <b-form-group>
                  <b-input-group class="">
                    <b-form-input
                      v-model="phoneNumber"
                      placeholder="Enter your phone number"
                      type="tel"
                      class=""
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button variant="primary" type="submit" class="">
                        Get Link
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-form>

              <!-- Download Links -->
              <div>
                <p class="text-light mb-3">Download app from</p>
                <div class="d-flex">
                  <b-button
                    size="sm"
                    href="#"
                    variant="light"
                    class="store-button d-flex align-items-center justify-content-center mr-4"
                  >
                    <i class="fa-brands fa-google-play"> Google Play</i>
                  </b-button>
                  <b-button
                    size="sm"
                    href="#"
                    variant="light"
                    class="store-button d-flex align-items-center justify-content-center"
                  >
                    <i class="fa-brands fa-app-store-ios"> App Store</i>
                  </b-button>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </v-card>
    </b-container>

    <!-- Decorative Elements -->
    <div class="decorative-circle circle-1"></div>
    <div class="decorative-circle circle-2"></div>
    <div class="decorative-circle circle-3"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const phoneNumber = ref("");

const sendLink = () => {
  // Handle sending the download link
  console.log("Sending magic link to:", phoneNumber.value);
};
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.phone-mockup-wrapper {
  position: relative;
  max-width: 300px;
  margin: 0 auto;
  animation: float 6s ease-in-out infinite;
}

.phone-mockup {
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.text-highlight {
  color: #fbbf24;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-input-group {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  overflow: hidden;
}

.custom-input {
  border: none;
  padding: 15px 25px;
  font-size: 1.1rem;
}

.custom-button {
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  background-color: #fbbf24;
  color: #4a5568;
  transition: all 0.3s ease;
}

.custom-button:hover {
  background-color: #f6ad55;
  transform: translateY(-2px);
}

.store-button {
  padding: 12px 20px;
  min-width: 180px;
  font-weight: bold;
  color: #4a5568;
  transition: all 0.3s ease;
}

.store-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background-color: #fff;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  right: -100px;
}

.circle-3 {
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
