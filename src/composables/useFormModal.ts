import { ref } from 'vue'
import type { EntryCategory, Entity } from '../lib/types'

const showFormModal = ref<boolean>(false)
const modalMode = ref<EntryCategory>('work')
const editingEntry = ref<Entity>()

export function useFormModal() {
  function closeFormModal() {
    showFormModal.value = false
    editingEntry.value = undefined
  }

  function openCategory(category: EntryCategory, entry?: Entity) {
    editingEntry.value = entry ?? undefined
    modalMode.value = category
    openModal()
  }

  function openModal() {
    showFormModal.value = true
  }

  return {
    showFormModal,
    modalMode,
    closeFormModal,
    openModal,
    openCategory,
    editingEntry,
  }
}
