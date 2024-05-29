<script setup lang="ts">
withDefaults(defineProps<{
    width?: number,
    height?: number
}>(), {
    name: '',
    placeholder: '',
    autofocus: false,
    maxlength: 50,
    minlength: 0,
    readonly: false,
    required: false,
    width: 0,
    height: 0
})
</script>
<template>
    <button class="cursor-pointer hover:bg-orange-600 text-sm font-medium m-0 p-0 bg-orange-500 rounded" :class="[ width ? `w-${width}` : 'w-full', height ? `h-${height}` : `h-9`]">
        <slot>

        </slot>
    </button>

</template>