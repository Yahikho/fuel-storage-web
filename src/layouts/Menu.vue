<script setup lang="ts">
import Button from "../components/common/Button.vue";
</script>
<template>
    <nav class="w-full h-6 bg-orange-600">
        <ul class="flex gap-4 m-0">
            <li>
                <Button>
                    <RouterLink to="/singin"> Sing In</RouterLink>
                </Button>
            </li>
            <li>
                <Button>
                    <RouterLink to="/singup"> Sing Up</RouterLink>
                </Button>
            </li>
        </ul>
    </nav>
</template>