<script setup lang="ts">

import type { Entity } from '../../types/type'

const props = defineProps<{ entryType: string, entries: Entity[], action: "create" | "select"} >()
const emit = defineEmits<{
    confirmSelection: [],
    switchToCreate: [],
    confirmCreation: [data: Entity]
}>()

</script>

<template>
    <div v-if="action == 'select'" className="inline-block space-y-2 p-4 h-full">
        <div className="grid grid-cols-3 gap-4 h-full" >
            <slot v-for="entry in entries" v-bind="entry" name="option"></slot>
        </div>
        <div className="flex flex-auto gap-4 ">
            <button @click="emit('switchToCreate')">Create New</button>
            <button @click="emit('confirmSelection')">Submit</button>
        </div>
    </div>
    <slot v-else-if="action == 'create'" name="form" @create-entry="(data: Entity) => emit('confirmCreation', data)" ></slot>
</template>