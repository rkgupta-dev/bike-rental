<template>
  <div id="app">
    <!-- Global Navbar -->
    <div v-if="!$route.meta.hideNavbar">
      <NavBar />
    </div>

    <!-- Main Routed Content -->
    <main class="app-main">
      <router-view></router-view>
    </main>

    <!-- Global Footer -->
    <div v-if="!$route.meta.hideFooter">
      <FooterSection />
    </div>

    <!-- Global ChatBot -->
    <div v-if="!$route.meta.hideChatBot">
      <ChatBot />
    </div>
  </div>
</template>

<script>
import ChatBot from "./views/ChatBot.vue";
import NavBar from "@/views/NavBar.vue";
import FooterSection from "@/views/FooterSection.vue";

export default {
  name: "App",
  components: {
    ChatBot,
    NavBar,
    FooterSection,
  },
};
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: var(--color-gray-50);
}
</style>
