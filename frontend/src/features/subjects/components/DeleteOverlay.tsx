import { useDroppable } from '@dnd-kit/core'
import { Trash2 } from 'lucide-react'

export default function DeleteOverlay() {
    const { setNodeRef, isOver } = useDroppable({ id: 'delete-zone' })

    return (
        <div className="fixed inset-0 bg-black/30 flex items-start justify-center pt-12 z-50 pointer-events-none">
            <div 
                ref={setNodeRef}
                className={`pointer-events-auto flex items-center gap-3 px-8 py-5 rounded-2xl border-2 border-dashed transition-all ${
                    isOver 
                        ? 'border-secondary bg-secondary text-white scale-110' 
                        : 'border-secondary/50 bg-white/90 text-secondary'
                }`}
            >
                <Trash2 size={22} />
                <p className="font-medium">Suelta para eliminar</p>
            </div>
        </div>
    )
}