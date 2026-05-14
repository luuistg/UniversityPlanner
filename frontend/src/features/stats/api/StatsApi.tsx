import { api } from '../../../api/axios'

import type { Assignment } from '../../../types/Assignment'
import type { Exam } from '../../../types/Exam'
import type { GeneralStats } from '../../../types/GeneralStats'

export const getUpcomingAssignments = async () => {

    const response = await api.get(`/Stats/upcomingAssignments`)
    return response.data as Assignment[]

}

export const getUpcomingExams = async () => {

    const response = await api.get(`/Stats/upcomingExams`)
    return response.data as Exam[]

}

export const getStats = async () => {

    const response = await api.get(`/Stats`)
    return response.data as GeneralStats

}

