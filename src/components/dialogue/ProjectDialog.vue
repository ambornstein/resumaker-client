<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ProjectData } from '../../types/type'
import { useUser } from '../../composable/useUser';
import ProjectForm from '../form/ProjectForm.vue';

const props = defineProps<{ projects: ProjectData[]} >()
const emit = defineEmits(['completeSelection'])

const mode = ref<"pick" | "create">('pick')
const { selectProjects, createProject, resume } = useUser();

const selectedIds = ref<number[]>([])

async function select() {
    await selectProjects(selectedIds.value)
    emit("completeSelection")
}

async function create(projectData: ProjectData) {
    await createProject(projectData)
    emit("completeSelection")
    mode.value = "pick"
}

watch (resume, (newVal) => {
    if (newVal) selectedIds.value = newVal.projects.map(e => e.id!)
})

</script>

<template>
    <div v-if="mode == 'pick'" className="inline-block space-y-2 p-4 h-full">
        <div className="grid grid-cols-3 gap-4 h-full">
            <div className="flex flex-row gap-4 justify-between p-2 bg-stone-800 border border-stone-900" v-for="project in projects">
                <p>{{ project.title }}</p>
                <p>{{ project.description }}</p>
                <input type="checkbox" :value="project.id" v-model="selectedIds" />
            </div>
        </div>
        <div className="flex flex-auto gap-4 ">
            <button @click="mode = 'create'">Create New</button>
            <button @click="select">Submit</button>
        </div>
    </div>
    <ProjectForm v-else-if="mode == 'create'"  @create-project="create"/>
</template>