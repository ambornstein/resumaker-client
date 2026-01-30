<script setup lang="ts">
import { ref } from 'vue';
import type { ProjectData } from '../../types/type';

const project = ref<ProjectData>({title: "Bean Sorter", description:"", bulletPoints:[]})
const current = ref(false)

defineEmits<{createProject: [ed: ProjectData]}>()
</script>

<template>
    <form @submit.prevent="$emit('createProject', project)" className="rounded-lg p-4 bg bg-stone-900">
        <div className="grid grid-cols-2 gap-2">
            <label for="title">Title</label>
            <input id="title" type='text' v-model="project.title">
            <label for="description">Description</label>
            <input id="description" type='text' v-model="project.description">
        </div>
        <div className="flex flex-col gap-4">
            <p>Bullet Points</p>
            <input v-for="(value, index) in project.bulletPoints" v-model="project.bulletPoints[index]" type="text"/>
            <button @click.prevent="project.bulletPoints.push('Used x to accomplish y by doing z')">Add Bullet</button>
        </div>
        <input type="submit"/>
    </form>
</template>