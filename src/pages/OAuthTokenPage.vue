<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import api from '../lib/services/api';
import tokenService from '../lib/services/tokenService';


const route = useRoute()
const router = useRouter();

if (route.query.access_token) {
    console.log(route.query.access_token)
    api.post(`/api/auth/get-user?access_token=${route.query.access_token as String}`).then(res => {
        tokenService.setUser(res.data);
        router.push("/dashboard")
    })
}

</script>

<template>
    <div className="w-full h-full flex items-center">
        <h1>Authenticating with OAuth2 Provider...</h1>
    </div>
</template>