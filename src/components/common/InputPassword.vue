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
    width: 100,
    height: 4
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
            class="border-orange-600 border-b-2 focus:outline-none bg-orange-100 italic px-2"
            :class="`w-${width} h-${height}`" :required="required" :autofocus="autofocus" :readonly="readonly"
            :minlength="minlength" :maxlength="maxlength">
    </div>
</template>