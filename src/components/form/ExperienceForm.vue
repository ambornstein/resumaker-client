<script setup lang="ts">
import type { JobData } from '../../types/types';
import { useEntryModal } from '../../composable/useEntryModal';

const { editingExperience } = useEntryModal()
defineEmits<{createExperience: [job: JobData]}>()

</script>

<template>
    <form @submit.prevent="$emit('createExperience', editingExperience)" className="rounded-lg p-4">
        <div className="grid grid-cols-2 gap-2">
            <label for="position">Position</label>
            <input id="position" type='text' v-model="editingExperience.title">
            <label for="company">Company</label>
            <input id="company" type='text' v-model="editingExperience.company">
            <label>Is Current</label>
            <input type="checkbox" v-model="editingExperience.current">
            <label>Start Date</label>
            <input id="start" type='month' v-model="editingExperience.startDate">
            <label v-if="!editingExperience.current">End Date</label>
            <input v-if="!editingExperience.current" id="start" type='month' v-model="editingExperience.endDate" />
        </div>
        <div className="bullet-container">
            <p>Bullet Points</p>
            <input v-for="(value, index) in editingExperience.bulletPoints" v-model="editingExperience.bulletPoints[index]" type="text" />
            <button @click.prevent="editingExperience.bulletPoints.push('Used x to accomplish y by doing z')">Add Bullet</button>
        </div>
        <input type="submit" />
    </form>
</template>