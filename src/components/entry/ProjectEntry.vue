<script setup lang="ts">
import type { ProjectData } from '../../types/type';

defineProps<{ data: ProjectData }>()
</script>
<template>
    <div className="entry-panel">
        <p>{{ data.title }}</p>
        <p>{{ data.description }}</p>
    </div>
</template>