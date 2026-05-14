import { Pencil, Info,  CircleCheck, FilePen} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { iconMap } from '../../../components/IconsMap'
import { useDraggable } from '@dnd-kit/core'
import { colorMap } from '../../../components/ColorMap'
import { flushSync } from 'react-dom'


export default function SubjectCard({ hasPending, hasInProgress, hasReview, subjectName, credits, remaining, inProgress, review, icon, subjectId, color, onEdit }: { hasPending: boolean; hasInProgress: boolean; hasReview: boolean; subjectName: string; credits: number; remaining: string; inProgress: string; review: string; icon?: string; subjectId: string; color?: string; onEdit: () => void }) {

    const Icon = (icon && iconMap[icon]) ? iconMap[icon] : FilePen
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: subjectId,
    })
    const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined

    const navigate = useNavigate()

    return (
    <div ref={setNodeRef} style={style} className="max-w-2xs w-full h-full hover:scale-102 transition-smooth cursor-pointer">   
        <div className="h-full p-4 bg-white border border-secondary border-solid rounded-lg shadow-md shadow-secondary/30 animate-fade-in"
            onClick={(e) => {
                e.stopPropagation();
                if (!document.startViewTransition) {
                    navigate(`/subject-info/${subjectId}`)
                    return
                }
                document.startViewTransition(() => {
                    flushSync(() => {
                        navigate(`/subject-info/${subjectId}`)
                    })
                })
            }}
            >
            <div className="flex items-center gap-4">
                <div {...attributes} {...listeners} style={{ viewTransitionName: `subject-icon-${subjectId}` }} className={`relative w-16 h-16 ${color && colorMap[color] ? colorMap[color] : 'bg-primary'} rounded-lg flex items-center justify-center font-bold`}>
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
    </div>
    )
}