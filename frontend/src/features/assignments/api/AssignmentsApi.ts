import { api } from '../../../api/axios'

import type { Assignment } from '../../../types/Assignment'

export const getAssignments = async () => {
    const response = await api.get('/Assignment')
    return response.data
}

export const getAssignmentById = async (id: string) => {

    const response = await api.get(`/Assignment/${id}`)
    return response.data

}

export const updateAssignment = async (id: string, assignment: Assignment) => {

    const response = (await api.put(`/Assignment/${id}`, assignment))
    return response.data
}

export const createAssignment = async (assignment: Assignment) => {

    const response = (await api.post('/Assignment', assignment))
    return response.data
}

export const deleteAssignment = async (id: string) => {

    const response = await api.delete(`/Assignment/${id}`)
    return response.data
}