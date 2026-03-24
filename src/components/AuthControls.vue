<script setup lang="ts">
import { useAuth } from '../composables/useAuth';

const { isLoggedIn, user, logout } = useAuth();

</script>

<template>
    <div v-if="isLoggedIn" className="flex gap-2 items-center">
        <p>{{ user!.username }}</p>
        <button @click="logout">Log Out</button>
    </div>
    <div v-else className="flex gap-2">
        <RouterLink to="/sign-in" className="w-fit highlight">
            <button>Log In</button>
        </RouterLink>
        <RouterLink to="/sign-in" className="w-fit">
            <button>Create Account</button>
        </RouterLink>
    </div>
</template>