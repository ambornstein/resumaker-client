import { ref } from "vue";
import type { Entity, Resume } from "../types/type";
import { EntryService } from "../services/entryService";
import api from "../services/api";

const resume = ref<Resume>();

export function useResumeBuilder() {
    const projectService = new EntryService("projects");
    const experienceService = new EntryService("experience");
    const educationService = new EntryService("education");

    let serviceMap = new Map<String, EntryService>()
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

    async function createEntry(entryType: string, entry: Entity) {
        if (!serviceMap.has(entryType)) return

        const result = await serviceMap.get(entryType)!.createEntry(resume.value!.id, entry)
        return updateResume(result?.data)
    }

    async function selectEntries(entryType: string, ids: number[], existingIds: number[]) {
        if (!serviceMap.has(entryType)) return

        await serviceMap.get(entryType)!.updateLinkedEntries(resume.value!.id, ids, existingIds)
        return fetchResume(resume.value!.id)
    }
    
    return {resume, createEntry, selectEntries, updateResume, fetchResume}
}