<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useSnackbar } from '../composables/useSnackbar';

const route = useRoute();
const router = useRouter();
const snackbar = useSnackbar();


var provider = route.query.provider as string;

if (provider == 'credentials') {
    snackbar.displayMessage("You have previously signed in with email and password. Please use this method again.", 'error')
    router.replace('/sign-in')
}
else if (!provider) {
    snackbar.displayMessage("Something went wrong when logging you in.", 'error')
    router.replace('/sign-in')
}

function getDisplayName(providerString: string) {
    switch (providerString) {
        case 'github':
            return 'GitHub'
        case 'linkedin':
            return 'LinkedIn'
        case 'google':
            return 'Google'
    }
}

</script>

<template>
    <div className="max-w-lg m-auto flex flex-col gap-2 p-12 border-light panel">
        <h2>You have previously signed in with {{ getDisplayName(provider) }}.</h2>
        <span>Would you like to use it to sign in again?</span>

        <a v-if="provider == 'linkedin'" href="http://localhost:8080/oauth2/authorization/linkedin">
            <div className="flex p-4 bg-contrast/40 w-full rounded-md ">
                LinkedIn
            </div>
        </a>
        <a v-else-if="provider == 'github'" href="http://localhost:8080/oauth2/authorization/github">
            <div className="flex p-4 bg-contrast/40 w-full rounded-md ">
                Github
            </div>
        </a>
        <a v-else-if="provider == 'google'" href="http://localhost:8080/oauth2/authorization/google">
            <div className="flex p-4 bg-contrast/40 w-full rounded-md ">
                Google
            </div>
        </a>
    </div>
</template>