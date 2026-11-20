<script>
    import { onBeforeMount } from 'vue';
    import { useGlobalStore } from './stores/global';
    import Navbar from './components/NavbarComponent.vue';
    import Footer from './components/FooterComponent.vue';

    export default {
        components: {
            Navbar,
            Footer
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
  <Footer />
</template>
