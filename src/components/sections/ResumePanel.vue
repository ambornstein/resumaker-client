<script setup lang="ts">
import ExperienceCard from '../entry/experience/ExperienceCard.vue';
import EducationCard from '../entry/education/EducationCard.vue';
import ProjectCard from '../entry/project/ProjectCard.vue';
import { useRoute } from 'vue-router';
import { useResumeBuilder } from '../../composables/useResumeBuilder';
import { useAccount } from '../../composables/useAccount';
import { usePDFBuilder } from '../../composables/usePDFBuilder';
import SkillBox from '../SkillBox.vue';
import { watchEffect } from 'vue';
import GradCap from '../icons/GradCap.vue';
import Foldable from '../Foldable.vue';
import Briefcase from '../icons/Briefcase.vue';
import Folder from '../icons/Folder.vue';

const route = useRoute();

const { resume, fetchResume, selectEntries, selectedEducationIds, selectedWorkIds, selectedProjectIds } = useResumeBuilder();
const { account, fetchAccount } = useAccount();
const { createPDF, savePDF, includeFlags } = usePDFBuilder();

if (!account.value) await fetchAccount();
await fetchResume(route.params.id! as string)

function renderResume() {
    createPDF(resume.value!, account.value!)
}

renderResume()

watchEffect(() => {
    if (resume.value && includeFlags) {
        renderResume()
    }
})

</script>

<template>
    <div className="flex flex-col gap-4 w-full">
        <h3>Include Info</h3>
        <div className="grid grid-cols-3 grid-flow-row mb-4">
            <label for="location"><input type="checkbox" className="mr-1" id="location" v-model="includeFlags.location">Location</label>
            <label for="email"><input type="checkbox" className="mr-1" id="email" v-model="includeFlags.email">Email</label>
            <label for="site"><input type="checkbox" className="mr-1" id="site" v-model="includeFlags.website">Website</label>
            <label for="phone"><input type="checkbox" className="mr-1" id="phone" v-model="includeFlags.phone">Phone Number</label>
            <label for="linkedIn"><input type="checkbox" className="mr-1" id="linkedIn" v-model="includeFlags.linkedIn">LinkedIn</label>
            <label for="github"><input type="checkbox" className="mr-1" id="github" v-model="includeFlags.github">GitHub</label>
        </div>

        <Foldable>
            <template #header>
                <GradCap className="size-8" />
                <h3>Education</h3>
            </template>
            <template #default>
                <div className="grid grid-cols-3 gap-2 my-2">
                    <EducationCard v-for="value in account?.educationEntries" :data="value" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="w-full" @click="selectEntries('education', selectedEducationIds)">Select</button>
                    <RouterLink to="/profile/entries#education"><button className="w-full">Add New</button></RouterLink>
                </div>
            </template>
        </Foldable>

        <Foldable>
            <template #header>
                <Briefcase className="size-8"/>
                <h3>Experience</h3>
                <label className="ml-auto flex gap-2">
                    Include
                    <input type="checkbox" v-model="includeFlags.experience">
                </label>
            </template>
            <template #default>
                <div className="grid grid-cols-3 gap-2 my-2">
                    <ExperienceCard v-for="value in account?.workExperiences" :data="value" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button @click="selectEntries('work', selectedWorkIds)">Select</button>
                    <RouterLink to="/profile/entries#work"><button className="w-full">Add New</button></RouterLink>
                </div>
            </template>
        </Foldable>

        <Foldable>
            <template #header>
                <Folder className="size-8"/>
                <h3>Projects</h3>
                <label className="ml-auto flex gap-2">
                    Include
                    <input type="checkbox" v-model="includeFlags.projects">
                </label>
            </template>
            <template #default>
                <div className="grid grid-cols-3 gap-2 my-2">
                    <ProjectCard v-for="value in account?.projects" :data="value" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button @click="selectEntries('projects', selectedProjectIds)">Select</button>
                    <RouterLink to="/profile/entries#projects"><button className="w-full">Add New</button></RouterLink>
                </div>
            </template>
        </Foldable>

        <h3>Skills</h3>
        <div className="flex flex-col gap-2">
            <SkillBox v-for="(value, index) in resume?.skills.skillCategories" :skillCategory="value"
                @deleteSelf="resume?.skills.skillCategories.splice(index, 1)" />

            <button @click="resume?.skills.skillCategories.push({ skills: [], categoryName: '' })">Add
                Category</button>
        </div>

        <button className="text-lg text-highlight bg-contrast dark:bg-button" @click="savePDF">Download</button>
    </div>
</template>