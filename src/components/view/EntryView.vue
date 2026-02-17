<script setup lang="ts">
import { ref, watch } from 'vue';
import { useUser } from '../../composable/useUser';
import type { Entity, EntryAction, EntryCategory } from '../../types/type';
import EntryDialog from '../dialogue/EntryDialog.vue';
import ProjectForm from '../form/ProjectForm.vue';
import EducationForm from '../form/EducationForm.vue';
import ExperienceForm from '../form/ExperienceForm.vue';
import { useResumeBuilder } from '../../composable/useResumeBuilder';

const emit = defineEmits(['complete'])
defineExpose({ resetActionMode })
const { resume, createEntry, selectEntries } = useResumeBuilder();
const { user } = useUser();
const props = defineProps<{ modalMode: EntryCategory }>()
const action = ref<EntryAction>('select')

const selectedIds = ref<number[]>([])
const entryArray = ref<Entity[]>([])
const originalIds = ref<number[]>([])

function resetActionMode() {
    action.value = "select"
}

async function handleCreateEntry(entry: Entity) {
    await createEntry(props.modalMode, entry)
    emit('complete')
    updateEntries(props.modalMode)
}

async function handleSelect() {
    await selectEntries(props.modalMode, selectedIds.value, originalIds.value)
    emit('complete')
    updateEntries(props.modalMode)
}

function updateEntries(modalValue: EntryCategory) {
    switch (modalValue) {
        case 'experience':
            entryArray.value = resume.value!.workHistory;
            break;
        case 'education':
            entryArray.value = resume.value!.educationHistory;
            break;
        case 'projects':
            entryArray.value = resume.value!.projects;
            break;
    }
    selectedIds.value = entryArray.value.map(w => w.id!);
    originalIds.value = entryArray.value.map(w => w.id!);
}

watch(() => props.modalMode, updateEntries)

updateEntries(props.m)

</script>

<template>
    <Suspense>
        <EntryDialog :action :entryType=modalMode :account="user!" @confirmSelection="handleSelect"
            @confirmCreation="handleCreateEntry" @switchToCreate="action = 'create'">
            <template #option="data" v-if="modalMode == 'projects'">
                <div className="entry-option">
                    <p>{{ data.title }}</p>
                    <p>{{ data.description }}</p>
                </div>
                <input type="checkbox" :value="data.id" v-model="selectedIds" />
            </template>

            <template #option="data" v-else-if="modalMode == 'education'">
                <div className="entry-option">
                    <p>{{ data.degree }}</p>
                    <p>{{ data.school }}</p>
                </div>
                <input type="checkbox" :value="data.id" v-model="selectedIds" />
            </template>

            <template #option="data" v-else-if="modalMode == 'experience'">
                <div className="entry-option">
                    <p>{{ data.title }}</p>
                    <p>{{ data.company }}</p>
                </div>
                <input type="checkbox" :value="data.id" v-model="selectedIds" />
            </template>

            <template #form>
                <ProjectForm @createProject="handleCreateEntry" v-if="modalMode == 'projects'"></ProjectForm>
                <EducationForm @createEducation="handleCreateEntry" v-else-if="modalMode == 'education'">
                </EducationForm>
                <ExperienceForm @createExperience="handleCreateEntry" v-else-if="modalMode == 'experience'">
                </ExperienceForm>
            </template>
        </EntryDialog>
    </Suspense>
</template>
