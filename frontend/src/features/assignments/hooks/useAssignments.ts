import { getAssignments, deleteAssignment, updateAssignment, createAssignment } from "../api/AssignmentsApi";
import { useEffect, useState } from "react";
import type { Assignment } from "../../../types/Assignment";

export const useAssignments = () => {

    const [assignments, setAssignments] = useState<Assignment[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchAssignments()
    }, [])

    const fetchAssignments = async () => {
        setLoading(true)
        try {
            const data = await getAssignments()
            setAssignments(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateAssignment = async (assignment: Assignment) => {
        setLoading(true)
        try {
            await createAssignment(assignment)
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
