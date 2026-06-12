<script setup lang="ts">
import { useResumeBuilder } from '../../../composables/useResumeBuilder';
import type { EducationEntry } from '../../../lib/types';


const { selectedEducationIds } = useResumeBuilder();
defineProps<{ data: EducationEntry }>()
</script>
<template>
    <label :for="data.degree" className="entry-chip highlight-checked">
        <input :id="data.degree" type="checkbox" :value="data.id"  v-model="selectedEducationIds"/>
        <div className="inline-block">
            <p>{{ data.degree }}</p>
            <p>{{ data.schoolName }}</p>
        </div>
    </label>
</template>