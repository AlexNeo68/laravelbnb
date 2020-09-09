require('./bootstrap');

import VueRouter from 'vue-router';
import router from './router';
import Index from './Index';
import RatingStars from './shared/components/RatingStars';
import moment from 'moment';

window.Vue = require('vue');

Vue.filter('fromNow', val => moment(val).fromNow());

Vue.use(VueRouter);

Vue.component('rating-stars', RatingStars);

const app = new Vue({
    el: '#app',
    router,
    components: { Index }
});
