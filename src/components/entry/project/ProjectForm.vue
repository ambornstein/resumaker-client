<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ProjectEntry } from '../../../lib/types';
import DeleteIcon from '../../icons/DeleteIcon.vue';
import { useFormModal } from '../../../composables/useFormModal';

const { editingEntry } = useFormModal()

let defaultEntry = {
    title: '',
    description: '',
    bulletPoints: [],
}

const editingProject = ref<ProjectEntry>(editingEntry.value as ProjectEntry ?? defaultEntry)

watch(() => editingEntry.value, (val) => {
    editingProject.value = val as ProjectEntry ?? defaultEntry
})

const emit = defineEmits<{
    (e: 'save', entry: ProjectEntry): void
}>();

</script>
<template>
    <form @submit.prevent="$emit('save', editingProject)" className="flex flex-col items-center gap-4 p-4">
        <div className="grid grid-cols-6 gap-2 w-sm">
            <label className="col-span-4" for="title">Title
                <input className="w-full input-field" id="title" type='text' v-model="editingProject.title">
            </label>
            <label className="col-span-full" for="description">Description
                <textarea className="w-full input-field" id="description" type='text'
                    v-model="editingProject.description"></textarea>
            </label>
            <label className="col-span-full" for="link">Link
                <input className="w-full input-field" id="link" type='url' v-model="editingProject.link"></input>
            </label>
            <div className="flex flex-col gap-2 col-span-full mt-2">
                <h3 className="font-semibold tracking-wider text-center">Bullet Points</h3>
                <div className="flex flex-row gap-2 w-full items-center"
                    v-for="(value, index) in editingProject.bulletPoints">
                    <textarea rows="2" className="w-full input-field" v-model="editingProject.bulletPoints[index]"
                        type="text" />
                    <DeleteIcon @click.prevent="editingProject.bulletPoints.splice(index, 1)" />
                </div>
                <button @click.prevent="editingProject.bulletPoints.push('Used x to accomplish y by doing z')"
                    className="disabled:cursor-not-allowed">Add
                    Bullet</button>
            </div>
        </div>
        <button type="submit">Save</button>
    </form>
</template>