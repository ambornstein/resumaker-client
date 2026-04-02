<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PersistedEntity, WorkExperienceEntry } from '../../lib/types/types';
import { useAccount } from '../../composables/useAccount';
import CloseIcon from '../icons/CloseIcon.vue';

const { addEntry, updateEntry, deleteEntry } = useAccount();

const props = defineProps<{ editingExperience: WorkExperienceEntry, index: number }>();

const editing = ref<boolean>(false);

async function handleDeleteEntry() {
    if (confirm("Really delete this entry?")) {
        await deleteEntry('work', props.editingExperience.id!)
    }
}

async function handleUpdate() {
    if (props.editingExperience.id) {
        updateEntry('work', props.editingExperience as PersistedEntity)
    } else {
        addEntry('work', props.index)
    }
    editing.value = false
}

const mutable = computed(() => !!!props.editingExperience.id || editing.value)
</script>
<template>
    <form @submit.prevent="handleUpdate" className="flex items-center gap-4 p-4 border-light">
        <div className="grid grid-cols-6 gap-2 w-sm">
            <label className="col-span-4" for="position">Position
                <input className="w-full input-field" id="position" type='text' v-model="editingExperience.title"
                    :disabled="!mutable">
            </label>
            <div className="col-span-2 flex w-full gap-2 place-content-end items-end">
                <button v-if="mutable" className="size-full">Save</button>
                <div v-else className="contents">
                    <input type="image" className="aspect-square size-9 p-1" src="/src/assets/edit.png"
                        @click="editing = true" />
                    <CloseIcon @click.prevent="handleDeleteEntry" />
                </div>
            </div>
            <label className="col-span-3" for="company">Company
                <input className="w-full input-field" id="company" type='text' v-model="editingExperience.company"
                    :disabled="!mutable">
            </label>
            <label className="col-span-3" for="location">Location
                <input className="w-full input-field" id="location" type='text' v-model="editingExperience.location"
                    :disabled="!mutable">
            </label>
            <label className="col-span-3">Start Date
                <input className="w-full input-field" id="start" type='month' v-model="editingExperience.startDate"
                    :disabled="!mutable">
            </label>
            <label className="col-span-3" v-if="!editingExperience.current">End Date
                <input className="w-full input-field" v-if="!editingExperience.current" id="start" type='month'
                    v-model="editingExperience.endDate" :disabled="!mutable" />
            </label>
            <label className="col-span-full flex items-center underline gap-2 has-disabled:cursor-not-allowed">
                <input type="checkbox" v-model="editingExperience.current" :disabled="!mutable">Is Current
            </label>
            <div className="flex flex-col gap-2 col-span-full mt-2">
                <h3 className="font-semibold tracking-wider text-center">Bullet Points</h3>
                <div className="flex flex-row gap-2 w-full items-center"
                    v-for="(value, index) in editingExperience.bulletPoints">
                    <textarea rows="2" className="w-full input-field" v-model="editingExperience.bulletPoints[index]"
                        type="text" :disabled="!mutable" />
                    <CloseIcon @click.prevent="editingExperience.bulletPoints.splice(index, 1)" :disabled="!mutable" />
                </div>
                <button @click.prevent="editingExperience.bulletPoints.push('Used x to accomplish y by doing z')"
                    :disabled="!mutable" className="disabled:cursor-not-allowed">Add
                    Bullet</button>
            </div>
        </div>


    </form>
</template>