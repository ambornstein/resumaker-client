<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSnackbar } from '../composables/useSnackbar';
import authService from '../lib/services/authService';
import { useLoading } from '../composables/useLoading';
import { registrationSchema } from '../lib/validation';

const router = useRouter()
const route = useRoute();
const { displayMessage } = useSnackbar();
const { setLoading } = useLoading();

type AuthMode = "login" | "signup"

const authMode = ref<AuthMode>("login")
const passwordsValid = ref<boolean>(true);

const credentials = {
    email: '',
    password: ''
}

const registration = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: ['user']
}

if (route.query.mode == 'signup') {
    authMode.value = 'signup'
} else if (route.query.mode == 'login') {
    authMode.value = 'login'
}

async function handleLogin(event: SubmitEvent) {
    setLoading(true)

    const result = await authService.login(credentials)
    if (result.status == 200) {
        displayMessage("You have been logged in successfully as " + result.data.email)
        if (router.options.history.state.back == "/" || router.options.history.state.back == "/sign-in") {
            router.push("/dashboard")
        } else {
            router.back()
        }
    }
    else {
        displayMessage("Username and password don't match any existing account.", 'error');
    }

    setLoading(false)
}

async function handleSignup(event: SubmitEvent) {
    passwordsValid.value = registration.password === registration.confirmPassword;

    const result = registrationSchema.safeParse(registration)
    console.log(result)
    if (!passwordsValid.value || !result.success) return

    setLoading(true)
    authService.register(registration).then(result => {
        if (result.status == 200) {
            authMode.value = "login"
        }
        setLoading(false)
    })
}

</script>
<template>
    <div className="max-w-lg m-auto flex flex-col gap-2 p-12 border-light panel">
        <h2 className="text-center">Sign In To ResuMaker</h2>
        <div className="flex flex-row w-full gap-2 mt-12 mb-6">
            <label className="w-full text-center border-thick p-2 highlight-checked" for="login">
                Log In
                <input id="login" className="hidden" type="radio" value="login" name="authSelect" v-model="authMode" />
            </label>
            <label className="w-full text-center border-thick p-2 highlight-checked" for="signup">
                Sign Up
                <input id="signup" className="hidden" type="radio" value="signup" name="authSelect"
                    v-model="authMode" />
            </label>
        </div>

        <form @submit.prevent="handleLogin" v-if="authMode === 'login'" className="flex flex-col gap-2">
            <div className="block">
                <label for="email">Email</label>
                <input type="email" v-model="credentials.email" id="email" className="w-full input-field" required />
            </div>
            <div className="block">
                <label for="password">Password</label>
                <input type="password" v-model="credentials.password" id="password" className="w-full input-field"
                    required />
            </div>
            <button>Submit</button>
        </form>

        <form @submit.prevent="handleSignup" v-else-if="authMode === 'signup'" className="grid grid-cols-2 gap-2">
            <div className="block">
                <label for="firstName">First Name</label>
                <input type="text" v-model="registration.firstName" id="firstName" className="w-full input-field"
                    required />
            </div>
            <div className="block">
                <label for="lastName">Last Name</label>
                <input type="text" v-model="registration.lastName" id="lastName" className="w-full input-field"
                    required />
            </div>
            <div className="block col-span-2">
                <label for="email">Email</label>
                <input type="email" v-model="registration.email" id="email" className="w-full input-field" required />
            </div>

            <div className="block col-span-2">
                <label for="password">Password</label>
                <input type="password" v-model="registration.password" id="password" className="w-full input-field"
                    min="0" max="100" required />
            </div>
            <div className="block col-span-2">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" v-model="registration.confirmPassword" id="confirmPassword"
                    className="w-full input-field" min="0" max="100" required />
            </div>
            <p v-if="!passwordsValid" className="text-error col-span-full">Passwords must match and be between 8 and
                100 characters in length.</p>
            <button className="col-span-2">Submit</button>
        </form>
        <div className="flex items-center h-16 gap-4">
            <hr className="w-full" />
            <h3 className="w-full text-center text-nowrap">Or Authenticate With</h3>
            <hr className="w-full" />
        </div>

        <button>LinkedIn</button>
        <button>Github</button>
        <button>Google</button>
    </div>
</template>