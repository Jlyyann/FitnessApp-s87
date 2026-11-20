<script>
    import { reactive, watch, onBeforeMount } from 'vue';
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '../stores/global.js';
    import api from '../api.js';
    import WorkoutCard from '../components/WorkoutCard.vue';

    export default {
        components: {
            WorkoutCard
        },
        setup() {
            const router = useRouter();
            const { user } = useGlobalStore();
            const workouts = reactive({ data: [] });

            async function fetchWorkouts() {
                let { data } = await api.get('/workouts/getMyWorkouts');
                workouts.data = data.workouts;
            }

            onBeforeMount(() => {
                if (!user.token) {
                    router.push({ path: '/login' });
                }
            });

            watch([user], async () => {
                await fetchWorkouts();
            }, { immediate: true });

            return {
                workouts,
                user,
                fetchWorkouts
            };
        }
    };
</script>

<template>
    <section class="training-hero">
        <div class="training-copy">
            <span class="training-label">YOUR TRAINING LOG</span>
            <h1>TRAIN HARD.<br><strong>TRACK SMART.</strong></h1>
            <p>Keep every session visible, measure your consistency, and make the next workout count.</p>
            <router-link :to="{ name: 'AddWorkouts' }" class="hero-button">Start training →</router-link>
        </div>

    </section>

    <div class="workout-heading">
        <div>
            <span>MY PROGRAM</span>
            <h2>Recent workouts</h2>
        </div>
        <router-link :to="{ name: 'AddWorkouts' }">+ Add workout</router-link>
    </div>

    <div class="row mt-3">
        <WorkoutCard v-for="workout in workouts.data" :workoutData="workout" :key="workout._id" @workout-updated="fetchWorkouts" />
    </div>
</template>
