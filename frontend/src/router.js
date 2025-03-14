// src/router.js
import Vue from "vue";
import Router from "vue-router";
import LandingPage from "@/components/LandingPage.vue";
import BikesList from "./components/BikesList.vue";
import BikeDetail from "./components/BikeDetail.vue";
import SportbikeList from "./components/SportbikeList.vue";
import RentPage from "./views/RentPage.vue";
import ScooterList from "./components/ScooterList.vue";
import CruiserList from "./components/CruiserList.vue";
import AllModel from "./components/AllModel.vue";
import HowItWorks from "./views/HowItWorks.vue";
import BlogPage from "./views/BlogPage.vue";
import CheckOut from "./components/CheckOut.vue";
import LoginPage from "./auth/LoginPage.vue";
import SignUpPage from "./auth/SignUpPage.vue";
import PageNotFound from "./views/PageNotFound.vue";
import ComplainsPage from "./views/support/ComplainsPage.vue";
import FaqPage from "./views/support/FaqPage.vue";
import AboutUsPage from "./views/support/AboutUsPage.vue";
import ContactUsPage from "./views/support/ContactUsPage.vue";
import DocumentVerification from "./components/DocumentVerification.vue";
import NotificationPage from "./views/NotificationPage.vue";
import PaymentMethod from "./views/PaymentMethod.vue";
import AccountSettings from "./views/AccountSettings.vue";
import RentalHistory from "./views/RentalHistory.vue";
import MyBookings from "./views/MyBookings.vue";
import ForgotPassword from "./auth/ForgotPassword.vue";
import PaymentSuccess from "./views/PaymentSuccess.vue";
import PaymentCancel from "./views/PaymentCancel.vue";
import FirstPage from "./dailyRent/FirstPage.vue";
import ModalPage from "./dailyRent/ModalPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // Use 'history' mode for clean URLs
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: { hideChatBot: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpPage,
      meta: { hideChatBot: true },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
      meta: { hideChatBot: true },
    },
    {
      path: "/rent",
      name: "rent",
      component: RentPage,
    },
    {
      path: "/bikes",
      name: "bikeslists",
      component: BikesList,
    },
    {
      path: "/sportsbike",
      name: "sportbikelist",
      component: SportbikeList,
    },
    {
      path: "/scooter",
      name: "scooter",
      component: ScooterList,
    },
    {
      path: "/cruiser",
      name: "cruiser",
      component: CruiserList,
    },
    {
      path: "/all-model",
      name: "all-model",
      component: AllModel,
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: CheckOut,
    },
    {
      path: "/payment-success",
      name: "payment-success",
      component: PaymentSuccess,
      meta: { hideChatBot: true },
    },
    {
      path: "/payment-cancelled",
      name: "payment-cancelled",
      component: PaymentCancel,
      meta: { hideChatBot: true },
    },
    {
      path: "/how-it-works",
      name: "how-it-works",
      component: HowItWorks,
    },
    {
      path: "/blogs",
      name: "blog",
      component: BlogPage,
    },
    {
      path: "/bike/:id/:name", // Use a dynamic route for bike details
      name: "BikeDetail",
      component: BikeDetail,
    },
    {
      path: "/verification", // Use a dynamic route for bike details
      name: "verification",
      component: DocumentVerification,
    },
    {
      path: "/complaint-form",
      name: "complaint",
      component: ComplainsPage,
    },
    {
      path: "/frequently-asked-questions",
      name: "frequently-asked-questions",
      component: FaqPage,
    },
    {
      path: "/about-us",
      name: "about-us",
      component: AboutUsPage,
    },
    {
      path: "/contact-us",
      name: "contact-us",
      component: ContactUsPage,
    },
    {
      path: "/notifications",
      name: "notifications",
      component: NotificationPage,
    },
    {
      path: "/payment-methods",
      name: "payment-methods",
      component: PaymentMethod,
    },
    {
      path: "/account-settings",
      name: "account-settings",
      component: AccountSettings,
    },
    {
      path: "/rental-history",
      name: "rental-history",
      component: RentalHistory,
    },
    {
      path: "/my-bookings",
      name: "my-bookings",
      component: MyBookings,
    },
    {
      path: "/daily-rent",
      name: "daily-rent",
      component: FirstPage,
    },
    {
      path: "/model-page",
      name: "model-page",
      component: ModalPage,
    },
    {
      path: "*",
      name: "404",
      component: PageNotFound,
      meta: { hideChatBot: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // If there is a saved scroll position, return it (for navigating back)
    if (savedPosition) {
      return savedPosition;
    } else {
      // If not, scroll to the top
      return { x: 0, y: 0 };
    }
  },
});
