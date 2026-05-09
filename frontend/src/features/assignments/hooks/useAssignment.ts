import { getAssignmentById } from "../api/AssignmentsApi";
import { useEffect, useState } from "react";
import type { Assignment } from "../../../types/Assignment";

export const useAssignment = (id: string) => {

    const [assignment, setAssignment] = useState<Assignment | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchAssignment()
    }, [])

    const fetchAssignment = async () => {

        setLoading(true)

        try{
            const data = await getAssignmentById(id)
            setAssignment(data)
        }catch(err){
            setError(err instanceof Error ? err.message : 'Unknown error')
        }finally{
            setLoading(false)
        }

    }

    return {assignment, loading, error, fetchAssignment}
}