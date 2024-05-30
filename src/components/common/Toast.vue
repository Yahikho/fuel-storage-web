<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    message: string,
    type?: 'info' | 'warn' | 'danger' | 'success'
}>()


const handdleType = computed(() => {
    if (props.type === 'info') return 'bg-blue-500 border-blue-500'
    if (props.type === 'warn') return 'bg-yellow-500 border-yellow-500'
    if (props.type === 'danger') return 'bg-red-500 border-red-500'
    if (props.type === 'success') return 'bg-green-500 border-green-500'
    return 'bg-blue-500'
})

</script>
<template>
    <div class="flex items-center w-max h-max text-xs p-1 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800 mt-2 border-t-2">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-gray-800 rounded-lg"
            :class="handdleType">
            <span>!</span>
        </div>
        <div class="ml-1">{{ message }}</div>
    </div>
</template>