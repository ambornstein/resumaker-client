<script setup lang="ts">
import { ref } from 'vue';
import api from '../../services/api';
import type { Resume } from '../../types/type';
import { useUser } from '../../composable/useUser';

//TODO: Create login/create account page

const { user } = useUser();

const allResumes = ref<Resume[]>([])

const createResume = async () => {
    const payload = await api.post("/api/accounts/1/resumes", { "label": "Software Engineer Intern" })
    await fetchResumes();
}

const fetchResumes = async () => {
    const result = await api.get("/api/accounts/1/resumes")
    allResumes.value = result.data
}

const deleteResume = async (id: number) => {
    const result = await api.delete("/api/accounts/1/resumes/" + id)
    await fetchResumes();
}

fetchResumes();
</script>

<template>
    <div className="vert-list">
        <h2>Welcome, {{ user?.firstName }} {{ user?.lastName }}</h2>
        <div className="w-full flex justify-between">
            <button @click="createResume">Create New Resume</button>
            <RouterLink to="/account">
                <button>Profile</button>
            </RouterLink>
        </div>
        <div className="w-full grid grid-cols-6 gap-4">
            <RouterLink :to="{ path: `/${resume.id}` }" v-for="(resume, index) in allResumes">
                <div className="bg-zinc-900/80 p-4 rounded-md h-24">
                    <p>{{ resume.label ?? `Resume ${index}` }}</p>
                    <button @click.self="deleteResume(resume.id)">Delete</button>
                </div>
            </RouterLink>
        </div>
    </div>
</template>