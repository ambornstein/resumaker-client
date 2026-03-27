<script setup lang="ts">
import type { EducationEntry } from '../../lib/types/types';

defineProps<{ data: EducationEntry }>()
</script>
<template>
    <div className="entry-panel">
        <p>{{ data.degree }}</p>
        <p>{{ data.schoolName }}</p>
    </div>
</template>