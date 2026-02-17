<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref(false)

function openModal() {
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
}

defineExpose({openModal, closeModal})

defineEmits(['open', 'close'])
</script>

<template>
    <div v-show="showModal" @click.self="closeModal"
        className="fixed w-full h-full flex justify-center bg-zinc-800/80">
        <div className="m-auto max-w-220 min-h-20 bg-neutral-800 rounded-md border-2 border-zinc-400 ">
            <button className="float-right m-4" @click="closeModal">X</button>
            <slot>
            </slot>
        </div>
    </div>
</template>