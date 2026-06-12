<script setup lang="ts">
import { ref } from 'vue';

const show = ref(true)

</script>

<template>
    <div className="bg-panel rounded-lg ring ring-contrast">
        <div @click.self="show = !show" className="flex flex-row gap-4 items-center p-4 ring ring-contrast rounded-lg hover:bg-highlight">
            <slot name="header" />
        </div>
        <div v-show="show" className="flex flex-col gap-2 p-2">
            <slot/>
        </div>
    </div>
</template>