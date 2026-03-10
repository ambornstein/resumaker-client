import jsPDF, { type TextOptionsLight } from "jspdf";
import type { Account, EducationData, JobData, ProjectData, Resume } from "../types/types";

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

    let index = 10;
    let lineSpacing = 0.5;

    function convertDate(stringValue: string) {
        return new Date(stringValue).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })
    }

    function createPDF(resume: Resume, account: Account) {
        const frame = document.getElementById("resume-page") as HTMLIFrameElement
        doc.setFont("Times New Roman")
        doc.setFontSize(12)

        createText(account.firstName + " " + account.lastName, true, 'center');
        createText(`${account.USCitizen ? "US Citizen" : ""} \u2022 ${account.phoneNumber} \u2022 ${account.email}`, true, 'center');

        createEducationSection(resume.educationHistory)
        createExperienceSection(resume.workHistory)
        createProjectSection(resume.projects)

        const string = doc.output('datauristring');
        frame.src = string
    }


    function createEducationSection(education: EducationData[]) {
        createText("Education", false)
        drawHorizontalLine()

        education.forEach((value) => {
            createText(value.degree, false)
            createText(`${convertDate(value.startDate)} — ${value.current ? convertDate(value.endDate!) : "Present"}`, true, "right")
            createText(value.schoolName)
            incrementLine()
        })
    }

    function createExperienceSection(experience: JobData[]) {
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

    function createProjectSection(projects: ProjectData[]) {
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

    function createText(text: string, increment = true, align: TextOptionsLight["align"] = "left") {
        let xPos;

        switch (align) {
            case "right":
                xPos = pageWidth - rightMargin
                break
            case "center":
                xPos = pageWidth / 2
                break
            default:
                xPos = leftMargin
        }

        doc.text(text, xPos, index, { maxWidth: pageWidth - leftMargin - rightMargin, align: align })
        if (increment) incrementLine()
    }

    function drawHorizontalLine() {
        index += 2
        doc.line(leftMargin, index, pageWidth - rightMargin, index)
        incrementLine()
    }

    function incrementLine() {
        index += doc.getTextDimensions("T").h + lineSpacing
    }

    return { createPDF }
}