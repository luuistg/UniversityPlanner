interface NavLinkProps {
    to: string;
    label: string;
    isActive: boolean;
    onNavigate: (path: string) => void;
}

export const NavLink = ({ to, label, isActive, onNavigate }: NavLinkProps) => {
    return (
        <button
            onClick={() => onNavigate(to)}
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