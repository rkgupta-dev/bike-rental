<template>
  <div class="text">
    <h5>
      Sale Ends In:<b-badge variant="light" class="text-success" pill>
        {{ hours }} hrs:{{ minutes }} mins:{{ seconds }} secs</b-badge
      >
    </h5>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 20 * 3600, // Default countdown duration set to 20 hours in seconds
    },
  },
  data() {
    return {
      timeRemaining: this.duration,
      intervalId: null,
    };
  },
  computed: {
    hours() {
      return String(Math.floor(this.timeRemaining / 3600)).padStart(2, "0");
    },
    minutes() {
      return String(Math.floor((this.timeRemaining % 3600) / 60)).padStart(
        2,
        "0"
      );
    },
    seconds() {
      return String(this.timeRemaining % 60).padStart(2, "0");
    },
  },
  methods: {
    startCountdown() {
      this.intervalId = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining -= 1;
          localStorage.setItem("countdownTimeRemaining", this.timeRemaining); // Save remaining time
        } else {
          clearInterval(this.intervalId);
          this.$emit("countdown-finished");
          localStorage.removeItem("countdownTimeRemaining"); // Clear saved time when done
        }
      }, 1000);
    },
  },
  mounted() {
    const savedTime = localStorage.getItem("countdownTimeRemaining");
    this.timeRemaining = savedTime ? parseInt(savedTime, 10) : this.duration;
    this.startCountdown();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
.text-center {
  font-size: 1.5rem;
}
</style>
