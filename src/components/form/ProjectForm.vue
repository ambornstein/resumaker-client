<script setup lang="ts">
import { useEntryModal } from '../../composables/useEntryModal';
import type { ProjectEntry } from '../../lib/types/types';

const  { editingProject } = useEntryModal();
defineEmits<{createProject: [ed: ProjectEntry]}>()

</script>

<template>
    <form @submit.prevent="$emit('createProject', editingProject)" className="rounded-lg p-4">
        <div className="grid grid-cols-2 gap-2">
            <label for="title">Title</label>
            <input id="title" type='text' v-model="editingProject.title">
            <label for="description">Description</label>
            <textarea id="description" type='text' v-model="editingProject.description"></textarea>
        </div>
        <div className="bullet-container">
            <p>Bullet Points</p>
            <input v-for="(value, index) in editingProject.bulletPoints" v-model="editingProject.bulletPoints[index]" type="text"/>
            <button @click.prevent="editingProject.bulletPoints.push('Used x to accomplish y by doing z')">Add Bullet</button>
        </div>
        <input type="submit"/>
    </form>
</template>