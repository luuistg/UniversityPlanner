import SubjectCard from "../features/subjects/components/SubjectCard";
import { useSubjects } from "../features/subjects/hooks/useSubjects";
import { Plus } from 'lucide-react'
import { useState } from "react";
import SubjectModal from "../features/subjects/components/SubjectModal";

export default function Subjects() {

  const { subjects, handleUpdateSubject, handleCreateSubject, handleDeleteSubject } = useSubjects();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)


  return (
    <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-secondary">Asignaturas</h1>
            <button className="bg-secondary text-white px-2 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
              onClick={() => setIsModalOpen(true)}
              >
              <Plus size={20} />
            </button>
          </div>
          

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subjects.map(subject => (
              <SubjectCard 
                key={subject.subjectId}
                subjectId={subject.subjectId}
                onEdit={() => {
                    setEditingId(subject.subjectId)
                    setIsModalOpen(true)
                }}
                hasPending={subject.assignmentsPending > 0}
                subjectName={subject.name}
                credits={subject.credits}
                remaining={`Tareas pendientes: ${subject.assignmentsPending}`}
                icon={subject.icon}
              />
            ))}
          </div>
          {isModalOpen && (
              <SubjectModal 
                  subjectId={editingId}
                  onClose={() => {
                      setIsModalOpen(false)
                      setEditingId(null)
                  }}
                  onSubmit={(data) => {
                      editingId ? handleUpdateSubject(editingId, data) : handleCreateSubject(data)
                      setIsModalOpen(false)
                      setEditingId(null)
                  }}
                  onDelete={() => {
                      handleDeleteSubject(editingId!)
                      setIsModalOpen(false)
                      setEditingId(null)
                  }}
              />
          )}
    </div>
  )
}