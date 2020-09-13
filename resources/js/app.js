require('./bootstrap');

import VueRouter from 'vue-router';
import router from './router';
import Index from './Index';
import RatingStars from './shared/components/RatingStars';
import FatalError from './shared/components/FatalError';
import Success from './shared/components/Success';
import ValidationErrors from './shared/components/ValidationErrors';
import moment from 'moment';

window.Vue = require('vue');

Vue.filter('fromNow', val => moment(val).fromNow());

Vue.use(VueRouter);

Vue.component('rating-stars', RatingStars);
Vue.component('fatal-error', FatalError);
Vue.component('success', Success);
Vue.component('v-errors', ValidationErrors);

const app = new Vue({
    el: '#app',
    router,
    components: { Index }
});
