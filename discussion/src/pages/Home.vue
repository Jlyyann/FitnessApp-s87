<script setup>
    import { useGlobalStore } from '../stores/global';

    const { user } = useGlobalStore();
</script>

<template>
    <section class="landing-hero">
        <div class="landing-inner">
            <div class="landing-copy">
                <span class="landing-label">FITNESS APP</span>
                <h1>TRAIN HARD.<br><strong>WIN BIG.</strong></h1>
                <p>Manage your workouts, follow your progress, and build the consistency that gets results.</p>

                <div class="landing-actions">
                    <router-link :to="{ name: 'AddWorkouts' }" class="hero-button" v-if="user.email">Start training →</router-link>
                    <router-link :to="{ name: 'Register' }" class="hero-button" v-else>Start training →</router-link>
                    <router-link :to="{ name: 'Login' }" class="secondary-button" v-if="!user.email">Log in</router-link>
                </div>
            </div>
        </div>
    </section>

    <section class="landing-benefits">
        <div class="benefit-intro">
            <span>BUILT FOR PROGRESS</span>
            <h2>Everything you need to stay consistent.</h2>
        </div>

        <div class="benefit-list">
            <div>
                <strong>01</strong>
                <h3>Log workouts</h3>
                <p>Record each session with its name and duration.</p>
            </div>
            <div>
                <strong>02</strong>
                <h3>Track status</h3>
                <p>See what is pending and mark completed workouts.</p>
            </div>
            <div>
                <strong>03</strong>
                <h3>Build history</h3>
                <p>Keep your workout record organized in one place.</p>
            </div>
        </div>
    </section>

    <section class="landing-cta">
        <div>
            <span>READY TO BEGIN?</span>
            <h2>Your next workout starts here.</h2>
        </div>
        <router-link :to="{ name: 'WorkoutsPage' }" class="hero-button" v-if="user.email">View workouts →</router-link>
        <router-link :to="{ name: 'Register' }" class="hero-button" v-else>Create account →</router-link>
    </section>
</template>
