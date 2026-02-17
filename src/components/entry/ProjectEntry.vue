<script setup lang="ts">
import type { ProjectData } from '../../types/type';

defineProps<{ data: ProjectData }>()
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