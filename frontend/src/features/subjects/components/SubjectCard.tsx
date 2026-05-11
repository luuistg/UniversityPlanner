import { Pencil, Info,  CircleCheck, FilePen} from 'lucide-react';
import { iconMap } from '../../../components/IconsMap'


export default function SubjectCard({ hasPending, subjectName, credits, remaining, icon, subjectId, onEdit }: { hasPending: boolean; subjectName: string; credits: number; remaining: string; icon?: string; subjectId: string; onEdit: () => void }) {

    const Icon = (icon && iconMap[icon]) ? iconMap[icon] : FilePen

    return (
    <div className="max-w-2xs bg-white border border-secondary border-solid rounded-lg p-4 w-full hover:scale-102 transition-smooth cursor-pointer shadow-md shadow-secondary/30">
        <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 bg-primary rounded-lg flex items-center justify-center font-bold">
                <Icon size={32} color="black" />
                {hasPending && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full" />
                )}
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
        <div className="flex items-center mt-4">
            {hasPending && (
                <>
                    <Info size={16} color="red" className="inline-block mr-1" />
                    <p className="text-secondary">{remaining}</p>
                </> 
            )}

            {!hasPending && (
                <>
                    <CircleCheck size={16} color="green" className="inline-block mr-1" />
                    <p className="text-green-700">Nada pendiente</p>
                </> 
            )}
            
        </div>
    </div>
    )
}