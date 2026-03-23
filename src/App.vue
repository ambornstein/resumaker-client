<script setup lang="ts">
import Modal from './components/Modal.vue';
import { useUser } from './composables/useUser';
import EntryView from './views/EntryView.vue';
import { useEntryModal } from './composables/useEntryModal';

const { fetchUserData } = useUser();

const { showModal, closeModal } = useEntryModal()

fetchUserData()

</script>

<template>
  <Modal v-show="showModal" @close="closeModal">
    <EntryView />
  </Modal>
  <div className="w-full">
    <nav className="bg-neutral-900 h-16">
      <div className="container m-auto flex justify-between">
        <h1>ResuMaker</h1>
        <div className="flex gap-2">
          <RouterLink to="/sign-in" className="w-fit highlight">
            <button>Log In</button>
          </RouterLink>
          <RouterLink to="/sign-in" className="w-fit">
            <button>Create Account</button>
          </RouterLink>
        </div>
      </div>
    </nav>
    <div className="container m-auto pt-[2em]">
      <RouterView />
    </div>
  </div>
</template>