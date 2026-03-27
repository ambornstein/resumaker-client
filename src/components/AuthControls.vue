<script setup lang="ts">
import { useAuth } from '../composables/useAuth';

const { isLoggedIn, user, logout } = useAuth();

</script>

<template>
    <div v-if="isLoggedIn" className="flex gap-2 items-center">
        <RouterLink to="/profile">{{ user!.username }}</RouterLink>
        <button @click="logout">Log Out</button>
    </div>
    <div v-else className="flex gap-2">
        <RouterLink to="/sign-in">
            <button>Log In</button>
        </RouterLink>
        <RouterLink to="/sign-in">
            <button>Create Account</button>
        </RouterLink>
    </div>
</template>