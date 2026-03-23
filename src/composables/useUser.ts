import { ref } from "vue";
import type { Account, EducationEntry, Entity, EntryCategory, WorkExperienceEntry, PersistedEntity, ProjectEntry } from "../lib/types/types";
import api from "../lib/services/api";

const user = ref<Account>();

//await api.post("/api/accounts", {"firstName": "Andrei", "lastName": "Bornstein"});


export function useUser() {
    async function fetchUserData() {
        const result = await api.get("/api/accounts/1");
        user.value = result.data
    }

    async function updateAccount(account: Account) {
        await api.put("/api/accounts/1", account)
    }

    async function updateEntry(entryCategory: EntryCategory, entry: PersistedEntity) {
        const updatedEntry = await api.put(`/api/${entryCategory}/${entry.id}`, entry)

        let index;
        switch (entryCategory) {
            case 'experience':
                index = user.value!.workExperiences.findIndex((data) => entry.id == data.id)
                user.value!.workExperiences[index] = entry as WorkExperienceEntry
                break;
            case 'education':
                index = user.value!.educationEntries.findIndex((data) => updatedEntry.data.id == data.id)
                user.value!.educationEntries[index] = updatedEntry.data 
                break;
            case 'projects':
                index = user.value!.projects.findIndex((data) => updatedEntry.data.id == data.id)
                user.value!.projects[index] = updatedEntry.data 
                break;
        }

        console.log(index);
    }

    async function addEntry(entryCategory: EntryCategory, entry: Entity) {
        const createdEntry = await api.post(`/api/accounts/${user.value!.id}/${entryCategory}`, entry)

        switch (entryCategory) {
            case 'experience':
                user.value!.workExperiences.push(createdEntry.data as WorkExperienceEntry);
                break;
            case 'education':
                user.value!.educationEntries.push(createdEntry.data as EducationEntry);
                break;
            case 'projects':
                user.value!.projects.push(createdEntry.data as ProjectEntry);
                break;
        }
    }

    async function deleteEntry(entryCategory: EntryCategory, id: number) {
        await api.delete(`/api/accounts/${user.value!.id}/${entryCategory}/${id}`)

        switch (entryCategory) {
            case 'experience':
                user.value!.workExperiences = user.value!.workExperiences.filter( (i) => i.id != id )
                break;
            case 'education':
                user.value!.educationEntries = user.value!.educationEntries.filter( (i) => i.id != id )
                break;
            case 'projects':
                user.value!.projects = user.value!.projects.filter( (i) => i.id != id )
                break;
        }
    }

    return { user, fetchUserData, addEntry, updateEntry, deleteEntry, updateAccount}
}
