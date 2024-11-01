// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';
import BikesList from './components/BikesList.vue';
import BikeDetail from './components/BikeDetail.vue';
import SportbikeList from './components/SportbikeList.vue';

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
      path: '/bike/:id/:name', // Use a dynamic route for bike details
      name: 'BikeDetail',
      component: BikeDetail,
    },
  ],
});
