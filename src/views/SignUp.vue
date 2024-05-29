<script setup lang="ts">
import { ref } from "vue"
import InputText from "../components/common/InputText.vue"
import InputPassword from "../components/common/InputPassword.vue"
import Button from "../components/common/Button.vue"
import ColorMode from "../components/common/ColorMode.vue"

const email = ref('')
const username = ref('')
const password = ref('')

</script>
<template>
    <div class="absolute top-0 right-0 px-4 py-2 ">
        <ColorMode />
    </div>
    <div class="grid justify-center mt-20">
        <h2 class="text-orange-500 font-bold">Sign Up</h2>
        <form class="grid gap-7 mt-4">
            <InputText id="user" name="user" placeholder="e-mail" v-model="email" />
            <InputText id="user" name="user" placeholder="username" v-model="username" />
            <InputPassword id="password" name="password" placeholder="password" v-model="password" />
            <Button>
                Sign Up
            </Button>
        </form>
        <span class="text-sm mt-2">Already registered? <RouterLink to="/singin" class="hover:text-orange-500 ">Sing In</RouterLink></span>
    </div>

</template>