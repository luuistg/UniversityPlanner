import SubjectCard from "../features/subjects/components/SubjectCard";
import { useSubjects } from "../features/subjects/hooks/useSubjects";
import { Plus } from 'lucide-react'
import { useState } from "react";
import SubjectModal from "../features/subjects/components/SubjectModal";
import { DndContext } from "@dnd-kit/core";
import DeleteOverlay from "../features/subjects/components/DeleteOverlay";

export default function Subjects() {

  const { subjects, handleUpdateSubject, handleCreateSubject, handleDeleteSubject } = useSubjects();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)


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
          
          <DndContext
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(event) => {
                  setIsDragging(false)
                  if (event.over?.id === 'delete-zone') {
                      handleDeleteSubject(event.active.id as string)
                  }
              }}
          >
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
                  hasInProgress={subject.assignmentsInProgress > 0}
                  hasReview={subject.assignmentsReview > 0}
                  subjectName={subject.name}
                  credits={subject.credits}
                  remaining={`Pendientes: ${subject.assignmentsPending}`}
                  inProgress={`En curso: ${subject.assignmentsInProgress}`}
                  review={`En revisión: ${subject.assignmentsReview}`}
                  icon={subject.icon}
                  color={subject.color}
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
            {isDragging && <DeleteOverlay />}
          </DndContext>
          
    </div>
  )
}