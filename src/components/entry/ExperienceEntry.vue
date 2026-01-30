<script setup lang="ts">
import type { JobData } from '../../types/type';

defineProps<{data: JobData}>()
</script>
<template>
    <p>{{ data.title }}</p>
</template>