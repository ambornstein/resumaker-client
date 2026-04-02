<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Entity, EntryCategory } from '../lib/types/types';
import EntryDialog from '../components/dialogue/EntryDialog.vue';
import { useResumeBuilder } from '../composables/useResumeBuilder';
import { useEntryModal } from '../composables/useEntryModal';

const emit = defineEmits(['complete'])
const { resume, selectEntries } = useResumeBuilder();
const { modalMode } = useEntryModal();

const selectedIds = ref<number[]>([])

async function handleSelect() {
    await selectEntries(modalMode.value, selectedIds.value)
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
                <div className="entry-chip highlight-checked">
                    <label :for="data.title" className="flex flex-row gap-4">
                        <input :id="data.title" type="checkbox" :value="data.id" v-model="selectedIds" />
                        <div className="inline-block">
                            <p>{{ data.title }}</p>
                        </div>
                    </label>
                </div>
            </template>

            <template #option="data" v-else-if="modalMode == 'education'">
                <div className="entry-chip highlight-checked">
                    <label :for="data.degree" className="flex flex-row gap-4">
                        <input :id="data.degree" type="checkbox" :value="data.id" v-model="selectedIds" />
                        <div className="inline-block">
                            <p>{{ data.degree }}</p>
                            <p>{{ data.school }}</p>
                        </div>
                    </label>
                </div>
            </template>

            <template #option="data" v-else-if="modalMode == 'work'">
                <div className="entry-chip highlight-checked">
                    <label :for="data.title + data.id" className="flex flex-row gap-4">
                        <input :id="data.title + data.id" type="checkbox" :value="data.id" v-model="selectedIds" />
                        <div className="inline-block">
                            <p>{{ data.title }}</p>
                            <p>{{ data.company }}</p>
                        </div>
                    </label>
                </div>
            </template>
        </EntryDialog>
    </Suspense>
</template>
