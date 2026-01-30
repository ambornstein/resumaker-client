<script setup lang="ts">
import { inject, ref } from 'vue';
import type { EducationData } from '../../types/type';
import EducationForm from '../form/EducationForm.vue';

const education = inject<EducationData[]>('education')
const educationCatalog = ref<EducationData[]>([])

const mode = ref<"pick" | "create">('pick')

const emit = defineEmits(['completeSelection'])

function recieveData(edData: EducationData) {
    mode.value = "pick"
    educationCatalog.value.push(edData);
    select(edData);
}

function select(edData: EducationData) {
    education!.push(edData);
    emit('completeSelection')
}

</script>

<template>
    <div v-if="mode == 'pick'" className="grid grid-cols-3 gap-4 p-4">
        <div @click="select(degree)" className="flex flex-col bg-stone-800 p-1 border border-stone-900"
            v-for="degree in educationCatalog">
            <p>{{ degree.degree }}</p>
            <p>{{ degree.school }}</p>
        </div>
        <button @click="mode = 'create'">Create New</button>
    </div>
    <div v-else-if="mode == 'create'">
        <EducationForm @create-education="recieveData" />
    </div>
</template>