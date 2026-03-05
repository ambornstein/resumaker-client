import type { Entity } from "../types/types"
import api from "./api";

export class EntryService {
    entryCategory: string;

    async createEntry(accountId: number, entry: Entity) {
        return api.post(`/api/accounts/${accountId}/${this.entryCategory}`, entry)
    }

    async updateLinkedEntries(resumeId: number, ids: number[], existingIds: number[]) {
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