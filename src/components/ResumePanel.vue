<script setup lang="ts">
import { inject } from 'vue';
import type { JobData, ProjectData, EducationData } from '../types/type';
import EducationCard from './form/EducationForm.vue';
import ProfileCard from './form/ProfileForm.vue';
import ProjectCard from './form/ProjectForm.vue';
import ExperienceEntry from './entry/ExperienceEntry.vue';
import EducationEntry from './entry/EducationEntry.vue';
import ProjectEntry from './entry/ProjectEntry.vue';

const experience = inject<JobData[]>('experience')
const education = inject<EducationData[]>('education')
const projects = inject<ProjectData[]>('projects')

defineEmits<{ addEntry: ['education' | 'experience' | 'project'];}>()

</script>

<template>
    <div className="flex flex-col">
        <h2 className="text-2xl">Layout and Style</h2>

        <h2 className="text-2xl">Contents</h2>
        <h2>Profile Info</h2>
        <ProfileCard />
        
        <h2>Education</h2>
        <EducationEntry v-for="value in education" :data="value"/>
        <button @click="$emit('addEntry', 'education')">Add</button>
        
        <h2>Skills</h2>

        <h2>Experience</h2>
        <ExperienceEntry v-for="value in experience" :data="value" />
        <button @click="$emit('addEntry', 'experience')">Add</button>

        <h2>Projects</h2>
        <ProjectEntry v-for="value in projects" :data="value" />
        <button @click="$emit('addEntry', 'project')">Add</button>
    </div>
</template>