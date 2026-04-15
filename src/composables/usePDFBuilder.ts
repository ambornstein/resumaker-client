import jsPDF, { type TextOptionsLight } from 'jspdf'
import type {
  Account,
  EducationEntry,
  WorkExperienceEntry,
  ProjectEntry,
  Resume,
  Skills,
  ResumeStyleTemplate,
  FontOptions,
  Vector2,
  ResumeInclusionFlags,
} from '../lib/types'
import { reactive } from 'vue'

const defaultTemplate: ResumeStyleTemplate = {
  margin: {
    top: 8,
    bottom: 8,
    left: 10,
    right: 10,
  },
  titleStyle: {
    fontSize: 24,
    font: 'Times New Roman',
    fontStyle: 'normal',
  },
  headerStyle: {
    fontSize: 12,
    font: 'Times New Roman',
    fontStyle: 'bold',
    horizontalRule: {
      width: 1,
    },
    indentAmount: 0,
  },
  textStyle: {
    fontSize: 12,
    font: 'Times New Roman',
    fontStyle: 'normal',
  },
  lineSpacing: 0.5,
  bulletSymbol: '\u2022',
  dividerSymbol: '\u2022',
}

const includeFlags = reactive<ResumeInclusionFlags>({
  experience: true,
  projects: true,
  skills: true,
  email: true,
  phone: true,
  website: true,
  github: true,
  linkedIn: true,
  location: true,
})

export function usePDFBuilder() {
  let doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  let docName: string

  const pageHeight =
    doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
  const pageWidth =
    doc.internal.pageSize.width || doc.internal.pageSize.getWidth()

  let maxTextWidth: number
  let cursor: Vector2 = { x: 0, y: 0 }
  let template: ResumeStyleTemplate

  function createPDF(resume: Resume, account: Account) {
    doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    docName = resume.label + ' Resume'

    template = defaultTemplate
    cursor = { x: template.margin.left, y: template.margin.right }
    maxTextWidth = pageWidth - template.margin.left - template.margin.right

    const frame = document.getElementById('resume-page') as HTMLIFrameElement

    createHeader(account)
    createEducationSection(resume.educationHistory)
    includeFlags.skills && createSkillsSection(resume.skills)
    includeFlags.experience && createExperienceSection(resume.workHistory)
    includeFlags.projects && createProjectSection(resume.projects)

    const string = doc.output('datauristring', {
      filename: docName,
    })
    frame.src = string
  }

  function savePDF() {
    doc.save(docName)
  }

  function createHeader(account: Account) {
    setFontStyle(template.titleStyle)
    createText(account.firstName + ' ' + account.lastName, true, 0, 'center')

    setFontStyle(template.textStyle)

    let contacts = []

    contacts.push(account.USCitizen ? 'US Citizen' : null)
    includeFlags.location && contacts.push(account.location)
    includeFlags.email && contacts.push(account.email)
    includeFlags.phone && contacts.push(account.phoneNumber)
    includeFlags.website && contacts.push(account.website)
    includeFlags.linkedIn && contacts.push(account.linkedInLink)
    includeFlags.github && contacts.push(account.githubLink)
    contacts = contacts.filter((i) => i != null)

    if (contacts.length == 0) return

    const textLines = divideTextLines(contacts, ` ${template.dividerSymbol} `)
    for (let i = 0; i < textLines.length; i++) {
      const lineWidth = calculateJoinWidth(
        textLines[i]!.map(formatLink),
        ` ${template.dividerSymbol} `
      )

      cursor.x = template.margin.left + (maxTextWidth - lineWidth) / 2
      for (let j = 0; j < textLines[i]!.length; j++) {
        if (textLines[i]![j]!.startsWith('http')) {
          createLink(formatLink(textLines[i]![j]!), textLines[i]![j]!, false)
        } else {
          createText(textLines[i]![j]!, false)
        }

        if (j < textLines[i]!.length - 1) {
          createText(` ${template.dividerSymbol} `, false)
        }
      }
      incrementLine()
    }
    incrementLine()
  }

  function createEducationSection(education: EducationEntry[]) {
    setFontStyle(template.headerStyle)
    createText('Education', false, template.headerStyle.indentAmount)

    drawHorizontalLine()
    setFontStyle(template.textStyle)
    education.forEach((value) => {
      createText(value.degree, false)
      createText(
        `${convertDate(value.startDate)} — ${value.current ? convertDate(value.endDate!) : 'Present'}`,
        true,
        0,
        'right'
      )
      createText(value.schoolName)
      incrementLine()
    })
  }

  function createSkillsSection(skills: Skills) {
    setFontStyle(template.headerStyle)
    createText('Skills', false, template.headerStyle.indentAmount)

    drawHorizontalLine()

    skills.skillCategories.forEach((value) => {
      setFontStyle(template.textStyle)
      setFontMode('bold')
      if (value.categoryName) createText(value.categoryName + ': ', false)
      setFontStyle(template.textStyle)

      createText(value.skills.join(', '))
      incrementLine()
    })
  }

  function createExperienceSection(experience: WorkExperienceEntry[]) {
    setFontStyle(template.headerStyle)
    createText('Work Experience', false, template.headerStyle.indentAmount)

    drawHorizontalLine()
    setFontStyle(template.textStyle)
    experience.forEach((value) => {
      createText(`${value.title}, ${value.company}`, false)
      createText(
        `${convertDate(value.startDate)} — ${value.current ? convertDate(value.endDate!) : 'Present'}`,
        true,
        0,
        'right'
      )

      value.bulletPoints.forEach((bullet) => {
        createText(
          `${template.bulletSymbol} ${bullet}`,
          true,
          template.bulletIndent
        )
      })
      incrementLine()
    })
  }

  function createProjectSection(projects: ProjectEntry[]) {
    setFontStyle(template.headerStyle)
    createText('Projects', false, template.headerStyle.indentAmount)

    drawHorizontalLine()
    setFontStyle(template.textStyle)
    projects.forEach((value) => {
      createText(value.title, false)
      if (value.link) createLink('Link', value.link, true)
      else incrementLine()
      createText(value.description)

      value.bulletPoints.forEach((bullet) => {
        createText(
          `${template.bulletSymbol} ${bullet}`,
          true,
          template.bulletIndent
        )
      })
      incrementLine()
    })
  }

  //#region

  function createText(
    text: string | string[],
    newLine = true,
    xPad = 0,
    align?: TextOptionsLight['align']
  ) {
    const xPos = calculateAlignment(align, xPad)
    doc.text(text, xPos, cursor.y, { maxWidth: maxTextWidth, align: align })

    cursor = calculateCursorTravel(text, cursor)
    if (newLine) {
      incrementLine()
    }
  }

  function createLink(text: string, linkSrc: string, newLine = true) {
    doc.setTextColor('#646cff')
    doc.setDrawColor('#646cff')
    doc.textWithLink(text, cursor.x, cursor.y, {
      maxWidth: maxTextWidth,
      url: linkSrc,
    })

    var cursorOrigin = { x: cursor.x, y: cursor.y }
    cursor = calculateCursorTravel(text, cursor)

    doc.line(
      cursorOrigin.x,
      cursorOrigin.y + template.lineSpacing,
      cursor.x,
      cursor.y + template.lineSpacing
    )
    doc.setDrawColor('#000000')
    doc.setTextColor('#000000')

    if (newLine) {
      incrementLine()
    }
  }

  function drawHorizontalLine() {
    cursor.y += template.lineSpacing
    doc.line(
      template.margin.left,
      cursor.y,
      pageWidth - template.margin.right,
      cursor.y
    )
    incrementLine()
  }

  function incrementLine() {
    cursor.y += doc.getTextDimensions('T').h + template.lineSpacing
    cursor.x = template.margin.left
  }

  function setFontStyle(options: FontOptions) {
    doc.setFont(options.font, options.fontStyle)
    doc.setFontSize(options.fontSize)
  }

  function setFontMode(mode: string) {
    doc.setFont(doc.getFont().fontName, mode)
  }

  //#region Formatting

  function divideTextLines(strings: string[], separator = '') {
    let lines: string[][] = []
    let line: string[] = []
    while (strings.length > 0) {
      const string = strings.shift()!
      if (doc.getTextWidth(string) > maxTextWidth) {
        lines.push(line)
        lines.push([string])
        line = []
      } else {
        const joinWidth = calculateJoinWidth(
          line.concat(string).map(formatLink),
          separator
        )
        if (joinWidth > maxTextWidth) {
          lines.push(line)
          line = [string]
        } else {
          line.push(string)
        }
      }
    }
    lines.push(line)

    return lines.filter((l) => l != null)
  }

  function formatLink(linkString: string) {
    return linkString.replace(/https?:\/\/(www.)?/, '')
  }

  function convertDate(stringValue: string) {
    return new Date(stringValue).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  }

  //#endregion

  //#region Calculations and Util Functions

  function calculateAlignment(
    align?: TextOptionsLight['align'],
    xPad = 0
  ): number {
    let xPos

    switch (align) {
      case 'right':
        xPos = pageWidth - template.margin.right
        xPos -= xPad
        break
      case 'center':
        xPos = pageWidth / 2
        xPos += xPad
        break
      case 'left':
        xPos = template.margin.left
        xPos += xPad
        break
      default:
        xPos = cursor.x
        xPos += xPad
    }

    return xPos
  }

  function calculateJoinWidth(strings: string[], separator = '') {
    return doc.getTextWidth(strings.join(separator))
  }

  function calculateCursorTravel(
    text: string | string[],
    startPosition: Vector2
  ): Vector2 {
    let endPosition = startPosition

    const textBlock = Array.isArray(text) ? text.join() : text
    const strings = doc.splitTextToSize(textBlock, maxTextWidth)
    for (let t of strings) {
      const size = doc.getTextDimensions(t)

      endPosition.x += size.w
      if (endPosition.x - template.margin.left > maxTextWidth) {
        endPosition.y += size.h + template.lineSpacing
        endPosition.x = template.margin.left
      }
    }

    return endPosition
  }

  //#endregion

  return { createPDF, savePDF, includeFlags }
}
