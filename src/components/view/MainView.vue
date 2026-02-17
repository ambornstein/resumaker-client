<script setup lang="ts">
import Modal from '../Modal.vue';
import { provide, ref, useTemplateRef } from 'vue';
import { useUser } from '../../composable/useUser';
import EntryView from './EntryView.vue';
import type { EntryCategory } from '../../types/type';

const { fetchUserData } = useUser();

const modalMode = ref<EntryCategory>('experience')
const modal = useTemplateRef('modal')
const entryView = useTemplateRef('entryView')

const openModal = (mode: EntryCategory) => {
  modalMode.value = mode
  modal.value?.openModal()
}

provide('openModal', openModal)

function confirmUpdate() {
  modal.value?.closeModal()
  fetchUserData()
  resetEntryView()
}

function resetEntryView() {
  entryView.value?.resetActionMode()
}

fetchUserData()
</script>

<template>
  <Modal ref="modal" @close="resetEntryView">
    <EntryView ref="entryView" :modalMode @complete="confirmUpdate"/>
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
