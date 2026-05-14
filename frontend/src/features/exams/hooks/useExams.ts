import { getExams, deleteExam, updateExam, createExam } from "../api/ExamsApi";
import { useEffect, useState } from "react";
import type { Exam } from "../../../types/Exam";

export const useExams = (subjectId?: string) => {

    const [exams, setExams] = useState<Exam[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchExams()
    }, [subjectId])

    const fetchExams = async () => {
        setLoading(true)
        try {
            const data = await getExams(subjectId)
            setExams(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateExam = async (exam: Omit<Exam, 'examId'>) => {
        setLoading(true)
        try {
            await createExam(exam as Exam)
            fetchExams()
        }catch (err) {
            setError(err instanceof Error ? err.message: 'Unknown error')
        }finally {
            setLoading(false)
        }
    }

    const handleDeleteExam = async (id: string) => {
        setLoading(true)
        try {
            await deleteExam(id)
            fetchExams()
        }catch (err) {
            setError(err instanceof Error ? err.message: 'Unknown error')
        }finally {
            setLoading(false)
        }
    }

    const handleUpdateExam = async (id: string, exam: Exam) => {
        setLoading(true)
        try {
            await updateExam(id, exam)
            fetchExams()
        }catch (err) {
            setError(err instanceof Error ? err.message: 'Unknown error')
        }finally {
            setLoading(false)
        }
    }

    return { exams, loading, error, fetchExams, handleCreateExam, handleDeleteExam, handleUpdateExam }
}
