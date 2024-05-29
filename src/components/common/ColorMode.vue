<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>
<template>
    <font-awesome-icon icon="fa-solid fa-sun" v-if="isDark" @click="toggleDark()" class="cursor-pointer hover:text-orange-500 text-lg"/>
    <font-awesome-icon icon="fa-solid fa-moon" v-else @click="toggleDark()" class=" cursor-pointer hover:text-orange-500 text-lg"/>
</template>