<script setup lang="ts">
import Modal from './components/Modal.vue';
import EntryView from './views/EntryView.vue';
import { useEntryModal } from './composables/useEntryModal';
import AuthControls from './components/AuthControls.vue';

const { showModal, closeModal } = useEntryModal()
</script>

<template>
  <Modal v-show="showModal" @close="closeModal">
    <EntryView />
  </Modal>
  <div className="w-full">
    <nav className="flex flex-col m-auto h-16 bg-neutral-900">
      <div class="container flex justify-between m-auto">
        <h1>ResuMaker</h1>
        <AuthControls />
      </div>
    </nav>
    <div className="container m-auto pt-[2em]">
      <RouterView />
    </div>
  </div>
</template>