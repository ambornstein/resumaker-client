import { ref } from 'vue'
import { type EntryCategory } from '../lib/types'

const showModal = ref<boolean>(false)
const modalMode = ref<EntryCategory>('work')

export function useEntryModal() {
  function closeModal() {
    showModal.value = false
  }

  function openCategory(category: EntryCategory) {
    modalMode.value = category
    openModal()
  }

  function openModal() {
    showModal.value = true
  }

  return { showModal, modalMode, closeModal, openModal, openCategory }
}
