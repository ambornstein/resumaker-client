<script setup lang="ts">
import { useAccount } from '../composables/useAccount';

const { account, createResume, deleteResume} = useAccount();
</script>

<template>
    <div className="vert-list">
        <h2>Welcome, {{ account?.firstName }} {{ account?.lastName }}</h2>
        <div className="w-full flex justify-between">
            <button @click="createResume">Create New Resume</button>
        </div>
        <div className="w-full grid grid-cols-6 gap-4">
            <div @click="$router.push(`/${resume.id}`)" v-for="(resume, index) in account!.resumes"
                className="bg-zinc-900/80 p-4 rounded-md h-24 cursor-pointer hover-highlight">
                <p>{{ resume.label ?? `Resume ${index}` }}</p>
                <button @click.stop="deleteResume(resume.id)">Delete</button>
            </div>
        </div>
    </div>
</template>