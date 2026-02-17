<script setup lang="ts">

import { useResumeBuilder } from '../../composable/useResumeBuilder';
import { useUser } from '../../composable/useUser';

const { user } = useUser();
const { resume } = useResumeBuilder();

function convertDate(stringValue: string) {
  return new Date(stringValue).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })
}

</script>

<template>
  <div id="resume-page" className="font-[Times_New_Roman] top-4 w-[595px] h-[842px] px-2 pt-2 bg-neutral-100 text-stone-900">
    <h2 className="text-center">{{ user?.firstName }} {{ user?.lastName }}</h2>

    <section className="mb-4">
      <h3 className="w-full border-b border-neutral-950">Education</h3>
      <div v-for="ed in resume?.educationHistory">
        <div className="w-full flex flex-row justify-between">
          <h4>{{ ed.school }} — {{ ed.degree }}</h4>
          <h4>{{ convertDate(ed.startDate) }} — {{ ed.current ? convertDate(ed.startDate) : "Present" }}</h4>
        </div>
        <p>Relevant Coursework:</p>
      </div>
    </section>

    <section className="mb-4">
      <h3 className="w-full border-b border-neutral-950">Experience</h3>
      <div v-for="work in resume?.workHistory">
        <div className="w-full flex flex-row justify-between">
          <h4>{{ work.title }} — {{ work.company }}</h4>
          <h4>{{ convertDate(work.startDate) }} — {{ work.current ? convertDate(work.startDate) : "Present" }}</h4>
        </div>
        <ul className="list-disc list-inside ml-2">
          <li v-for="bp in work.bulletPoints">{{ bp }}</li>
        </ul>
      </div>
    </section>

    <section className="mb-4">
      <h3 className="w-full border-b border-neutral-950">Projects</h3>
      <div v-for="proj in resume?.projects">
        <h4>{{ proj.title }}</h4>
        <p>{{ proj.description }}</p>
        <ul className="list-disc list-inside ml-2">
          <li v-for="bp in proj.bulletPoints">{{ bp }}</li>
        </ul>
      </div>
    </section>
  </div>

</template>