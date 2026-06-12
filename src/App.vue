<script setup lang="ts">
import Modal from './components/overlay/Modal.vue';
import AuthControls from './components/sections/AuthControls.vue';
import Snackbar from './components/overlay/Snackbar.vue';
import Loading from './components/overlay/Loading.vue';
import { useLoading } from './composables/useLoading';
import { useFormModal } from './composables/useFormModal';
import EntryForm from './components/dialogue/EntryForm.vue';

const { showFormModal, closeFormModal } = useFormModal()
const { loading } = useLoading();

</script>

<template>
  <title>Resumaker</title>
  <Loading v-show="loading" />
  <Modal v-show="showFormModal" @close="closeFormModal">
    <EntryForm />
  </Modal>
  <Snackbar />
  <div className="w-full">
    <nav className="flex flex-col m-auto w-full h-fit bg-panel py-4">
      <div class="container m-auto px-0 md:px-8 flex justify-between items-end">
        <RouterLink to="/">
          <h1 className="text-foreground">Résu<span className="text-rose-400">maker</span></h1>
        </RouterLink>
        <AuthControls />
      </div>
    </nav>
    <div className="container m-auto px-0 md:px-8 py-[2em] ">
      <RouterView />
    </div>
  </div>
</template>