<script setup lang="ts">
import CloseIcon from '../icons/CloseIcon.vue';

defineEmits(['open', 'close'])
</script>

<template>
    <div @click.self="$emit('close')" className="fixed w-full h-full flex justify-center bg-background/60">
        <div className="m-auto max-w-220 min-h-20 bg-panel border-light p-4">
            <CloseIcon @click="$emit('close')" class="float-right size-8" />
            <slot>
            </slot>
        </div>
    </div>
</template>