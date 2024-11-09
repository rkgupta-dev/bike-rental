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
      path: "/complaint-form",
      name: "complaint",
      component: ComplainsPage,
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
