<script setup lang="ts">
import { useAccount } from '../composables/useAccount';
import EducationRow from '../components/entry/education/EducationRow.vue';
import { useFormModal } from '../composables/useFormModal';
import type { EntryCategory } from '../lib/types';
import ExperienceRow from '../components/entry/experience/ExperienceRow.vue';
import ProjectRow from '../components/entry/project/ProjectRow.vue';
import { ref } from 'vue';

const { account, fetchAccount, deleteEntry } = useAccount();
const { openCategory } = useFormModal()

async function handleDeleteEntry(category: EntryCategory, index: number) {
    if (confirm("Really delete this entry?")) {
        await deleteEntry(category, index)
    }
}

const showEducation = ref(true)
const showExperience = ref(true)
const showProjects = ref(true)

if (!account.value) await fetchAccount();

</script>

<template>
    <div className="flex flex-col gap-4 w-full mb-24">
        <div className="flex flex-col gap-2 bg-panel rounded-lg ring ring-contrast" id="education">
            <div className="flex flex-row gap-8 items-center p-4 ring ring-contrast rounded-lg hover:bg-highlight"
                @click="showEducation = !showEducation">
                <img src="/src/assets/vue.svg" width="40" height="40" />
                <h2>Education</h2>
            </div>
            <div className="p-2 flex flex-col gap-4" v-show="showEducation">
                <button className="w-56" @click="openCategory('education')">
                    Add Education
                </button>
                <EducationRow :entry v-for="(entry, index) in account!.educationEntries"
                    @edit="(e) => openCategory('education', e)" @delete="handleDeleteEntry('education', entry.id!)" />
            </div>
        </div>
        <div className="flex flex-col gap-2 bg-panel rounded-lg ring ring-contrast" id="work">
            <div className="flex flex-row gap-8 items-center p-4 ring ring-contrast rounded-lg hover:bg-highlight"
                @click="showExperience = !showExperience">
                <img src="/src/assets/vue.svg" width="40" height="40" />
                <h2>Work Experience</h2>
            </div>
            <div className="p-2 flex flex-col gap-4" v-show="showExperience">
                <button className="w-56" @click="openCategory('work')">
                    Add Work Experience
                </button>
                <ExperienceRow :entry v-for="(entry, index) in account!.workExperiences"
                    @edit="(e) => openCategory('work', e)" @delete="handleDeleteEntry('work', entry.id!)" />
            </div>
        </div>
        <div className="flex flex-col gap-2 bg-panel rounded-lg ring ring-contrast" id="projects">
            <div className="flex flex-row gap-8 items-center p-4 ring ring-contrast rounded-lg hover:bg-highlight"
                @click="showProjects = !showProjects">
                <img src="/src/assets/vue.svg" width="40" height="40" />
                <h2>Projects</h2>
            </div>
            <div className="p-2 flex flex-col gap-4" v-show="showProjects">
                <button className="w-56" @click="openCategory('projects')">
                    Add Project
                </button>
                <ProjectRow :entry v-for="(entry, index) in account!.projects"
                    @edit="(e) => openCategory('projects', e)" @delete="handleDeleteEntry('projects', entry.id!)" />
            </div>
        </div>
    </div>

</template>
