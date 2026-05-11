
import { useParams } from "react-router-dom";
import { useSubject } from "../features/subjects/hooks/useSubject";
import { iconMap } from "../components/IconsMap";
import { FilePen } from "lucide-react";
import { DetailBtn } from "../features/subjects/components/DetailBtn";
import { useState } from "react";
import AssignmentsTable from "../features/assignments/components/AssignmentsTable";
import ExamsTable from "../features/exams/components/ExamsTable";
import SubjectStats from "../features/subjects/components/SubjectStats";
import { useExams } from "../features/exams/hooks/useExams"

export default function SubjectInfo() {
  const { id } = useParams();
  const { subject, loading, error } = useSubject(id ?? null);
  const [activeTab, setActiveTab] = useState<'tasks' | 'exams'>('tasks')
  const Icon = (subject?.icon && iconMap[subject.icon]) ? iconMap[subject.icon] : FilePen;
  const { exams } = useExams(id)
  
  if (loading) {
    return <div className="p-6 text-secondary">Cargando asignatura...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  if (!subject) {
    return <div className="p-6 text-secondary">No se encontró la asignatura.</div>;
  }

  return (
    <div className="p-6">
      <div className="p-6 flex items-start gap-4∫">
        <div>
          <div className="relative w-16 h-16 bg-primary rounded-lg flex items-center justify-center font-bold ">
            <Icon size={72} color="black" />
          </div>
        </div>
        <div className="flex flex-col items-left px-2">
          <h1 className="text-3xl font-bold text-secondary">{subject.name}</h1>
          <p className="mt-1 text-sm text-text-secondary">Créditos: {subject.credits}</p>
        </div>
      </div>
      <div className="mt-6">
        <div className="h-px bg-secondary"></div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-4">
        <nav className="flex items-center gap-4 text-lg font-semibold">
          <DetailBtn
            label="Tareas"
            isActive={activeTab === 'tasks'}
            loadData={() => setActiveTab('tasks')}
          />
          <DetailBtn
            label="Examenes"
            isActive={activeTab === 'exams'}
            loadData={() => setActiveTab('exams')}
          />
        </nav>
      </div>
      <div className="mt-6">
        {activeTab === 'tasks' ? (
          <AssignmentsTable subjectId={subject.subjectId} />
        ) : (
           <ExamsTable subjectId={subject.subjectId} />
        )}
      </div>
      <div className="mt-6">
        <div className="h-px bg-secondary"></div>
      </div>
      <div className="mt-6">
        <SubjectStats subjectId={id!} exams={exams} />
      </div>
    </div>
  )
}