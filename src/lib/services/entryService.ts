import type { Entity } from "../types/types"
import api from "./api";

export class EntryService {
    entryCategory: string;

    async createEntry(accountId: number, entry: Entity) {
        return api.post(`/api/accounts/${accountId}/${this.entryCategory}`, entry)
    }

    async updateLinkedEntries(resumeId: number, ids: number[]) {
        await api.post(`/api/resumes/${resumeId}/${this.entryCategory}`, null, { params: { ids: ids.join(",") } })
    }

    constructor(entryType: string) {
        this.entryCategory = entryType
    }
}