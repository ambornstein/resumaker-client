<script setup lang="ts">
import type { ProjectData } from '../../types/type';

defineProps<{ data: ProjectData }>()
</script>
<template>
    <p>{{ data.title }}</p>
    <p>{{ data.description }}</p>
</template>