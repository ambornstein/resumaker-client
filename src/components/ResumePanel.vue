<script setup lang="ts">
import { inject } from 'vue';
import type { JobData, ProjectData, EducationData } from '../types/type';
import ProfileCard from './form/ProfileForm.vue';
import ExperienceEntry from './entry/ExperienceEntry.vue';
import EducationEntry from './entry/EducationEntry.vue';
import ProjectEntry from './entry/ProjectEntry.vue';

const experience = inject<JobData[]>('experience')
const education = inject<EducationData[]>('education')
const projects = inject<ProjectData[]>('projects')

const openModal = inject<(val: 'experience' | 'education' | 'project') => void>('openModal')

defineEmits<{ addEntry: ['education' | 'experience' | 'project']; }>()

</script>

<template>
    <div className="flex flex-col w-125">
        <h2 className="text-2xl">Layout and Style</h2>

        <h2 className="text-2xl">Contents</h2>
        <h2>Profile Info</h2>
        <ProfileCard />

        <h2>Education</h2>
        <div className="vert-list">
            <EducationEntry v-for="value in education" :data="value" />
            <button @click="openModal!('education')">Add</button>
        </div>

        <h2>Skills</h2>

        <h2>Experience</h2>
        <div className="vert-list">
            <ExperienceEntry v-for="value in experience" :data="value" />
            <button @click="openModal!('experience')">Add</button>
        </div>

        <h2>Projects</h2>
        <div className="vert-list">
            <ProjectEntry v-for="value in projects" :data="value" />
            <button @click="openModal!('project')">Add</button>
        </div>
    </div>
</template>