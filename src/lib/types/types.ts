export type Account = PersistedEntity & {
  firstName: string,
  lastName: string,
  resumes: Resume[],
  workExperiences: WorkExperienceEntry[],
  educationEntries: EducationEntry[],
  projects: ProjectEntry[]
  location?: string,
  phoneNumber?: string,
  website?: string,
  email?: string,
  USCitizen: boolean,
  linkedInLink?: string,
  githubLink?: string
}

export type EntryCategory = 'work' | 'education' | 'projects';
export type EntryAction = 'select' | 'create';

export type Resume = PersistedEntity & {
  label: string,
  workHistory: WorkExperienceEntry[],
  educationHistory: EducationEntry[],
  projects: ProjectEntry[],
  skills: Skills
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

export type WorkExperienceEntry = Entity & {
  title: string,
  company: string,
  location: string,
  startDate: string,
  endDate?: string,
  current: boolean,
  bulletPoints: string[]
}

export type EducationEntry = Entity & {
  degree: string,
  schoolName: string,
  location: string,
  startDate: string,
  current: boolean,
  endDate?: string,
}

export type ProjectEntry = Entity & {
  title: string,
  description: string,
  bulletPoints: string[]
}

export type Skills = {
  skillCategories: SkillCategory[]
}

export type SkillCategory = {
  categoryName?: string,
  skills: string[]
}

export type ResumeStyleTemplate = {
  margin: {
    top: number,
    bottom: number,
    left: number,
    right: number
  },
  titleStyle: FontOptions
  headerStyle: FontOptions & {
    horizontalRule: {
      width: number //Not Yet Implemented
      style?: string //
    },
    indentAmount?: number
  }
  textStyle: FontOptions & {
    indentAmount?: number
  }
  lineSpacing: number,
  bulletSymbol: string,
  bulletIndent?: number,
  dividerSymbol: string
}

export type FontOptions = {
  fontSize: number,
  font: string,
  fontStyle: string,
  fontWeight?: string | number
}

export type User = {
  accessToken: string,
  id: number,
  username: string,
  email: string, 
  roles: string[]
}