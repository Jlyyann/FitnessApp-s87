<script setup>
    import { useGlobalStore } from '../stores/global';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const { getUserDetails } = useGlobalStore();

    function logoutUser() {
        localStorage.clear();
        getUserDetails(null);
        router.push({ path: '/login' });
    }
</script>

<template>
    <section class="auth-page">
        <div class="auth-visual">
            <img src="/run.avif" alt="Runner completing a fitness session">
            <div class="auth-visual-copy">
                <span>SESSION COMPLETE</span>
                <h2>Come back stronger.</h2>
                <p>Your workout history will be ready for your next session.</p>
            </div>
        </div>

        <div class="auth-form logout-panel">
            <span class="form-eyebrow">FITNESS APP / LOGOUT</span>
            <h1>Logout</h1>
            <p class="logout-copy">Are you sure you want to end your current session?</p>

            <div class="logout-actions">
                <button type="button" class="btn btn-primary" v-on:click="logoutUser">Yes, logout</button>
                <router-link :to="{ name: 'WorkoutsPage' }" class="secondary-action">Stay signed in</router-link>
            </div>
        </div>
    </section>
</template>
