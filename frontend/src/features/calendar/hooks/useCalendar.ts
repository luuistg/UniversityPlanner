import { useMemo, useState } from "react"
import type { Assignment } from "../../../types/Assignment"
import type { Exam } from "../../../types/Exam"
import type { CalendarDay, CalendarEvent } from "../../../types/Calendar"


export const useCalendar = (assignments: Assignment[], exams: Exam[]) => {

    // Estado del mes y año que estamos viendo
    const [currentDate, setCurrentDate] = useState(new Date())

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() // 0-11

    // Convertir assignments y exams a eventos del calendario
    const events: CalendarEvent[] = useMemo(() => [
        ...assignments.map(a => ({
            id: a.assignmentId,
            title: a.title,
            date: new Date(a.dueDate),
            type: 'assignment' as const,
            color: '#7f83fb',
            status: a.status
        })),
        ...exams.map(e => ({
            id: e.examId,
            title: e.title,
            date: new Date(e.date),
            type: 'exam' as const,
            color: '#e62b36',
            examType: e.examType
        }))
    ], [assignments, exams])

    // Construir el grid del mes
    const days: CalendarDay[] = useMemo(() => {
        const today = new Date()

        // Primer día del mes (ej. jueves)
        const firstDayOfMonth = new Date(year, month, 1)
        
        // getDay() devuelve 0=domingo, 1=lunes... 
        // Convertimos a lunes=0 para que la semana empiece en lunes
        let startDayOfWeek = firstDayOfMonth.getDay()
        startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1

        // Cuántos días tiene el mes
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        const grid: CalendarDay[] = []

        // Días del mes anterior para rellenar el inicio
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            const date = new Date(year, month, -i)
            grid.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                events: []
            })
        }

        // Días del mes actual
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(year, month, d)
            
            // Filtramos los eventos que caen en este día
            const dayEvents = events.filter(e =>
                e.date.getFullYear() === year &&
                e.date.getMonth() === month &&
                e.date.getDate() === d
            )

            grid.push({
                date,
                isCurrentMonth: true,
                isToday: date.toDateString() === today.toDateString(),
                events: dayEvents
            })
        }

        // Días del mes siguiente para completar las 42 celdas
        while (grid.length < 42) {
            const date = new Date(year, month + 1, grid.length - daysInMonth - startDayOfWeek + 1)
            grid.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                events: []
            })
        }

        return grid
    }, [year, month, events])

    // Navegar al mes anterior
    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    // Navegar al mes siguiente
    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    // Volver al mes actual
    const goToToday = () => {
        setCurrentDate(new Date())
    }

    return { days, currentDate, prevMonth, nextMonth, goToToday, year, month }
}