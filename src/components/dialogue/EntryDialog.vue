<script setup lang="ts">

import { useEntryModal } from '../../composable/useEntryModal';
import { useUser } from '../../composable/useUser';
import type { Entity } from '../../types/types'

const { user } = useUser();
const emit = defineEmits<{
    confirmSelection: [],
    switchToCreate: [],
    confirmCreation: [data: Entity]
}>()

const {action, modalMode} = useEntryModal()

</script>

<template>
    <div v-if="action == 'select'" className="flex flex-col justify-between h-fit w-fit gap-8 p-4">
        <div className="grid grid-cols-3 gap-4 w-125" >
            <slot v-if="modalMode == 'education'" v-for="entry in user?.educationEntries" v-bind="entry" name="option"></slot>
            <slot v-else-if="modalMode == 'experience'" v-for="entry in user?.workExperiences" v-bind="entry" name="option"></slot>
            <slot v-else-if="modalMode == 'projects'" v-for="entry in user?.projects" v-bind="entry" name="option"></slot>
        </div>
        <div className="flex flex-row gap-4 float-right ">
            <button @click="emit('switchToCreate')">Create New</button>
            <button @click="emit('confirmSelection')">Submit</button>
        </div>
    </div>
    <slot v-else-if="action == 'create'" name="form"></slot>
</template>