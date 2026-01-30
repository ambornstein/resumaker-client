<script setup lang="ts">
import { provide, reactive, ref, useTemplateRef } from 'vue';
import type { EducationData, JobData, Profile, ProjectData } from './types/type';
import Modal from './components/Modal.vue';
import ResumePanel from './components/ResumePanel.vue';
import ExperienceDialog from './components/dialogue/ExperienceDialog.vue';
import EducationDialog from './components/dialogue/EducationDialog.vue';
import ProjectDialog from './components/dialogue/ProjectDialog.vue';

const name: Profile = reactive({ name: "Andrei" })
const modalMode = ref<'experience' | 'education' | 'project'>('experience')
provide("name", name)

const education: EducationData[] = reactive([])
const experience: JobData[] = reactive([])
const projects: ProjectData[] = reactive([])

provide('education', education)
provide('experience', experience)
provide('projects', projects)

const modal = useTemplateRef('modal')

function openModal(category: 'education' | 'experience' | 'project') {
  modalMode.value = category
  modal.value?.openModal()
}

</script>

<template>
  <Modal ref="modal">
    <ExperienceDialog @completeSelection="modal?.closeModal" v-if="modalMode == 'experience'" />
    <EducationDialog @completeSelection="modal?.closeModal" v-else-if="modalMode == 'education'" />
    <ProjectDialog @completeSelection="modal?.closeModal" v-else-if="modalMode == 'project'" />
  </Modal>
  <div className="flex flex-row gap-10 h-full">
    <div className="w-[595px] h-[842px] p-4 bg-neutral-100 text-stone-900">
      {{ name.name }}
    </div>
    <ResumePanel @addEntry="(e) => openModal(e)" />
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
