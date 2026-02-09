export type Profile = {
  firstName: string,
  lastName: string
}

export type JobData = {
  title: string,
  company: string,
  startDate: string,
  endDate?: string,
  bulletPoints: string[]
}

export type EducationData = {
  degree: string,
  school: string,
  location: string,
  startDate: string,
  endDate?: string,
  classes?: string[]
}

export type ProjectData = {
  title: string,
  description: string,
  bulletPoints: string[]
}