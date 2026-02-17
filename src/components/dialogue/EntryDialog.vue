<script setup lang="ts">

import type { Account, Entity, EntryAction, EntryCategory } from '../../types/type'

const props = defineProps<{ entryType: EntryCategory, account: Account, action: EntryAction} >()
const emit = defineEmits<{
    confirmSelection: [],
    switchToCreate: [],
    confirmCreation: [data: Entity]
}>()

</script>

<template>
    <div v-if="action == 'select'" className="flex flex-col justify-between h-fit w-fit gap-8 p-4">
        <div className="grid grid-cols-3 gap-4 w-125" >
            <slot v-if="entryType == 'education'" v-for="entry in account?.educationEntries" v-bind="entry" name="option"></slot>
            <slot v-else-if="entryType == 'experience'" v-for="entry in account?.workExperiences" v-bind="entry" name="option"></slot>
            <slot v-else-if="entryType == 'projects'" v-for="entry in account?.projects" v-bind="entry" name="option"></slot>
        </div>
        <div className="flex flex-row gap-4 float-right ">
            <button @click="emit('switchToCreate')">Create New</button>
            <button @click="emit('confirmSelection')">Submit</button>
        </div>
    </div>
    <slot v-else-if="action == 'create'" name="form"></slot>
</template>