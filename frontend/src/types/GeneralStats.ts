import type { Exam } from './Exam'

export interface GeneralStats {
    subjectsCount: number
    assignmentsCount: number
    assignmentsPending: number
    assignmentsInProgress: number
    assignmentsReview: number
    assignmentsCompleted: number
    examsPending: Exam[]
}