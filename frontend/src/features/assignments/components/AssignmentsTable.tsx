import { Trash2, Plus } from "lucide-react"
import { useAssignments } from "../hooks/useAssignments"

const STATUS_OPTIONS = ["Pending", "InProgress", "Review", "Completed"]
const STATUS_LABELS: Record<string, string> = {
    Pending: "Pendiente",
    InProgress: "En curso",
    Review: "En revisión",
    Completed: "Completada",
}

export default function AssignmentsTable({ subjectId }: { subjectId?: string }) {
    const { assignments, loading, error, handleDeleteAssignment, handleUpdateAssignment, handleCreateAssignment } = useAssignments(subjectId)

    if (loading) return <p className="text-sm text-text/50 py-4">Cargando tareas...</p>
    if (error) return <p className="text-sm text-secondary py-4">Error: {error}</p>

    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-text/50">{assignments.length} tareas</p>
                <button
                    onClick={() => handleCreateAssignment({ title: "Nueva tarea", dueDate: new Date().toISOString(), status: "Pending", subjectId: subjectId ?? "" })}
                    className="inline-flex items-center gap-1.5 text-sm font-medium bg-secondary text-white px-3 py-1.5 rounded-lg hover:bg-secondary/90 transition-colors">
                    <Plus size={15} />
                    Añadir
                </button>
            </div>

            <div className="rounded-xl overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-[2fr_1.5fr_1.5fr_40px] gap-4 px-4 py-2.5 bg-secondary text-xs font-semibold text-white uppercase tracking-wide">
                    <span>Título</span>
                    <span>Fecha límite</span>
                    <span>Estado</span>
                    <span></span>
                </div>

                {/* Rows */}
                {assignments.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-text/40">
                        No hay tareas todavía
                    </div>
                ) : (
                    assignments.map((assignment, index) => (
                        <div
                            key={`${assignment.assignmentId}-${assignment.title}-${assignment.status}-${assignment.dueDate}`} // clave única que cambia si se edita algo
                            className={`grid grid-cols-[2fr_1.5fr_1.5fr_40px] gap-4 px-4 py-3 items-center animate-slide-in-left ${
                                index % 2 === 0 ? "bg-transparent" : "bg-secondary/30"
                            }`}
                            style={{ animationDelay: `${index * 0.10}s` }}
                        >
                            {/* Título editable */}
                            <input
                                defaultValue={assignment.title}
                                className="bg-transparent text-sm text-text font-medium focus:outline-none focus:border-b focus:border-secondary w-full"
                                onBlur={(e) => {
                                    if (!e.target.value.trim()) {
                                        e.target.value = assignment.title  // restaura el valor original
                                        return
                                    }
                                    handleUpdateAssignment(assignment.assignmentId, {
                                        ...assignment,
                                        title: e.target.value,
                                    })
                                }}
                            />

                            {/* Fecha editable */}
                            <input
                                type="datetime-local"
                                defaultValue={assignment.dueDate?.slice(0, 16)}
                                className="bg-transparent text-sm text-text/70 focus:outline-none focus:border-b focus:border-secondary w-full"
                                onBlur={(e) => {
                                    handleUpdateAssignment(assignment.assignmentId, {
                                        ...assignment,
                                        dueDate: e.target.value,
                                    })
                                }}
                            />

                            {/* Estado editable */}
                            <select
                                defaultValue={assignment.status}
                                className="bg-transparent text-sm text-text/70 focus:outline-none cursor-pointer w-full"
                                onChange={(e) => {
                                    handleUpdateAssignment(assignment.assignmentId, {
                                        ...assignment,
                                        status: e.target.value,
                                    })
                                }}
                            >
                                {STATUS_OPTIONS.map(s => (
                                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                                ))}
                            </select>

                            {/* Eliminar */}
                            <button
                                onClick={() => handleDeleteAssignment(assignment.assignmentId)}
                                className="text-text/30 hover:text-secondary transition-colors flex items-center justify-center">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}