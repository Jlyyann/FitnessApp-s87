<script setup>
    import { watch, ref, onBeforeMount } from 'vue';
    import { Notyf } from 'notyf';
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '../stores/global.js';
    import api from '../api.js';

    const name = ref('');
    const duration = ref('');
    const isEnabled = ref(false);

    const notyf = new Notyf();
    const router = useRouter();
    const { user } = useGlobalStore();

    watch([name, duration], (currentValue, oldValue) => {
        if (currentValue.every(input => input !== '')) {
            isEnabled.value = true;
        } else {
            isEnabled.value = false;
        }
    });

    async function handleSubmit() {
        try {
            let response = await api.post('/workouts/addWorkout', {
                name: name.value,
                duration: duration.value
            });

            if (response.status === 201) {
                notyf.success('Workout created successfully');

                name.value = '';
                duration.value = '';

                router.push({ path: '/workouts' });
            } else {
                notyf.error('Workout Creation Failed. Please contact administrator.');
            }
        } catch (e) {
            console.error(e);
            notyf.error('Workout Creation Failed. Please contact administrator.');
        }
    }

    onBeforeMount(() => {
        if (!user.token) {
            router.push({ path: '/login' });
        }
    });
</script>

<template>
    <h1 class="my-5 text-center">Add Workout</h1>

    <form v-on:submit.prevent="handleSubmit">
        <div class="mb-3">
            <label for="workoutName" class="form-label">Name</label>
            <input type="text" id="workoutName" class="form-control" placeholder="Enter Name" v-model="name" />
        </div>

        <div class="mb-3">
            <label for="workoutDuration" class="form-label">Duration</label>
            <input type="text" id="workoutDuration" class="form-control" placeholder="Enter Duration" v-model="duration" />
        </div>

        <button type="submit" class="btn btn-primary my-4 w-100" v-if="isEnabled">Submit</button>
        <button type="submit" class="btn btn-danger my-4 w-100" disabled v-else>Submit</button>
    </form>
</template>
