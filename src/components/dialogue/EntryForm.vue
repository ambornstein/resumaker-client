<script setup lang="ts">

import { useAccount } from '../../composables/useAccount';
import { useFormModal } from '../../composables/useFormModal';
import type { EducationEntry, Entity, EntryCategory, PersistedEntity, ProjectEntry, WorkExperienceEntry } from '../../lib/types';
import EducationForm from '../entry/education/EducationForm.vue';
import ExperienceForm from '../entry/experience/ExperienceForm.vue';
import ProjectForm from '../entry/project/ProjectForm.vue';
const { modalMode, editingEntry, closeFormModal } = useFormModal()
const { addEntry, updateEntry } = useAccount()


async function handleUpdate(category: EntryCategory, entry: Entity) {
    if (entry.id) {
        await updateEntry(category, entry as PersistedEntity)
    } else {
        await addEntry(category, entry as Entity)
    }

    closeFormModal()
}

</script>

<template>
    <div className="flex flex-col">
        <EducationForm v-if="modalMode == 'education'" :entry="editingEntry as EducationEntry"
            @save="(e) => handleUpdate('education', e)" />
        <ExperienceForm v-if="modalMode == 'work'" :entry="editingEntry as WorkExperienceEntry"
            @save="(e) => handleUpdate('work', e)" />
        <ProjectForm v-if="modalMode == 'projects'" :entry="editingEntry as ProjectEntry"
            @save="(e) => handleUpdate('projects', e)" />
    </div>
</template>