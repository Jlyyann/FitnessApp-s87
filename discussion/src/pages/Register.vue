<script setup>
    import { watch, ref } from 'vue';
    import { Notyf } from 'notyf';
    import { useRouter } from 'vue-router';
    import api from '../api.js';

    const email = ref('');
    const password = ref('');
    const confirmPass = ref('');
    const isEnabled = ref(false);

    const notyf = new Notyf();
    const router = useRouter();

    watch([email, password, confirmPass], (currentValue, oldValue) => {
        if (currentValue.every(input => input !== '') && currentValue[1] === currentValue[2]) {
            isEnabled.value = true;
        } else {
            isEnabled.value = false;
        }
    });

    async function handleSubmit() {
        try {
            let response = await api.post('/users/register', {
                email: email.value,
                password: password.value
            });

            if (response.status === 201) {
                notyf.success(response.data.message);

                email.value = '';
                password.value = '';
                confirmPass.value = '';

                router.push({ path: '/login' });
            } else {
                notyf.error('Registration Failed. Please contact administrator.');
            }
        } catch (e) {
            console.error(e);
            notyf.error('Registration Failed. Please contact administrator.');
        }
    }
</script>

<template>
    <section class="auth-page">
        <div class="auth-visual">
            <img src="/run.avif" alt="Runner tracking a fitness goal">
            <div class="auth-visual-copy">
                <span>START TODAY</span>
                <h2>Build your momentum.</h2>
                <p>One account. Every workout. A clearer view of your progress.</p>
            </div>
        </div>

        <form class="auth-form" v-on:submit.prevent="handleSubmit">
            <span class="form-eyebrow">FITNESS APP / REGISTER</span>
            <h1>Register</h1>

        <div class="mb-3">
            <label for="registerEmail" class="form-label">Email</label>
            <input type="email" id="registerEmail" class="form-control" placeholder="Enter Email" v-model="email" />
        </div>

        <div class="mb-3">
            <label for="registerPassword" class="form-label">Password</label>
            <input type="password" id="registerPassword" class="form-control" placeholder="Enter Password" v-model="password" />
        </div>

        <div class="mb-3">
            <label for="registerConfirmPassword" class="form-label">Confirm Password</label>
            <input type="password" id="registerConfirmPassword" class="form-control" placeholder="Confirm Password" v-model="confirmPass" />
        </div>

            <button type="submit" class="btn btn-primary btn-block" v-if="isEnabled">Create account</button>
            <button type="submit" class="btn btn-danger btn-block" disabled v-else>Create account</button>

            <p class="auth-switch">Already registered? <router-link :to="{ name: 'Login' }">Login</router-link></p>
        </form>
    </section>
</template>
