<script setup lang="ts">
import { ref, computed } from 'vue'
import Menu from "./layouts/Menu.vue"
import router from "./router/main"
import { getCookie } from './utils/cookies';

const noNavbarRoutes = ref(['/signin', '/signup'])


const showNavbar = computed(() => {
    return !noNavbarRoutes.value.includes(router.currentRoute.value.fullPath) && getCookie('access_token')
})

</script>
<template>
    <Menu v-if="showNavbar" />
    <RouterView />
</template>
<style>
html.dark {
    color-scheme: dark;
}
</style>