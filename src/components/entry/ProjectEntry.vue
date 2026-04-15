<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PersistedEntity, ProjectEntry } from '../../lib/types/types';
import { useAccount } from '../../composables/useAccount';
import EditIcon from '../icons/EditIcon.vue';
import DeleteIcon from '../icons/DeleteIcon.vue';

const { addEntry, updateEntry, deleteEntry } = useAccount();

const props = defineProps<{ editingProject: ProjectEntry, index: number }>();

const editing = ref<boolean>(false);

async function handleDeleteEntry() {
    if (confirm("Really delete this entry?")) {
        await deleteEntry('projects', props.editingProject.id!)
    }
}

async function handleUpdate() {
    if (props.editingProject.id) {
        updateEntry('projects', props.editingProject as PersistedEntity)
    } else {
        addEntry('projects', props.index)
    }
    editing.value = false
}

const mutable = computed(() => !!!props.editingProject.id || editing.value)
</script>
<template>
    <form @submit.prevent="handleUpdate" className="flex items-center gap-4 p-4 border-light">
        <div className="grid grid-cols-6 gap-2 w-sm">
            <label className="col-span-4" for="title">Title
                <input className="w-full input-field" id="title" type='text' v-model="editingProject.title"
                    :disabled="!mutable">
            </label>
            <div className="col-span-2 flex w-full gap-2 place-content-end items-end">
                <button v-if="mutable" className="size-full">Save</button>
                <div v-else className="contents">
                    <EditIcon @click="editing = true" />
                    <DeleteIcon @click.prevent="handleDeleteEntry" />
                </div>
            </div>
            <label className="col-span-full" for="description">Description
                <textarea className="w-full input-field" id="description" type='text'
                    v-model="editingProject.description" :disabled="!mutable"></textarea>
            </label>
            <label className="col-span-full" for="link">Link
                <input className="w-full input-field" id="link" type='url' v-model="editingProject.link"
                    :disabled="!mutable"></input>
            </label>
            <div className="flex flex-col gap-2 col-span-full mt-2">
                <h3 className="font-semibold tracking-wider text-center">Bullet Points</h3>
                <div className="flex flex-row gap-2 w-full items-center"
                    v-for="(value, index) in editingProject.bulletPoints">
                    <textarea rows="2" className="w-full input-field" v-model="editingProject.bulletPoints[index]"
                        type="text" :disabled="!mutable" />
                    <DeleteIcon @click.prevent="editingProject.bulletPoints.splice(index, 1)" :disabled="!mutable" />
                </div>
                <button @click.prevent="editingProject.bulletPoints.push('Used x to accomplish y by doing z')"
                    :disabled="!mutable" className="disabled:cursor-not-allowed">Add
                    Bullet</button>
            </div>
        </div>


    </form>
</template>