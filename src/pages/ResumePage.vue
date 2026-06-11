<script setup lang="ts">
import ResumePanel from '../components/sections/ResumePanel.vue';

</script>

<template>
  <div className="grid grid-cols-[auto_32%] gap-10 w-full m-auto mt-4">
    <iframe id="resume-page" frameborder="0" className="w-full h-[876px]" />
    <Suspense>
      <ResumePanel />
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>