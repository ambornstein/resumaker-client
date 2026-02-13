<script setup lang="ts">
import { ref, watch } from 'vue';
import type { JobData } from '../../types/type';
import ExperienceForm from '../form/ExperienceForm.vue';
import { useUser } from '../../composable/useUser';

const props = defineProps<{ workExperience: JobData[] }>()
const emit = defineEmits(['completeSelection'])

const {createExperience, selectExperience, resume} = useUser();

const mode = ref<"pick" | "create">('pick')

const selectedIds = ref<number[]>([])

async function select() {
    selectExperience(selectedIds.value)
    emit("completeSelection")
}

async function create(jobData: JobData) {
    await createExperience(jobData)
    emit("completeSelection")
    mode.value = "pick"
}

watch (resume, (newVal) => {
    if (newVal) selectedIds.value = newVal.workHistory.map(e => e.id!)
})

</script>

<template>
    <div v-if="mode == 'pick'" className="inline-block space-y-2 p-4 h-full">
        <div className="grid grid-cols-3 gap-4 h-full">
            <div className="flex flex-row gap-4 justify-between p-2 w-full bg-stone-800 border border-stone-900" v-for="job in workExperience">
                <div>
                    <p>{{ job.title }}</p>
                    <p>{{ job.company }}</p>
                </div>
                <input type="checkbox" :value="job.id" v-model="selectedIds" />
            </div>
        </div>
        <div className="flex flex-auto gap-4 ">
            <button @click="mode = 'create'">Create New</button>
            <button @click="select">Submit</button>
        </div>
    </div>
    <div v-else-if="mode == 'create'">
        <ExperienceForm @create-experience="create" />
    </div>
</template>