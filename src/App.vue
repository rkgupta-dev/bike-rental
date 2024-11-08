<template>
  <div id="app">
    <router-view></router-view>
    <div v-if="!$route.meta.hideChatBot">
      <ChatBot />
    </div>
  </div>
</template>

<script>
import ChatBot from "./views/ChatBot.vue";

export default {
  name: "App",
  components: {
    ChatBot,
  },
};
</script>

<style scoped>
/* Additional styles can be added if necessary */
</style>
