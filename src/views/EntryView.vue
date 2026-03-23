<script setup lang="ts">
import { ref, watch } from 'vue';
import { useUser } from '../composables/useUser';
import type { Entity, EntryCategory, PersistedEntity } from '../lib/types/types';
import EntryDialog from '../components/dialogue/EntryDialog.vue';
import ProjectForm from '../components/form/ProjectForm.vue';
import EducationForm from '../components/form/EducationForm.vue';
import ExperienceForm from '../components/form/ExperienceForm.vue';
import { useResumeBuilder } from '../composables/useResumeBuilder';
import { useEntryModal } from '../composables/useEntryModal';

const emit = defineEmits(['complete'])
const { resume, selectEntries } = useResumeBuilder();
const { addEntry, updateEntry, deleteEntry } = useUser();
const { modalMode, action, useAction, resetEditingEntries, editProject, editEducation, editExperience } = useEntryModal();

const selectedIds = ref<number[]>([])

async function handleUpdateEntry(entry: Entity) {
    if (entry.id) {
        await updateEntry(modalMode.value, entry as PersistedEntity)
    }
    else {
        await addEntry(modalMode.value, entry)
    }

    useAction('select')
    resetEditingEntries()
}

async function handleDeleteEntry(id: number) {
    if (confirm("Really delete this entry?")) {
        await deleteEntry(modalMode.value, id)
        updateEntries(modalMode.value)
    }
}

async function handleSelect() {
    await selectEntries(modalMode.value, selectedIds.value)
    emit('complete')
    updateEntries(modalMode.value)
}

function updateEntries(modalValue: EntryCategory) {
    let entryArray: Entity[]

    switch (modalValue) {
        case 'experience':
            entryArray = resume.value?.workHistory ?? [];
            break;
        case 'education':
            entryArray = resume.value?.educationHistory ?? [];
            break;
        case 'projects':
            entryArray = resume.value?.projects ?? [];
            break;
    }
    selectedIds.value = entryArray.map(w => w.id!);
}

watch(() => modalMode.value, updateEntries)


</script>

<template>
    <Suspense>
        <EntryDialog @confirmSelection="handleSelect" @confirmCreation="handleUpdateEntry"
            @switchToCreate="action = 'create'">
            <template #option="data" v-if="modalMode == 'projects'">
                <div className="entry-chip">
                    <label :for="data.title" className="entry-label">
                        <input :id="data.title" type="checkbox" :value="data.id" v-model="selectedIds" />
                        <div className="inline-block">
                            <p>{{ data.title }}</p>
                        </div>
                    </label>
                    <div className="flex flex-col gap-2">
                        <input type="image" className="w-8 h-8 p-1" src="/src/assets/close.png"
                            @click="handleDeleteEntry(data.id!)" />
                        <input type="image" className="w-8 h-8 p-1" src="/src/assets/edit.png" @click="editProject(data)" />
                    </div>
                </div>
            </template>

            <template #option="data" v-else-if="modalMode == 'education'">
                <div className="entry-chip">
                    <label :for="data.degree" className="entry-label">
                        <input :id="data.degree" type="checkbox" :value="data.id" v-model="selectedIds" />
                        <div className="inline-block">
                            <p>{{ data.degree }}</p>
                            <p>{{ data.school }}</p>
                        </div>
                    </label>
                    <div className="flex flex-col gap-2">
                        <input type="image" className="w-8 h-8 p-1" src="/src/assets/close.png"
                            @click="handleDeleteEntry(data.id!)" />
                        <input type="image" className="w-8 h-8 p-1" src="/src/assets/edit.png"
                            @click="editEducation(data)" />
                    </div>
                </div>
            </template>

            <template #option="data" v-else-if="modalMode == 'experience'">
                <div className="entry-chip">
                    <label :for="data.title + data.id" className="entry-label">
                        <input :id="data.title + data.id" type="checkbox" :value="data.id" v-model="selectedIds" />
                        <div className="inline-block">
                            <p>{{ data.title }}</p>
                            <p>{{ data.company }}</p>
                        </div>
                    </label>
                    <div className="flex flex-col gap-2">
                        <input type="image" className="w-8 h-8 p-1" src="/src/assets/close.png"
                            @click="handleDeleteEntry(data.id!)" />
                        <input type="image" className="w-8 h-8 p-1" src="/src/assets/edit.png"
                            @click="editExperience(data)" />
                    </div>
                </div>
            </template>

            <template #form>
                <ProjectForm @createProject="handleUpdateEntry" v-if="modalMode == 'projects'">
                </ProjectForm>
                <EducationForm @createEducation="handleUpdateEntry" v-else-if="modalMode == 'education'">
                </EducationForm>
                <ExperienceForm @createExperience="handleUpdateEntry" v-else-if="modalMode == 'experience'">
                </ExperienceForm>
            </template>
        </EntryDialog>
    </Suspense>
</template>
