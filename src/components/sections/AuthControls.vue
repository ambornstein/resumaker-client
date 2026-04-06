<script setup lang="ts">
import UserIcon from '../icons/UserIcon.vue';
import { ref, useTemplateRef, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import authService from '../../lib/services/authService';
import { useAccount } from '../../composables/useAccount';
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from '../../composables/useLoading';

const { isLoggedIn, user } = useAccount();
const route = useRoute()
const router = useRouter();
const { setLoading } = useLoading();

const showDropdown = ref<boolean>(false)

const dropdown = useTemplateRef('dropdown')
onClickOutside(dropdown, () => showDropdown.value = false)

watch(() => isLoggedIn.value, (value) => {
    if (!value && route.path !== '/' && route.path !== '/sign-in') {
        router.push('/sign-in')
        setLoading(false)
    }
})

</script>

<template>
    <div v-if="isLoggedIn" className="flex gap-2 items-center">
        <div ref="dropdown" @click="showDropdown = true"
            className="flex items-center gap-4 bg-neutral-700 px-2 py-1 rounded-lg">
            <UserIcon />
            <span className="cursor-pointer text-lg">{{ user?.username }}</span>

            <ul v-show="showDropdown"
                className="fixed w-36 space-y-0.5 top-16 m-auto bg-zinc-800 rounded-md p-2 border-light">
                <RouterLink to="/profile">
                    <li className="dropdown-item">Profile</li>
                </RouterLink>

                <li className="dropdown-item">Settings</li>
                <hr className="my-2 mx-1" />
                <li @click="authService.logout" className="dropdown-item">Log Out</li>
            </ul>
        </div>
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