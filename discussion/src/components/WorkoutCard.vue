<script setup>
    import { ref } from 'vue';
    import { Notyf } from 'notyf';
    import api from '../api.js';

    const props = defineProps({
        workoutData: Object
    });

    const emit = defineEmits(['workout-updated']);

    const notyf = new Notyf();
    const isEditing = ref(false);
    const editName = ref('');
    const editDuration = ref('');

    async function completeWorkout(id) {
        try {
            const response = await api.patch(`/workouts/completeWorkoutStatus/${id}`);

            if (response.status === 200) {
                notyf.success('Workout completed successfully');
                emit('workout-updated');
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
                notyf.success('Workout deleted successfully');
                emit('workout-updated');
            } else {
                notyf.error('Workout Delete Failed. Please contact administrator.');
            }
        } catch (e) {
            console.error(e);
            notyf.error('Workout Delete Failed. Please contact administrator.');
        }
    }

    async function updateWorkout(id, updatedData) {
        try {
            const response = await api.patch(`/workouts/updateWorkout/${id}`, updatedData);

            if (response.status === 200) {
                notyf.success('Workout updated successfully');
                emit('workout-updated');
            } else {
                notyf.error('Workout Update Failed. Please contact administrator.');
            }
        } catch (e) {
            console.error(e);
            notyf.error('Workout Update Failed. Please contact administrator.');
        }
    }

    function startEdit(workout) {
        editName.value = workout.name;
        editDuration.value = workout.duration;
        isEditing.value = true;
    }

    function cancelEdit() {
        isEditing.value = false;
        editName.value = '';
        editDuration.value = '';
    }

    async function saveEdit(id) {
        await updateWorkout(id, {
            name: editName.value,
            duration: editDuration.value
        });
        isEditing.value = false;
    }
</script>

<template>
    <div class="col col-md-4">
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title" v-if="!isEditing">{{ workoutData.name }}</h5>
                <input type="text" class="form-control mb-2" v-else v-model="editName" placeholder="Workout name" />

                <div class="workout-detail">
                    <h6 class="card-subtitle mb-1">Duration</h6>
                    <p class="card-text" v-if="!isEditing">{{ workoutData.duration }}</p>
                    <input type="text" class="form-control" v-else v-model="editDuration" placeholder="Duration" />
                </div>

                <div class="workout-detail">
                    <h6 class="card-subtitle mb-1">Status</h6>
                    <p class="card-text">{{ workoutData.status }}</p>
                </div>
            </div>

            <div class="card-footer d-flex justify-content-around">
                <template v-if="!isEditing">
                    <button class="btn btn-primary btn-sm" v-if="workoutData.status !== 'completed'" v-on:click="completeWorkout(workoutData._id)">Complete</button>
                    <button class="btn btn-warning btn-sm" v-on:click="startEdit(workoutData)">Edit</button>
                    <button class="btn btn-danger btn-sm" v-on:click="deleteWorkout(workoutData._id)">Delete</button>
                </template>
                <template v-else>
                    <button class="btn btn-success btn-sm" v-on:click="saveEdit(workoutData._id)">Save</button>
                    <button class="btn btn-secondary btn-sm" v-on:click="cancelEdit">Cancel</button>
                </template>
            </div>
        </div>
    </div>
</template>
