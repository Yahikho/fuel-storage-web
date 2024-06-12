<script setup lang="ts">
import { ref } from "vue"
import InputText from "../components/common/InputText.vue"
import InputPassword from "../components/common/InputPassword.vue"
import Button from "../components/common/Button.vue"
import Spinner from "../components/common/Spinner.vue"
import { UserSignIndDto } from "../models/signIn.dto"
import ColorMode from "../components/common/ColorMode.vue"
import { useFetch } from '../composables/services-api-rest';
import { useToast } from "../managers/ToastManager"
import router from "../router/main"
import { setCookie } from "../utils/cookies"

const userVal = ref('')
const password = ref('')
const _isLoading = ref(false)
const toast = useToast()

async function signIn() {
    _isLoading.value = true
    const { data, isLoading, error } = await useFetch<UserSignIndDto | null>('http://127.0.0.1:3000/api-fuel-storage/auth/signin', 'POST', {
        body: {
            value: userVal.value,
            password: password.value,
        },
    });

    if (error.value) {
        toast.addToast(error.value ? error.value : '', 'danger', 3000)
        _isLoading.value = false
    }

    if (data.value?.response) {
        setCookie({
            name: 'access_token',
            value: data.value.data?.access_token!
        })
        router.push('home')
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
    <div class="grid justify-center mt-20" @submit.prevent="signIn">
        <h2 class="text-orange-500 font-bold">Sign In</h2>
        <form class="grid gap-7 mt-4">
            <InputText id="user" name="user" placeholder="username or e-mail" v-model="userVal" />
            <InputPassword id="password" name="password" placeholder="password" v-model="password" />
            <Button v-if="!_isLoading">
                Sign In
            </Button>
            <Spinner v-if="_isLoading" />
        </form>
        <span class="text-sm mt-2">Not registered yet? <RouterLink to="/singup" class="hover:text-orange-500 font-bold">
                Sing Up</RouterLink></span>
    </div>
</template>