<script setup lang="ts">
import { inject, ref } from 'vue'
import type { JobData, ProjectData } from '../../types/type'
import ProjectForm from '../form/ProjectForm.vue'

const projects = inject<ProjectData[]>('projects')
const projectCatalog = ref<ProjectData[]>([])

const mode = ref<"pick" | "create">('pick')

const emit = defineEmits(['completeSelection'])

function recieveData(projectData: ProjectData) {
    mode.value = "pick"
    projectCatalog.value.push(projectData);
    select(projectData);
}

function select(projectData: ProjectData) {
    projects!.push(projectData);
    emit('completeSelection')
}

</script>

<template>
    <div v-if="mode == 'pick'" className="grid grid-cols-3 gap-4 p-4">
        <div @click="select(project)" className="flex flex-col bg-stone-800 p-1 border border-stone-900"
            v-for="project in projectCatalog">
            <p>{{ project.title }}</p>
            <p>{{ project.description }}</p>
        </div>
        <button @click="mode = 'create'">Create New</button>
    </div>
    <div v-else-if="mode == 'create'">
        <ProjectForm @create-project="recieveData" />
    </div>
</template>