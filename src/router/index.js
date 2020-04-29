import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '@/views/Welcome';
import Home from '@/views/Home';
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';
import store from '@/store';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        beforeEnter: (to, from, next)=>{
            if (!store.getters['auth/authenticated']) {
                next({
                    name: 'login'
                })   
            }
            next();
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated']) {
                next({
                    name: 'home'
                })   
            }
            next();
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;