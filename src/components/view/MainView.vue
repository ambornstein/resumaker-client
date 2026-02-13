<script setup lang="ts">
import Modal from '../Modal.vue';
import ExperienceDialog from '../dialogue/ExperienceDialog.vue';
import EducationDialog from '../dialogue/EducationDialog.vue';
import ProjectDialog from '../dialogue/ProjectDialog.vue';
import { provide, ref, useTemplateRef } from 'vue';
import { useUser } from '../../composable/useUser';

const { user, fetchUserData } = useUser();

const modalMode = ref<'experience' | 'education' | 'project'>('experience')
const modal = useTemplateRef('modal')

const openModal = (mode: 'experience' | 'education' | 'project') => {
  modalMode.value = mode
  modal.value?.openModal()
}

provide('openModal', openModal)

function confirmUpdate() {
  modal.value?.closeModal()
  fetchUserData()
}

fetchUserData()
</script>

<template>
  <Modal ref="modal">
    <Suspense>
      <ExperienceDialog :workExperience="user?.workExperiences" @completeSelection="confirmUpdate" v-if="modalMode == 'experience'" />
    </Suspense>
    <Suspense>
      <EducationDialog :education="user?.educationEntries" @completeSelection="confirmUpdate"
        v-if="modalMode == 'education'" />
    </Suspense>
    <Suspense>
      <ProjectDialog :projects="user?.projects" @completeSelection="confirmUpdate" v-if="modalMode == 'project'"/>
    </Suspense>
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
