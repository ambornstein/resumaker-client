<script setup lang="ts">
import type { JobData } from '../../types/type';

defineProps<{ data: JobData }>()
</script>
<template>
    <div className="entry-panel">
        <p>{{ data.title }} at {{ data.company }}</p>
        <p>{{ data.startDate }} to {{ data.endDate ?? "Present" }}</p>
        <details name="Bullet Points">
            <ul className="list-disc list-inside">
                <li v-for="value in data.bulletPoints"> {{ value }}</li>
            </ul>
        </details>
    </div>
</template>