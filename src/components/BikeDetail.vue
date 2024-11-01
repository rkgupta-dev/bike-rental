<template>
  <b-container>
    <div class="mt-4">
      <b-row>
        <b-col cols="12" lg="6">
          <h2>{{ bike.name }}</h2>
          <div class="d-flex flex-column align-items-start">
            <b-button variant="light" size="sm" @click="isModalVisible = true">
              <b-icon icon="share-fill" size="25" variant="primary"></b-icon>
            </b-button>

            <b-modal
              v-model="isModalVisible"
              title="Share this link"
              hide-footer
            >
              <p>Where do you want to share this link?</p>
              <b-list-group>
                <b-list-group-item
                  v-for="(option, index) in shareOptions"
                  :key="index"
                  @click="share(option)"
                >
                  <b-icon :icon="option.icon" class="mr-2" /> {{ option.label }}
                </b-list-group-item>
              </b-list-group>
              <template #modal-footer>
                <b-button variant="secondary" @click="isModalVisible = false"
                  >Close</b-button
                >
              </template>
            </b-modal>
            <b-button
              variant="light"
              size="sm"
              class="p-2 my-2"
              @click="chatOnWhatsApp(bike)"
            >
              <b-icon icon="whatsapp" size="25" variant="success"></b-icon>
            </b-button>
          </div>
          <!--if you want to set fixed image size -- style="width: 500px; height: 300px;"  -->
          <b-img class="my-4" :src="bike.image" :alt="bike.name" fluid></b-img>
          <br />
          <small class="extra-small">
            Images are for representation purposes only. Actual products
            delivered may differ from the images displayed on the website.
          </small>
        </b-col>
        <b-col cols="12" lg="6" class="my-2">
          <b-badge
            variant="danger"
            v-if="bike.highDemand"
            class="mr-1 font-weight-bold h5 p-2"
          >
            High Demand
          </b-badge>
          <b-badge
            variant="primary"
            v-if="bike.highMileage"
            class="mr-1 font-weight-bold h5 p-2"
          >
            High Mileage
          </b-badge>
          <b-badge
            variant="success"
            v-if="bike.bestSeller"
            class="mr-1 font-weight-bold h5 p-2"
          >
            Bestseller
          </b-badge>
          <h6 class="text-muted">Monthly Rental</h6>
          <div class="d-flex">
            <h6 class="text-muted" style="text-decoration: line-through">
              ₹ {{ bike.originalPrice }}
            </h6>
            <h6 class="text-success ml-2">
              {{ calculateDiscount(bike) }}% off (limited offer)
            </h6>
          </div>
          <h4 class="font-weight-bold">
            Price: ₹ {{ bike.price }} /month <br />
            <p></p>
          </h4>

          <div class="d-flex align-items-center">
            <b-icon
              v-for="i in 5"
              :key="i"
              icon="star-fill"
              :variant="i <= Math.floor(bike.rating) ? 'warning' : 'secondary'"
              class="mr-1"
            ></b-icon>
            <span class="text-muted ml-2"
              >{{ bike.rating }} ({{ bike.ratingCount }})</span
            >
          </div>
          <div>
            <div v-if="bike.status === 1" class="text-success my-2">
              Summer Days Sale
            </div>
            <div v-else-if="bike.status === 2" class="text-warning my-2">
              Only One Left
            </div>
            <div v-else-if="bike.status === 3" class="text-danger my-2">
              Out of Stock
            </div>
            <CountDown />
          </div>
          <div>
            <b-badge class="color align-items-start">
              <h6>Doorstep Delivery - Within the next few days</h6>
              <h6>In-Store Pickup - Ready in 1 hour or sooner .</h6>
            </b-badge>
          </div>
          <div class="mt-4">
            <h5>Services Included with Rental</h5>
            <ul class="list-unstyled">
              <li>
                <i class="fa-solid fa-gauge"></i>
                <strong> Unlimited Kilometers:</strong> We give you the
                flexibility to travel freely without any kilometer limit.
              </li>
              <li class="">
                <i class="fa-solid fa-shield"></i>
                <strong> Insurance Covered:</strong> Comprehensive insurance at
                no extra cost covering accidents or damages.
              </li>
              <li class="">
                <i class="fa-solid fa-screwdriver-wrench"></i>
                <strong> Maintenance Covered:</strong> Our pricing includes one
                periodic service/maintenance per rental.
              </li>
            </ul>
          </div>
          <div class="row text-center mt-4">
            <b-col cols="12" md="6" class="my-2">
              <b-button
                squared
                variant="outline-success"
                class="w-100"
                @click="chatOnWhatsApp(bike)"
              >
                <i class="fa-brands fa-whatsapp"></i> Get Enquiry
              </b-button>
            </b-col>
            <b-col cols="12" md="6" class="my-2">
              <b-button squared variant="primary" class="w-100">
                <i class="fa-solid fa-bicycle"></i> Rent Now
              </b-button>
            </b-col>
          </div>
        </b-col>
      </b-row>
      <!-- about bike -->
      <h2 class="text-center my-5">About this bike</h2>
      <b-row>
        <b-col cols="12" lg="6">
          <p class="text-muted">
            {{ bike.about }}
          </p>
          <!-- card for about bike -->
          <b-row>
            <b-col cols="6" md="4" sm="6" class="my-2">
              <b-card class="text-center bg-light">
                <i class="fa-solid fa-gear fa-xl"></i>
                <div class="font-weight-bold">Displacement</div>
                <h6 class="text-primary">{{ bike.displacement }}</h6>
              </b-card>
            </b-col>
            <b-col cols="6" md="4" sm="6" class="my-2">
              <b-card class="text-center bg-light">
                <i class="fa-solid fa-bolt fa-xl"></i>
                <div class="font-weight-bold">Ignition</div>
                <h6 class="text-primary">{{ bike.ignition }}</h6>
              </b-card>
            </b-col>
            <b-col cols="6" md="4" sm="6" class="my-2">
              <b-card class="text-center bg-light">
                <i class="fa-solid fa-power-off fa-xl"></i>
                <div class="font-weight-bold">Power</div>
                <h6 class="text-primary">{{ bike.power }}</h6>
              </b-card>
            </b-col>
            <b-col cols="6" md="4" sm="6" class="my-2">
              <b-card class="text-center bg-light">
                <i class="fa-solid fa-gauge-high fa-xl"></i>
                <div class="font-weight-bold">Top Speed</div>
                <h6 class="text-primary">{{ bike.speed }}</h6>
              </b-card>
            </b-col>
            <b-col cols="6" md="4" sm="6" class="my-2">
              <b-card class="text-center bg-light">
                <i class="fa-solid fa-droplet fa-xl"></i>
                <div class="font-weight-bold">Fuel Capacity</div>
                <h6 class="text-primary">{{ bike.fuelcapacity }}</h6>
              </b-card>
            </b-col>
            <b-col cols="6" md="4" sm="6" class="my-2">
              <b-card class="text-center bg-light">
                <i class="fa-solid fa-battery-full fa-xl"></i>
                <div class="font-weight-bold">Mileage</div>
                <h6 class="text-primary">{{ bike.mileage }}</h6>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" lg="6">
          <b-img class="my-4" :src="bike.image" :alt="bike.name" fluid></b-img>
        </b-col>
      </b-row>

      <!-- Add any additional details or features here -->
    </div>
  </b-container>
</template>

<script>
import CountDown from "@/views/CountDown.vue";

export default {
  components: {
    CountDown,
  },
  data() {
    return {
      bike: {},
      phoneNumber: "917079812442", // Your WhatsApp number
      isModalVisible: false,
      shareOptions: [
        {
          label: "Share on WhatsApp",
          icon: "whatsapp",
          method: this.shareOnWhatsApp,
        },
        {
          label: "Share on Facebook",
          icon: "facebook",
          method: this.shareOnFacebook,
        },
        {
          label: "Share on Twitter",
          icon: "twitter",
          method: this.shareOnTwitter,
        },
        {
          label: "Share via Email",
          icon: "envelope",
          method: this.shareOnEmail,
        },
      ],
    };
  },
  created() {
    const bikeId = this.$route.params.id; // Get the bike ID from the route params
    this.fetchBikeDetails(bikeId); // Fetch the bike details using the ID
  },
  methods: {
    handleEnquiry() {
      // Logic for handling enquiry
      alert("Enquiry button clicked!");
    },
    handleRentNow() {
      // Logic for handling rent now
      alert("Rent Now button clicked!");
    },
    share(option) {
      option.method(); // Call the respective share method
      this.isModalVisible = false; // Close the modal after sharing
    },
    shareOnWhatsApp() {
      const pageUrl = window.location.href;
      const message = "Check out this bike:\n";
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        message + pageUrl
      )}`;
      window.open(whatsappUrl, "_blank");
    },
    shareOnFacebook() {
      const pageUrl = window.location.href;
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        pageUrl
      )}`;
      window.open(facebookUrl, "_blank");
    },
    shareOnTwitter() {
      const pageUrl = window.location.href;
      const message = "Check out this bike!";
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        message
      )}&url=${encodeURIComponent(pageUrl)}`;
      window.open(twitterUrl, "_blank");
    },
    shareOnEmail() {
      const pageUrl = window.location.href;
      const subject = "Check out this bike!";
      const body = `I found this bike you might like: ${pageUrl}`;
      const emailUrl = `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.open(emailUrl);
    },
    chatOnWhatsApp(bike) {
      const message = `Hii, I'm interested in the bike: ${bike.name}`;
      const whatsappUrl = `https://wa.me/${
        this.phoneNumber
      }?text=${encodeURIComponent(message)}`;

      // Open WhatsApp chat with the message
      window.open(whatsappUrl, "_blank");
    },
    fetchBikeDetails(id) {
      // Fetch the bike details from your data source using the bike ID
      const bikeData = [
        {
          id: 1,
          name: "Honda Shine",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-decent-blue-metallic-2023-1687260642123.png?q=80",
          rating: 4.8,
          ratingCount: 469,
          price: 3999,
          originalPrice: 4500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 1, // Summer Days Sale
          about:
            "Honda Shine is one of the most popular bikes in the 125cc segment, known for its excellent blend of performance and fuel efficiency. The Shine features a refined engine and advanced features for a comfortable ride. Its robust design and reliability make it a favorite choice for daily commuting.",
          displacement: "123.94",
          ignition: "Self / Kick Start",
          power: "10.59bhp",
          speed: "100kmph",
          fuelcapacity: "10.5l",
          mileage: "65kmpl",
        },
        {
          id: 2,
          name: "Hero Passion Pro",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/hero-passion-pro-2018.jpg?20190103151915&q=80",
          rating: 4.6,
          ratingCount: 469,
          price: 3000,
          originalPrice: 3500,
          highMileage: true,
          highDemand: true,
          status: 2, // Only One Left
          about:
            "Hero Passion Pro is a highly regarded bike in the 110cc commuter segment, offering a balance of good performance and fuel efficiency. It comes with modern features and a stylish design that makes it a popular choice among daily riders.",
          displacement: "113.2",
          ignition: "Self / Kick Start",
          power: "9.02bhp",
          speed: "85kmph",
          fuelcapacity: "10l",
          mileage: "68kmpl",
        },
        {
          id: 3,
          name: "Bajaj CT 100",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-ebony-black-with-red-decals-1669291918239.png?q=80",
          rating: 4.5,
          ratingCount: 469,
          price: 2499,
          originalPrice: 2800,
          highMileage: true,
          highDemand: true,
          status: 1, // Summer Days Sale
          about:
            "Bajaj categorizes CT100 as the jackpot bike offering superior mileage and low maintenance. Bajaj CT100 is layered with a new decal design. The SNS (Spring in Spring Suspension) technology aids in conquering the most challenging road conditions. It has a long padded seat delivering a high level of comfort and making the commute on rougher terrains easier. The powerful engine helps in extracting the maximum efficiency.",
          displacement: "102",
          ignition: "Kick Start",
          power: "7.79bhp",
          speed: "90kmph",
          fuelcapacity: "10.5l",
          mileage: "75kmpl",
        },
        {
          id: 4,
          name: "Bajaj Platina 100",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-black--blue-1671529556548.png?q=80",
          rating: 4.4,
          ratingCount: 469,
          price: 2600,
          originalPrice: 3000,
          highMileage: true,
          highDemand: true,
          status: 1, // Summer Days Sale
          about:
            "Bajaj Platina 100 is known for its outstanding fuel efficiency and comfortable ride, designed for long-distance commuters. It features a sturdy build, advanced suspension for smoother rides, and low maintenance, making it ideal for daily use.",
          displacement: "102",
          ignition: "Kick Start",
          power: "7.9bhp",
          speed: "90kmph",
          fuelcapacity: "11l",
          mileage: "75kmpl",
        },
        {
          id: 5,
          name: "Hero Splendor Plus",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/hero-select-model-blue-black-1706531445236.png?q=80",
          rating: 4.6,
          ratingCount: 469,
          price: 3100,
          originalPrice: 3600,
          highMileage: true,
          highDemand: true,
          status: 1, // Summer Days Sale
          about:
            "Hero Splendor Plus is one of the best-selling commuter bikes in India, known for its reliability, excellent fuel efficiency, and low maintenance. With a robust build and proven performance, it's ideal for daily commuting.",
          displacement: "97.2",
          ignition: "Self / Kick Start",
          power: "7.91bhp",
          speed: "87kmph",
          fuelcapacity: "9.8l",
          mileage: "70kmpl",
        },
        {
          id: 6,
          name: "TVS Star City",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/113179/star-city-right-side-view-2.png?isig=0&q=80",
          rating: 4.3,
          ratingCount: 469,
          price: 2900,
          originalPrice: 3300,
          highMileage: true,
          highDemand: true,
          status: 2, // Only One Left
          about:
            "TVS Star City is known for its impressive combination of style, comfort, and fuel efficiency. Designed for city commuting, it features a refined engine and modern aesthetics, making it a popular choice for daily riders.",
          displacement: "109.7",
          ignition: "Self / Kick Start",
          power: "8.08bhp",
          speed: "90kmph",
          fuelcapacity: "10l",
          mileage: "70kmpl",
        },
        {
          id: 7,
          name: "TVS Apache RTR 160",
          image:
            "https://imgd.aeplcdn.com/1056x594/n/bw/models/colors/undefined-matte-blue-1611036120368.jpg?q=80",
          rating: 4.5,
          ratingCount: 469,
          price: 4000,
          originalPrice: 4500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 1, // Summer Days Sale
          about:
            "TVS Apache RTR 160 is a popular sportbike in the 160cc segment, offering a blend of power, performance, and aggressive styling. Equipped with advanced features and a strong engine, it appeals to riders looking for an exciting riding experience.",
          displacement: "159.7",
          ignition: "Self / Kick Start",
          power: "15.31bhp",
          speed: "114kmph",
          fuelcapacity: "12l",
          mileage: "45kmpl",
        },
        {
          id: 8,
          name: "Yamaha Saluto",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/yamaha-saluto.jpg?20190103151915&q=80",
          rating: 4.2,
          ratingCount: 469,
          price: 2700,
          originalPrice: 3100,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
          status: 3, // Out of Stock
          about:
            "Yamaha Saluto is designed for riders seeking a balance of style, comfort, and efficiency. With its lightweight design and smooth performance, it's an excellent choice for city commuting, providing a comfortable ride without compromising on mileage.",
          displacement: "125",
          ignition: "Self / Kick Start",
          power: "8.2bhp",
          speed: "95kmph",
          fuelcapacity: "7.6l",
          mileage: "78kmpl",
        },
        // ############################ Added Sports Bike form here ##################################>
        {
          id: 9,
          name: "Yamaha R15",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-red-1704802630538.png?q=80",
          rating: 4.8,
          ratingCount: 469,
          price: 10999,
          originalPrice: 12000,
          highMileage: true,
          highDemand: true,
          status: 1, // Summer Days Sale
          about:
            "Yamaha R15 is a premium sportbike that offers an exhilarating riding experience with its sharp styling and advanced technology. Known for its performance, agility, and superior handling, the R15 is a favorite among enthusiasts looking for a thrilling ride.",
          displacement: "155",
          ignition: "Electronic Start",
          power: "18.6bhp",
          speed: "136kmph",
          fuelcapacity: "11l",
          mileage: "45kmpl",
        },
        {
          id: 10,
          name: "Kawasaki Ninja H2R",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/kawasaki-select-model-mirror-coated-matte-spark-black-1676442407791.png?q=80",
          rating: 4.6,
          ratingCount: 469,
          price: 14999,
          originalPrice: 16000,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 2, // Only One Left
          about:
            "Kawasaki Ninja H2R is a track-focused superbike that embodies cutting-edge technology and extreme performance. With its supercharged engine and aerodynamic design, it delivers mind-blowing speed and agility, making it one of the fastest motorcycles in the world.",
          displacement: "998",
          ignition: "Electronic Start",
          power: "310bhp",
          speed: "400kmph",
          fuelcapacity: "17l",
          mileage: "8-10kmpl",
        },
        {
          id: 11,
          name: "Suzuki GSX-R1000",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/suzuki-gsx-r1000.jpg?20190103151915&q=80",
          rating: 4.9,
          ratingCount: 469,
          price: 10099,
          originalPrice: 11000,
          highMileage: false,
          highDemand: true,
          status: 1, // Summer Days Sale
          about:
            "Suzuki GSX-R1000 is a high-performance sportbike that combines power, speed, and agility. Equipped with advanced technology and a powerful engine, it offers an exhilarating riding experience, making it a top choice among motorcycle enthusiasts.",
          displacement: "999",
          ignition: "Electronic Start",
          power: "199bhp",
          speed: "300kmph",
          fuelcapacity: "16l",
          mileage: "14-16kmpl",
        },
        {
          id: 12,
          name: "KTM RC 390",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/ktm-select-model-gp-editiond-1670826275682.png?q=80",
          rating: 4.7,
          ratingCount: 469,
          price: 13999,
          originalPrice: 15000,
          highMileage: true,
          highDemand: true,
          status: 2, // Only One Left
          about:
            "KTM RC 390 is a premium sports bike that offers a thrilling riding experience with its sharp handling and powerful engine. Designed for performance enthusiasts, it features an aggressive design and cutting-edge technology, making it suitable for both street and track use.",
          displacement: "373.2",
          ignition: "Electronic Start",
          power: "43bhp",
          speed: "179kmph",
          fuelcapacity: "9.5l",
          mileage: "25kmpl",
        },
        {
          id: 13,
          name: "Triumph Daytona 675R",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/triumph-daytona-675r-standard-532.jpg?20190103151915&q=80",
          rating: 4.6,
          ratingCount: 469,
          price: 15000,
          originalPrice: 16000,
          highMileage: true,
          highDemand: false,
          status: 1, // Summer Days Sale
          about:
            "Triumph Daytona 675R is a renowned sports bike celebrated for its precise handling, powerful performance, and distinctive styling. With a high-revving engine and advanced features, it offers an exhilarating ride on both the road and the racetrack.",
          displacement: "675",
          ignition: "Electronic Start",
          power: "126bhp",
          speed: "250kmph",
          fuelcapacity: "17.4l",
          mileage: "20-25kmpl",
        },
        {
          id: 14,
          name: "Ducati Panigale V2",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/ducati-select-model-white-riosso-livery-1598428332689.jpg?q=80",
          rating: 4.8,
          ratingCount: 469,
          price: 12000,
          originalPrice: 12500,
          highMileage: false,
          highDemand: true,
          status: 2, // Only One Left
          about:
            "Ducati Panigale V2 is a premium sports motorcycle that combines race-inspired performance with everyday usability. With its powerful twin-cylinder engine and advanced electronics, it delivers an exhilarating riding experience, embodying Ducati's legacy of speed and style.",
          displacement: "955",
          ignition: "Electronic Start",
          power: "155bhp",
          speed: "270kmph",
          fuelcapacity: "17l",
          mileage: "15-17kmpl",
        },
        {
          id: 15,
          name: "BMW S1000RR",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bmw-select-model-black-storm-metallic-1677058621251.jpg?q=80",
          rating: 4.9,
          ratingCount: 469,
          price: 15000,
          originalPrice: 15500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 3, // Out of Stock
          about:
            "The BMW S1000RR is a cutting-edge superbike that epitomizes performance and technology. With its high-revving inline-four engine and advanced electronics, it offers exhilarating acceleration and handling, making it a top choice for sportbike enthusiasts.",
          displacement: "999",
          ignition: "Electronic Start",
          power: "205bhp",
          speed: "299kmph",
          fuelcapacity: "17.5l",
          mileage: "15-20kmpl",
        },
        {
          id: 16,
          name: "Yamaha R15 V4",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-red-1704802630538.png?q=80",
          rating: 4.8,
          ratingCount: 469,
          price: 16000,
          originalPrice: 16500,
          highMileage: false,
          highDemand: true,
          status: 3, // Out of Stock
          about:
            "Yamaha R15 V4 is a premium sportbike that combines cutting-edge design with advanced technology. It features a refined engine, aggressive styling, and enhanced aerodynamics, providing a thrilling riding experience for both street and track.",
          displacement: "155",
          ignition: "Electronic Start",
          power: "18.4bhp",
          speed: "136kmph",
          fuelcapacity: "11l",
          mileage: "40-45kmpl",
        },
        // ############################ Added Scooter form here ##################################>
      ];
      this.bike = bikeData.find((bike) => bike.id === parseInt(id)); // Find the bike by ID
    },
    calculateDiscount(bike) {
      return Math.round(
        ((bike.originalPrice - bike.price) / bike.originalPrice) * 100
      );
    },
    getStatusText(status) {
      if (status === 1) return "Summer Days Sale";
      if (status === 2) return "Only One Left";
      if (status === 3) return "Out of Stock";
      return "Available";
    },
  },
};
</script>
<style scoped>
.extra-small {
  font-size: 0.75rem; /* Adjust this size as needed */
}
.color {
  background-color: darkgray;
  color: rgb(28, 41, 211);
}
</style>
