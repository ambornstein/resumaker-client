<script setup lang="ts">

const props = defineProps<{labelText: string, for: string}>()
</script>

<template>
    <label :for className="border-light w-100 pt-1 px-3 text-center peer-checked:border-highlight peer-checked:bg-highlight/40 text-xl">{{ props.labelText }}</label>
</template>