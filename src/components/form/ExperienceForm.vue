<script setup lang="ts">
import { ref } from 'vue';
import type { JobData } from '../../types/type';

const job = ref<JobData>({title: "Analyst", company: "RTX", current: true, startDate: "2020-09", bulletPoints: [] })
const current = ref(false)

const emit = defineEmits<{createExperience: [job: JobData]}>()

</script>

<template>
    <form @submit.prevent="$emit('createExperience', job)" className="rounded-lg p-4">
        <div className="grid grid-cols-2 gap-2">
            <label for="position">Position</label>
            <input id="position" type='text' v-model="job.title">
            <label for="company">Company</label>
            <input id="company" type='text' v-model="job.company">
            <label>Is Current</label>
            <input type="checkbox" v-model="current">
            <label>Start Date</label>
            <input id="start" type='month' v-model="job.startDate">
            <label v-if="!current">End Date</label>
            <input v-if="!current" id="start" type='month' v-model="job.endDate" />
        </div>
        <div className="bullet-container">
            <p>Bullet Points</p>
            <input v-for="(value, index) in job.bulletPoints" v-model="job.bulletPoints[index]" type="text" />
            <button @click.prevent="job.bulletPoints.push('Used x to accomplish y by doing z')">Add Bullet</button>
        </div>
        <input type="submit" />
    </form>
</template>