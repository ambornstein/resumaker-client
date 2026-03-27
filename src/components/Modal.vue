<script setup lang="ts">

defineEmits(['open', 'close'])
</script>

<template>
    <div @click.self="$emit('close')"
        className="fixed w-full h-full flex justify-center bg-zinc-800/80">
        <div className="m-auto max-w-220 min-h-20 bg-neutral-800 border-light ">
            <input type="image" src="/src/assets/close.png" className="float-right size-8 p-1" @click="$emit('close')"/>
            <slot>
            </slot>
        </div>
    </div>
</template>