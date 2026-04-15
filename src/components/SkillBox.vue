<script setup lang="ts">
import { ref } from 'vue';
import type { SkillCategory } from '../lib/types';
import CloseIcon from './icons/CloseIcon.vue';

const props = defineProps<{ skillCategory: SkillCategory }>()

defineEmits(['deleteSelf'])

const skillValue = ref<string>('')

function pushSkill(event: Event) {
    if (skillValue.value) {
        props.skillCategory.skills.push(skillValue.value)
        skillValue.value = ''
    }
}
</script>

<template>
    <div className="space-y-2 panel rounded-lg">
        <div className="flex justify-between">
            <input type="text" placeholder="Category" className="input-field" v-model="skillCategory.categoryName" />
            <CloseIcon @click="$emit('deleteSelf')" />
        </div>
        <div className="flex flex-wrap gap-2">
            <div className="border-light border rounded-lg px-2 py-1 flex items-center gap-2"
                v-for="(skill, index) in skillCategory.skills">
                <span>{{ skill }}</span>
                <CloseIcon className="icon size-5" @click="skillCategory.skills.splice(index, 1)" />
            </div>

            <input className="input-field" type="text" placeholder="Skill" v-model="skillValue"
                @keydown.enter="pushSkill" @focusout="pushSkill" />
        </div>
    </div>
</template>