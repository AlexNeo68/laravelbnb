import VueRouter from 'vue-router';
import Bookables from './components/bookables/Bookables';
import Bookable from './components/bookables/Bookable';

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
    }
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
