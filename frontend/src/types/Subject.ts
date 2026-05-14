export interface Subject {
    subjectId: string
    name: string
    credits: number
    icon: string
    color: string
}

export interface SubjectWithStats extends Subject {
    assignmentsCount: number
    assignmentsPending: number
    assignmentsInProgress: number
    assignmentsReview: number
    assignmentsCompleted: number
    examsCount: number
    examsAverageGrade?: number
}