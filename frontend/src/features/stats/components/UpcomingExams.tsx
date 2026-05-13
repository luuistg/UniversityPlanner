import type { Exam } from "../../../types/Exam"
import { CalendarDays } from "lucide-react"

const EXAM_TYPE_LABELS: Record<string, string> = {
    First: "1er parcial",
    Second: "2º parcial",
    Final: "Final",
}

const TYPE_COLORS: Record<string, string> = {
    First: "bg-secondary/10 text-secondary",
    Second: "bg-orange-100 text-orange-600",
    Final: "bg-blue-100 text-blue-600",
}

function daysUntil(dateStr: string) {
    const diff = new Date(dateStr).getTime() - Date.now()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return "Hoy"
    if (days === 1) return "Mañana"
    return `En ${days} días`
}

export default function UpcomingExams({ exams }: { exams: Exam[] }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-text">Próximos exámenes</h3>
                <CalendarDays size={18} className="text-secondary" />
            </div>

            {exams.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-sm text-text/40">Sin exámenes próximos</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {exams.slice(0, 3).map((exam) => (
                        <div key={exam.examId} className="flex items-center gap-3 p-3 rounded-xl bg-primary/30 hover:bg-primary/50 transition-colors">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text truncate">{exam.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[exam.examType] ?? "bg-gray-100 text-gray-500"}`}>
                                        {EXAM_TYPE_LABELS[exam.examType] ?? exam.examType}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-xs font-semibold text-secondary">{daysUntil(exam.date)}</p>
                                <p className="text-xs text-text/40 mt-0.5">
                                    {new Date(exam.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}