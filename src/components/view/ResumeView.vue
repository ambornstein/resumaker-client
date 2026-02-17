<script setup lang="ts">
import ResumePage from '../pages/ResumePage.vue';
import ResumePanel from '../ResumePanel.vue';

</script>

<template>
  <RouterLink to="/profile">To Profile</RouterLink>

  <div className="flex flex-row gap-10 w-fit m-auto p-[2em]">
    <Suspense>
      <ResumePage />
    </Suspense>
    <ResumePanel />
  </div>
</template>