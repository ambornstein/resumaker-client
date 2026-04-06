import { computed, ref } from 'vue'
import type {
  Account,
  EducationEntry,
  EntryCategory,
  WorkExperienceEntry,
  PersistedEntity,
  ProjectEntry,
} from '../lib/types/types'
import api from '../lib/services/api'
import tokenService from '../lib/services/tokenService'
import { useLoading } from './useLoading'

//#region Global auth state management

const account = ref<Account | null>()
const user = computed(() => tokenService.getUser())
const isLoggedIn = ref<boolean>(false)
const loading = ref<boolean>(false)

async function updateAuthStatus() {
  if (tokenService.getUser()) {
    if (!account.value) {
      await fetchAccount(tokenService.getUser()!.id)
    }
    isLoggedIn.value = true
  } else {
    account.value = null
    isLoggedIn.value = false
  }
}

async function fetchAccount(id: number) {
  loading.value = true
  const result = await api.get(`/api/accounts/${id}`)
  loading.value = false

  account.value = result.data
  return result
}

window.addEventListener('user-updated', updateAuthStatus)

updateAuthStatus()
//#endregion

export function useAccount() {
  const { setLoading } = useLoading()

  async function createResume(data: any) {
    setLoading(true)
    const result = await api.post(
      `/api/accounts/${account.value!.id}/resumes`,
      data
    )
    setLoading(false)

    account.value! = result.data
    return result
  }

  async function deleteResume(id: number) {
    setLoading(true)
    const result = await api.delete(
      `/api/accounts/${account.value!.id}/resumes/` + id
    )
    setLoading(false)

    account.value! = result.data
    return result
  }

  async function updateAccount(account: Account) {
    setLoading(true)
    const result = api.put(`/api/accounts/${account.id}`, account)
    setLoading(false)

    return result
  }

  async function updateEntry(
    entryCategory: EntryCategory,
    entry: PersistedEntity
  ) {
    setLoading(true)
    const updatedEntry = await api.put(
      `/api/${entryCategory}/${entry.id}`,
      entry
    )
    setLoading(false)

    let index
    switch (entryCategory) {
      case 'work':
        index = account.value!.workExperiences.findIndex(
          (data) => entry.id == data.id
        )
        account.value!.workExperiences[index] = entry as WorkExperienceEntry
        break
      case 'education':
        index = account.value!.educationEntries.findIndex(
          (data) => updatedEntry.data.id == data.id
        )
        account.value!.educationEntries[index] = updatedEntry.data
        break
      case 'projects':
        index = account.value!.projects.findIndex(
          (data) => updatedEntry.data.id == data.id
        )
        account.value!.projects[index] = updatedEntry.data
        break
    }

    return updatedEntry.data
  }

  async function addEntry(entryCategory: EntryCategory, index: number) {
    let createdEntry

    setLoading(true)
    switch (entryCategory) {
      case 'work':
        createdEntry = await api.post(
          `/api/accounts/${account.value!.id}/${entryCategory}`,
          account.value!.workExperiences[index]
        )

        account.value!.workExperiences.splice(
          index,
          1,
          createdEntry.data as WorkExperienceEntry
        )
        break
      case 'education':
        createdEntry = await api.post(
          `/api/accounts/${account.value!.id}/${entryCategory}`,
          account.value!.educationEntries[index]
        )

        account.value!.educationEntries.splice(
          index,
          1,
          createdEntry.data as EducationEntry
        )
        break
      case 'projects':
        createdEntry = await api.post(
          `/api/accounts/${account.value!.id}/${entryCategory}`,
          account.value!.projects[index]
        )

        account.value!.projects.splice(
          index,
          1,
          createdEntry.data as ProjectEntry
        )
        break
    }
    setLoading(false)
    return createdEntry.data
  }

  async function deleteEntry(entryCategory: EntryCategory, id: number) {
    setLoading(true)
    await api.delete(
      `/api/accounts/${account.value!.id}/${entryCategory}/${id}`
    )
    setLoading(false)

    switch (entryCategory) {
      case 'work':
        account.value!.workExperiences = account.value!.workExperiences.filter(
          (i) => i.id != id
        )
        break
      case 'education':
        account.value!.educationEntries =
          account.value!.educationEntries.filter((i) => i.id != id)
        break
      case 'projects':
        account.value!.projects = account.value!.projects.filter(
          (i) => i.id != id
        )
        break
    }
  }

  return {
    account,
    user,
    isLoggedIn,
    loading,
    fetchAccount,
    createResume,
    deleteResume,
    addEntry,
    updateEntry,
    deleteEntry,
    updateAccount,
  }
}
