interface DetailBtnProps {
    label: string;
    isActive: boolean;
    loadData: () => void;
}

export const DetailBtn = ({  label, isActive, loadData }: DetailBtnProps) => {
    return (
        <button
            onClick={() =>  loadData()}
            className={`border-b-4 pb-1 transition-colors ${
                isActive
                    ? 'border-secondary'
                    : 'border-transparent hover:border-secondary/40'
            }`}
        >
            {label}
        </button>
    );
};