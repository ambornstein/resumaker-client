<script setup lang="ts">
import ExperienceEntry from './entry/ExperienceEntry.vue';
import EducationEntry from './entry/EducationEntry.vue';
import ProjectEntry from './entry/ProjectEntry.vue';
import { useRoute } from 'vue-router';
import { useResumeBuilder } from '../composables/useResumeBuilder';
import { useEntryModal } from '../composables/useEntryModal';
import { useAccount } from '../composables/useAccount';
import { usePDFBuilder } from '../composables/usePDFBuilder';
import api from '../lib/services/api';
import SkillBox from './SkillBox.vue';

const route = useRoute();
const { openCategory } = useEntryModal();

const { resume, fetchResume } = useResumeBuilder();
const { account } = useAccount();
const { createPDF } = usePDFBuilder();

fetchResume(route.params.id ?? 1)

async function saveResume() {
    await api.put('/api/resumes/1', resume.value)
}

</script>

<template>
    <div className="flex flex-col gap-2 min-w-75 w-[40%]">
        <h2>Profile Info</h2>

        <div className="split-column">
            <input type="checkbox" id="email"><label for="email">Include Email</label>
            <input type="checkbox" id="site"><label for="site">Include Website</label>
            <input type="checkbox" id="phone"><label for="phone">Include Phone Number</label>
            <input type="checkbox" id="linkedIn"><label for="linkedIn">Include
                LinkedIn</label>
            <input type="checkbox" id="github"><label for="github">Include GitHub</label>
        </div>

        <h2>Contents</h2>

        <h3>Education</h3>
        <div className="vert-list">
            <EducationEntry v-for="value in resume?.educationHistory" :data="value" />
            <button @click="openCategory('education')">Add</button>
        </div>

        <h3>Skills</h3>
        <div className="vert-list">
            <SkillBox v-for="(value, index) in resume?.skills.skillCategories" :skillCategory="value"
                @deleteSelf="resume?.skills.skillCategories.splice(index, 1)" />

            <button @click="resume?.skills.skillCategories.push({ skills: [], categoryName: '' })">Add
                Category</button>
        </div>

        <h3>Experience</h3>
        <div className="vert-list">
            <ExperienceEntry v-for="value in resume?.workHistory" :data="value" />
            <button @click="openCategory('experience')">Add</button>
        </div>

        <h3>Projects</h3>
        <div className="vert-list">
            <ProjectEntry v-for="value in resume?.projects" :data="value" />
            <button @click="openCategory('projects')">Add</button>
        </div>
        <button className="text-lg text-emerald-500 mt-4" @click="createPDF(resume!, account!)">Save As PDF</button>
        <button className="text-lg text-emerald-500 mt-4" @click="saveResume">Save Resume</button>
    </div>
</template>