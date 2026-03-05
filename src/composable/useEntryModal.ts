import { ref } from "vue";
import { type EducationData, type EntryAction, type EntryCategory, type JobData, type ProjectData } from "../types/types";

const showModal = ref<boolean>(false);
const modalMode = ref<EntryCategory>('experience')
const action = ref<EntryAction>('select')

const defaultProject: ProjectData = {title: "", description:"", bulletPoints: []}
const defaultExperience: JobData = {title: "Analyst", company: "RTX", current: true, startDate: "2020-09", bulletPoints: [] }
const defaultEducation: EducationData = {degree: "B.A.", schoolName: "WPI", startDate:"2020-09", location: "Worcester, MA", current: false}

const editingProject = ref<ProjectData>(defaultProject)
const editingExperience = ref<JobData>(defaultExperience)
const editingEducation = ref<EducationData>(defaultEducation)

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

    function editExperience(exp: JobData) {
        editingExperience.value = exp
        useAction('create')
        openModal()
    }

    function editEducation(education: EducationData) {
        editingEducation.value = education
        useAction('create')
        openModal()
    }

    function editProject(project: ProjectData) {
        editingProject.value = project
        useAction('create')
        openModal()
    }
 
    return {showModal, modalMode, action, editingProject, editingExperience, editingEducation, useAction, closeModal, openModal, openCategory, resetEditingEntries, editExperience, editProject, editEducation}
}