<script setup lang="ts">
import ExperienceCard from '../entry/ExperienceCard.vue';
import EducationCard from '../entry/EducationCard.vue';
import ProjectCard from '../entry/ProjectCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { useResumeBuilder } from '../../composables/useResumeBuilder';
import { useEntryModal } from '../../composables/useEntryModal';
import { useAccount } from '../../composables/useAccount';
import { usePDFBuilder } from '../../composables/usePDFBuilder';
import SkillBox from '../SkillBox.vue';
import { watch } from 'vue';

const route = useRoute();
const router = useRouter();
const { openCategory } = useEntryModal();

const { resume, fetchResume } = useResumeBuilder();
const { account } = useAccount();
const { createPDF, savePDF} = usePDFBuilder();

if (route.params.id == null) {
    router.push('/dashboard')
} else {
    fetchResume(route.params.id!)
}

watch(() => resume.value, (value) => {
    if (value) {
        renderResume()
    }
})

function renderResume() {
    createPDF(resume.value!, account.value!)
}

const frame = document.getElementById("resume-page") as HTMLIFrameElement

</script>

<template>
    <div className="flex flex-col gap-2 w-full">
        <h2>Contents</h2>

        <h3>Education</h3>
        <div className="flex flex-col gap-4">
            <EducationCard v-for="value in resume?.educationHistory" :data="value" />
            <button @click="openCategory('education')">Select</button>
        </div>

        <h3>Skills</h3>
        <div className="flex flex-col gap-4">
            <SkillBox v-for="(value, index) in resume?.skills.skillCategories" :skillCategory="value"
                @deleteSelf="resume?.skills.skillCategories.splice(index, 1)" />

            <button @click="resume?.skills.skillCategories.push({ skills: [], categoryName: '' })">Add
                Category</button>
        </div>

        <h3>Experience</h3>
        <div className="flex flex-col gap-4">
            <ExperienceCard v-for="value in resume?.workHistory" :data="value" />
            <button @click="openCategory('work')">Select</button>
        </div>

        <h3>Projects</h3>
        <div className="flex flex-col gap-4">
            <ProjectCard v-for="value in resume?.projects" :data="value" />
            <button @click="openCategory('projects')">Select</button>
        </div>
        <button className="text-lg text-highlight mt-4" @click="savePDF">Download</button>
    </div>
</template>