<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';
import { useSnackbar } from '../composables/useSnackbar';

const router = useRouter()
const { login, register } = useAuth();
const { displayMessage } = useSnackbar();

type AuthMode = "login" | "signup"

const authMode = ref<AuthMode>("login")

let passwordsValid = ref<boolean>(true);

const credentials = {
    email: '',
    password: ''
}

const registration = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmationPassword: '',
    roles: ['user']
}

async function handleLogin(event: SubmitEvent) {
    const result = await login(credentials)
    if (result.status == 200) {
        displayMessage("You have been logged in successfully as " + result.data.username)
        router.push('/dashboard')
    }

    else {
        displayMessage("Username and password don't match.", 'error');
    }
}

async function handleSignup(event: SubmitEvent) {
    passwordsValid.value = registration.password === registration.confirmationPassword;

    if (!passwordsValid.value) return
    register(registration).then(result => {
        if (result.status == 200) {
            authMode.value = "login"
        }
    })
}

</script>
<template>
    <div className="max-w-lg m-auto flex flex-col gap-2 p-12 border-light panel">
        <h2 className="text-center">Sign In To ResuMaker</h2>
        <div className="flex flex-row w-full gap-2 mt-8">
            <label className="w-full text-center border-light p-2 highlight-checked" for="login">
                Log In
                <input id="login" className="hidden" type="radio" value="login" name="authSelect" v-model="authMode" />
            </label>
            <label className="w-full text-center border-light p-2 highlight-checked">
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
                    required />
            </div>
            <div className="block col-span-2">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" v-model="registration.confirmationPassword" id="confirmPassword"
                    className="w-full input-field" required />
            </div>
            <p v-if="!passwordsValid" className="text-error col-span-full">Passwords must match and be between 8 and
                50 characters in length.</p>
            <button className="col-span-2">Submit</button>
        </form>
        <hr />
        <p>Or Authenticate With</p>
        <button>LinkedIn</button>
        <button>Github</button>
        <button>Google</button>
    </div>
</template>