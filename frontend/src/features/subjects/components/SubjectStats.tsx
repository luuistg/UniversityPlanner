import { useEffect, useState, useRef } from "react"
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts"
import { RefreshCw } from "lucide-react"
import { getSubjectStats } from "../api/SubjectsApi"

interface SubjectStatsData {
    assignmentsCount: number
    assignmentsPending: number
    assignmentsInProgress: number
    assignmentsReview: number
    assignmentsCompleted: number
    examsCount: number
    examsAverageGrade: number
}

interface ExamGrade {
    title: string
    grade?: number
}

const STATUS_COLORS: Record<string, string> = {
    Pending: "#FF4747",
    InProgress: "#ffb347",
    Review: "#6ec6f5",
    Completed: "#6fcf97",
}

const STATUS_LABELS: Record<string, string> = {
    Pending: "Pendiente",
    InProgress: "En curso",
    Review: "En revisión",
    Completed: "Completada",
}

export default function SubjectStats({ subjectId, exams }: { subjectId: string; exams: ExamGrade[] }) {
    const [stats, setStats] = useState<SubjectStatsData | null>(null)
    const [loading, setLoading] = useState(false)
    const statsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!subjectId) return
        setLoading(true)
        getSubjectStats(subjectId)
            .then(setStats)
            .finally(() => setLoading(false))
    }, [subjectId])

    const handleRefreshStats = () => {
        if (!subjectId) return
        setLoading(true)
        getSubjectStats(subjectId)
            .then(setStats)
            .finally(() => setLoading(false))
        
        // Focus en el apartado de estadísticas
        setTimeout(() => {
            statsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
    }

    if (loading) return <p className="text-sm text-text/50 py-4">Cargando estadísticas...</p>
    if (!stats) return null

    const donutData = [
        { name: "Pending", value: stats.assignmentsPending },
        { name: "InProgress", value: stats.assignmentsInProgress },
        { name: "Review", value: stats.assignmentsReview },
        { name: "Completed", value: stats.assignmentsCompleted },
    ].filter(d => d.value > 0)

    const barData = exams.map(e => ({
        name: e.title.length > 12 ? e.title.slice(0, 12) + "…" : e.title,
        nota: e.grade ?? 0,
        sinNota: e.grade == null,
    }))

    return (
        <div className="mt-8" ref={statsRef}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary">Estadísticas</h2>
                <button
                    onClick={handleRefreshStats}
                    disabled={loading}
                    className="p-2 hover:bg-secondary/10 rounded-lg transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={24} strokeWidth={3} className={`text-secondary ${loading ? "animate-spin" : ""}`} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Donut — tareas por estado */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-sm font-semibold text-text/60 uppercase tracking-wide mb-4">Tareas por estado</p>

                    {donutData.length === 0 ? (
                        <p className="text-sm text-secondary text-center py-8">Sin tareas todavía</p>
                    ) : (
                        <div className="flex items-center gap-6">
                            <PieChart width={140} height={140}>
                                <Pie
                                    data={donutData}
                                    cx={65}
                                    cy={65}
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {donutData.map((entry) => (
                                        <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [value, STATUS_LABELS[name as string]]}
                                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
                                />
                            </PieChart>

                            <div className="flex flex-col gap-2">
                                {donutData.map(d => (
                                    <div key={d.name} className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: STATUS_COLORS[d.name] }} />
                                        <span className="text-xs text-text/70">{STATUS_LABELS[d.name]}</span>
                                        <span className="text-xs font-semibold text-text ml-auto">{d.value}</span>
                                    </div>
                                ))}
                                <div className="mt-2 pt-2 border-t border-text/10 flex justify-between">
                                    <span className="text-xs text-text/50">Total</span>
                                    <span className="text-xs font-bold text-text">{stats.assignmentsCount}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Barras — nota por examen */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-4">Notas por examen</p>

                    {barData.length === 0 ? (
                        <p className="text-sm text-text/40 text-center py-8">Sin exámenes todavía</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={140}>
                            <BarChart data={barData} barSize={28}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
                                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    formatter={(value, _, props) =>
                                        props.payload.sinNota ? ["Sin nota", ""] : [`${value} / 10`, "Nota"]
                                    }
                                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
                                />
                                <Bar dataKey="nota" radius={[6, 6, 0, 0]}>
                                    {barData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={entry.sinNota ? "#e0e0e0" : entry.nota >= 5 ? "#FF4747" : "#ffb347"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                    {stats.examsAverageGrade > 0 && (
                        <p className="text-xs text-text/50 mt-3 text-right">
                            Media: <span className="font-semibold text-secondary">{stats.examsAverageGrade.toFixed(1)}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}