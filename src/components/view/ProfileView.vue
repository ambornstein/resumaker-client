<script setup lang="ts">
import api from '../../services/api';
import type { Profile } from '../../types/type';

const result = await api.get("/api/accounts/1");
const account: Profile = result.data

</script>

<template>
    <div className="vert-list">
        <h2>Welcome, {{ account.firstName }} {{ account.lastName }}</h2>
        <div className="w-full flex justify-between">
            <button>Create New Resume</button>
            <button>Profile</button>
        </div>
        <div className="grid grid-cols-3">
            <div className="h-50 w-full">
                <div className="bg-zinc-900/80 p-4 rounded-md h-24">Resume 1</div>
            </div>
        </div>
    </div>
</template>