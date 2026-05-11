import SubjectForm from "./SubjectForm";


export default function SubjectModal({ subjectId, onClose, onSubmit, onDelete }: { subjectId: string | null; onClose: () => void; onSubmit: (data: any) => void; onDelete: () => void }) {


  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <SubjectForm 
                subjectId={subjectId} 
                onCancel={onClose}
                onSubmit={(data) => {
                    onSubmit(data);
                }}
                onDelete={() => {
                    onDelete();
                }}
            />
        </div>
    </div>
  )
}