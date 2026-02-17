import type { Entity } from "../types/type"
import api from "./api";

export class EntryService {
    entryCategory: string;

    async createEntry(resumeId: number, entry: Entity) {
        return api.post(`/api/resumes/${resumeId}/${this.entryCategory}`, entry)
    }

    async updateLinkedEntries(resumeId: number, ids: number[], existingIds: number[]) {
        console.log(ids);
        console.log(existingIds);
        const toAdd = ids.filter(i => !existingIds.includes(i))
        const toRemove = existingIds.filter(i => !ids.includes(i))

        let allPromises = [
            toAdd.map(id => api.post(`/api/resumes/${resumeId}/${this.entryCategory}/${id}`)),
            toRemove.map(id => api.delete(`/api/resumes/${resumeId}/${this.entryCategory}/${id}`))
        ]

        return Promise.allSettled(allPromises.flat());
    }

    constructor(entryType: string) {
        this.entryCategory = entryType
    }
}