import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '../api';

export const useGlobalStore = defineStore('global', () => {
    let user = reactive({
        token: localStorage.getItem('token'),
        email: null
    });

    async function getUserDetails(token) {
        if (!token) {
            user.token = null;
            user.email = null;
            return;
        }

        try {
            let { data } = await api.get('/users/details');
            user.token = token;
            user.email = data.user.email;
        } catch {
            localStorage.removeItem('token');
            user.token = null;
            user.email = null;
        }
    }

    return {
        user,
        getUserDetails
    };
});
