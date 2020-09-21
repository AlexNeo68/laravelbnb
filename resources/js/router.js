import VueRouter from 'vue-router';
import Bookables from './components/bookables/Bookables';
import Bookable from './components/bookables/Bookable';
import Review from './components/Review/Review';
import Basket from './components/Basket/Basket';

const routes = [
    {
        path: '/',
        component: Bookables,
        name: 'home',
    },
    {
        path: '/bookables/:id',
        component: Bookable,
        name: 'bookable',
    },
    {
        path: '/review/:id',
        component: Review,
        name: 'review',
    },
    {
        path: '/basket',
        component: Basket,
        name: 'basket',
    }
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
