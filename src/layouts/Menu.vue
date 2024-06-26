<script setup lang="ts">
import { Ref, onMounted, ref } from "vue"
import ColorMode from "../components/common/ColorMode.vue"
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { deleteCookie } from "../utils/cookies"
import router from "../router/main";
import { ResponseGetInfoUserDto, DataGetInfoUser } from "../models/infoUser.dto"
import { useFetch } from "../composables/services-api-rest";
import { getCookie } from "../utils/cookies"
import { useToast } from "../managers/ToastManager"
import Spinner from "../components/common/Spinner.vue";
import { useUserInfoStore } from "../store/user-info.store"

const _data: Ref<DataGetInfoUser> = ref({} as DataGetInfoUser)
const _isLoading = ref(false)
const toast = useToast()
const store = useUserInfoStore()

onMounted(async () => {
    await getInfoUser()
})

async function getInfoUser() {
    _isLoading.value = true
    const cookie = getCookie('access_token')
    const { data, isLoading, error } = await useFetch<ResponseGetInfoUserDto | null>('http://127.0.0.1:3000/api-fuel-storage/profile/get-info-user', "GET", {
        "headers": {
            "Authorization": `Bearer ${cookie}`
        }
    })


    if (error.value) {
        toast.addToast(error.value ? error.value : '', 'danger', 3000)
        _isLoading.value = false
    }

    if (data.value?.response) {
        _data.value = data.value.data!
        store.username = _data.value.username
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

function signout() {
    deleteCookie('access_token')
    router.push('/signin')
}

</script>
<template>
    <Disclosure as="nav" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="flex justify-center items-stretch sm:justify-start gap-2">
                    <ColorMode />
                    <RouterLink to="/home" class=" hover:text-orange-500"> Home</RouterLink>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- Profile dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <div>
                            <Spinner v-if="_isLoading" />
                            <MenuButton v-else
                                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full" :src="_data.avatar" alt="" />
                            </MenuButton>
                        </div>
                        <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <MenuItems
                                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem v-slot="{ active }">
                                <RouterLink to="/profile"
                                    :class="[active ? 'bg-orange-500' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                    Your
                                    Profile</RouterLink>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <a @click="signout"
                                    :class="[active ? 'bg-orange-500' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer']">Sign
                                    out</a>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>
    </Disclosure>
</template>