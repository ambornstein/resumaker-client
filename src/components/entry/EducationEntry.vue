<script setup lang="ts">
import { computed, ref } from 'vue';
import type { EducationEntry, PersistedEntity } from '../../lib/types/types';
import { useAccount } from '../../composables/useAccount';

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
    <form @submit.prevent="handleUpdate" className="flex items-center gap-4 p-4 bg-zinc-900">
        <div className="grid grid-cols-6 gap-2">
            <label className="col-span-2" for="degree">Degree
                <input className="w-full" id="degree" type='text' v-model="editingEducation.degree" :disabled="!mutable">
            </label>
            <label className="col-span-2" for="school">School
                <input className="w-full" id="school" type='text' v-model="editingEducation.schoolName" :disabled="!mutable">
            </label>
            <label className="col-span-2" for="location">Location
                <input className="w-full" id="location" type='text' v-model="editingEducation.location" :disabled="!mutable">
            </label>
            <label className="col-span-3" for="start">Start Date
                <input className="w-full" id="start" type='month' v-model="editingEducation.startDate" :disabled="!mutable">
            </label>
            <label className="col-span-3" for="end" v-if="!editingEducation.current">End Date
                <input v-if="!editingEducation.current" className="w-full" id="end" type='month'
                    v-model="editingEducation.endDate" :disabled="!mutable"/>
            </label>
            <label className="col-span-full flex gap-2">
                <input type="checkbox" v-model="editingEducation.current" :disabled="!mutable">Is Current
            </label>
        </div>
        <button v-if="mutable" type="submit">Save</button>
        <div v-else className="flex flex-col gap-2 max-w-14">
            <input type="image" className="aspect-square size-14 p-1" src="/src/assets/close.png"
                @click.prevent="handleDeleteEntry" />
            <input type="image" className="aspect-square size-14 p-1" src="/src/assets/edit.png"
                @click="editing = true" />
        </div>
    </form>
</template>