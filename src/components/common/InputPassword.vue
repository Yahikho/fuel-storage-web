<script setup lang="ts">

withDefaults(defineProps<{
    name?: string,
    id: string,
    placeholder?: string,
    modelValue: string,
    autofocus?: boolean,
    maxlength?: number,
    minlength?: number,
    readonly?: boolean,
    required?: boolean,
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

const emits = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emits('update:modelValue', target.value)
}
</script>
<template>
    <div>
        <input type="password" :name="name" :id="id" :placeholder="placeholder" :value="modelValue" @input="updateValue"
            class="border-orange-600 border-b-2 focus:outline-none px-2 "
            :class="[ width ? `w-${width}` : 'w-full', height ? `h-${height}` : `h-9`]" :required="required" :autofocus="autofocus" :readonly="readonly"
            :minlength="minlength" :maxlength="maxlength">
    </div>
</template>