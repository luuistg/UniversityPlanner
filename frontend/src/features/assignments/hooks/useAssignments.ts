import { getAssignments, deleteAssignment, updateAssignment, createAssignment } from "../api/AssignmentsApi";
import { useEffect, useState } from "react";
import type { Assignment } from "../../../types/Assignment";

export const useAssignments = (subjectId?: string) => {

    const [assignments, setAssignments] = useState<Assignment[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchAssignments()
    }, [subjectId])

    const fetchAssignments = async () => {
        setLoading(true)
        try {
            const data = await getAssignments(subjectId)
            setAssignments(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateAssignment = async (assignment: Omit<Assignment, 'assignmentId'>) => {
        setLoading(true)
        try {
            await createAssignment(assignment as Assignment)
            fetchAssignments()
        }catch (err) {
            setError(err instanceof Error ? err.message: 'Unknown error')
        }finally {
            setLoading(false)
        }
    }

    const handleDeleteAssignment = async (id: string) => {
        setLoading(true)
        try {
            await deleteAssignment(id)
            fetchAssignments()
        }catch (err) {
            setError(err instanceof Error ? err.message: 'Unknown error')
        }finally {
            setLoading(false)
        }
    }

    const handleUpdateAssignment = async (id: string, assignment: Assignment) => {
        setLoading(true)
        try {
            await updateAssignment(id, assignment)
            fetchAssignments()
        }catch (err) {
            setError(err instanceof Error ? err.message: 'Unknown error')
        }finally {
            setLoading(false)
        }
    }

    return { assignments, loading, error, fetchAssignments, handleCreateAssignment, handleDeleteAssignment, handleUpdateAssignment }
}
