<script setup lang="ts">
import ResumePanel from '../components/sections/ResumePanel.vue';


</script>

<template>
  <div className="grid grid-cols-[14%_auto_24%] gap-10 w-full m-auto mt-4">
    <div className="grid grid-cols-[min-content_1fr] gap-x-4 h-fit">
      <h2 className="col-span-full mb-4">Profile Info</h2>
      <input type="checkbox" id="email"><label for="email">Include Email</label>
      <input type="checkbox" id="site"><label for="site">Include Website</label>
      <input type="checkbox" id="phone"><label for="phone">Include Phone Number</label>
      <input type="checkbox" id="linkedIn"><label for="linkedIn">Include
        LinkedIn</label>
      <input type="checkbox" id="github"><label for="github">Include GitHub</label>
    </div>
    <iframe id="resume-page" frameborder="0" className="w-full h-[876px]" />
    <Suspense>
      <ResumePanel />
    </Suspense>
  </div>
</template>