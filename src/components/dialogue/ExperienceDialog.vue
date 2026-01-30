<script setup lang="ts">
import { inject, ref } from 'vue';
import type { JobData } from '../../types/type';
import ExperienceForm from '../form/ExperienceForm.vue';

const experience = inject<JobData[]>('experience')
const experienceCatalog = ref<JobData[]>([])
experienceCatalog.value.push({ title: "Intern", company: "Meta", startDate: "2025-09", bulletPoints: ["Fixed some bugs"] })

const mode = ref<"pick" | "create">('pick')

const emit = defineEmits(['completeSelection'])

function recieveData(jobData: JobData) {
    mode.value = "pick"
    experienceCatalog.value.push(jobData);
    select(jobData);
}

function select(jobData: JobData) {
    experience!.push(jobData);
    emit('completeSelection')
}

</script>

<template>
    <div v-if="mode == 'pick'" className="grid grid-cols-3 gap-4 p-4">
        <div @click="select(job)" className="flex flex-col bg-stone-800 p-1 border border-stone-900"
            v-for="job in experienceCatalog">
            <p>{{ job.title }}</p>
            <p>{{ job.company }}</p>
        </div>
        <button @click="mode = 'create'">Create New</button>
    </div>
    <div v-else-if="mode == 'create'">
        <ExperienceForm @create-experience="recieveData" />
    </div>
</template>