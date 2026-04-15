<script setup lang="ts">
import UserIcon from '../icons/UserIcon.vue';
import { ref, useTemplateRef, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import authService from '../../lib/services/authService';
import { useAccount } from '../../composables/useAccount';
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from '../../composables/useLoading';

const { isLoggedIn, account, loading } = useAccount();
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
    <div v-if="account" className="flex gap-2 items-center">
        <div ref="dropdown">
            <div v-if="!loading" className="flex items-center gap-2 bg-button p-2 pr-4 rounded-lg"
                @click="showDropdown = true">
                <UserIcon />
                <span className="cursor-pointer text-lg">{{ account?.firstName }} {{ account?.lastName }}</span>
            </div>
            <div v-else className="skeleton-bar h-10 w-48 ring-2 ring-foreground ring-offset-2 ring-offset-panel ">
            </div>

            <ul v-show="showDropdown" @click.prevent="showDropdown = false"
                className="fixed w-36 space-y-0.5 top-20 m-auto bg-panel rounded-md p-2 border-light">
                <RouterLink to="/profile">
                    <li className="dropdown-item">Profile</li>
                </RouterLink>
                <hr className="my-2 mx-1" />
                <li @click="authService.logout" className="dropdown-item">Log Out</li>
            </ul>
        </div>
    </div>
    <div v-else className="flex gap-2">
        <RouterLink :to="{ path: '/sign-in', query: { mode: 'login' } }">
            <span className="link">Log In</span>
        </RouterLink>
        <RouterLink :to="{ path: '/sign-in', query: { mode: 'signup' } }">
            <span className="link">Create Account</span>
        </RouterLink>
    </div>
</template>