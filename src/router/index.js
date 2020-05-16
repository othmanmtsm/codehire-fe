import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '@/views/Welcome';
import Home from '@/views/Home';
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';
import ProfileSetup from '@/views/profile/Setup'
import MyProfile from '@/views/freelancer/me'
import store from '@/store';
import newProject from '@/views/project/newProject';
import listProject from '@/views/project/projectList';


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
    },
    {
        path: '/profile/setup/:role',
        name: 'profile.setup',
        component: ProfileSetup
    },
    {
        path: '/me',
        name: 'profile.me',
        component: MyProfile
    },
    {
        path: '/project',
        name: 'project.list',
        component: listProject
    },
    {
        path: '/project/create',
        name: 'project.new',
        component: newProject
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;