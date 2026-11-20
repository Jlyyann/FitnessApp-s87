<script>
    import { onBeforeMount } from 'vue';
    import { useGlobalStore } from './stores/global';
    import Navbar from './components/NavbarComponent.vue';

    export default {
        components: {
            Navbar
        },
        setup() {
            const { getUserDetails } = useGlobalStore();

            onBeforeMount(() => {
                getUserDetails(localStorage.getItem('token'));
            });
        }
    };
</script>

<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
</template>
