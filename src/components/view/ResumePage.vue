<script setup lang="ts">
import { inject } from 'vue';
import type { Profile } from '../../types/type';

const name = inject<Profile>('name')
</script>

<template>
    <div className="sticky top-4 -z-1 w-[595px] h-[842px] p-4 bg-neutral-100 text-stone-900">
      {{ name?.name }}
    </div>
</template>