<script setup lang="ts">

defineEmits(['open', 'close'])
</script>

<template>
    <div @click.self="$emit('close')"
        className="fixed w-full h-full flex justify-center bg-zinc-800/80">
        <div className="m-auto max-w-220 min-h-20 bg-neutral-800 rounded-md border-2 border-zinc-400 ">
            <button className="float-right m-4" @click="$emit('close')">X</button>
            <slot>
            </slot>
        </div>
    </div>
</template>