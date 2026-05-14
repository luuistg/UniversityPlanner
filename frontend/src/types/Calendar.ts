export interface CalendarDay {
    date: Date
    isCurrentMonth: boolean
    isToday: boolean
    events: CalendarEvent[]
}

export interface CalendarEvent {
    id: string
    title: string
    date: Date
    type: 'assignment' | 'exam'
    color: string
    status?: string
    examType?: string  
}