<script setup lang="ts">
import type { WorkExperienceEntry } from '../../../lib/types';
import { ref } from 'vue';
import DeleteIcon from '../../icons/DeleteIcon.vue';

const props = defineProps<{ entry?: WorkExperienceEntry }>();

const editingExperience = ref<WorkExperienceEntry>(props.entry ?? {
    title: '',
    company: '',
    location: '',
    startDate: '',
    current: false,
    bulletPoints: [],
})

const emit = defineEmits<{
    (e: 'save', entry: WorkExperienceEntry): void
}>();

</script>
<template>
    <form @submit.prevent="$emit('save', editingExperience)" className="flex flex-col items-center gap-4 p-4">
        <div className="grid grid-cols-6 gap-2 w-sm">
            <label className="col-span-4" for="position">Position
                <input className="w-full input-field" id="position" type='text' v-model="editingExperience.title">
            </label>
            <label className="col-span-3" for="company">Company
                <input className="w-full input-field" id="company" type='text' v-model="editingExperience.company">
            </label>
            <label className="col-span-3" for="location">Location
                <input className="w-full input-field" id="location" type='text' v-model="editingExperience.location">
            </label>
            <label className="col-span-3">Start Date
                <input className="w-full input-field" id="start" type='month' v-model="editingExperience.startDate">
            </label>
            <label className="col-span-3" v-if="!editingExperience.current">End Date
                <input className="w-full input-field" id="end" type='month' v-model="editingExperience.endDate" />
            </label>
            <label for="current"
                className="col-span-full flex items-center underline gap-2 has-disabled:cursor-not-allowed">
                <input type="checkbox" v-model="editingExperience.current" id="current">Is
                Current
            </label>
            <div className="flex flex-col gap-2 col-span-full mt-2">
                <h3 className="font-semibold tracking-wider text-center">Bullet Points</h3>
                <div className="flex flex-row gap-2 w-full items-center"
                    v-for="(value, index) in editingExperience.bulletPoints">
                    <textarea rows="2" className="w-full input-field" v-model="editingExperience.bulletPoints[index]"
                        type="text" />
                    <DeleteIcon @click.prevent="editingExperience.bulletPoints.splice(index, 1)" />
                </div>
                <button @click.prevent="editingExperience.bulletPoints.push('Used x to accomplish y by doing z')"
                    className="disabled:cursor-not-allowed">Add
                    Bullet</button>
            </div>
        </div>
        <button type="submit">Save</button>
    </form>
</template>