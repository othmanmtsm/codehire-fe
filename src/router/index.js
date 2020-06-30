import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '@/views/Welcome';
import Home from '@/views/Home';
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';
import ProfileSetup from '@/views/profile/Setup'
import MyProfile from '@/views/freelancer/me';
import store from '@/store';
import newProject from '@/views/project/newProject';
import listProject from '@/views/project/projectList';
import singleProject from '@/views/project/projectSingle';
import projectsSettings from '@/views/project/projectSettings';
import editProject from '@/views/project/editProject';
import Messages from '@/views/Messages';
import Profile from '@/views/freelancer/profile';
import freelancerList from '@/views/freelancer/list';
import FreelancerProfileSettings from '@/views/profile/FreelancerProfileSettings'
import projectContract from '@/views/project/Contract';
import myProjects from '@/views/freelancer/projects';
import timeTracker from '@/views/project/timetracker';
import AdminDashboard from '@/views/dashboard';
import test from '@/views/test';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated']) {
                next({
                    name: 'home'
                });
            }else{
                next();
            }
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        beforeEnter: (to, from, next)=>{
            if (!store.getters['auth/authenticated']) {
                next({
                    name: 'login'
                });
            }else{
                if (store.getters['auth/user'].roles[0].label == 'client'){
                    next({
                        name: 'settings.projects'
                    });   
                }else{
                    next();
                }
            }
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
        component: ProfileSetup,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated']) {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/me',
        name: 'profile.me',
        component: MyProfile,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated'] && store.getters['auth/user'].roles[0].label == 'freelancer') {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/projects',
        name: 'project.list',
        component: listProject
    },
    {
        path: '/project/create',
        name: 'project.new',
        component: newProject,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated'] && store.getters['auth/user'].roles[0].label == 'client') {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/project/:id',
        name: 'project.single',
        component: singleProject,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated']) {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/project/:id/timetracker',
        name: 'timetracker',
        component: timeTracker,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated'] && store.getters['auth/user'].roles[0].label == 'freelancer') {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/project/:id/edit',
        name: 'project.edit',
        component: editProject,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated'] && store.getters['auth/user'].roles[0].label == 'client') {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/project/:id/freelancer/:fid/contract',
        name: 'project.contract',
        component: projectContract,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated']) {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/settings/projects',
        name: 'settings.projects',
        component: projectsSettings,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated'] && store.getters['auth/user'].roles[0].label == 'client') {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/settings/profile',
        name: 'freelancer.settings',
        component: FreelancerProfileSettings,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated'] && store.getters['auth/user'].roles[0].label == 'freelancer') {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/messages',
        name: 'messages',
        component: Messages,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated']) {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/freelancer/:id',
        name: 'freelancer.profile',
        component: Profile,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated']) {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/freelancers',
        name: 'freelancer.list',
        component: freelancerList
    },
    {
        path: '/myprojects',
        name: 'myprojects',
        component: myProjects,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated'] && store.getters['auth/user'].roles[0].label == 'freelancer') {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/admin',
        name: 'admin.dashboard',
        component: AdminDashboard,
        beforeEnter: (to, from, next)=>{
            if (store.getters['auth/authenticated'] && store.getters['auth/user'].roles.length > 1 && store.getters['auth/user'].roles[1].label == 'admin') {
                next();
            }else{
                next({
                    name: 'home'
                });
            }
        }
    },
    {
        path: '/test',
        component: test
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;