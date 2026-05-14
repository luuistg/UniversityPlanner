import { useStats } from "../features/stats/hooks/UseStats"
import UpcomingAssignments from "../features/stats/components/UpcomingAssignments"
import UpcomingExams from "../features/stats/components/UpcomingExams"
import GeneralStatsPanel from "../features/stats/components/GeneralStatsPanel"

export default function DashBoard() {

 const { stats, upcomingExams, upcomingAssignments } = useStats()

  return (
      <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <UpcomingAssignments assignments={upcomingAssignments} />
              <UpcomingExams exams={upcomingExams} />
          </div>
          <GeneralStatsPanel stats={stats} />
      </div>
  )
}