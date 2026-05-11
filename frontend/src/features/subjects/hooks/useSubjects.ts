import { getSubjects, deleteSubject, updateSubject, createSubject } from "../api/SubjectsApi";
import { useEffect, useState } from "react";
import type { Subject, SubjectWithStats } from "../../../types/Subject";

export const useSubjects = () => {

    const [subjects, setSubjects] = useState<SubjectWithStats[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchSubjects()
    }, [])

    const fetchSubjects = async () => {
        setLoading(true)
        try {
            const data = await getSubjects()
            setSubjects(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateSubject = async (subject: Subject) => {
        setLoading(true)
        try {
            await createSubject(subject)
            fetchSubjects()
        }catch (err) {
            setError(err instanceof Error ? err.message: 'Unknown error')
        }finally {
            setLoading(false)
        }
    }

    const handleDeleteSubject = async (id: string) => {
        setLoading(true)
        try {
            await deleteSubject(id)
            fetchSubjects()
        }catch (err) {
            setError(err instanceof Error ? err.message: 'Unknown error')
        }finally {
            setLoading(false)
        }
    }

    const handleUpdateSubject = async (id: string, subject: Subject) => {
        setLoading(true)
        try {
            await updateSubject(id, subject)
            fetchSubjects()
        }catch (err) {
            setError(err instanceof Error ? err.message: 'Unknown error')
        }finally {
            setLoading(false)
        }
    }

    return { subjects, loading, error, fetchSubjects, handleCreateSubject, handleDeleteSubject, handleUpdateSubject }
}

