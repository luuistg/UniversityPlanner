import { useEffect, useState } from "react";
import { getSubjectById, getSubjectStats } from "../api/SubjectsApi";
import type { Subject } from "../../../types/Subject";

export const useSubject = (id: string | null) => {
    const [subject, setSubject] = useState<Subject | null>(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSubject = async (subjectId: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getSubjectById(subjectId);
            setSubject(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const handleGetSubjectStats = async (subjectId: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getSubjectStats(subjectId);
            setStats(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) {
            setSubject(null);
            setLoading(false);
            setError(null);
            return;
        }

        fetchSubject(id);
    }, [id]);

    return { subject, stats, loading, error, fetchSubject, handleGetSubjectStats };
};