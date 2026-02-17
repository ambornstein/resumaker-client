<script setup lang="ts">
import { inject } from 'vue';
import ExperienceEntry from './entry/ExperienceEntry.vue';
import EducationEntry from './entry/EducationEntry.vue';
import ProjectEntry from './entry/ProjectEntry.vue';
import { useRoute } from 'vue-router';
import { useResumeBuilder } from '../composable/useResumeBuilder';
import type { EntryCategory } from '../types/type';
import html2PDF from 'jspdf-html2canvas-pro';

const openModal = inject<(val: EntryCategory) => void>('openModal')

const route = useRoute();

const { resume, fetchResume } = useResumeBuilder();

fetchResume(route.params.id ?? 1)

function exportToPDf() {
    html2PDF(document.getElementById("resume-page")!, {
        jsPDF: {
            unit: "pt",
            format: "a4"
        },
        imageType: 'image/jpg',
        margin: {
            top: 2,
            right: 2,
            bottom: 0,
            left: 2,
        },
        html2canvas: {
            scale: 2,
        },
        autoResize: true,
        output: 'resume.pdf'
    });
}

</script>

<template>
    <div className="flex flex-col gap-2 min-w-75">
        <h2 className="text-2xl">Layout and Style</h2>

        <h2 className="text-2xl">Contents</h2>
        <h2>Profile Info</h2>

        <h2>Education</h2>
        <div className="vert-list">
            <EducationEntry v-for="value in resume?.educationHistory" :data="value" />
            <button @click="openModal!('education')">Add</button>
        </div>

        <h2>Skills</h2>

        <h2>Experience</h2>
        <div className="vert-list">
            <ExperienceEntry v-for="value in resume?.workHistory" :data="value" />
            <button @click="openModal!('experience')">Add</button>
        </div>

        <h2>Projects</h2>
        <div className="vert-list">
            <ProjectEntry v-for="value in resume?.projects" :data="value" />
            <button @click="openModal!('projects')">Add</button>
        </div>

        <button className="text-lg text-emerald-500 mt-4" @click="exportToPDf">Save As PDF</button>
    </div>
</template>