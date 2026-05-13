import type { GeneralStats } from "../../../types/GeneralStats"
import { BookMarked, CalendarClock } from "lucide-react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"

const STATUS_DATA = (stats: GeneralStats) => [
    { name: "Pendiente", value: stats.assignmentsPending, color: "#FF4747" },
    { name: "En curso", value: stats.assignmentsInProgress, color: "#ffb347" },
    { name: "En revisión", value: stats.assignmentsReview, color: "#6ec6f5" },
    { name: "Completada", value: stats.assignmentsCompleted, color: "#6fcf97" },
].filter(d => d.value > 0)

export default function GeneralStatsPanel({ stats }: { stats: GeneralStats | null }) {
    if (!stats) return null

    const donutData = STATUS_DATA(stats)
    const completionPct = stats.assignmentsCount > 0
        ? Math.round((stats.assignmentsCompleted / stats.assignmentsCount) * 100)
        : 0

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold text-secondary mb-6">Resumen general</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card — asignaturas */}
                <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookMarked size={24} className="text-text" />
                    </div>
                    <div>
                        <p className="text-xs text-text/50 font-medium uppercase tracking-wide">Asignaturas</p>
                        <p className="text-4xl font-bold text-secondary mt-0.5">{stats.subjectsCount}</p>
                    </div>
                </div>

                {/* Card — exámenes próximos */}
                <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <CalendarClock size={24} className="text-text" />
                    </div>
                    <div>
                        <p className="text-xs text-text/50 font-medium uppercase tracking-wide">Exámenes próximos</p>
                        <p className="text-4xl font-bold text-secondary mt-0.5">{stats.examsPending?.length ?? 0}</p>
                    </div>
                </div>

                {/* Card — % completado */}
                <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-text">%</span>
                    </div>
                    <div>
                        <p className="text-xs text-text/50 font-medium uppercase tracking-wide">Tareas completadas</p>
                        <p className="text-4xl font-bold text-secondary mt-0.5">{completionPct}<span className="text-lg font-medium text-text/40">%</span></p>
                    </div>
                </div>

            </div>

            {/* Donut — distribución de tareas */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm font-semibold text-text/60 uppercase tracking-wide mb-6">Distribución de tareas</p>

                {donutData.length === 0 ? (
                    <p className="text-sm text-text/40 text-center py-8">Sin tareas todavía</p>
                ) : (
                    <div className="flex items-center gap-8">
                        <div className="relative flex-shrink-0">
                            <PieChart width={180} height={180}>
                                <Pie
                                    data={donutData}
                                    cx={85}
                                    cy={85}
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {donutData.map((entry) => (
                                        <Cell key={entry.name} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
                                />
                            </PieChart>
                            {/* Centro del donut */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <p className="text-2xl font-bold text-secondary">{stats.assignmentsCount}</p>
                                <p className="text-xs text-text/40">total</p>
                            </div>
                        </div>

                        {/* Leyenda */}
                        <div className="flex flex-col gap-3 flex-1">
                            {[
                                { label: "Pendiente", value: stats.assignmentsPending, color: "#FF4747" },
                                { label: "En curso", value: stats.assignmentsInProgress, color: "#ffb347" },
                                { label: "En revisión", value: stats.assignmentsReview, color: "#6ec6f5" },
                                { label: "Completada", value: stats.assignmentsCompleted, color: "#6fcf97" },
                            ].map(item => (
                                <div key={item.label} className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                                    <span className="text-sm text-text/70 flex-1">{item.label}</span>
                                    <span className="text-sm font-semibold text-text">{item.value}</span>
                                    <span className="text-xs text-text/40 w-8 text-right">
                                        {stats.assignmentsCount > 0 ? Math.round((item.value / stats.assignmentsCount) * 100) : 0}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}