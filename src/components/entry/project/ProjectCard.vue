<script setup lang="ts">
import { useResumeBuilder } from '../../../composables/useResumeBuilder';
import type { ProjectEntry } from '../../../lib/types';

const { selectedProjectIds } = useResumeBuilder();
defineProps<{ data: ProjectEntry }>()
</script>
<template>
    <label :for="data.title" className="entry-chip highlight-checked">
        <input :id="data.title" type="checkbox" :value="data.id" v-model="selectedProjectIds" />
        <span>{{ data.title }}</span>
    </label>
</template>