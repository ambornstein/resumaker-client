<script setup lang="ts">
import type { EducationData} from '../../types/type';

defineProps<{ data: EducationData }>()
</script>
<template>
    <p>{{ data.degree }}</p>
    <p>{{ data.school }}</p>
</template>