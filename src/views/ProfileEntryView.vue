<script setup lang="ts">
import EducationEntry from '../components/entry/EducationEntry.vue';
import ProjectEntry from '../components/entry/ProjectEntry.vue';
import WorkEntry from '../components/entry/WorkEntry.vue';
import { useAccount } from '../composables/useAccount';

const { account, fetchAccount } = useAccount();

if (!account.value) await fetchAccount();
</script>

<template>
    <div className="flex flex-col gap-4 w-full mb-24">
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
