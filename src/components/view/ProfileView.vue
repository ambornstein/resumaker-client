<script setup lang="ts">
import api from '../../services/api';
import type { Profile } from '../../types/type';

const result = await api.get("/api/accounts/1");
const account: Profile = result.data

const createResume = async () => {
    const resume = await api.post("/api/resumes",  { "label": "Software Engineer Intern" })
    const payload = await api.post("/api/accounts/1/resumes", resume.data)
}

const allResumes = await api.get("/api/resumes")

</script>

<template>
    <div className="vert-list">
        <h2>Welcome, {{ account.firstName }} {{ account.lastName }}</h2>
        <div className="w-full flex justify-between">
            <button @click="createResume">Create New Resume</button>
            <button>Profile</button>
        </div>
        <div className="grid grid-cols-3">
            <div className="h-50 w-full">
                <div v-for="(resume, index) in allResumes.data" className="bg-zinc-900/80 p-4 rounded-md h-24">{{ resume.label ?? `Resume ${index}`}}</div>
            </div>
        </div>
    </div>
</template>