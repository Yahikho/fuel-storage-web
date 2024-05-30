<script setup lang="ts">
import { ref } from "vue"
import InputText from "../components/common/InputText.vue"
import ColorMode from "../components/common/ColorMode.vue"
import Button from "../components/common/Button.vue"
import { useFetch } from '../composables/services-api-rest';
import { useToast } from "../managers/ToastManager"
import { UserValidatedDto } from "../models/codeValidation.ts"

const code = ref('')
const _isLoading = ref(false)
const toast = useToast()

async function validaCode() {
    _isLoading.value = true
    const { data, isLoading, error } = await useFetch<UserValidatedDto | null>('http://127.0.0.1:3000/api-fuel-storage/auth/email-verified', 'POST', {
        body: {
            code: Number(code.value),
        },
    });

    if (error.value) {
        toast.addToast(error.value ? error.value : '', 'danger', 3000)
        _isLoading.value = false
    }

    if (data.value?.response) {
        toast.addToast(Array.isArray(data.value.message) ? '' : data.value.message, 'success', 3000)
    } else {
        if (typeof data.value?.message === 'object') {
            data.value.message.forEach(element => {
                toast.addToast(element, 'warn', 3000)
            });
        } else {
            toast.addToast(data.value!.message, 'danger', 3000)
        }
    }

    _isLoading.value = isLoading.value
}

</script>
<template>
    <div class="absolute top-0 right-0 px-4 py-2 ">
        <ColorMode />
    </div>
    <div class="grid justify-center mt-20">
        <h2 class="text-orange-500 font-bold">Validate your code</h2>
        <form class="grid gap-7 mt-4" @submit.prevent="validaCode">
            <InputText id="user" name="user" placeholder="Type your code" v-model="code" :maxlength="4" />
            <Button>Valida</Button>
        </form>
    </div>
</template>