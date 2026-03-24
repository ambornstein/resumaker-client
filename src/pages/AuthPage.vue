<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

type AuthMode = "login" | "signup"

const authMode = ref<AuthMode>("login")

const router = useRouter()
const { login, logout, register } = useAuth();

function setMode(mode: AuthMode) {
    authMode.value = mode
}

const credentials = {
    email: '',
    password: ''
}

const registration = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roles: ['user']
}

async function handleLogin(event: SubmitEvent) {
    login(credentials).then(result => {
        if (result.status == 200) {
            router.push('/')
        }
    })
}

async function handleSignup(event: SubmitEvent) {
    register(registration).then(result => {
        if (result.status == 200) {
            router.push('/')
        }
    })
}

</script>
<template>
    <div className="max-w-lg m-auto">
        <div className="flex flex-col gap-2 p-12 border-light bg-zinc-800">
            <h2 className="text-center">Sign In To ResuMaker</h2>
            <div className="flex w-full gap-2 mt-8">
                <button className="flex-1" @click="setMode('login')">Log In</button>
                <button className="flex-1" @click="setMode('signup')">Sign Up</button>
            </div>

            <form @submit.prevent="handleLogin" v-if="authMode === 'login'" className="flex flex-col gap-2">
                <div className="block">
                    <label for="email">Email</label>
                    <input type="email" v-model="credentials.email" id="email" className="w-full" required />
                </div>
                <div className="block">
                    <label for="password">Password</label>
                    <input type="password" v-model="credentials.password" id="password" className="w-full" required />
                </div>
                <input type="submit" />
            </form>
            <form @submit.prevent="handleSignup" v-else-if="authMode === 'signup'" className="grid grid-cols-2 gap-2">
                <div className="block">
                    <label for="firstName">First Name</label>
                    <input type="text" v-model="registration.firstName" id="firstName" className="w-full" required />
                </div>
                <div className="block">
                    <label for="lastName">Last Name</label>
                    <input type="text" v-model="registration.lastName" id="lastName" className="w-full" required />
                </div>
                <div className="block col-span-2">
                    <label for="email">Email</label>
                    <input type="email" v-model="registration.email" id="email" className="w-full" required />
                </div>
                <div className="block col-span-2">
                    <label for="password">Password</label>
                    <input type="password" v-model="registration.password" id="password" className="w-full" required />
                </div>
                <div className="block col-span-2">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" className="w-full" required />
                </div>
                <input type="submit" className="col-span-2" />
            </form>
            <hr />
            <p>Or Authenticate With</p>
            <button>LinkedIn</button>
            <button>Github</button>
            <button>Google</button>
        </div>
    </div>
</template>