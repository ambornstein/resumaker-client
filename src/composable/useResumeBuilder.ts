import { ref } from "vue";
import type { EntryCategory, Resume } from "../types/types";
import { EntryService } from "../services/entryService";
import api from "../services/api";

const resume = ref<Resume>();

export function useResumeBuilder() {
    const projectService = new EntryService("projects");
    const experienceService = new EntryService("experience");
    const educationService = new EntryService("education");

    let serviceMap = new Map<EntryCategory, EntryService>()
    serviceMap.set("projects", projectService)
    serviceMap.set("experience", experienceService)
    serviceMap.set("education", educationService)

    async function fetchResume(id: number) {
        const result = await api.get(`/api/resumes/${id}`)
        updateResume(result.data)
    }

    async function updateResume(resumeData: Resume) {
        resume.value = resumeData
    }

    async function selectEntries(entryType: EntryCategory, ids: number[], existingIds: number[]) {
        if (!serviceMap.has(entryType)) return

        await serviceMap.get(entryType)!.updateLinkedEntries(resume.value!.id, ids, existingIds)
        return fetchResume(resume.value!.id)
    }
    
    return {resume, selectEntries, updateResume, fetchResume}
}