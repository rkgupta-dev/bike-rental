<template>
  <div class="bike">
    <b-row no-gutters>
      <b-col
        v-for="(bike, index) in bikes"
        :key="index"
        class="mb-4"
        cols="6"
        md="6"
        lg="3"
        sm="6"
      >
        <b-card class="my-2">
          <b-card-img :src="bike.image" alt="Bike Image" height="150" />
          <b-card-title>{{ bike.name }}</b-card-title>

          <b-card-text>
            <b-row align-h="center" class="mx-0">
              <b-rating
                v-model="bike.rating"
                :readonly="true"
                size="6"
                class="mr-2 border-0"
              ></b-rating>
              <div class="text-success small">
                <!-- Added small class for smaller text -->
                {{ bike.rating }} ({{ bike.totalRatings }})
              </div>
            </b-row>

            <br />
            <div class="text-primary">Price for first-time booking</div>

            <div class="my-1 text-muted">₹ {{ bike.price }}</div>

            <b-img
              height="auto"
              width="100"
              src="https://book.on-track.in/img/zero-deposit.bc895812.svg"
              alt="Zero Deposit"
            ></b-img>

            <div class="text-success"><br />Summer Days Sale</div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "ModelList",
  data() {
    return {
      loading: false, // Set this based on your loading logic
      bikes: [
        {
          name: "Hero Duet",
          rating: 4.7,
          totalRatings: 556,
          price: "4199/month",
          image:
            "https://on-track-jarvis.s3.ap-south-1.amazonaws.com/monthly-rental/rent-hero-duet-bangalore-min.webp",
        },
        {
          name: "Honda Shine 2024",
          rating: 4.3,
          totalRatings: 756,
          price: "5399/month",
          image:
            "https://on-track-jarvis.s3.ap-south-1.amazonaws.com/107a242755abc802ef75751057ca0822",
        },
        {
          name: "Honda Dio",
          rating: 4.1,
          totalRatings: 256,
          price: "4099/month",
          image:
            "https://on-track-jarvis.s3.ap-south-1.amazonaws.com/monthly-rental/rent-honda-dio-bangalore-min.webp",
        },
        {
          name: "TVS Sports",
          rating: 2.2,
          totalRatings: 456,
          price: "3799/month",
          image:
            "https://on-track-jarvis.s3.ap-south-1.amazonaws.com/monthly-rental/rent-TVS-sport-bangalore-min.webp",
        },
      ],
    };
  },
  methods: {
    selectBike(bike) {
      alert(`Selected Bike: ${bike.name}`);
    },
  },
};
</script>

<style scoped>
.bike {
  padding: 20px;
}
</style>
