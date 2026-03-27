<script setup lang="ts">

import { useEntryModal } from '../../composables/useEntryModal';
import { useAccount } from '../../composables/useAccount';
import { useRouter } from 'vue-router';

const { account } = useAccount();
const emit = defineEmits<{ confirmSelection: [] }>()

const { modalMode, closeModal } = useEntryModal()
const router = useRouter();

function navigate() {
    console.log(modalMode.value)
    router.push({ path: '/profile', query: { section: String(modalMode.value) } })
    closeModal()
}
</script>

<template>
    <div className="flex flex-col justify-between h-fit w-fit gap-8 p-4">
        <div className="grid grid-cols-3 gap-4 w-125">
            <slot v-if="modalMode == 'education'" v-for="entry in account?.educationEntries" v-bind="entry"
                name="option"></slot>
            <slot v-else-if="modalMode == 'work'" v-for="entry in account?.workExperiences" v-bind="entry"
                name="option"></slot>
            <slot v-else-if="modalMode == 'projects'" v-for="entry in account?.projects" v-bind="entry" name="option">
            </slot>
        </div>
        <div className="flex flex-row gap-4 float-right ">
            <button @click="navigate">Create New</button>
            <button @click="emit('confirmSelection')">Submit</button>
        </div>
    </div>
</template>