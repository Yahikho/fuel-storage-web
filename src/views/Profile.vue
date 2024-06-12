<script setup lang="ts">
import { ref } from "vue"
import InputPassword from "../components/common/InputPassword.vue";
import { useUserInfoStore } from "../store/user-info.store"
import Button from "../components/common/Button.vue";
import { useFetch } from "../composables/services-api-rest";
import { CommonResponse } from "../models/common/common-response"
import Spinner from "../components/common/Spinner.vue";
import { getCookie } from "../utils/cookies"

const _isLoading = ref(false)
const store = useUserInfoStore()
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const file = ref<File>({} as File);

async function updateUser() {
    const formdata = new FormData()
    formdata.append("oldPassword", oldPassword.value);
    formdata.append("confirmPassword", newPassword.value);
    formdata.append("password", confirmPassword.value);

    if (file.value) {
        formdata.append("file", file.value);
    }

    const cookie = getCookie('access_token')

    const { data, error, isLoading } = await useFetch<CommonResponse | null>('http://127.0.0.1:3000/api-fuel-storage/profile/update-user', "POST", {
        headers: {
            "Authorization": `Bearer ${cookie}`
        },
        body: formdata
    })

    console.log(data.value)
    console.log(isLoading.value)
    console.log(error.value)
}

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
        file.value = files[0];
    }
}
</script>
<template>
    <div class="grid justify-center mt-20" @submit.prevent="updateUser">
        <h2 class="text-orange-500 font-bold">Update me ({{ store.username }})</h2>
        <form class="grid gap-7 mt-4">
            <InputPassword id="old_password" name="old_password" placeholder="old password" v-model="oldPassword" />
            <InputPassword id="new_password" name="new_password" placeholder="new password" v-model="newPassword" />
            <InputPassword id="confirm_password" name="confirm_password" placeholder="confirm password"
                v-model="confirmPassword" />
            <input type="file" accept=".jpg, .jpeg, .png" @change="handleFileChange">
            <Spinner v-if="_isLoading" />
            <Button v-else="!_isLoading">
                Save
            </Button>
        </form>
    </div>
</template>