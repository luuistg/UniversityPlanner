import { useAssignments } from "../../assignments/hooks/useAssignments"
import { useExams } from "../../exams/hooks/useExams"
import { useCalendar } from "../hooks/useCalendar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import type { CalendarEvent } from "../../../types/Calendar"
import { Calendar, Clock, Tag, BookOpen } from "lucide-react"

const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const STATUS_LABELS: Record<string, string> = {
    Pending: "Pendiente",
    InProgress: "En curso",
    Review: "En revisión",
    Completed: "Completada",
}

const EXAM_TYPE_LABELS: Record<string, string> = {
    First: "1er parcial",
    Second: "2º parcial",
    Final: "Final",
}

export default function CalendarGrid() {
    const { assignments } = useAssignments()
    const { exams } = useExams()
    const { days, currentDate, prevMonth, nextMonth, goToToday } = useCalendar(assignments, exams)

    const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null)
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })

    const monthLabel = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })
    const monthCapitalized = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative">

            {/* Tooltip */}
            {hoveredEvent && (
                <div
                    className="fixed z-50 bg-white rounded-xl shadow-lg border border-text/10 p-3 w-52 pointer-events-none"
                    style={{ top: hoverPos.y + 12, left: hoverPos.x + 12 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredEvent.color }} />
                        <p className="text-xs font-semibold text-text/50 uppercase tracking-wide">
                            {hoveredEvent.type === 'assignment' ? 'Entrega' : 'Examen'}
                        </p>
                    </div>
                    <p className="text-sm font-semibold text-text mb-2">{hoveredEvent.title}</p>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={11} className="text-text/40" />
                            <p className="text-xs text-text/50">
                                {hoveredEvent.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                            </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={11} className="text-text/40" />
                            <p className="text-xs text-text/50">
                                {hoveredEvent.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                        {hoveredEvent.type === 'assignment' && hoveredEvent.status && (
                            <div className="flex items-center gap-1.5">
                                <Tag size={11} className="text-text/40" />
                                <p className="text-xs text-text/50">{STATUS_LABELS[hoveredEvent.status]}</p>
                            </div>
                        )}
                        {hoveredEvent.type === 'exam' && hoveredEvent.examType && (
                            <div className="flex items-center gap-1.5">
                                <BookOpen size={11} className="text-text/40" />
                                <p className="text-xs text-text/50">{EXAM_TYPE_LABELS[hoveredEvent.examType]}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Cabecera */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-text/10">
                <div className="flex items-center gap-3">
                    <div className="text-center">
                        <p className="text-xs font-semibold text-secondary uppercase tracking-wide">
                            {currentDate.toLocaleString('es-ES', { month: 'short' })}
                        </p>
                        <p className="text-2xl font-bold text-text leading-none">
                            {currentDate.getDate()}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-text">{monthCapitalized}</h2>
                        <p className="text-xs text-text/40">
                            {new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} – {new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={goToToday}
                        className="text-sm font-medium px-3 py-1.5 border border-text/15 rounded-lg hover:bg-text/5 transition-colors"
                    >
                        Hoy
                    </button>
                    <div className="flex items-center gap-1">
                        <button onClick={prevMonth} className="p-1.5 rounded-lg border border-text/15 hover:bg-text/5 transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <button onClick={nextMonth} className="p-1.5 rounded-lg border border-text/15 hover:bg-text/5 transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7">

                {/* Cabecera días semana */}
                {DAYS_OF_WEEK.map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-text/40 uppercase tracking-wide border-b border-text/10">
                        {day}
                    </div>
                ))}

                {/* Celdas */}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`min-h-[90px] p-2 border-b border-r border-text/5 transition-colors
                            ${index % 7 === 6 ? 'border-r-0' : ''}
                            ${!day.isCurrentMonth ? 'bg-transparent' : 'bg-white hover:bg-primary/20'}
                        `}
                    >
                        <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium mb-1 ${
                            day.isToday
                                ? 'bg-secondary text-white font-bold'
                                : day.isCurrentMonth ? 'text-text' : 'text-text/25'
                        }`}>
                            {day.date.getDate()}
                        </div>

                        <div className="flex flex-col gap-0.5">
                            {day.events.slice(0, 2).map(event => (
                                <div
                                    key={event.id}
                                    className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-white text-xs truncate cursor-pointer hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: event.color }}
                                    onMouseEnter={(e) => {
                                        setHoveredEvent(event)
                                        setHoverPos({ x: e.clientX, y: e.clientY })
                                    }}
                                    onMouseLeave={() => setHoveredEvent(null)}
                                    onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
                                >
                                    <span className="truncate">{event.title}</span>
                                </div>
                            ))}
                            {day.events.length > 2 && (
                                <p className="text-xs text-text/40 px-1">{day.events.length - 2} más...</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Leyenda */}
            <div className="flex items-center gap-4 px-6 py-3 border-t border-text/10">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-xs text-text/50">Entregas</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    <span className="text-xs text-text/50">Exámenes</span>
                </div>
            </div>
        </div>
    )
}