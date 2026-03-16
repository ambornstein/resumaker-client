<script setup lang="ts">
import { useEntryModal } from '../../composable/useEntryModal';
import type { EducationEntry } from '../../types/types';

const { editingEducation } = useEntryModal()
defineEmits<{createEducation: [ed: EducationEntry]}>()

</script>

<template>
    <form @submit.prevent="$emit('createEducation', editingEducation)" className="rounded-lg p-4">
        <div className="grid grid-cols-2 gap-2">
            <label for="degree">Degree</label>
            <input id="degree" type='text' v-model="editingEducation.degree">
            <label for="school">School</label>
            <input id="school" type='text' v-model="editingEducation.schoolName">
            <label for="location">Location</label>
            <input id="location" type='text' v-model="editingEducation.location">
            <label>Is Current</label>
            <input type="checkbox" v-model="editingEducation.current">
            <label>Start Date</label>
            <input id="start" type='month' v-model="editingEducation.startDate">
            <label v-if="!editingEducation.current">End Date</label>
            <input v-if="!editingEducation.current" id="start" type='month' v-model="editingEducation.endDate"/>
        </div>
        <input type="submit"/>
    </form>
</template>