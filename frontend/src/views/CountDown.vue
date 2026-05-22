<template>
  <div class="sale-timer">
    <div class="sale-left">
      <i class="fa-solid fa-clock"></i>
      <span>Sale Ends In</span>
    </div>

    <div class="sale-time">
      <span>{{ hours }} <span class="text-muted text-xs">H</span></span>
      <small>:</small>

      <span>{{ minutes }} <span class="text-muted text-xs">M</span></span>
      <small>:</small>

      <span>{{ seconds }} <span class="text-muted text-xs">S</span></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 20 * 3600,
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
        "0",
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
          this.timeRemaining--;

          localStorage.setItem("countdownTimeRemaining", this.timeRemaining);
        } else {
          clearInterval(this.intervalId);

          this.$emit("countdown-finished");

          localStorage.removeItem("countdownTimeRemaining");
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
.sale-timer {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  border: 1px solid var(--color-gray-100);
  border-radius: 12px;
  padding: 0.6rem 1rem;
  box-shadow: var(--shadow-sm);
}

.sale-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-dark);
}

.sale-left i {
  color: var(--color-primary);
}

.sale-time {
  display: flex;
  align-items: center;
  gap: 0.35rem;

  font-weight: 700;
  color: var(--color-primary);
}

.sale-time span {
  min-width: 24px;
  text-align: center;
}

.sale-time small {
  color: var(--color-gray-400);
}

@media (max-width: 576px) {
  /* .sale-timer {
    width: 100%;
    justify-content: center;
    border-radius: 16px;
  } */
}
</style>
