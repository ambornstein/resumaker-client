<script setup lang="ts">
import { inject } from 'vue';
import ExperienceEntry from './entry/ExperienceEntry.vue';
import EducationEntry from './entry/EducationEntry.vue';
import ProjectEntry from './entry/ProjectEntry.vue';
import { useRoute } from 'vue-router';
import { useUser } from '../composable/useUser';

const openModal = inject<(val: 'experience' | 'education' | 'project') => void>('openModal')

const route = useRoute();

const { resume, fetchResume } = useUser();

fetchResume(route.params.id as string ?? "1")

</script>

<template>
    <div className="flex flex-col w-125">
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
            <button @click="openModal!('project')">Add</button>
        </div>
    </div>
</template>