<script setup>
    import { watch, ref } from 'vue';
    import { Notyf } from 'notyf';
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '../stores/global';
    import api from '../api';

    const notyf = new Notyf();
    const router = useRouter();
    const { getUserDetails } = useGlobalStore();

    const email = ref('');
    const password = ref('');
    const isEnabled = ref(false);

    watch([email, password], (currentValue, oldValue) => {
        if (currentValue.every(input => input !== '')) {
            isEnabled.value = true;
        } else {
            isEnabled.value = false;
        }
    });

    async function handleSubmit() {
        try {
            let res = await api.post('/users/login', {
                email: email.value,
                password: password.value
            });

            if (res.data.access) {
                notyf.success('Login Successful');
                localStorage.setItem('token', res.data.access);
                getUserDetails(res.data.access);

                email.value = '';
                password.value = '';

                router.push({ path: '/' });
            }
        } catch (e) {
            console.error(e);
            notyf.error('Login Failed. Please contact administrator.');
        }
    }
</script>

<template>
    <section class="auth-page">
        <div class="auth-visual">
            <img src="/run.avif" alt="Runner training outdoors">
            <div class="auth-visual-copy">
                <span>WELCOME BACK</span>
                <h2>Keep moving forward.</h2>
                <p>Your training history is ready when you are.</p>
            </div>
        </div>

        <form class="auth-form" v-on:submit.prevent="handleSubmit">
            <span class="form-eyebrow">FITNESS APP / LOGIN</span>
            <h1>Login</h1>

        <div class="mb-3">
            <label for="userEmail" class="form-label">Email address</label>
            <input type="text" class="form-control" id="userEmail" placeholder="Enter email" v-model="email" />
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" />
        </div>

            <button type="submit" class="btn btn-primary btn-block" v-if="isEnabled">Login</button>
            <button type="submit" class="btn btn-danger btn-block" disabled v-else>Login</button>

            <p class="auth-switch">New to Fitness App? <router-link :to="{ name: 'Register' }">Create an account</router-link></p>
        </form>
    </section>
</template>
