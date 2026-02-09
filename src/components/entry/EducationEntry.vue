<script setup lang="ts">
import type { EducationData } from '../../types/type';

defineProps<{ data: EducationData }>()
</script>
<template>
    <div className="entry-panel">
        <p>{{ data.degree }}</p>
        <p>{{ data.school }}</p>
    </div>
</template>