import jsPDF, { type TextOptionsLight } from "jspdf";
import type { Account, EducationEntry, WorkExperienceEntry, ProjectEntry, Resume, Skills, ResumeStyleTemplate, FontOptions } from "../lib/types/types";

const leftMargin = 10
const rightMargin = 10

const defaultTemplate: ResumeStyleTemplate = {
    margin: {
        top: 8,
        bottom: 8,
        left: 10,
        right: 10
    },
    titleStyle: {
        fontSize: 24,
        font: "Times New Roman",
        fontStyle: "normal"
    },
    headerStyle: {
        fontSize: 12,
        font: "Times New Roman",
        fontStyle: "bold",
        horizontalRule: {
            width: 2
        },
        indentAmount: -2
    },
    textStyle: {
        fontSize: 12,
        font: "Times New Roman",
        fontStyle: "normal"
    },
    lineSpacing: 2,
    bulletSymbol: '\u2022',
    dividerSymbol: '\u2022'
}


export function usePDFBuilder() {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    let maxTextWidth: number;
    let cursor = { x: 0, y: 0 };
    let template: ResumeStyleTemplate;

    function convertDate(stringValue: string) {
        return new Date(stringValue).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })
    }

    function createPDF(resume: Resume, account: Account) {
        template = defaultTemplate
        cursor = { x: template.margin.left, y: template.margin.right };
        maxTextWidth = pageWidth - leftMargin - rightMargin;

        const frame = document.getElementById("resume-page") as HTMLIFrameElement

        createHeader(account)
        createEducationSection(resume.educationHistory)
        createSkillsSection(resume.skills)
        createExperienceSection(resume.workHistory)
        createProjectSection(resume.projects)

        const string = doc.output('datauristring');
        frame.src = string
    }

    function createHeader(account: Account) {
        setFontStyle(template.titleStyle)
        createText(account.firstName + " " + account.lastName, true, 0, 'center');

        setFontStyle(template.textStyle)

        let contacts = []

        contacts.push(account.USCitizen ? "US Citizen" : null)
        contacts.push(account.location)
        contacts.push(account.email)
        contacts.push(account.phoneNumber)
        contacts.push(account.linkedInLink?.replace("https://", ""))
        contacts.push(account.githubLink?.replace("https://", ""))
        contacts = contacts.filter(i => i)

        createText(contacts.join(` ${template.dividerSymbol} `), true, 0, 'center');
        incrementLine()
    }

    function createEducationSection(education: EducationEntry[]) {
        setFontStyle(template.headerStyle)
        createText("Education", false, template.headerStyle.indentAmount)

        drawHorizontalLine()
        setFontStyle(template.textStyle)
        education.forEach((value) => {
            createText(value.degree, false)
            createText(`${convertDate(value.startDate)} — ${value.current ? convertDate(value.endDate!) : "Present"}`, true, 0, "right")
            createText(value.schoolName)
            incrementLine()
        })
    }

    function createSkillsSection(skills: Skills) {
        setFontStyle(template.headerStyle)
        createText("Skills", false, template.headerStyle.indentAmount)

        drawHorizontalLine()
        
        skills.skillCategories.forEach((value) => {
            setFontStyle(template.textStyle)
            setFontMode('bold')
            if (value.categoryName) createText(value.categoryName + ": ", false)
            setFontStyle(template.textStyle)

            createText(value.skills.join(", "))
        })
        incrementLine()
    }

    function createExperienceSection(experience: WorkExperienceEntry[]) {
        setFontStyle(template.headerStyle)
        createText("Work Experience", false, template.headerStyle.indentAmount)

        drawHorizontalLine()
        setFontStyle(template.textStyle)
        experience.forEach((value) => {
            createText(`${value.title}, ${value.company}`, false)
            createText(`${convertDate(value.startDate)} — ${value.current ? convertDate(value.endDate!) : "Present"}`, true, 0, "right")

            value.bulletPoints.forEach((bullet) => {
                createText(`${template.bulletSymbol} ${bullet}`, true, template.bulletIndent)
            })
            incrementLine()
        })
    }

    function createProjectSection(projects: ProjectEntry[]) {
        setFontStyle(template.headerStyle)
        createText("Projects", false, template.headerStyle.indentAmount)

        drawHorizontalLine()
        setFontStyle(template.textStyle)
        projects.forEach((value) => {
            createText(value.title)
            createText(value.description)

            value.bulletPoints.forEach((bullet) => {
                createText(`${template.bulletSymbol} ${bullet}`, true, template.bulletIndent)
            })
            incrementLine()
        })
    }

    function createText(text: string | string[], newLine = true, xPad = 0, align?: TextOptionsLight["align"]) {
        let xPos;

        switch (align) {
            case "right":
                xPos = pageWidth - rightMargin
                xPos -= xPad
                break
            case "center":
                xPos = pageWidth / 2
                xPos += xPad
                break
            case "left":
                xPos = leftMargin
                xPos += xPad
                break
            default:
                xPos = cursor.x
                xPos += xPad
        }

        doc.text(text, xPos, cursor.y, { maxWidth: maxTextWidth, align: align })

        const textBlock = Array.isArray(text) ? text.join() : text;
        const strings = doc.splitTextToSize(textBlock, maxTextWidth)
        for (let t of strings) {
            const size = doc.getTextDimensions(t)

            cursor.x += size.w
            if (cursor.x - leftMargin > maxTextWidth) {
                cursor.y += size.h + template.lineSpacing
                cursor.x = leftMargin
            }
        }

        if (newLine) {
            incrementLine()
        }
    }

    function drawHorizontalLine() {
        cursor.y += template.lineSpacing
        doc.line(leftMargin, cursor.y, pageWidth - rightMargin, cursor.y)
        incrementLine()
    }

    function incrementLine() {
        cursor.y += doc.getTextDimensions("T").h + template.lineSpacing
        cursor.x = leftMargin
    }

    function setFontStyle(options: FontOptions) {
        doc.setFont(options.font, options.fontStyle)
        doc.setFontSize(options.fontSize)
    }

    function setFontMode(mode: string) {
        doc.setFont(doc.getFont().fontName, mode)
    }

    return { createPDF }
}