<script setup lang="ts">
import { ref } from 'vue';
import api from '../lib/services/api';
import type { Resume } from '../lib/types/types';
import { useAccount } from '../composables/useAccount';

const { account } = useAccount();

const allResumes = ref<Resume[]>([])

const createResume = async () => {
    const payload = await api.post(`/api/accounts/${account.value!.id}/resumes`, { label: "Software Engineer Intern", skills: { skillCategories: [] } })
    await fetchResumes();
}

const fetchResumes = async () => {
    const result = await api.get(`/api/accounts/${account.value!.id}/resumes`)
    allResumes.value = result.data
}

const deleteResume = async (id: number) => {
    const result = await api.delete(`/api/accounts/${account.value!.id}/resumes/` + id)
    await fetchResumes();
}

fetchResumes();
</script>

<template>
    <div className="vert-list">
        <h2>Welcome, {{ account?.firstName }} {{ account?.lastName }}</h2>
        <div className="w-full flex justify-between">
            <button @click="createResume">Create New Resume</button>
        </div>
        <div className="w-full grid grid-cols-6 gap-4">
            <div @click="$router.push(`/${resume.id}`)" v-for="(resume, index) in allResumes"
                className="bg-zinc-900/80 p-4 rounded-md h-24 cursor-pointer hover-highlight">
                <p>{{ resume.label ?? `Resume ${index}` }}</p>
                <button @click.stop="deleteResume(resume.id)">Delete</button>
            </div>
        </div>
    </div>
</template>