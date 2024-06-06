<script setup lang="ts">
import { ref, computed } from 'vue'
import Menu from "./layouts/Menu.vue"
import router from "./router/main"

const noNavbarRoutes = ref(['/signin', '/signup'])


const showNavbar = computed(() => {
    return !noNavbarRoutes.value.includes(router.currentRoute.value.fullPath)
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