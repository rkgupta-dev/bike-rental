<template>
  <div class="bike-detail-page">
    <!-- Hero Section -->
    <div class="section">
      <b-container>
        <!-- Breadcrumb -->
        <div class="listing-top-area">
          <b-breadcrumb class="custom-breadcrumb">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item>{{ bike.type }}</b-breadcrumb-item>
            <b-breadcrumb-item active>{{ bike.name }}</b-breadcrumb-item>
          </b-breadcrumb>
        </div>

        <div class="hero-grid">
          <!-- Left: Image & Share -->
          <div class="hero-image-col">
            <div
              class="image-panel"
              :class="{ disabledBike: bike.status === 3 }"
            >
              <div class="top-actions">
                <button class="circle-btn" @click="isModalVisible = true">
                  <b-icon icon="share-fill"></b-icon>
                </button>

                <button
                  class="circle-btn whatsapp"
                  @click="chatOnWhatsApp(bike)"
                >
                  <b-icon icon="whatsapp"></b-icon>
                </button>
              </div>

              <div class="image-wrap">
                <b-img
                  :src="bike.image"
                  :alt="bike.name"
                  fluid
                  class="bike-main-image"
                ></b-img>
              </div>

              <small class="img-note">
                Images are for representation purposes only. Actual delivered
                product may differ.
              </small>
            </div>
          </div>

          <!-- Right: Details -->
          <div class="hero-details-col">
            <!-- Bike Name & Rating -->
            <div class="bike-header">
              <h1 class="bike-title font-display">{{ bike.name }}</h1>

              <div class="rating-row">
                <div class="stars">
                  <i
                    v-for="i in 5"
                    :key="i"
                    class="fa-star"
                    :class="
                      i <= Math.floor(bike.rating)
                        ? 'fa-solid text-accent'
                        : 'fa-regular text-subtle'
                    "
                  ></i>
                </div>
                <span class="rating-value font-semibold">{{
                  bike.rating
                }}</span>
                <span class="rating-count text-muted"
                  >({{ bike.ratingCount }} reviews)</span
                >
              </div>
            </div>

            <div class="divider"></div>

            <!-- Pricing -->
            <div class="pricing-block">
              <div
                class="price-label text-muted text-sm font-semibold text-uppercase tracking-wider"
              >
                Monthly Rental
              </div>
              <div class="price-row">
                <span class="original-price">₹{{ bike.originalPrice }}</span>
                <span class="discount-badge">
                  <i class="fa-solid fa-tag"></i>
                  {{ calculateDiscount(bike) }}% off
                </span>
              </div>
              <div class="current-price">
                <span class="price-amount font-display">₹{{ bike.price }}</span>
                <span class="price-period text-muted">/month</span>
              </div>
            </div>

            <!-- Countdown -->
            <div>
              <CountDown />
            </div>

            <!-- Delivery Info -->
            <div class="delivery-card card-flat">
              <div class="delivery-item">
                <div class="icon-wrap icon-wrap-sm icon-wrap-primary">
                  <i class="fa-solid fa-truck-fast"></i>
                </div>
                <div>
                  <div class="font-semibold text-sm">Doorstep Delivery</div>
                  <div class="text-muted text-sm">
                    Within the next few hours
                  </div>
                </div>
              </div>
              <div class="divider-vertical" style="height: 32px"></div>
              <div class="delivery-item">
                <div class="icon-wrap icon-wrap-sm icon-wrap-success">
                  <i class="fa-solid fa-store"></i>
                </div>
                <div>
                  <div class="font-semibold text-sm">In-Store Pickup</div>
                  <div class="text-muted text-sm">
                    Ready in 1 hour or sooner
                  </div>
                </div>
              </div>
            </div>

            <!-- Services Included -->
            <div class="services-block">
              <h6
                class="services-title font-semibold text-sm text-uppercase tracking-wider text-muted"
              >
                Services Included
              </h6>
              <div class="service-items">
                <div class="service-item">
                  <div class="icon-wrap icon-wrap-sm icon-wrap-primary">
                    <i class="fa-solid fa-gauge"></i>
                  </div>
                  <div>
                    <span class="font-semibold">Unlimited Kilometers</span>
                    <span class="text-muted text-sm">
                      — Travel freely without any limit</span
                    >
                  </div>
                </div>
                <div class="service-item">
                  <div class="icon-wrap icon-wrap-sm icon-wrap-success">
                    <i class="fa-solid fa-shield-halved"></i>
                  </div>
                  <div>
                    <span class="font-semibold">Insurance Covered</span>
                    <span class="text-muted text-sm">
                      — Comprehensive coverage included</span
                    >
                  </div>
                </div>
                <div class="service-item">
                  <div class="icon-wrap icon-wrap-sm icon-wrap-warning">
                    <i class="fa-solid fa-screwdriver-wrench"></i>
                  </div>
                  <div>
                    <span class="font-semibold">Maintenance Covered</span>
                    <span class="text-muted text-sm">
                      — One free periodic service per rental</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="cta-row">
              <button
                class="btn-secondary-app cta-btn"
                @click="chatOnWhatsApp(bike)"
              >
                <i class="fa-brands fa-whatsapp" style="color: #25d366"></i>
                Get Enquiry
              </button>
              <button
                class="btn-primary-app cta-btn"
                :disabled="bike.status === 3"
                @click="goToCheckout"
              >
                <i class="fa-solid fa-bicycle"></i>
                {{ bike.status === 3 ? "Out of Stock" : "Rent Now" }}
              </button>
            </div>
          </div>
        </div>
      </b-container>
    </div>

    <!-- About Section -->
    <div class="about-section section-sm gradient-mesh">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Details</span>
          <h2 class="section-title">About this Bike</h2>
        </div>

        <div class="about-grid">
          <!-- Description -->
          <div class="about-desc-col">
            <p class="about-text text-muted">{{ bike.about }}</p>

            <!-- Specs Grid -->
            <div class="specs-grid">
              <div
                class="spec-card card-flat"
                v-for="spec in bikeSpecs"
                :key="spec.label"
              >
                <div class="spec-icon icon-wrap icon-wrap-md icon-wrap-primary">
                  <i :class="spec.icon"></i>
                </div>
                <div class="spec-label text-muted text-sm">
                  {{ spec.label }}
                </div>
                <div class="spec-value font-display font-bold text-primary">
                  {{ spec.value }}
                </div>
              </div>
            </div>
          </div>

          <!-- Image -->
          <div class="about-image-col">
            <div class="about-image-wrap">
              <img
                :src="bike.image"
                :alt="bike.name"
                class="about-bike-image"
              />
            </div>

            <!-- Stats row -->
            <div
              class="stat-row"
              style="margin-top: 1.5rem; justify-content: center; gap: 2rem"
            >
              <div class="stat-row-item">
                <span class="stat-row-number text-primary">{{
                  bike.mileage
                }}</span>
                <span class="stat-row-label">Mileage</span>
              </div>
              <div class="stat-row-divider"></div>
              <div class="stat-row-item">
                <span class="stat-row-number text-primary">{{
                  bike.speed
                }}</span>
                <span class="stat-row-label">Top Speed</span>
              </div>
              <div class="stat-row-divider"></div>
              <div class="stat-row-item">
                <span class="stat-row-number text-primary">{{
                  bike.power
                }}</span>
                <span class="stat-row-label">Power</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Share Modal -->
    <b-modal
      v-model="isModalVisible"
      title="Share this Bike"
      hide-footer
      centered
    >
      <p class="text-muted text-sm">Where do you want to share this link?</p>
      <div class="share-options">
        <button
          v-for="(option, index) in shareOptions"
          :key="index"
          class="share-option-btn"
          @click="share(option)"
        >
          <span class="share-option-icon">
            <b-icon :icon="option.icon" />
          </span>
          <span>{{ option.label }}</span>
          <i class="fa-solid fa-arrow-right share-arrow"></i>
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import CountDown from "@/views/CountDown.vue";

export default {
  components: { CountDown },
  data() {
    return {
      bike: {},
      phoneNumber: "917079812442",
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
  computed: {
    bikeSpecs() {
      if (!this.bike.displacement) return [];
      return [
        {
          label: "Displacement",
          value: this.bike.displacement + "cc",
          icon: "fa-solid fa-gear",
        },
        {
          label: "Ignition",
          value: this.bike.ignition,
          icon: "fa-solid fa-bolt",
        },
        {
          label: "Power",
          value: this.bike.power,
          icon: "fa-solid fa-power-off",
        },
        {
          label: "Top Speed",
          value: this.bike.speed,
          icon: "fa-solid fa-gauge-high",
        },
        {
          label: "Fuel Capacity",
          value: this.bike.fuelcapacity,
          icon: "fa-solid fa-droplet",
        },
        {
          label: "Mileage",
          value: this.bike.mileage,
          icon: "fa-solid fa-battery-full",
        },
      ];
    },
  },
  created() {
    const bikeId = this.$route.params.id;
    this.fetchBikeDetails(bikeId);
  },
  methods: {
    goToCheckout() {
      if (!this.isLoggedIn()) {
        this.$router.push({ name: "login" });
        return;
      }
      this.$router.push({
        name: "verification",
        query: {
          name: this.bike.name,
          image: this.bike.image,
          price: this.bike.price,
          originalPrice: this.bike.originalPrice,
        },
      });
    },
    isLoggedIn() {
      return !!localStorage.getItem("user");
    },
    share(option) {
      option.method();
      this.isModalVisible = false;
    },
    shareOnWhatsApp() {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          "Check out this bike:\n" + window.location.href,
        )}`,
        "_blank",
      );
    },
    shareOnFacebook() {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href,
        )}`,
        "_blank",
      );
    },
    shareOnTwitter() {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          "Check out this bike!",
        )}&url=${encodeURIComponent(window.location.href)}`,
        "_blank",
      );
    },
    shareOnEmail() {
      window.open(
        `mailto:?subject=${encodeURIComponent(
          "Check out this bike!",
        )}&body=${encodeURIComponent(
          "I found this bike you might like: " + window.location.href,
        )}`,
      );
    },
    chatOnWhatsApp(bike) {
      const message = `Hii, I'm interested in the bike: ${bike.name}`;
      window.open(
        `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
      );
    },
    calculateDiscount(bike) {
      return Math.round(
        ((bike.originalPrice - bike.price) / bike.originalPrice) * 100,
      );
    },
    fetchBikeDetails(id) {
      const bikeData = [
        {
          id: 1,
          name: "Honda Shine",
          type: "Bike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-decent-blue-metallic-2023-1687260642123.png?q=80",
          rating: 4.8,
          ratingCount: 459,
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
          type: "Bike",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/hero-passion-pro-2018.jpg?20190103151915&q=80",
          rating: 4.6,
          ratingCount: 349,
          price: 3000,
          originalPrice: 3500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
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
          type: "Bike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-ebony-black-with-red-decals-1669291918239.png?q=80",
          rating: 4.5,
          ratingCount: 345,
          price: 2499,
          originalPrice: 2800,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
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
          type: "Bike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-black--blue-1671529556548.png?q=80",
          rating: 4.4,
          ratingCount: 756,
          price: 2600,
          originalPrice: 3000,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
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
          type: "Bike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/hero-select-model-blue-black-1706531445236.png?q=80",
          rating: 4.6,
          ratingCount: 234,
          price: 3100,
          originalPrice: 3600,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
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
          type: "Bike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/113179/star-city-right-side-view-2.png?isig=0&q=80",
          rating: 4.3,
          ratingCount: 469,
          price: 2900,
          originalPrice: 3300,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
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
          type: "Sportbike",
          image:
            "https://imgd.aeplcdn.com/1056x594/n/bw/models/colors/undefined-matte-blue-1611036120368.jpg?q=80",
          rating: 4.5,
          ratingCount: 264,
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
          type: "Bike",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/yamaha-saluto.jpg?20190103151915&q=80",
          rating: 4.2,
          ratingCount: 534,
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
          type: "Sportbike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-red-1704802630538.png?q=80",
          rating: 4.8,
          ratingCount: 343,
          price: 10999,
          originalPrice: 12000,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
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
          type: "Sportbike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/kawasaki-select-model-mirror-coated-matte-spark-black-1676442407791.png?q=80",
          rating: 4.6,
          ratingCount: 153,
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
          type: "Sportbike",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/suzuki-gsx-r1000.jpg?20190103151915&q=80",
          rating: 4.9,
          ratingCount: 342,
          price: 10099,
          originalPrice: 11000,
          highMileage: false,
          highDemand: true,
          bestSeller: false,
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
          type: "Sportbike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/ktm-select-model-gp-editiond-1670826275682.png?q=80",
          rating: 4.7,
          ratingCount: 155,
          price: 13999,
          originalPrice: 15000,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
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
          type: "Sportbike",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/triumph-daytona-675r-standard-532.jpg?20190103151915&q=80",
          rating: 4.6,
          ratingCount: 278,
          price: 15000,
          originalPrice: 16000,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
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
          type: "Sportbike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/ducati-select-model-white-riosso-livery-1598428332689.jpg?q=80",
          rating: 4.8,
          ratingCount: 308,
          price: 12000,
          originalPrice: 12500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
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
          type: "Sportbike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bmw-select-model-black-storm-metallic-1677058621251.jpg?q=80",
          rating: 4.9,
          ratingCount: 333,
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
          type: "Sportbike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-red-1704802630538.png?q=80",
          rating: 4.8,
          ratingCount: 245,
          price: 16000,
          originalPrice: 16500,
          highMileage: false,
          highDemand: true,
          bestSeller: false,
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
        {
          id: 17,
          name: "Honda Activa 6G",
          type: "Scooter",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-black-1674535477895.png?q=80",
          rating: 4.7,
          ratingCount: 469,
          price: 4000,
          originalPrice: 4500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 1, // Summer Days Sale
          about:
            "Honda Activa 6G is a popular scooter known for its reliable performance, comfortable ride, and efficient mileage. With updated features and a refined engine, it offers a smooth commuting experience, making it a favorite choice among riders.",
          displacement: "109.51",
          ignition: "Electronic Start",
          power: "7.79bhp",
          speed: "65kmph",
          fuelcapacity: "5.3l",
          mileage: "45-60kmpl",
        },
        {
          id: 18,
          name: "TVS Jupiter",
          type: "Scooter",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80",
          rating: 4.6,
          ratingCount: 546,
          price: 3500,
          originalPrice: 4000,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
          about:
            "TVS Jupiter is a well-rounded scooter that offers a perfect blend of performance, comfort, and convenience. With its stylish design and fuel-efficient engine, it is ideal for daily commuting and provides a smooth riding experience.",
          displacement: "109.7",
          ignition: "Electronic Start",
          power: "7.88bhp",
          speed: "85kmph",
          fuelcapacity: "6l",
          mileage: "50-62kmpl",
        },
        {
          id: 19,
          name: "Hero Duet",
          type: "Scooter",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/hero-duet-lx20190722133839.jpg?q=80",
          rating: 4.5,
          ratingCount: 676,
          price: 3300,
          originalPrice: 3700,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
          status: 1, // Summer Days Sale
          about:
            "Hero Duet is a versatile scooter that offers a blend of style, comfort, and practicality. With its spacious storage options and fuel-efficient engine, it is designed for urban commuting and provides a reliable riding experience.",
          displacement: "110.9",
          ignition: "Electronic Start",
          power: "8.31bhp",
          speed: "90kmph",
          fuelcapacity: "5.5l",
          mileage: "45-50kmpl",
        },
        {
          id: 20,
          name: "Suzuki Access 125",
          type: "Scooter",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/suzuki-select-model-metallic-mattee-black-std-1679635807338.png?q=80",
          rating: 4.8,
          ratingCount: 335,
          price: 4200,
          originalPrice: 4700,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
          about:
            "Suzuki Access 125 is a stylish and powerful scooter that offers excellent performance and comfort. With its refined engine and spacious storage, it is perfect for daily commuting and provides a smooth riding experience.",
          displacement: "124",
          ignition: "Electronic Start",
          power: "8.7bhp",
          speed: "92kmph",
          fuelcapacity: "5l",
          mileage: "50-55kmpl",
        },
        {
          id: 21,
          name: "Yamaha Fascino 125",
          type: "Scooter",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-white--drum-1712697907928.png?q=80",
          rating: 4.6,
          ratingCount: 389,
          price: 3400,
          originalPrice: 3900,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 1, // Summer Days Sale
          about:
            "Yamaha Fascino 125 combines stylish design with impressive performance. With its lightweight chassis and efficient engine, it offers a smooth and comfortable ride, making it a popular choice among urban commuters.",
          displacement: "125",
          ignition: "Electronic Start",
          power: "8.2bhp",
          speed: "92kmph",
          fuelcapacity: "5.2l",
          mileage: "50-55kmpl",
        },
        {
          id: 22,
          name: "Hero Pleasure +",
          type: "Scooter",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/hero-select-model-sport-red-1707151003981.png?q=80",
          rating: 4.4,
          ratingCount: 280,
          price: 4800,
          originalPrice: 5000,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
          status: 2, // Only One Left
          about:
            "Hero Pleasure + is a lightweight and stylish scooter that is easy to handle and perfect for city commuting. With its efficient engine and sleek design, it offers a comfortable and enjoyable ride for daily use.",
          displacement: "110.9",
          ignition: "Electronic Start",
          power: "8bhp",
          speed: "77kmph",
          fuelcapacity: "4.8l",
          mileage: "50-55kmpl",
        },
        {
          id: 23,
          name: "TVS Ntorq 125",
          type: "Scooter",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-ntorq-125-disc1725629749318.jpg?q=80",
          rating: 4.7,
          ratingCount: 460,
          price: 4500,
          originalPrice: 5000,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 1, // Summer Days Sale
          about:
            "TVS Ntorq 125 is a feature-packed scooter designed for the young and dynamic riders. With its sporty design, powerful engine, and advanced connectivity features, it delivers a thrilling riding experience and practicality for daily commuting.",
          displacement: "124.8",
          ignition: "Electronic Start",
          power: "9.1bhp",
          speed: "95kmph",
          fuelcapacity: "5.8l",
          mileage: "45-50kmpl",
        },
        {
          id: 24,
          name: "Honda Dio",
          type: "Scooter",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-jazzy-blue-metallic-1686570017642.png?q=80",
          rating: 4.5,
          ratingCount: 250,
          price: 3700,
          originalPrice: 4100,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 1, // Summer Days Sale
          about:
            "Honda Dio is a stylish and lightweight scooter that offers a perfect combination of performance and convenience. With its sporty design and efficient engine, it is ideal for urban commuting, providing a fun and comfortable ride.",
          displacement: "109.51",
          ignition: "Electronic Start",
          power: "7.79bhp",
          speed: "85kmph",
          fuelcapacity: "5.3l",
          mileage: "50-55kmpl",
        },
        {
          id: 25,
          name: "Hero Xoom",
          type: "Scooter",
          image:
            "https://imgd.aeplcdn.com/310x174/n/cw/ec/130411/xoom-right-side-view-11.png?isig=0&q=80",
          rating: 4.2,
          ratingCount: 756,
          price: 2900,
          originalPrice: 3200,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
          status: 3, // Out of Stock
          about:
            "Hero Xoom is a stylish scooter designed for urban riders looking for performance and comfort. With its sporty design, advanced features, and fuel-efficient engine, it offers a smooth riding experience for daily commuting.",
          displacement: "110",
          ignition: "Electronic Start",
          power: "8.2bhp",
          speed: "90kmph",
          fuelcapacity: "5l",
          mileage: "45-50kmpl",
        },
        {
          id: 26,
          name: "Mahindra Gusto",
          type: "Scooter",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/mahindra-gusto-dx--cbs20190731111612.jpg?q=80",
          rating: 4.3,
          ratingCount: 469,
          price: 3100,
          originalPrice: 3600,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
          about:
            "Mahindra Gusto is a feature-rich scooter that offers a blend of comfort and convenience. With its adjustable seat height and peppy engine, it provides a smooth ride, making it suitable for both city commuting and longer rides.",
          displacement: "109.6",
          ignition: "Electronic Start",
          power: "8bhp",
          speed: "85kmph",
          fuelcapacity: "6l",
          mileage: "45-50kmpl",
        },
        {
          id: 27,
          name: "Royal Enfield Classic 350",
          type: "Cruiser",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/royalenfield-classic-350-heritage1725274941405.jpg?q=80",
          rating: 4.7,
          ratingCount: 258,
          price: 5000,
          originalPrice: 5500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 1, // Summer Days Sale
          about:
            "The Royal Enfield Classic 350 is an iconic motorcycle that blends vintage design with modern engineering. Known for its robust build and powerful engine, it offers a smooth and comfortable ride, perfect for both long tours and city cruising.",
          displacement: "349",
          ignition: "Electronic Start",
          power: "20.2bhp",
          speed: "115kmph",
          fuelcapacity: "13l",
          mileage: "35-40kmpl",
        },
        {
          id: 28,
          name: "Harley-Davidson Street 750",
          type: "Cruiser",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/harleydavidson-street-750-standard20200616012038.jpg?q=80",
          rating: 4.6,
          ratingCount: 210,
          price: 8000,
          originalPrice: 8500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
          about:
            "The Harley-Davidson Street 750 is a sleek and powerful cruiser designed for urban riding. With its liquid-cooled Revolution X engine and agile handling, it delivers a smooth and thrilling performance, perfect for enthusiasts who crave style and substance.",
          displacement: "749",
          ignition: "Electronic Start",
          power: "53bhp",
          speed: "177kmph",
          fuelcapacity: "13.1l",
          mileage: "20-25kmpl",
        },
        {
          id: 29,
          name: "Bajaj Avenger Cruise 220",
          type: "Cruiser",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-auburn-black-1669289946200.png?q=80",
          rating: 4.5,
          ratingCount: 280,
          price: 4000,
          originalPrice: 4500,
          highMileage: true,
          highDemand: false,
          bestSeller: true,
          status: 1, // Summer Days Sale
          about:
            "The Bajaj Avenger Cruise 220 is a comfortable cruiser motorcycle known for its relaxed riding position and classic cruiser styling. It features a powerful engine that delivers smooth performance, making it suitable for long-distance touring.",
          displacement: "220",
          ignition: "Electronic Start",
          power: "18.76bhp",
          speed: "120kmph",
          fuelcapacity: "13l",
          mileage: "35-40kmpl",
        },
        {
          id: 30,
          name: "Kawasaki Vulcan S",
          type: "Cruiser",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--standard1728554869402.jpg?q=80",
          rating: 4.8,
          ratingCount: 460,
          price: 9000,
          originalPrice: 9500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
          about:
            "The Kawasaki Vulcan S is a versatile cruiser that blends comfort and performance. With its adjustable riding positions and parallel-twin engine, it caters to a variety of riders, offering a powerful yet smooth ride ideal for both city cruising and highway tours.",
          displacement: "649",
          ignition: "Electronic Start",
          power: "59.94bhp",
          speed: "168kmph",
          fuelcapacity: "14l",
          mileage: "20-25kmpl",
        },
        {
          id: 31,
          name: "Benelli 502C",
          type: "Cruiser",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/benelli-select-model-glossy-black-1645507335732.png?q=80",
          rating: 4.6,
          ratingCount: 350,
          price: 7000,
          originalPrice: 7500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 1, // Summer Days Sale
          about:
            "The Benelli 502C is a modern power cruiser that embodies style and performance. With its muscular design and powerful parallel-twin engine, it provides a confident and smooth ride. The bike is ideal for riders who appreciate a blend of sophistication and power for city and highway rides.",
          displacement: "500",
          ignition: "Electronic Start",
          power: "46.8bhp",
          speed: "160kmph",
          fuelcapacity: "21l",
          mileage: "25-30kmpl",
        },
        {
          id: 32,
          name: "Yamaha VMAX",
          type: "Cruiser",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/yamaha-vmax-standard-180.jpg?20190103151915&q=80",
          rating: 4.9,
          ratingCount: 180,
          price: 12000,
          originalPrice: 12500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 2, // Only One Left
          about:
            "The Yamaha VMAX is an iconic power cruiser known for its muscular design and raw power. Equipped with a V4 engine, it delivers exceptional performance and acceleration, making it a favorite among enthusiasts who crave power and style in one package.",
          displacement: "1679",
          ignition: "Electronic Start",
          power: "197.2bhp",
          speed: "220kmph",
          fuelcapacity: "15l",
          mileage: "10-15kmpl",
        },
        {
          id: 33,
          name: "Harley-Davidson Iron 883",
          type: "Cruiser",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/harleydavidson-iron-883-standard1677237126841.jpg?q=80",
          rating: 4.7,
          ratingCount: 342,
          price: 11000,
          originalPrice: 11500,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 1, // Summer Days Sale
          about:
            "The Harley-Davidson Iron 883 is a classic cruiser bike that embodies the raw and stripped-down style of the brand. With its blacked-out look, comfortable riding stance, and a torquey V-twin engine, it offers an authentic and thrilling riding experience.",
          displacement: "883",
          ignition: "Electronic Start",
          power: "50bhp",
          speed: "170kmph",
          fuelcapacity: "12.5l",
          mileage: "20-25kmpl",
        },
        {
          id: 34,
          name: "KTM 790 Duke",
          type: "Bike",
          image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/ktm-duke-200-standard1727961894099.jpg?q=80",
          rating: 4.4,
          ratingCount: 230,
          price: 9000,
          originalPrice: 9500,
          highMileage: true,
          highDemand: true,
          bestSeller: false,
          status: 3, // Out of Stock
          about:
            "The KTM 790 Duke, known as 'The Scalpel,' is a high-performance naked bike that boasts precision handling and strong power delivery. Its parallel-twin engine, lightweight chassis, and advanced electronics make it a top choice for riders looking for an agile and thrilling ride.",
          displacement: "799",
          ignition: "Electronic Start",
          power: "103bhp",
          speed: "220kmph",
          fuelcapacity: "14l",
          mileage: "22-25kmpl",
        },
        {
          id: 35,
          name: "Suzuki Intruder 150",
          type: "Cruiser",
          image:
            "https://imgd.aeplcdn.com/664x374/bw/models/suzuki-intruder-150-standard--bs-vi20200320182536.jpg?q=80",
          rating: 4.3,
          ratingCount: 124,
          price: 3500,
          originalPrice: 4000,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 2, // Only One Left
          about:
            "The Suzuki Intruder 150 is a stylish cruiser bike that combines modern design with comfortable riding ergonomics. It features a refined engine and advanced technology, making it perfect for both city commuting and long rides.",
          displacement: "154.9",
          ignition: "Electronic Start",
          power: "14.8bhp",
          speed: "140kmph",
          fuelcapacity: "11l",
          mileage: "40-45kmpl",
        },
        {
          id: 36,
          name: "Triumph Bonneville Bobber",
          type: "Cruiser",
          image:
            "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/triumph-select-model-jet-black--ash-gray-1698486184857.png?q=80",
          rating: 4.8,
          ratingCount: 350,
          price: 7500,
          originalPrice: 8000,
          highMileage: false,
          highDemand: true,
          bestSeller: true,
          status: 2, // Only One Left
          about:
            "The Triumph Bonneville Bobber combines classic design with modern engineering. With its distinctive style and powerful parallel-twin engine, it offers a relaxed riding position and a unique riding experience, making it a favorite among enthusiasts.",
          displacement: "1200",
          ignition: "Electronic Start",
          power: "76bhp",
          speed: "130kmph",
          fuelcapacity: "12l",
          mileage: "25-30kmpl",
        },
      ];
      this.bike = bikeData.find((bike) => bike.id === parseInt(id)); // Find the bike by ID
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
/* ── Page Wrapper ── */
.bike-detail-page {
  min-height: 100vh;
  background: var(--color-white);
}

/* ── Breadcrumb ── */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) 0 var(--space-6);
  font-size: var(--text-sm);
}
.breadcrumb-link {
  color: var(--color-gray-500);
  text-decoration: none;
  transition: var(--transition-fast);
}
.breadcrumb-link:hover {
  color: var(--color-primary);
}
.breadcrumb-sep {
  color: var(--color-gray-300);
  font-size: 0.6rem;
}
.breadcrumb-current {
  color: var(--color-gray-700);
  font-weight: var(--font-medium);
}

/* ── Hero Section ── */

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: start;
}

.circle-btn {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
}

.circle-btn.whatsapp {
  color: green;
}

.image-wrap {
  text-align: center;
  padding: 30px;
}

.bike-main-image {
  max-height: 360px;
  object-fit: contain;
}

@media (max-width: 991px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}

/* ── Image Column ── */
/* ===============================
   LEFT IMAGE COLUMN
=================================*/
.hero-image-col {
  width: 100%;
}

@media (min-width: 1200px) {
  .hero-image-col {
    position: sticky;
    top: 100px;
    align-self: start;
  }
}

.top-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 1rem;
}

.circle-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.circle-btn:hover {
  transform: translateY(-2px);
}

.circle-btn.whatsapp {
  color: #25d366;
}

.image-wrap {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bike-main-image {
  width: 100%;
  max-height: 330px;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.image-panel:hover .bike-main-image {
  transform: scale(1.04);
}

.img-note {
  display: block;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.76rem;
  color: var(--color-gray-400);
  border-top: 1px solid #edf0f3;
  padding-top: 0.9rem;
}

/* ── Details Column ── */
.hero-details-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.bike-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.bike-title {
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: var(--font-extrabold);
  color: var(--color-dark);
  margin: 0;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
}

.rating-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.stars {
  display: flex;
  gap: 2px;
}
.stars i {
  font-size: 0.9rem;
}
.rating-value {
  font-size: var(--text-base);
  color: var(--color-dark);
}
.rating-count {
  font-size: var(--text-sm);
}

/* ── Pricing ── */
.pricing-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.price-label {
  margin-bottom: var(--space-1);
}
.price-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.original-price {
  font-size: var(--text-base);
  color: var(--color-gray-400);
  text-decoration: line-through;
}
.discount-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--color-success-bg);
  color: #065f46;
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}
.current-price {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}
.price-amount {
  font-size: var(--text-4xl);
  font-weight: var(--font-extrabold);
  color: var(--color-dark);
  line-height: 1;
}
.price-period {
  font-size: var(--text-base);
}

/* ── Countdown Wrap ── */
.countdown-wrap {
  padding: var(--space-3) var(--space-4);
}

/* ── Delivery Card ── */
.delivery-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
}
.delivery-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex: 1;
}

/* ── Services ── */
.services-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.services-title {
  margin: 0;
}
.service-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.service-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-sm);
  line-height: var(--leading-snug);
}

/* ── CTA Row ── */
.cta-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.cta-btn {
  width: 100% !important;
  justify-content: center !important;
  padding: 14px 20px !important;
  font-size: var(--text-base) !important;
}

/* ── About Section ── */
.about-section {
  border-top: 1px solid var(--color-gray-100);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: start;
}

@media (max-width: 991px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}

.about-text {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

/* ── Specs Grid ── */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

@media (max-width: 575px) {
  .specs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.spec-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-4);
  transition: var(--transition-base);
}
.spec-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-border);
}

.spec-label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-gray-400);
}
.spec-value {
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-primary);
}

/* ── About Image ── */
.about-image-wrap {
  overflow: hidden;
  padding: var(--space-8);

  text-align: center;
}
.about-bike-image {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
}

/* ── Share Modal Options ── */
.share-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
.share-option-btn {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-gray-700);
  text-align: left;
  transition: var(--transition-fast);
  width: 100%;
}
.share-option-btn:hover {
  background: var(--color-primary-bg);
  border-color: var(--color-primary-border);
  color: var(--color-primary);
}
.share-option-icon {
  font-size: 1.1rem;
}
.share-arrow {
  margin-left: auto;
  font-size: 0.75rem;
  opacity: 0.4;
}

.listing-top-area {
  margin-bottom: 2rem;
}

.custom-breadcrumb {
  background: transparent;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.custom-breadcrumb .breadcrumb {
  background: transparent !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
}

.custom-breadcrumb .breadcrumb-item a {
  color: var(--color-gray-500);
  font-weight: 500;
  text-decoration: none;
}

.custom-breadcrumb .breadcrumb-item.active {
  color: var(--color-primary);
  font-weight: 700;
}

.custom-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
  color: var(--color-gray-300);
}
</style>
