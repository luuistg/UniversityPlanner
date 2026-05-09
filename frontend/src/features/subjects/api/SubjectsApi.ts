import { api } from '../../../api/axios'

import type { Subject } from '../../../types/Subject'

export const getSubjects = async () => {
    const response = await api.get('/Subject')
    return response.data
}

export const getSubjectById = async (id: string) => {

    const response = await api.get(`/Subject/${id}`)
    return response.data

}

export const updateSubject = async (id: string, subject: Subject) => {

    const response = (await api.put(`/Subject/${id}`, subject))
    return response.data
}

export const createSubject = async (subject: Subject) => {

    const response = (await api.post('/Subject', subject))
    return response.data
}

export const deleteSubject = async (id: string) => {

    const response = await api.delete(`/Subject/${id}`)
    return response.data
}

export const getSubjectStats = async (id: string) => {

    const response = await api.get(`/Subject/${id}/Stats`)
    return response.data
}