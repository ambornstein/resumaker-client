<script setup lang="ts">
import ResumePanel from '../components/sections/ResumePanel.vue';

</script>

<template>
  <div className="grid grid-cols-1 md:grid-cols-[auto_32%] gap-10 w-full m-auto mt-4">
    <iframe id="resume-page" frameborder="0" className="max-w-full max-h-[876px] aspect-[210/297] m-auto lg:m-0" />
    <Suspense>
      <ResumePanel />
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>