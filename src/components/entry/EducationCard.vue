<script setup lang="ts">
import type { EducationEntry } from '../../lib/types/types';

defineProps<{ data: EducationEntry }>()
</script>
<template>
    <div className="panel rounded-md">
        <p>{{ data.degree }}</p>
        <p>{{ data.schoolName }}</p>
    </div>
</template>