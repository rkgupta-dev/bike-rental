// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';
import BikesList from './components/BikesList.vue';
import BikeDetail from './components/BikeDetail.vue';
import SportbikeList from './components/SportbikeList.vue';
import RentPage from './views/RentPage.vue';
import ScooterList from './components/ScooterList.vue';
import CruiserList from './components/CruiserList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // Use 'history' mode for clean URLs
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/rent',
      name: 'rent',
      component: RentPage,
    },
    {
      path: '/bikes',
      name: 'bikeslists',
      component: BikesList,
    },
    {
      path: '/sportsbike',
      name: 'sportbikelist',
      component: SportbikeList,
    },
    {
      path: '/scooter',
      name: 'scooter',
      component: ScooterList,
    },
    {
      path: '/cruiser',
      name: 'cruiser',
      component: CruiserList,
    },
    {
      path: '/bike/:id/:name', // Use a dynamic route for bike details
      name: 'BikeDetail',
      component: BikeDetail,
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
