<script setup lang="ts">
import { ref } from 'vue';
import { useAccount } from '../composables/useAccount';
import OptionLabel from '../components/OptionLabel.vue';
import EducationEntry from '../components/entry/EducationEntry.vue';
import WorkEntry from '../components/entry/WorkEntry.vue';
import ProjectEntry from '../components/entry/ProjectEntry.vue';
import { useRoute } from 'vue-router';
import type { EntryCategory } from '../lib/types/types';

const { account, updateAccount } = useAccount();
const route = useRoute();

type ProfileSection = "profile" | EntryCategory

const viewMode = ref<ProfileSection>("profile")

if (route.query.section) {
    viewMode.value = route.query.section as ProfileSection; 
}
</script>

<template>
    <div className="flex flex-col gap-4">
        <div className="flex col-span-2 justify-between">
            <h1>Your Profile</h1>
            <RouterLink to="/dashboard">See Resumes</RouterLink>
        </div>
        <ul className="flex gap-2 mt-8">
            <li>
                <input id="profile" className="hidden peer" type="radio" value="profile" name="viewSelect"
                    v-model="viewMode" />
                <OptionLabel for="profile" labelText="Profile" />
            </li>
            <li>
                <input id="education" type="radio" className="hidden peer" value="education" name="viewSelect"
                    v-model="viewMode" />
                <OptionLabel for="education" labelText="Education" />
            </li>
            <li>
                <input id="work" type="radio" className="hidden peer" value="work" name="viewSelect"
                    v-model="viewMode" />
                <OptionLabel for="work" labelText="Work Experience" />
            </li>
            <li>
                <input id="projects" type="radio" className="hidden peer" value="projects" name="viewSelect"
                    v-model="viewMode" />
                <OptionLabel for="projects" labelText="Projects" />
            </li>
        </ul>

        <div v-if="viewMode == 'profile'" className="flex gap-8">
            <div className="split-column">
                <h2 className="col-span-full mb-4" id="personal-info">Personal Information</h2>
                <label>First Name</label><input type="text" v-model="account!.firstName" />
                <label>Last Name</label><input type="text" v-model="account!.lastName" />
                <label>Location</label><input type="text" v-model="account!.location" />
                <label>US Citizen</label><input type="checkbox" v-model="account!.USCitizen" />
            </div>
            <div className="split-column">
                <h2 className="col-span-full mb-4" id="contact-info">Contact Information</h2>
                <label>Email</label><input id="email" type="email" v-model="account!.email" />
                <label>Website</label><input id="websiteLink" type="url" v-model="account!.website" />
                <label>LinkedIn</label><input id="linkedInLink" type="url" v-model="account!.linkedInLink" />
                <label>GitHub</label><input id="githubLink" type="url" v-model="account!.githubLink" />
                <label>Phone Number</label><input id="phoneNumber" type="tel" v-model="account!.phoneNumber" />
            </div>
            <button className="w-fit" @click="updateAccount(account!)">Save</button>
        </div>
        <div v-else-if="viewMode == 'education'">
            <div className="flex flex-col max-w-xl gap-4">
                <EducationEntry :editingEducation="entry" :index v-for="(entry, index) in account!.educationEntries" />
                <button @click="account?.educationEntries.push({
                    degree: '',
                    schoolName: '',
                    location: '',
                    startDate: '',
                    current: true
                })">Add Education</button>
            </div>
        </div>
        <div v-else-if="viewMode == 'work'">
            <div className="flex flex-col max-w-xl gap-4">
                <WorkEntry :editingExperience="entry" :index v-for="(entry, index) in account!.workExperiences" />
                <button @click="account?.workExperiences.push({
                    title: '',
                    company: '',
                    location: '',
                    startDate: '',
                    current: true,
                    bulletPoints: []
                })">Add Work Experience</button>
            </div>
        </div>
        <div v-else-if="viewMode == 'projects'">
            <div className="flex flex-col max-w-xl gap-4">
                <ProjectEntry :editingProject="entry" :index v-for="(entry, index) in account!.projects" />
                <button @click="account?.projects.push({
                    title: '',
                    description: '',
                    bulletPoints: []
                })">Add Project</button>
            </div>
        </div>

    </div>
</template>
