import jsPDF, { type TextOptionsLight } from "jspdf";
import type { Account, EducationEntry, WorkExperienceEntry, ProjectEntry, Resume, Skills } from "../types/types";

const leftMargin = 10
const rightMargin = 10

export function usePDFBuilder() {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    const maxTextWidth = pageWidth - leftMargin - rightMargin

    let cursor = { x: leftMargin, y: 10 };
    let lineSpacing = 0.5;

    function convertDate(stringValue: string) {
        return new Date(stringValue).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })
    }

    function createPDF(resume: Resume, account: Account) {

        const frame = document.getElementById("resume-page") as HTMLIFrameElement
        doc.setFont("Times New Roman")
        doc.setFontSize(12)

        createHeader(account)
        createEducationSection(resume.educationHistory)
        createSkillsSection(resume.skills)
        createExperienceSection(resume.workHistory)
        createProjectSection(resume.projects)

        const string = doc.output('datauristring');
        frame.src = string
    }

    function createHeader(account: Account) {
        doc.setFontSize(24)

        createText(account.firstName + " " + account.lastName, true, 'center');
        doc.setFontSize(12)

        let contacts = []

        contacts.push(account.USCitizen ? "US Citizen" : null)
        contacts.push(account.location)
        contacts.push(account.email)
        contacts.push(account.phoneNumber)
        contacts.push(account.linkedInLink?.replace("https://", ""))
        contacts.push(account.githubLink?.replace("https://", ""))
        contacts = contacts.filter(i => i)

        createText(contacts.join(' \u2022 '), true, 'center');
        doc.textWithLink
        incrementLine()
    }

    function createEducationSection(education: EducationEntry[]) {
        createText("Education", false)
        drawHorizontalLine()

        education.forEach((value) => {
            createText(value.degree, false)
            createText(`${convertDate(value.startDate)} — ${value.current ? convertDate(value.endDate!) : "Present"}`, true, "right")
            createText(value.schoolName)
            incrementLine()
        })
    }

    function createSkillsSection(skills: Skills) {
        createText("Skills", false)
        drawHorizontalLine()

        skills.skillCategories.forEach((value) => {
            doc.setFont("Times New Roman", "bold")
            if (value.categoryName) createText(value.categoryName + ": ", false)
            doc.setFont("Times New Roman", "normal")

            createText(value.skills.join(","))
        })
        cursor.y += 2
    }

    function createExperienceSection(experience: WorkExperienceEntry[]) {
        createText("Work Experience", false)
        drawHorizontalLine()

        experience.forEach((value) => {
            createText(`${value.title}, ${value.company}`, false)
            createText(`${convertDate(value.startDate)} — ${value.current ? convertDate(value.endDate!) : "Present"}`, true, "right")

            value.bulletPoints.forEach((bullet) => {
                createText(`\u2022 ${bullet}`)
            })
            incrementLine()
        })
    }

    function createProjectSection(projects: ProjectEntry[]) {
        createText("Projects", false)
        drawHorizontalLine()

        projects.forEach((value) => {
            createText(value.title)
            createText(value.description)

            value.bulletPoints.forEach((bullet) => {
                createText(`\u2022 ${bullet}`)
            })
            incrementLine()
        })
    }

    function createText(text: string | string[], newLine = true, align?: TextOptionsLight["align"]) {
        let xPos;

        switch (align) {
            case "right":
                xPos = pageWidth - rightMargin
                break
            case "center":
                xPos = pageWidth / 2
                break
            case "left":
                xPos = leftMargin
                break
            default:
                xPos = cursor.x
        }

        doc.text(text, xPos, cursor.y, { maxWidth: maxTextWidth, align: align })

        const textBlock = Array.isArray(text) ? text.join() : text;
        const strings = doc.splitTextToSize(textBlock, maxTextWidth)
        for (let t of strings) {
            const size = doc.getTextDimensions(t)
            console.log(t)
            cursor.x += size.w
            if (cursor.x - leftMargin > maxTextWidth) {
                cursor.y += size.h + lineSpacing
                cursor.x = leftMargin
            }
        }

        if (newLine) {
            incrementLine()
        }
    }

    function drawHorizontalLine() {
        cursor.y += 2
        doc.line(leftMargin, cursor.y, pageWidth - rightMargin, cursor.y)
        incrementLine()
    }

    function incrementLine() {
        cursor.y += doc.getTextDimensions("T").h + lineSpacing
        cursor.x = leftMargin
    }

    return { createPDF }
}