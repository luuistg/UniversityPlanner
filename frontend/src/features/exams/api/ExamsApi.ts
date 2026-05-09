import { api } from '../../../api/axios'

import type { Exam } from '../../../types/Exam'

export const getExams = async () => {
    const response = await api.get('/Exam')
    return response.data
}

export const getExamById = async (id: string) => {

    const response = await api.get(`/Exam/${id}`)
    return response.data

}

export const updateExam = async (id: string, exam: Exam) => {

    const response = (await api.put(`/Exam/${id}`, exam))
    return response.data
}

export const createExam = async (exam: Exam) => {

    const response = (await api.post('/Exam', exam))
    return response.data
}

export const deleteExam = async (id: string) => {

    const response = await api.delete(`/Exam/${id}`)
    return response.data
}