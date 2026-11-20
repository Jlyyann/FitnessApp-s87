<script setup>
    import { Notyf } from 'notyf';
    import api from '../api.js';

    const notyf = new Notyf();

    async function completeWorkout(id) {
        try {
            const response = await api.patch(`/workouts/completeWorkoutStatus/${id}`);

            if (response.status === 200) {
                window.location.reload();
            } else {
                notyf.error('Workout Update Failed. Please contact administrator.');
            }
        } catch (e) {
            console.error(e);
            notyf.error('Workout Update Failed. Please contact administrator.');
        }
    }

    async function deleteWorkout(id) {
        try {
            const response = await api.delete(`/workouts/deleteWorkout/${id}`);

            if (response.status === 200) {
                window.location.reload();
            } else {
                notyf.error('Workout Delete Failed. Please contact administrator.');
            }
        } catch (e) {
            console.error(e);
            notyf.error('Workout Delete Failed. Please contact administrator.');
        }
    }
</script>

<script>
    export default {
        props: {
            workoutData: Object
        }
    };
</script>

<template>
    <div class="col col-md-4">
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">{{ workoutData.name }}</h5>

                <div class="workout-detail">
                    <h6 class="card-subtitle mb-1">Duration</h6>
                    <p class="card-text">{{ workoutData.duration }}</p>
                </div>

                <div class="workout-detail">
                    <h6 class="card-subtitle mb-1">Status</h6>
                    <p class="card-text">{{ workoutData.status }}</p>
                </div>
            </div>

            <div class="card-footer d-flex justify-content-around">
                <button class="btn btn-primary btn-sm" v-if="workoutData.status !== 'completed'" v-on:click="completeWorkout(workoutData._id)">Complete</button>
                <button class="btn btn-danger btn-sm" v-on:click="deleteWorkout(workoutData._id)">Delete</button>
            </div>
        </div>
    </div>
</template>
