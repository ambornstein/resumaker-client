import { ref } from "vue";
import type { Account, EducationData, JobData, ProjectData, Resume } from "../types/type";
import api from "../services/api";

const user = ref<Account>();
const resume = ref<Resume>();

//await api.post("/api/accounts", {"firstName": "Andrei", "lastName": "Bornstein"});

export function useUser() {
    async function fetchUserData() {
        const result = await api.get("/api/accounts/1");
        user.value = result.data
    }

    async function fetchResume(id: number) {
        const result = await api.get(`/api/resumes/${id}`)
        resume.value = result.data
    }

    async function updateResume(resumeData: Resume) {
        resume.value = resumeData
    }

    async function updateLinkedEntries(ids: number[], entryCategory: string, existingEntries: any[]) {
        const existingIds = existingEntries.map(p => p.id!)

        const toAdd = ids.filter(i => !existingIds.includes(i))
        const toRemove = existingIds.filter(i => !ids.includes(i))

        let allPromises = [
            toAdd.map(id => api.post(`/api/resumes/${resume.value?.id}/${entryCategory}/${id}`)),
            toRemove.map(id => api.delete(`/api/resumes/${resume.value?.id}/${entryCategory}/${id}`))
        ]

        return Promise.allSettled(allPromises.flat());
    }

    async function createProject(projectData: ProjectData) {
        if (!resume.value) return
        await api.post(`/api/resumes/${resume.value?.id}/projects`, projectData).then(res => updateResume(res.data))
    }

    async function selectProjects(ids: number[]) {
        if (!resume.value) return
        await updateLinkedEntries(ids, "projects", resume.value.projects)
        await fetchResume(resume.value.id!);
    }

    async function createEducation(edData: EducationData) {
        if (!resume.value) return
        await api.post(`/api/resumes/${resume.value.id}/education`, edData).then(res => updateResume(res.data))
    }

    async function selectEducation(ids: number[]) {
        if (!resume.value) return
        await updateLinkedEntries(ids, "education", resume.value.educationHistory)
        await fetchResume(resume.value.id!);
    }

    async function createExperience(jobData: JobData) {
        if (!resume.value) return
        await api.post(`/api/resumes/${resume.value.id}/experience`, jobData).then(res => updateResume(res.data))
    }

    async function selectExperience(ids: number[]) {
        if (!resume.value) return
        await updateLinkedEntries(ids, "experience", resume.value.workHistory)
        await fetchResume(resume.value.id!);
    }

    return { user, resume, fetchUserData, fetchResume, createProject, createEducation, createExperience, selectProjects, selectEducation, selectExperience }
}