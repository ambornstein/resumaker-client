export type Account = PersistedEntity & {
  firstName: string,
  lastName: string,
  resumes: Resume[],
  workExperiences: JobData[],
  educationEntries: EducationData[],
  projects: ProjectData[]
}

export type Resume = PersistedEntity &{
  label: string,
  workHistory: JobData[],
  educationHistory: EducationData[],
  projects: ProjectData[]
}

/** Entity that definitively exists in the persistent database */
export type PersistedEntity = {
  id: number
}

/** Entity that may exist in the persistend database or has yet to be persisted 
 *  When sending a REST request to create an entity, id can't have a value or it may attempt to overwrite an entity that matches the id
*/
export type Entity = {
  id?: number
}

export type JobData = Entity & {
  title: string,
  company: string,
  startDate: string,
  endDate?: string,
  current: boolean,
  bulletPoints: string[]
}

export type EducationData = Entity & {
  degree: string,
  school: string,
  location: string,
  startDate: string,
  current: boolean,
  endDate?: string,
}

export type ProjectData = Entity & {
  title: string,
  description: string,
  bulletPoints: string[]
}