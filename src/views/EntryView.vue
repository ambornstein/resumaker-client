<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Entity, EntryCategory } from '../lib/types/types';
import EntryDialog from '../components/dialogue/EntryDialog.vue';
import { useResumeBuilder } from '../composables/useResumeBuilder';
import { useEntryModal } from '../composables/useEntryModal';
import { useLoading } from '../composables/useLoading';

const emit = defineEmits(['complete'])
const { resume, selectEntries } = useResumeBuilder();
const { modalMode } = useEntryModal();
const { setLoading } = useLoading();

const selectedIds = ref<number[]>([])

async function handleSelect() {
    setLoading(true)
    await selectEntries(modalMode.value, selectedIds.value)
    setLoading(false)

    emit('complete')
    updateEntries(modalMode.value)
}

function updateEntries(modalValue: EntryCategory) {
    let entryArray: Entity[]

    switch (modalValue) {
        case 'work':
            entryArray = resume.value?.workHistory ?? [];
            break;
        case 'education':
            entryArray = resume.value?.educationHistory ?? [];
            break;
        case 'projects':
            entryArray = resume.value?.projects ?? [];
            break;
    }
    selectedIds.value = entryArray.map(w => w.id!);
}

watch(() => modalMode.value, updateEntries)

</script>

<template>
    <Suspense>
        <EntryDialog @confirmSelection="handleSelect">
            <template #option="data" v-if="modalMode == 'projects'">
                <label :for="data.title" className="entry-chip highlight-checked">
                    <input :id="data.title" type="checkbox" :value="data.id" v-model="selectedIds" />
                    
                        <span>{{ data.title }}</span>

                </label>
            </template>

            <template #option="data" v-else-if="modalMode == 'education'">
                <label :for="data.degree" className="entry-chip highlight-checked">
                    <input :id="data.degree" type="checkbox" :value="data.id" v-model="selectedIds" />
                    <div className="inline-block">
                        <p>{{ data.degree }}</p>
                        <p>{{ data.schoolName }}</p>
                    </div>
                </label>
            </template>

            <template #option="data" v-else-if="modalMode == 'work'">
                <label :for="data.title + data.id" className="entry-chip highlight-checked">
                    <input :id="data.title + data.id" type="checkbox" :value="data.id" v-model="selectedIds" />
                    <div className="inline-block">
                        <p>{{ data.title }}</p>
                        <p>{{ data.company }}</p>
                    </div>
                </label>
            </template>
        </EntryDialog>
    </Suspense>
</template>
