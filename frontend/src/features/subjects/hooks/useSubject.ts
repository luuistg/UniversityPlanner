import { getSubjectById, getSubjectStats } from "../api/SubjectsApi";
import { useEffect, useState } from "react";
import type { Subject } from "../../../types/Subject";

export const useSubject = (id: string) => {

    const [subject, setSubject] = useState<Subject | null>(null)
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchSubject()
        handleGetSubjectStats()
    }, [])

    const fetchSubject = async () => {

        setLoading(true)

        try{
            const data = await getSubjectById(id)
            setSubject(data)
        }catch(err){
            setError(err instanceof Error ? err.message : 'Unknown error')
        }finally{
            setLoading(false)
        }

    }

    const handleGetSubjectStats = async () => {
        setLoading(true)
        try {
            const stats = await getSubjectStats(id)
            setStats(stats)
            return stats
        }catch (err) {
            setError(err instanceof Error ? err.message: 'Unknown error')
            return null
        }finally {
            setLoading(false)
        }
    }

    return {subject, stats, loading, error, fetchSubject, handleGetSubjectStats}
}