import { ref } from "vue";
import { type EducationEntry, type EntryAction, type EntryCategory, type WorkExperienceEntry, type ProjectEntry } from "../lib/types/types";

const showModal = ref<boolean>(false);
const modalMode = ref<EntryCategory>('experience')
const action = ref<EntryAction>('select')

const defaultProject: ProjectEntry = {title: "", description:"", bulletPoints: []}
const defaultExperience: WorkExperienceEntry = {title: "Analyst", company: "RTX", current: true, startDate: "2020-09", bulletPoints: [] }
const defaultEducation: EducationEntry = {degree: "B.A.", schoolName: "WPI", startDate:"2020-09", location: "Worcester, MA", current: false}

const editingProject = ref<ProjectEntry>(defaultProject)
const editingExperience = ref<WorkExperienceEntry>(defaultExperience)
const editingEducation = ref<EducationEntry>(defaultEducation)

export function useEntryModal() {

    function useAction(act: EntryAction) {
        action.value = act
    }

    function closeModal() {
        showModal.value = false;
        action.value = 'select';
    }

    function openCategory(category: EntryCategory) {
        modalMode.value = category;
        openModal()
    }

    function openModal() {
        showModal.value = true;
    }

    function resetEditingEntries() {
        editingProject.value = defaultProject;
        editingEducation.value = defaultEducation;
        editingExperience.value = defaultExperience;
    }

    function editExperience(exp: WorkExperienceEntry) {
        editingExperience.value = exp
        useAction('create')
        openModal()
    }

    function editEducation(education: EducationEntry) {
        editingEducation.value = education
        useAction('create')
        openModal()
    }

    function editProject(project: ProjectEntry) {
        editingProject.value = project
        useAction('create')
        openModal()
    }
 
    return {showModal, modalMode, action, editingProject, editingExperience, editingEducation, useAction, closeModal, openModal, openCategory, resetEditingEntries, editExperience, editProject, editEducation}
}