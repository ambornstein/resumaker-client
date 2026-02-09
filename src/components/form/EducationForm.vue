<script setup lang="ts">
import { ref } from 'vue';
import type { EducationData } from '../../types/type';

const education = ref<EducationData>({degree: "B.A.", school:"WPI", startDate:"2020-09", location: "Worcester, MA"})
const current = ref(false)

defineEmits<{createEducation: [ed: EducationData]}>()
</script>

<template>
    <form @submit.prevent="$emit('createEducation', education)" className="rounded-lg p-4">
        <div className="grid grid-cols-2 gap-2">
            <label for="degree">Degree</label>
            <input id="degree" type='text' v-model="education.degree">
            <label for="school">School</label>
            <input id="school" type='text' v-model="education.school">
            <label for="location">Location</label>
            <input id="location" type='text' v-model="education.location">
            <label>Is Current</label>
            <input type="checkbox" v-model="current">
            <label>Start Date</label>
            <input id="start" type='month' v-model="education.startDate">
            <label v-if="!current">End Date</label>
            <input v-if="!current" id="start" type='month' v-model="education.endDate"/>
        </div>
        <input type="submit"/>
    </form>
</template>