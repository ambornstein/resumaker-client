<script setup lang="ts">
import ResumePanel from '../components/sections/ResumePanel.vue';
import { usePDFBuilder } from '../composables/usePDFBuilder';

const { includeFlags } = usePDFBuilder();
</script>

<template>
  <div className="grid grid-cols-[14%_auto_24%] gap-10 w-full m-auto mt-4">
    <div className="grid grid-cols-[min-content_1fr] gap-x-4 h-fit">
      <h2 className="col-span-full mb-4">Profile Info</h2>
      <input type="checkbox" id="experience" v-model="includeFlags.experience"><label for="experience">Include
        Experience</label>
      <input type="checkbox" id="projects" v-model="includeFlags.projects"><label for="projects">Include
        Projects</label>
      <input type="checkbox" id="skills" v-model="includeFlags.skills"><label for="skills">Include
        Skills</label>
      <input type="checkbox" id="location" v-model="includeFlags.location"><label for="location">Include
        Location</label>
      <input type="checkbox" id="email" v-model="includeFlags.email"><label for="email">Include Email</label>
      <input type="checkbox" id="site" v-model="includeFlags.website"><label for="site">Include Website</label>
      <input type="checkbox" id="phone" v-model="includeFlags.phone"><label for="phone">Include Phone Number</label>
      <input type="checkbox" id="linkedIn" v-model="includeFlags.linkedIn"><label for="linkedIn">Include
        LinkedIn</label>
      <input type="checkbox" id="github" v-model="includeFlags.github"><label for="github">Include GitHub</label>

    </div>
    <iframe id="resume-page" frameborder="0" className="w-full h-[876px]" />
    <Suspense>
      <ResumePanel />
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>