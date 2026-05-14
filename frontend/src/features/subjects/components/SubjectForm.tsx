import { Pencil, Plus, Loader2, Trash2 } from 'lucide-react';
import { useSubject } from '../hooks/useSubject';
import { iconMap } from '../../../components/IconsMap'
import { colorMap } from '../../../components/ColorMap'
import { useEffect, useState } from 'react'

interface SubjectFormProps {
    subjectId: string | null;
    onSubmit?: (data: SubjectFormData) => void;
    onCancel?: () => void;
    onDelete?: () => void;
}

interface SubjectFormData {
    name: string;
    credits: number;
    icon: string;
    color: string;
}

export default function SubjectForm({ subjectId, onSubmit, onCancel, onDelete }: SubjectFormProps) {
    const { subject, loading, error } = useSubject(subjectId);
    const isEditing = subjectId !== null;
    const [selectedIcon, setSelectedIcon] = useState(subject?.icon ?? '')
    const [selectedColor, setSelectedColor] = useState(subject?.color ?? '')

    useEffect(() => {
        if (subject?.icon) setSelectedIcon(subject.icon)
        if (subject?.color) setSelectedColor(subject.color)
    }, [subject])

    if (loading) {
        return (
            <div className="rounded-lg p-6 w-full max-w-md flex items-center justify-center min-h-[300px]">
                <Loader2 className="animate-spin text-secondary" size={28} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg p-6 w-full max-w-md">
                <p className="text-secondary text-sm">Error al cargar la asignatura</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg p-6 w-full max-w-md">
            <div className="mb-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                    {isEditing
                        ? <Pencil size={24} className="text-text" />
                        : <Plus size={24} className="text-text" />}
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-text">
                        {isEditing ? 'Editar asignatura' : 'Crear asignatura'}
                    </h1>
                    <p className="text-sm text-text-secondary">
                        {isEditing
                            ? `Editando ${subject?.name}`
                            : 'Añade una nueva asignatura al curso'}
                    </p>
                </div>
            </div>

            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    onSubmit?.({
                        name: formData.get('subjectName') as string,
                        credits: Number(formData.get('subjectCredits')),
                        icon: formData.get('subjectIcon') as string,
                        color: formData.get('subjectColor') as string,
                    });
                }}
            >
                <div>
                    <label htmlFor="subjectName" className="block text-sm font-medium text-text mb-1.5">
                        Nombre de la asignatura
                    </label>
                    <input
                        id="subjectName"
                        name="subjectName"
                        type="text"
                        required
                        className="w-full bg-white border border-text/15 rounded-lg px-3 py-2 
                                   focus:outline-none focus:border-secondary focus:bg-primary/30 
                                   transition-colors"
                        defaultValue={subject?.name ?? ''}
                    />
                </div>

                <div>
                    <label htmlFor="subjectCredits" className="block text-sm font-medium text-text mb-1.5">
                        Créditos
                    </label>
                    <input
                        id="subjectCredits"
                        name="subjectCredits"
                        type="number"
                        min="1"
                        step="0.5"
                        required
                        className="w-full bg-white border border-text/15 rounded-lg px-3 py-2 
                                   focus:outline-none focus:border-secondary focus:bg-primary/30 
                                   transition-colors"
                        defaultValue={subject?.credits?.toString() ?? ''}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Icono</label>
                    <div className="grid grid-cols-4 gap-2">
                        {Object.entries(iconMap).map(([name, Icon]) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => setSelectedIcon(name)}
                                className={`aspect-square p-1.5 rounded-lg border flex items-center justify-center transition-colors ${
                                    selectedIcon === name
                                        ? 'border-secondary bg-primary/90'
                                        : 'border-text/15 hover:border-secondary/50'
                                }`}
                            >
                                <Icon size={26} />
                            </button>
                        ))}
                    </div>
                    <input type="hidden" name="subjectIcon" value={selectedIcon} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Color</label>
                    <div className="flex gap-2 flex-wrap">
                        {Object.entries(colorMap).map(([name, bgClass]) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => setSelectedColor(name)}
                                className={`w-8 h-8 rounded-full ${bgClass} transition-all ${
                                    selectedColor === name
                                        ? 'ring-2 ring-offset-2 ring-secondary scale-110'
                                        : 'hover:scale-105'
                                }`}
                            />
                        ))}
                    </div>
                    <input type="hidden" name="subjectColor" value={selectedColor} />
                </div>

                <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t border-text/10">
                    {isEditing && (
                        <button type="button"
                            onClick={onDelete}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary px-3 py-2 bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity">
                            <Trash2 size={14} />
                            Eliminar
                        </button>
                    )}
                    <div className="flex gap-2 ml-auto">
                        <button type="button" onClick={onCancel}
                            className="text-sm font-medium px-4 py-2 bg-transparent text-text border border-text/15 rounded-lg cursor-pointer hover:bg-text/5 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit"
                            className="text-sm font-medium px-4 py-2 bg-secondary text-white border-none rounded-lg cursor-pointer hover:bg-secondary/90 transition-colors">
                            {isEditing ? 'Guardar cambios' : 'Crear asignatura'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}