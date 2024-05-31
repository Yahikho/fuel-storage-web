<script setup lang="ts">
import { ref } from "vue"
import InputText from "../components/common/InputText.vue"
import InputPassword from "../components/common/InputPassword.vue"
import Spinner from "../components/common/Spinner.vue"
import Button from "../components/common/Button.vue"
import ColorMode from "../components/common/ColorMode.vue"
import { useFetch } from '../composables/services-api-rest';
import { UserCreatedDto } from "../models/signUp.dto"
import { useToast } from "../managers/ToastManager"
import router from "../router/main"

const email = ref('')
const username = ref('')
const password = ref('')
const _isLoading = ref(false)

const toast = useToast()

async function signUp() {
    _isLoading.value = true
    const { data, isLoading, error } = await useFetch<UserCreatedDto | null>('http://127.0.0.1:3000/api-fuel-storage/auth/signup', 'POST', {
        body: {
            user_name: username.value,
            email: email.value,
            avatar: '',
            password: password.value
        },
    });

    if (error.value) {
        toast.addToast(error.value ? error.value : '', 'danger', 3000)
        _isLoading.value = false
    }

    if (data.value?.response) {
        toast.addToast(Array.isArray(data.value.message) ? '' : 'The code was send to the resgistered email.', 'success', 3000)
        router.push('code')
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
        <h2 class="text-orange-500 font-bold">Sign Up</h2>
        <form class="grid gap-7 mt-4" @submit.prevent="signUp">
            <InputText id="email" name="email" placeholder="e-mail" v-model="email" />
            <InputText id="username" name="username" placeholder="username" v-model="username" />
            <InputPassword id="password" name="password" placeholder="password" v-model="password" />
            <Button v-if="!_isLoading"> Sign Up</Button>
            <Spinner v-if="_isLoading" />
        </form>
        <span class="text-sm mt-2">Already registered? <RouterLink to="/singin" class="hover:text-orange-500 font-bold">
                Sing In</RouterLink></span>
    </div>

</template>