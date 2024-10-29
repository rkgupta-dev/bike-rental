// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';
import BikesList from './components/BikesList.vue';

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
  ],
});
