<script setup lang="ts">
import { ref, watch } from "vue";
import CardSkeleton from "../components/skeleton/CardSkeleton.vue";
import HeadingSkeleton from "../components/skeleton/HeadingSkeleton.vue";
import { useAccount } from "../composables/useAccount";
import type { Resume } from "../lib/types";
import EditIcon from "../components/icons/EditIcon.vue";
import DeleteIcon from "../components/icons/DeleteIcon.vue";
import CreateIcon from "../components/icons/CreateIcon.vue";
import RenameIcon from "../components/icons/RenameIcon.vue";

const { account, fetchAccount, createResume, deleteResume, updateResumeLabel, loading } = useAccount();

const resumeList = ref<Resume[]>(account.value?.resumes!)
const selectedResume = ref<Resume>()
const sortValue = ref<string>('name')


function handleCreateResume() {
    const label = prompt("Input a label for the resume")
    if (label) createResume({ label: label, skills: { skillCategories: [] } })
}

function handleDelete() {
    if (!selectedResume.value) return
    if (confirm("Really delete this resume?")) {
        deleteResume(selectedResume.value.id)
    }
}

async function handleUpdateLabel() {
    if (!selectedResume.value) return
    const label = prompt("Input the new name for the resume", selectedResume.value.label)
    if (label) {
        await updateResumeLabel(selectedResume.value.id, label);

        sortResumes()
    }
}

function sortResumes() {
    switch (sortValue.value) {
        case 'name':
            resumeList.value = resumeList.value?.sort((a, b) => a.label.localeCompare(b.label))
            break
        case 'updated':
            resumeList.value = resumeList.value?.sort((a, b) => new Date(a.updatedOn).getMilliseconds() - new Date(b.updatedOn).getMilliseconds())
            break
        case 'created':
            resumeList.value = resumeList.value?.sort((a, b) => new Date(a.createdOn).getMilliseconds() - new Date(b.createdOn).getMilliseconds())
            break
    }
}

fetchAccount();

watch(() => account.value, (value) => {
    if (value) resumeList.value = value.resumes
    sortResumes();
})

</script>

<template>
    <div className="flex flex-col gap-4 h-full">
        <HeadingSkeleton v-if="loading" />
        <h2 v-else>Welcome, {{ account?.firstName }} {{ account?.lastName }}</h2>

        <div className="w-full flex gap-20 items-center mt-4">
            <CardSkeleton v-if="loading" className="skeleton-bar w-96 h-12" />
            <h2>Resumes</h2>

            <RouterLink to="/profile" className="ml-auto link">
                <h3>Your Profile</h3>
            </RouterLink>
        </div>
        <div className="flex gap-4 items-center h-14">
            <label for="sort" className="mr-12 bg-panel rounded-sm p-2 ">
                <span className="block ">Sort By</span>
                <select id="sort" @change="sortResumes" v-model="sortValue" className="bg-panel">
                    <option value="name">Name</option>
                    <option value="created">Created At</option>
                    <option value="updated"> Updated At</option>
                </select>
            </label>
            <div @click="handleCreateResume" @focus.prevent=""
                className="button bg-highlight rounded-sm flex items-center p-2 gap-2 pr-4 cursor-pointer">
                <CreateIcon />
                <span className="text-xl">Create New Resume</span>
            </div>
            <div v-show="selectedResume" @click="$router.push(`/resume/${selectedResume!.id}`)"
                className="button bg-panel rounded-sm flex items-center p-2 gap-2 pr-4 cursor-pointer">
                <EditIcon />
                <span className="text-xl">Edit</span>
            </div>
            <div v-show="selectedResume" @click="handleDelete"
                className="button bg-panel rounded-sm flex items-center p-2 gap-2 pr-4 cursor-pointer">
                <DeleteIcon />
                <span className="text-xl">Delete</span>
            </div>
            <div v-show="selectedResume" @click="handleUpdateLabel"
                className="button bg-panel rounded-sm flex items-center p-2 gap-2 pr-4 cursor-pointer h-full">
                <RenameIcon />
                <span className="text-xl">Rename</span>
            </div>
        </div>
        <hr />
        <div className="w-full grid grid-cols-4 gap-4">

            <CardSkeleton v-if="loading" v-for="v in 8" />
            <button type="button" v-else @dblclick="$router.push(`/resume/${resume.id}`)"
                @click="selectedResume = resume" v-for="(resume, index) in resumeList"
                className="flex items-center justify-between bg-panel p-4 rounded-md h-24 cursor-pointer hover-highlight focus:ring-4 focus:ring-highlight focus:outline-none">
                <span>{{ resume.label ?? `Resume ${index}` }}</span>
            </button>
        </div>
    </div>
</template>
