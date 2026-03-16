<script setup lang="ts">
import type { SkillCategory } from '../types/types';

defineProps<{ skillCategory: SkillCategory }>()

defineEmits(['deleteSelf'])
</script>

<template>
    <div className="space-y-2 my-2 border border-zinc-600 p-2 rounded-lg">
        <div className="flex justify-between">
            <input type="text" placeholder="Category" v-model="skillCategory.categoryName" />
            <input type="image" className="size-8 p-1 border-0" src="/src/assets/close.png"
                @click="$emit('deleteSelf')" />
        </div>
        <div className="flex flex-wrap gap-2">
            <div className="border border-zinc-600 rounded-xl p-2 flex items-center gap-2"
                v-for="(skill, index) in skillCategory.skills">
                <p>{{ skill }}</p>
                <input type="image" className="size-5 p-1 border-0" src="/src/assets/close.png"
                    @click="skillCategory.skills.splice(index, 1)" />
            </div>

            <input className="border-0 bg-transparent" type="text" placeholder="Skill"
                @keydown.enter="e => skillCategory.skills.push(e.target.value)" />
        </div>
    </div>
</template>