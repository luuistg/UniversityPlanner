import { useEffect, useState } from "react"
import type { GeneralStats } from "../../../types/GeneralStats"
import { getStats, getUpcomingExams, getUpcomingAssignments } from "../api/StatsApi"
import type { Assignment } from "../../../types/Assignment"
import type { Exam } from "../../../types/Exam"

export const useStats = () => {

    const [stats, setStats] = useState<GeneralStats | null>(null)
    const [loading, setLoading] = useState(false)
    const [upcomingExams, setUpcomingExams] = useState<Exam[]>([])
    const [upcomingAssignments, setUpcomingAssignments] = useState<Assignment[]>([])

    const fetchStats = async () => {
        setLoading(true)
        try {
            const [data, exams, assignments] = await Promise.all([
                getStats(),
                getUpcomingExams(),
                getUpcomingAssignments()
            ])
            setStats(data)
            setUpcomingExams(exams)
            setUpcomingAssignments(assignments)
        } catch (error) {
            console.error("Error fetching stats:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])

    return { stats, loading, fetchStats, upcomingExams, upcomingAssignments }
}