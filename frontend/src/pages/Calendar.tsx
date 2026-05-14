  import { useRef, useEffect } from "react"
import CalendarGrid from "../features/calendar/components/CalendarGrid"

export default function Calendar() {



  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
      calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-secondary">Calendario</h1>
      <div ref={calendarRef}>
      <CalendarGrid />
      </div>
    </div>
  )

}