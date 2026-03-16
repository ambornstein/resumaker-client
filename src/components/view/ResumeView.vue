<script setup lang="ts">
import ResumePanel from '../ResumePanel.vue';

</script>

<template>
  <RouterLink to="/profile">To Profile</RouterLink>

  <div className="flex flex-row gap-10 w-full m-auto p-[2em]">
    <iframe id="resume-page" frameborder="0" className="w-[60%] h-[876px]">
    </iframe>
    <ResumePanel />
  </div>
</template>