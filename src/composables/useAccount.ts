import { ref } from "vue";
import type { Account, EducationEntry, Entity, EntryCategory, WorkExperienceEntry, PersistedEntity, ProjectEntry } from "../lib/types/types";
import api from "../lib/services/api";
import { useAuth } from "./useAuth";

const account = ref<Account | null>();
const { user } = useAuth();

export function useAccount() {
    if (user.value) {
        fetchAccount(user.value!.id)
    }
    else detachAccount()

    async function fetchAccount(id: number) {
        const result = await api.get(`/api/accounts/${id}`);
        account.value = result.data
    }

    async function detachAccount() {
        account.value = null
    }

    async function updateAccount(account: Account) {
        await api.put(`/api/accounts/${account.id}`, account)
    }

    async function updateEntry(entryCategory: EntryCategory, entry: PersistedEntity) {
        const updatedEntry = await api.put(`/api/${entryCategory}/${entry.id}`, entry)

        let index;
        switch (entryCategory) {
            case 'experience':
                index = account.value!.workExperiences.findIndex((data) => entry.id == data.id)
                account.value!.workExperiences[index] = entry as WorkExperienceEntry
                break;
            case 'education':
                index = account.value!.educationEntries.findIndex((data) => updatedEntry.data.id == data.id)
                account.value!.educationEntries[index] = updatedEntry.data
                break;
            case 'projects':
                index = account.value!.projects.findIndex((data) => updatedEntry.data.id == data.id)
                account.value!.projects[index] = updatedEntry.data
                break;
        }

        console.log(index);
    }

    async function addEntry(entryCategory: EntryCategory, entry: Entity) {
        const createdEntry = await api.post(`/api/accounts/${account.value!.id}/${entryCategory}`, entry)

        switch (entryCategory) {
            case 'experience':
                account.value!.workExperiences.push(createdEntry.data as WorkExperienceEntry);
                break;
            case 'education':
                account.value!.educationEntries.push(createdEntry.data as EducationEntry);
                break;
            case 'projects':
                account.value!.projects.push(createdEntry.data as ProjectEntry);
                break;
        }
    }

    async function deleteEntry(entryCategory: EntryCategory, id: number) {
        await api.delete(`/api/accounts/${account.value!.id}/${entryCategory}/${id}`)

        switch (entryCategory) {
            case 'experience':
                account.value!.workExperiences = account.value!.workExperiences.filter((i) => i.id != id)
                break;
            case 'education':
                account.value!.educationEntries = account.value!.educationEntries.filter((i) => i.id != id)
                break;
            case 'projects':
                account.value!.projects = account.value!.projects.filter((i) => i.id != id)
                break;
        }
    }

    return { account, fetchAccount, detachAccount, addEntry, updateEntry, deleteEntry, updateAccount }
}
