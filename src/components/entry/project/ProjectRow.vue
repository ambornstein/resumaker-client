<script setup lang="ts">
import type { ProjectEntry } from '../../../lib/types';
import DeleteIcon from '../../icons/DeleteIcon.vue';
import EditIcon from '../../icons/EditIcon.vue';

const props = defineProps<{ entry: ProjectEntry }>();

const emit = defineEmits<{
    (e: 'edit', entry: ProjectEntry): void
    (e: 'delete'): void
}>();

</script>

<template>
    <div className="w-full flex flex-row items-center justify-between gap-20 border-contrast border p-4">
        <div>
            <h3>{{ entry.title }}</h3>
            <span>{{ entry.description }}</span>
        </div>
        <span>2000 - Present</span>
        <div className="w-fit ml-auto flex gap-4">
            <EditIcon @click="$emit('edit', entry)" />
            <DeleteIcon @click="$emit('delete')" />
        </div>
    </div>
</template>