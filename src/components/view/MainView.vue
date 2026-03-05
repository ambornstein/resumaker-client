<script setup lang="ts">
import Modal from '../Modal.vue';
import { useUser } from '../../composable/useUser';
import EntryView from './EntryView.vue';
import { useEntryModal } from '../../composable/useEntryModal';

const { fetchUserData } = useUser();

const { showModal, closeModal } = useEntryModal()

fetchUserData()
</script>

<template>
  <Modal v-show="showModal" @close="closeModal">
    <EntryView/>
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
