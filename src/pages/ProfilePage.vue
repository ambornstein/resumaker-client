<script setup lang="ts">
import { ref } from "vue";
import { useAccount } from "../composables/useAccount";
import EducationEntry from "../components/entry/EducationEntry.vue";
import WorkEntry from "../components/entry/WorkEntry.vue";
import ProjectEntry from "../components/entry/ProjectEntry.vue";
import { useRoute } from "vue-router";
import type { EntryCategory } from "../lib/types/types";

const { account, updateAccount } = useAccount();
const route = useRoute();

type ProfileSection = "profile" | EntryCategory;

const viewMode = ref<ProfileSection>("profile");

if (route.query.section) {
  viewMode.value = route.query.section as ProfileSection;
}
</script>

<template>
  <div className="flex flex-col gap-12">
    <div className="flex col-span-2 justify-between">
      <h1>Your Profile</h1>
      <RouterLink to="/dashboard">
        <h3>See Resumes</h3>
      </RouterLink>
    </div>

    <div className="grid grid-cols-2 w-fit gap-12 panel p-4 has-[button:hover]:bg-zinc-800 transition-all duration-150">
      <div className="split-column max-w-sm">
        <h2 className="col-span-full mb-4" id="personal-info">
          Personal Information
        </h2>
        <label>First Name</label><input type="text" className="input-field" v-model="account!.firstName" />
        <label>Last Name</label><input type="text" className="input-field" v-model="account!.lastName" />
        <label>Location</label><input type="text" className="input-field" v-model="account!.location" />
        <label>US Citizen</label><input type="checkbox" className="input-field" v-model="account!.USCitizen" />
        <button className="col-span-full group" @click="updateAccount(account!)">
          Save
        </button>
      </div>
      <div className="split-column max-w-md">
        <h2 className="col-span-full mb-4" id="contact-info">
          Contact Information
        </h2>
        <label>Email</label><input id="email" type="email" className="input-field" v-model="account!.email" />
        <label>Website</label><input id="websiteLink" type="url" className="input-field" v-model="account!.website" />
        <label>LinkedIn</label><input id="linkedInLink" type="url" className="input-field"
          v-model="account!.linkedInLink" />
        <label>GitHub</label><input id="githubLink" type="url" className="input-field" v-model="account!.githubLink" />
        <label>Phone Number</label><input id="phoneNumber" type="tel" className="input-field"
          v-model="account!.phoneNumber" />
      </div>
    </div>

    <div className="flex flex-col gap-2" id="education">
      <div className="grid grid-cols-[14vw_auto] w-fit items-center p-2">
        <h2>Education</h2>
        <button className="w-56" @click="
          account?.educationEntries.push({
            degree: '',
            schoolName: '',
            location: '',
            startDate: '',
            current: false,
          })
          ">
          Add Education
        </button>
      </div>
      <div className="panel p-4 flex flex-row gap-4 min-h-10 overflow-x-auto">
        <EducationEntry :editingEducation="entry" :index v-for="(entry, index) in account!.educationEntries" />
      </div>
    </div>
    <div className="flex flex-col gap-2" id="work">
      <div className="grid grid-cols-[14vw_auto] w-fit items-center p-2">
        <h2>Work Experience</h2>
        <button className="w-56" @click="
          account?.workExperiences.push({
            title: '',
            company: '',
            location: '',
            startDate: '',
            current: false,
            bulletPoints: [],
          })
          ">
          Add Work Experience
        </button>
      </div>
      <div className="panel p-4 flex flex-row gap-4 min-h-10 overflow-x-auto">
        <WorkEntry :editingExperience="entry" :index v-for="(entry, index) in account!.workExperiences" />
      </div>
    </div>
    <div className="flex flex-col gap-2" id="projects">
      <div className="grid grid-cols-[14vw_auto] w-fit items-center p-2">
        <h2>Projects</h2>
        <button className="w-56" @click="
          account?.projects.push({
            title: '',
            description: '',
            bulletPoints: [],
          })
          ">
          Add Project
        </button>
      </div>
      <div className="panel p-4 flex flex-row gap-4 min-h-10 h-fit overflow-x-auto">
        <ProjectEntry :editingProject="entry" :index v-for="(entry, index) in account!.projects" />
      </div>
    </div>
  </div>
</template>
