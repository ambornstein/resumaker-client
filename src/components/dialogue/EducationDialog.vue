<script setup lang="ts">
import { ref, watch } from 'vue';
import type { EducationData } from '../../types/type';
import EducationForm from '../form/EducationForm.vue';
import { useUser } from '../../composable/useUser';

const props = defineProps<{ education: EducationData[] }>()
const emit = defineEmits(['completeSelection'])

const {selectEducation, createEducation, resume} = useUser();

const mode = ref<"pick" | "create">('pick')

const selectedIds = ref<number[]>([])

async function select() {
    await selectEducation(selectedIds.value)
    emit("completeSelection")
}

async function create(edData: EducationData) {
    await createEducation(edData);
    emit("completeSelection")
    mode.value = "pick"
}

watch (resume, (newVal) => {
    
    if (newVal) {
        console.log(newVal.educationHistory)
        selectedIds.value = newVal.educationHistory.map(e => e.id!)
    } 
})

</script>

<template>
    <div v-if="mode == 'pick'" className="inline-block space-y-2 p-4 h-full">
        <div className="grid grid-cols-3 gap-4 h-full">
            <div className="flex flex-row gap-4 justify-between p-2 bg-stone-800 border border-stone-900"
                v-for="degree in education">
                <div>
                    <p>{{ degree.degree }}</p>
                    <p>{{ degree.school }}</p>
                </div>
                <input type="checkbox" :value="degree.id" v-model="selectedIds" />
            </div>
        </div>
        <div className="flex flex-auto gap-4 ">
            <button @click="mode = 'create'">Create New</button>
            <button @click="select">Submit</button>
        </div>
    </div>
    <div v-else-if="mode == 'create'">
        <EducationForm @create-education="create" />
    </div>
</template>