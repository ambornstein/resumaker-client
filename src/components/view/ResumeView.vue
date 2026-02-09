<script setup lang="ts">
import { inject, provide, reactive, ref, useTemplateRef } from 'vue';
import type { EducationData, JobData, Profile, ProjectData } from '../../types/type';

import ResumePage from './ResumePage.vue';
import ResumePanel from '../ResumePanel.vue';

const name: Profile = reactive({ firstName: "Andrei", lastName: "Bornstein" })

provide("name", name)

const education: EducationData[] = reactive([])
const experience: JobData[] = reactive([])
const projects: ProjectData[] = reactive([])

provide('education', education)
provide('experience', experience)
provide('projects', projects)

</script>

<template>
  <RouterLink to="/profile">To Profile</RouterLink>
  
  <div className="flex flex-row gap-10 w-fit m-auto p-[2em]">
    <ResumePage />
    <ResumePanel />
  </div>
</template>