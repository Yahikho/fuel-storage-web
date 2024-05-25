<script setup lang="ts">
import { ref } from "vue"
import InputText from "../components/common/InputText.vue"
import InputPassword from "../components/common/InputPassword.vue"
import Button from "../components/common/Button.vue"
const userVal = ref('')
const password = ref('')

</script>
<template>
    <div class="grid justify-center mt-20">
        <h2 class="text-orange-500 font-bold">Sign In</h2>
        <form class="grid gap-7 mt-4">
            <InputText id="user" name="user" placeholder="username or e-mail" v-model="userVal" />
            <InputPassword id="password" name="password" placeholder="password" v-model="password" />
            <Button>
                Sign In
            </Button>
        </form>
        <span class="text-sm mt-2">Not registered yet? <a href="" class="hover:text-orange-500">Create Acount</a></span>
    </div>

</template>