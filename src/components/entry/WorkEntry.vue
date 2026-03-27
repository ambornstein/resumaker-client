<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PersistedEntity, WorkExperienceEntry } from '../../lib/types/types';
import { useAccount } from '../../composables/useAccount';

const { addEntry, updateEntry, deleteEntry } = useAccount();

const props = defineProps<{ editingExperience: WorkExperienceEntry, index: number }>();

const editing = ref<boolean>(false);

async function handleDeleteEntry() {
    if (confirm("Really delete this entry?")) {
        await deleteEntry('experience', props.editingExperience.id!)
    }
}

async function handleUpdate() {
    if (props.editingExperience.id) {
        updateEntry('experience', props.editingExperience as PersistedEntity)
    } else {
        addEntry('experience', props.index)
    }
    editing.value = false
}

const mutable = computed(() => !!!props.editingExperience.id || editing.value)
</script>
<template>
    <form @submit.prevent="handleUpdate" className="flex items-center gap-4 p-4 bg-zinc-900">
        <div className="grid grid-cols-6 gap-2">
            <label className="col-span-2" for="position">Position
                <input className="w-full" id="position" type='text' v-model="editingExperience.title"
                    :disabled="!mutable">
            </label>
            <label className="col-span-2" for="company">Company
                <input className="w-full" id="company" type='text' v-model="editingExperience.company"
                    :disabled="!mutable">
            </label>
            <label className="col-span-2" for="location">Location
                <input className="w-full" id="location" type='text' v-model="editingExperience.location"
                    :disabled="!mutable">
            </label>
            <label className="col-span-3">Start Date
                <input className="w-full" id="start" type='month' v-model="editingExperience.startDate"
                    :disabled="!mutable">
            </label>
            <label className="col-span-3" v-if="!editingExperience.current">End Date
                <input className="w-full" v-if="!editingExperience.current" id="start" type='month'
                    v-model="editingExperience.endDate" :disabled="!mutable" />
            </label>
            <label className="col-span-full flex items-center gap-2">
                <input type="checkbox" v-model="editingExperience.current" :disabled="!mutable">Is Current
            </label>
            <div className="bullet-container col-span-full">
                <p className="underline font-semibold">Bullet Points</p>
                <div className="flex flex-row gap-2 w-full items-center"
                    v-for="(value, index) in editingExperience.bulletPoints">
                    <textarea rows="2" className="w-full" v-model="editingExperience.bulletPoints[index]" type="text"
                        :disabled="!mutable" />
                    <input type="image" className="aspect-square size-8 p-1" src="/src/assets/close.png"
                        @click.prevent="editingExperience.bulletPoints.splice(index, 1)" :disabled="!mutable" />
                </div>
                <button @click.prevent="editingExperience.bulletPoints.push('Used x to accomplish y by doing z')"
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