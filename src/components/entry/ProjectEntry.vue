<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PersistedEntity, ProjectEntry } from '../../lib/types/types';
import { useAccount } from '../../composables/useAccount';

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
    <form @submit.prevent="handleUpdate" className=" flex items-center gap-4 p-4 bg-zinc-900">
        <div className="w-full flex flex-col gap-2">
            <label for="title">Title
                <input className="w-full" id="title" type='text' v-model="editingProject.title" :disabled="!mutable">
            </label>
            <label for="description">Description
                <textarea className="w-full" id="description" type='text' v-model="editingProject.description"
                    :disabled="!mutable"></textarea>
            </label>
            <div className="bullet-container w-full">
                <p className="underline font-semibold">Bullet Points</p>
                <div className="flex flex-row gap-2 w-full items-center"
                    v-for="(value, index) in editingProject.bulletPoints">
                    <textarea rows="2" className="w-full" v-model="editingProject.bulletPoints[index]" type="text"
                        :disabled="!mutable" />
                    <input type="image" className="aspect-square size-8 p-1" src="/src/assets/close.png"
                        @click.prevent="editingProject.bulletPoints.splice(index, 1)" :disabled="!mutable" />
                </div>
                <button @click.prevent="editingProject.bulletPoints.push('Used x to accomplish y by doing z')"
                    :disabled="!mutable">Add
                    Bullet</button>
            </div>
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