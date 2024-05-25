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
    width: 20,
    height: 4
})
</script>
<template>
    <button class="cursor-pointer hover:bg-orange-500 text-sm font-medium m-0 p-0 bg-orange-200 rounded" :class="`w-${width} h-${height}`">
        <slot>

        </slot>
    </button>

</template>