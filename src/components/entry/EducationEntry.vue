<script setup lang="ts">
import { computed, ref } from 'vue';
import type { EducationEntry, PersistedEntity } from '../../lib/types/types';
import { useAccount } from '../../composables/useAccount';
import CloseIcon from '../icons/CloseIcon.vue';
import EditIcon from '../icons/EditIcon.vue';

const { addEntry, updateEntry, deleteEntry } = useAccount();

const props = defineProps<{ editingEducation: EducationEntry, index: number }>();

const editing = ref<boolean>(false);

async function handleDeleteEntry() {
    if (confirm("Really delete this entry?")) {
        await deleteEntry('education', props.editingEducation.id!)
    }
}

async function handleUpdate() {
    if (props.editingEducation.id) {
        updateEntry('education', props.editingEducation as PersistedEntity)
    } else {
        addEntry('education', props.index)
    }
    editing.value = false
}

const mutable = computed(() => !!!props.editingEducation.id || editing.value)
</script>
<template>
    <form @submit.prevent="handleUpdate" className="flex items-center gap-4 p-4 border-light">
        <div className="grid grid-cols-6 gap-2 w-sm">
            <label className="col-span-4" for="degree">Degree
                <input className="w-full input-field" id="degree" type='text' v-model="editingEducation.degree"
                    :disabled="!mutable">
            </label>
            <div className="col-span-2 flex w-full gap-2 place-content-end items-end">
                <button v-if="mutable" className="size-full">Save</button>
                <div v-else className="contents">
                    <EditIcon @click="editing = true" />
                    <CloseIcon @click.prevent="handleDeleteEntry" />
                </div>
            </div>
            <label className="col-span-3" for="school">School
                <input className="w-full input-field" id="school" type='text' v-model="editingEducation.schoolName"
                    :disabled="!mutable">
            </label>
            <label className="col-span-3" for="location">Location
                <input className="w-full input-field" id="location" type='text' v-model="editingEducation.location"
                    :disabled="!mutable">
            </label>
            <label className="col-span-3" for="start">Start Date
                <input className="w-full input-field" id="start" type='month' v-model="editingEducation.startDate"
                    :disabled="!mutable">
            </label>
            <label className="col-span-3" for="end" v-if="!editingEducation.current">End Date
                <input v-if="!editingEducation.current" className="w-full input-field" id="end" type='month'
                    v-model="editingEducation.endDate" :disabled="!mutable" />
            </label>
            <label for="current" className="col-span-full underline flex gap-2 has-disabled:cursor-not-allowed">
                <input type="checkbox" id="current" v-model="editingEducation.current" :disabled="!mutable">Is Current
            </label>
        </div>
    </form>
</template>