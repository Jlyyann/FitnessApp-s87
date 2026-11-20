import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../src/pages/Home.vue';
import WorkoutsPage from '../src/pages/Workouts.vue';
import AddWorkoutsPage from '../src/pages/AddWorkouts.vue';
import RegisterPage from '../src/pages/Register.vue';
import LoginPage from '../src/pages/Login.vue';
import LogoutPage from '../src/pages/Logout.vue';
import ErrorPage from '../src/pages/Error.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/workouts',
            name: 'WorkoutsPage',
            component: WorkoutsPage
        },
        {
            path: '/addWorkouts',
            name: 'AddWorkouts',
            component: AddWorkoutsPage
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutPage
        },
        {
            path: '/:catchAll(.*)',
            component: ErrorPage
        }
    ]
});

export default router;
