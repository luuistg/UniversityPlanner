import { Plus, Trash2 } from "lucide-react"
import { useExams } from "../hooks/useExams"

const EXAM_TYPE_OPTIONS = ["First", "Second", "Final"]
const EXAM_TYPE_LABELS: Record<string, string> = {
    First: "Primer parcial",
    Second: "Segundo parcial",
    Final: "Final",
}

const normalizeExamType = (value?: string) => {
    if (value === "Frist") return "First"
    if (value === "first") return "First"
    if (value === "second") return "Second"
    if (value === "final") return "Final"
    return value ?? "First"
}

export default function ExamsTable({ subjectId }: { subjectId?: string }) {
    const { exams, loading, error, handleCreateExam, handleDeleteExam, handleUpdateExam } = useExams(subjectId)

    if (loading) return <p className="text-sm text-text/50 py-4">Cargando exámenes...</p>
    if (error) return <p className="text-sm text-secondary py-4">Error: {error}</p>

    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-text/50">{exams.length} exámenes</p>
                <button
                    onClick={() =>
                        handleCreateExam({
                            title: "Nuevo examen",
                            date: new Date().toISOString(),
                            examType: "First",
                            grade: undefined,
                            subjectId: subjectId ?? "",
                        })
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-medium bg-secondary text-white px-3 py-1.5 rounded-lg hover:bg-secondary/90 transition-colors"
                >
                    <Plus size={15} />
                    Añadir
                </button>
            </div>

            <div className="rounded-xl overflow-hidden">
                <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_40px] gap-4 px-4 py-2.5 bg-secondary text-xs font-semibold text-white uppercase tracking-wide">
                    <span>Título</span>
                    <span>Fecha</span>
                    <span>Tipo</span>
                    <span>Nota</span>
                    <span></span>
                </div>

                {exams.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-text/40">
                        No hay exámenes todavía
                    </div>
                ) : (
                    exams.map((exam, index) => (
                        <div
                            key={`${exam.examId}-${exam.title}-${exam.examType}-${exam.date}-${exam.grade ?? "no-grade"}`}
                            className={`grid grid-cols-[2fr_1.5fr_1.5fr_1fr_40px] gap-4 px-4 py-3 items-center ${
                                index % 2 === 0 ? "bg-transparent" : "bg-secondary/30"
                            }`}
                        >
                            <input
                                defaultValue={exam.title}
                                className="bg-transparent text-sm text-text font-medium focus:outline-none focus:border-b focus:border-secondary w-full"
                                onBlur={(e) => {
                                    if (!e.target.value.trim()) {
                                        e.target.value = exam.title
                                        return
                                    }

                                    handleUpdateExam(exam.examId, {
                                        ...exam,
                                        title: e.target.value,
                                    })
                                }}
                            />

                            <input
                                type="datetime-local"
                                defaultValue={exam.date?.slice(0, 16)}
                                className="bg-transparent text-sm text-text/70 focus:outline-none focus:border-b focus:border-secondary w-full"
                                onBlur={(e) => {
                                    handleUpdateExam(exam.examId, {
                                        ...exam,
                                        date: e.target.value,
                                    })
                                }}
                            />

                            <select
                                defaultValue={normalizeExamType(exam.examType)}
                                className="bg-transparent text-sm text-text/70 focus:outline-none cursor-pointer w-full"
                                onChange={(e) => {
                                    handleUpdateExam(exam.examId, {
                                        ...exam,
                                        examType: normalizeExamType(e.target.value),
                                    })
                                }}
                            >
                                {EXAM_TYPE_OPTIONS.map((type) => (
                                    <option key={type} value={type}>
                                        {EXAM_TYPE_LABELS[type]}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                step="0.1"
                                defaultValue={exam.grade ?? ""}
                                placeholder="-"
                                className="bg-transparent text-sm text-text/70 focus:outline-none focus:border-b focus:border-secondary w-full"
                                onBlur={(e) => {
                                    handleUpdateExam(exam.examId, {
                                        ...exam,
                                        grade: e.target.value === "" ? undefined : Number(e.target.value),
                                    })
                                }}
                            />

                            <button
                                onClick={() => handleDeleteExam(exam.examId)}
                                className="text-text/30 hover:text-secondary transition-colors flex items-center justify-center"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}