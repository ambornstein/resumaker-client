import { ref } from 'vue'
import type { EntryCategory, Resume } from '../lib/types'
import { EntryService } from '../lib/services/entryService'
import api from '../lib/services/api'
import { useAccount } from './useAccount'
import { useLoading } from './useLoading'

const resume = ref<Resume>()
const { account, loading } = useAccount()
const { setLoading } = useLoading()

const selectedEducationIds = ref<number[]>([]);
const selectedWorkIds = ref<number[]>([]);
const selectedProjectIds = ref<number[]>([]);

export function useResumeBuilder() {
  const projectService = new EntryService('projects')
  const experienceService = new EntryService('work')
  const educationService = new EntryService('education')

  let serviceMap = new Map<EntryCategory, EntryService>()
  serviceMap.set('projects', projectService)
  serviceMap.set('work', experienceService)
  serviceMap.set('education', educationService)

  async function fetchResume(id: string) {
    if (account.value == null && !loading.value) {
      setLoading(false)
      return
    }

    const result = await api.get(`/api/resumes/${id}`)
    updateResume(result.data)

    return result
  }

  async function updateResume(resumeData: Resume) {
    resume.value = resumeData
  }

  async function selectEntries(entryType: EntryCategory, ids: number[]) {
    if (!serviceMap.has(entryType)) return

    const result = await serviceMap
      .get(entryType)!
      .updateLinkedEntries(resume.value!.id, ids)
    updateResume(result.data)
    updateEntries();
    return result
  }

  function updateEntries() {
    selectedWorkIds.value = resume.value?.workHistory.map(w => w.id!) ?? [];
    selectedEducationIds.value = resume.value?.educationHistory.map(w => w.id!) ?? [];
    selectedProjectIds.value = resume.value?.projects.map(w => w.id!) ?? [];
  }


  async function saveResume() {
    return api.put(`/api/resumes/${resume.value!.id}`, resume.value)
  }

  updateEntries()

  return { resume, selectEntries, updateResume, fetchResume, saveResume, selectedEducationIds, selectedWorkIds, selectedProjectIds }
}
