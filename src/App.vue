<script setup lang="ts">
import Modal from './components/overlay/Modal.vue';
import EntryView from './views/EntryView.vue';
import { useEntryModal } from './composables/useEntryModal';
import AuthControls from './components/sections/AuthControls.vue';
import Snackbar from './components/overlay/Snackbar.vue';

const { showModal, closeModal } = useEntryModal()

</script>

<template>
  <Modal v-show="showModal" @close="closeModal">
    <EntryView />
  </Modal>
  <Snackbar />
  <div className="w-full">
    <nav className="flex flex-col m-auto h-16 bg-neutral-800">
      <div class="container flex justify-between items-end m-auto">
        <RouterLink to="/">
          <h1 className="text-foreground">Résu<span className="text-rose-400">méker</span></h1>
        </RouterLink>
        <AuthControls />
      </div>
    </nav>
    <div className="container m-auto pt-[2em]">
      <RouterView />
    </div>
  </div>
</template>