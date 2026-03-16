<script setup lang="ts">
import type { ProjectEntry } from '../../types/types';

defineProps<{ data: ProjectEntry }>()
</script>
<template>
    <div className="entry-panel">
        <p>{{ data.title }}</p>
        <p>{{ data.description }}</p>
        <details name="Bullet Points">
            <ul className="list-disc list-inside">
                <li v-for="value in data.bulletPoints"> {{ value }}</li>
            </ul>
        </details>
    </div>
</template>