<script setup lang="ts">
import Modal from './components/Modal.vue';
import ExperienceDialog from './components/dialogue/ExperienceDialog.vue';
import EducationDialog from './components/dialogue/EducationDialog.vue';
import ProjectDialog from './components/dialogue/ProjectDialog.vue';
import { provide, ref, useTemplateRef, watch } from 'vue';

const modalMode = ref<'experience' | 'education' | 'project'>('experience')
const modal = useTemplateRef('modal')

const openModal = (mode: 'experience' | 'education' | 'project') => {
  modalMode.value = mode
  modal.value?.openModal()
}

provide('openModal', openModal)

</script>

<template>
  <Modal ref="modal">
    <ExperienceDialog @completeSelection="modal?.closeModal" v-if="modalMode == 'experience'" />
    <EducationDialog @completeSelection="modal?.closeModal" v-else-if="modalMode == 'education'" />
    <ProjectDialog @completeSelection="modal?.closeModal" v-else-if="modalMode == 'project'" />
  </Modal>
  <div className="container m-auto pt-[2em]">
    <RouterView />
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
</style>
