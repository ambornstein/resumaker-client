<script setup lang="ts">
import CardSkeleton from "../components/skeleton/CardSkeleton.vue";
import HeadingSkeleton from "../components/skeleton/HeadingSkeleton.vue";
import { useAccount } from "../composables/useAccount";

const { account, createResume, deleteResume, loading } = useAccount();

function handleCreateResume() {
    const label = prompt("Input a label for the resume")
    if (label) createResume({ label: label, skills: { skillCategories: [] } })
}

function handleDelete(id: number) {
    if (confirm("Really delete this resume?")) {
        deleteResume(id)
    }
}

</script>

<template>
    <div className="flex flex-col gap-4">
        <HeadingSkeleton v-if="loading" />
        <h1 v-else>Welcome, {{ account?.firstName }} {{ account?.lastName }}</h1>

        <div className="w-full flex gap-20 items-center mt-12">
            <CardSkeleton v-if="loading" className="skeleton-bar w-96 h-12" />
            <div v-else className="contents">
                <h2>Resumes</h2>
                <button @click="handleCreateResume">Create New Resume</button>
            </div>
            <RouterLink to="/profile" className="ml-auto">
                <h3>Your Profile</h3>
            </RouterLink>
        </div>
        <hr />
        <div className="w-full grid grid-cols-4 gap-4">

            <CardSkeleton v-if="loading" v-for="v in 8" />
            <div v-else @click="$router.push(`/${resume.id}`)" v-for="(resume, index) in account?.resumes"
                className="flex items-center justify-between bg-panel p-4 rounded-md h-24 cursor-pointer hover-highlight">
                <p>{{ resume.label ?? `Resume ${index}` }}</p>
                <button @click.stop="handleDelete(resume.id)">Delete</button>
            </div>

        </div>
    </div>
</template>
