<script setup lang="ts">
import { useResumeBuilder } from '../../../composables/useResumeBuilder';
import type { WorkExperienceEntry } from '../../../lib/types';

const { selectedWorkIds } = useResumeBuilder();
defineProps<{ data: WorkExperienceEntry }>()
</script>
<template>
    <label :for="data.title + data.id" className="entry-chip highlight-checked">
        <input :id="data.title + data.id" type="checkbox" :value="data.id" v-model="selectedWorkIds" />
        <div className="inline-block">
            <p>{{ data.title }}</p>
            <p>{{ data.company }}</p>
        </div>
    </label>
</template>