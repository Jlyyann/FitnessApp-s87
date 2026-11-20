<script setup>
    import { useGlobalStore } from '../stores/global';
    import { useRouter } from 'vue-router';

    const { user, getUserDetails } = useGlobalStore();
    const router = useRouter();

    function logoutUser() {
        localStorage.clear();
        getUserDetails(null);
        router.push({ path: '/login' });
    }
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Fitness App</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">
                    <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
                    <router-link :to="{ name: 'WorkoutsPage' }" class="nav-link" v-if="user.email">Workouts</router-link>
                    <router-link :to="{ name: 'AddWorkouts' }" class="nav-link" v-if="user.email">Add Workout</router-link>

                    <router-link :to="{ name: 'Login' }" class="nav-link" v-if="!user.email">Login</router-link>
                    <router-link :to="{ name: 'Register' }" class="nav-link" v-if="!user.email">Register</router-link>

                    <a href="#" class="nav-link logout-link" v-else v-on:click.prevent="logoutUser">Logout</a>
                </ul>
            </div>
        </div>
    </nav>
</template>
