<script setup lang="ts">
import { ref, watch } from 'vue';
import { useUser } from '../../composable/useUser';
import type { EducationData, Entity, JobData, ProjectData } from '../../types/type';
import EntryDialog from '../dialogue/EntryDialog.vue';
import ProjectForm from '../form/ProjectForm.vue';
import EducationForm from '../form/EducationForm.vue';
import ExperienceForm from '../form/ExperienceForm.vue';

const emit = defineEmits(['complete'])
defineExpose({resetActionMode})
const { resume, selectEducation, selectExperience, selectProjects, createEducation, createExperience, createProject } = useUser();
const props = defineProps<{ modalMode: 'experience' | 'education' | 'project' }>()
const action = ref<'select' | 'create'>('select')

const selectedIds = ref<number[]>([])
const entryArray = ref<Entity[]>()

function resetActionMode() {
    action.value = "create"
}

async function handleCreateEntry(entry: Entity) {
    switch (props.modalMode) {
        case 'experience':
            await createExperience(entry as JobData);
            break;
        case 'education':
            await createEducation(entry as EducationData);
            break;
        case 'project':
            await createProject(entry as ProjectData);
            break;
    }

    emit('complete')
}

async function handleSelect() {
    switch (props.modalMode) {
        case 'experience':
            await selectExperience(selectedIds.value);
            break;
        case 'education':
            await selectEducation(selectedIds.value);
            break;
        case 'project':
            await selectProjects(selectedIds.value);
            break;
    }

    emit('complete')
}

watch(() => props.modalMode, (newVal) => {
    switch (newVal) {
        case 'experience':
            entryArray.value = resume.value!.workHistory;
            break;
        case 'education':
            entryArray.value = resume.value!.educationHistory;
            break;
        case 'project':
            entryArray.value = resume.value!.projects;
            break;
    }

    selectedIds.value = entryArray.value.map(w => w.id!);
})

</script>

<template>
    <Suspense>
        <EntryDialog :action :entryType=modalMode :entries="entryArray!" @confirmSelection="handleSelect"
            @confirmCreation="handleCreateEntry" @switchToCreate="action = 'create'">
            <template className="entry-option" #option="data">
                <div v-if="modalMode == 'project'">
                    <p>{{ data.title }}</p>
                    <p>{{ data.description }}</p>
                </div>
                <div className="entry-option" v-if="modalMode == 'education'">
                    <p>{{ data.degree }}</p>
                    <p>{{ data.school }}</p>
                </div>
                <div className="entry-option" v-if="modalMode == 'experience'">
                    <p>{{ data.title }}</p>
                    <p>{{ data.company }}</p>
                </div>
                <input type="checkbox" :value="data.id" v-model="selectedIds" />
            </template>

            <template #form>
                <ProjectForm @createProject="handleCreateEntry" v-if="modalMode == 'project'"></ProjectForm>
                <EducationForm @createEducation="handleCreateEntry" v-else-if="modalMode == 'education'"></EducationForm>
                <ExperienceForm @createExperience="handleCreateEntry" v-else-if="modalMode == 'experience'"></ExperienceForm>
            </template>
        </EntryDialog>
    </Suspense>
</template>
