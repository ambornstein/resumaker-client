<script setup lang="ts">
import { useFormModal } from '../../../composables/useFormModal';
import type { EducationEntry } from '../../../lib/types';
import { ref, watch } from 'vue';

const { editingEntry } = useFormModal()

let defaultEntry = {
    degree: '',
    schoolName: '',
    location: '',
    startDate: '',
    current: false,
}

const editingEducation = ref<EducationEntry>(editingEntry.value as EducationEntry ?? defaultEntry)

watch(() => editingEntry.value, (val) => {
    editingEducation.value = val as EducationEntry ?? defaultEntry
})

const emit = defineEmits<{
    (e: 'save', entry: EducationEntry): void
}>();

</script>
<template>
    <form @submit.prevent="$emit('save', editingEducation)" className="flex flex-col items-center gap-4 p-4">
        <div className="grid grid-cols-6 gap-2 w-sm">
            <label className="col-span-4" for="degree">Degree
                <input className="w-full input-field" id="degree" type='text' v-model="editingEducation.degree">
            </label>
            <label className="col-span-3" for="school">School
                <input className="w-full input-field" id="school" type='text' v-model="editingEducation.schoolName">
            </label>
            <label className="col-span-3" for="location">Location
                <input className="w-full input-field" id="location" type='text' v-model="editingEducation.location">
            </label>
            <label className="col-span-3" for="start">Start Date
                <input className="w-full input-field" id="start" type='month' v-model="editingEducation.startDate">
            </label>
            <label className="col-span-3" for="end" v-if="!editingEducation.current">End Date
                <input className="w-full input-field" id="end" type='month' v-model="editingEducation.endDate" />
            </label>
            <label for="current" className="col-span-full underline flex gap-2 has-disabled:cursor-not-allowed">
                <input id="current" type="checkbox" v-model="editingEducation.current">
                Is Current
            </label>
        </div>
        <button type="submit">Save</button>
    </form>
</template>