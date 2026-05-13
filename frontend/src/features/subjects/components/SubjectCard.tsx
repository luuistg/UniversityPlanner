import { Pencil, Info,  CircleCheck, FilePen} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { iconMap } from '../../../components/IconsMap'
import { useDraggable } from '@dnd-kit/core'


export default function SubjectCard({ hasPending, hasInProgress, hasReview, subjectName, credits, remaining, inProgress, review, icon, subjectId, onEdit }: { hasPending: boolean; hasInProgress: boolean; hasReview: boolean; subjectName: string; credits: number; remaining: string; inProgress: string; review: string; icon?: string; subjectId: string; onEdit: () => void }) {

    const Icon = (icon && iconMap[icon]) ? iconMap[icon] : FilePen
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: subjectId,
    })
    const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined

    const navigate = useNavigate()

    return (
    <div ref={setNodeRef} style={style} className="max-w-2xs bg-white border border-secondary border-solid rounded-lg p-4 w-full hover:scale-102 transition-smooth cursor-pointer shadow-md shadow-secondary/30"
        onClick={(e) => {
            e.stopPropagation();
            navigate(`/subject-info/${subjectId}`);
             }}
        >
        <div className="flex items-center gap-4">
            <div {...attributes} {...listeners} className="relative w-16 h-16 bg-primary rounded-lg flex items-center justify-center font-bold">
                <Icon size={32} color="black" />
                {/* Punto — solo el más prioritario */}
                {hasPending && <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full" />}
                {!hasPending && hasInProgress && <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full" />}
                {!hasPending && !hasInProgress && hasReview && <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />}
            </div>
            <button className="ml-auto bg-transparent px-3 py-3 rounded-lg hover:bg-secondary/50 shadow shadow-secondary/30 transition-colors"
                onClick={(e) => {
                e.stopPropagation();
                onEdit();
                }}
            >
                <Pencil size={20} color="black" />
            </button>
        </div>
        <div className="flex flex-col items-left gap-2 mt-4">
                <h2 className="text-xl font-bold mb-2">{subjectName}</h2>
                <p className="text-text-secondary">Creditos: {credits}</p>
        </div>
        <div className="flex flex-col gap-1 mt-4">
            {hasPending && (
                <div className="flex items-center gap-1">
                    <Info size={14} color="red" />
                    <p className="text-secondary text-xs">{remaining}</p>
                </div>
            )}
            {hasInProgress && (
                <div className="flex items-center gap-1">
                    <Info size={14} color="orange" />
                    <p className="text-orange-500 text-xs">{inProgress}</p>
                </div>
            )}
            {hasReview && (
                <div className="flex items-center gap-1">
                    <Info size={14} color="blue" />
                    <p className="text-blue-500 text-xs">{review}</p>
                </div>
            )}
            {!hasPending && !hasInProgress && !hasReview && (
                <div className="flex items-center gap-1">
                    <CircleCheck size={14} color="green" />
                    <p className="text-green-700 text-xs">Nada pendiente</p>
                </div>
            )}
        </div>
    </div>
    )
}