import { getExamById } from "../api/ExamsApi";
import { useEffect, useState } from "react";
import type { Exam } from "../../../types/Exam";

export const useExam = (id: string) => {

    const [exam, setExam] = useState<Exam | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchExam()
    }, [])

    const fetchExam = async () => {

        setLoading(true)

        try{
            const data = await getExamById(id)
            setExam(data)
        }catch(err){
            setError(err instanceof Error ? err.message : 'Unknown error')
        }finally{
            setLoading(false)
        }

    }

    return {exam, loading, error, fetchExam}
}