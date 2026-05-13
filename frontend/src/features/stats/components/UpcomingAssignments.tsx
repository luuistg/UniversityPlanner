import type { Assignment } from "../../../types/Assignment"
import { ClipboardList } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
    Pending: "bg-secondary/10 text-secondary",
    InProgress: "bg-orange-100 text-orange-600",
    Review: "bg-blue-100 text-blue-600",
    Completed: "bg-green-100 text-green-600",
}

const STATUS_LABELS: Record<string, string> = {
    Pending: "Pendiente",
    InProgress: "En curso",
    Review: "En revisión",
    Completed: "Completada",
}

function daysUntil(dateStr: string) {
    const diff = new Date(dateStr).getTime() - Date.now()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return "Hoy"
    if (days === 1) return "Mañana"
    return `En ${days} días`
}

export default function UpcomingAssignments({ assignments }: { assignments: Assignment[] }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-text">Próximas entregas</h3>
                <ClipboardList size={18} className="text-secondary" />
            </div>

            {assignments.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-sm text-text/40">Sin entregas próximas</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {assignments.slice(0, 3).map((assignment) => (
                        <div key={assignment.assignmentId} className="flex items-center gap-3 p-3 rounded-xl bg-primary/30 hover:bg-primary/50 transition-colors">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text truncate">{assignment.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[assignment.status] ?? "bg-gray-100 text-gray-500"}`}>
                                        {STATUS_LABELS[assignment.status] ?? assignment.status}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-xs font-semibold text-secondary">{daysUntil(assignment.dueDate)}</p>
                                <p className="text-xs text-text/40 mt-0.5">
                                    {new Date(assignment.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}