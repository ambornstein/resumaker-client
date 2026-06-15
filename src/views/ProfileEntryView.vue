<script setup lang="ts">
import { useAccount } from '../composables/useAccount';
import EducationRow from '../components/entry/education/EducationRow.vue';
import { useFormModal } from '../composables/useFormModal';
import type { EntryCategory } from '../lib/types';
import ExperienceRow from '../components/entry/experience/ExperienceRow.vue';
import ProjectRow from '../components/entry/project/ProjectRow.vue';
import GradCap from '../components/icons/GradCap.vue';
import Briefcase from '../components/icons/Briefcase.vue';
import Foldable from '../components/Foldable.vue';
import Folder from '../components/icons/Folder.vue';

const { account, fetchAccount, deleteEntry } = useAccount();
const { openCategory } = useFormModal()

async function handleDeleteEntry(category: EntryCategory, index: number) {
    if (confirm("Really delete this entry?")) {
        await deleteEntry(category, index)
    }
}

if (!account.value) await fetchAccount();

</script>

<template>
    <div className="flex flex-col gap-4 w-full mb-24">
        <Foldable id="education">
            <template #header>
                <GradCap className="size-8" />
                <h2>Education</h2>
            </template>
            <template #default>
                <button className="w-56" @click="openCategory('education')">
                    Add Education
                </button>
                <EducationRow :entry v-for="(entry, index) in account!.educationEntries"
                    @edit="(e) => openCategory('education', e)" @delete="handleDeleteEntry('education', entry.id!)" />
            </template>
        </Foldable>
        <Foldable id="work">
            <template #header>
                <Briefcase className="size-8"/>
                <h2>Work Experience</h2>
            </template>
            <template #default>
                <button className="w-56" @click="openCategory('work')">
                    Add Work Experience
                </button>
                <ExperienceRow :entry v-for="(entry, index) in account!.workExperiences"
                    @edit="(e) => openCategory('work', e)" @delete="handleDeleteEntry('work', entry.id!)" />
            </template>
        </Foldable>
        <Foldable id="projects">
            <template #header>
                <Folder className="size-8"/>
                <h2>Projects</h2>
            </template>
            <template #default>
                <button className="w-56" @click="openCategory('projects')">
                    Add Project
                </button>
                <ProjectRow :entry v-for="(entry, index) in account!.projects"
                    @edit="(e) => openCategory('projects', e)" @delete="handleDeleteEntry('projects', entry.id!)" />
            </template>
        </Foldable>
    </div>
</template>
