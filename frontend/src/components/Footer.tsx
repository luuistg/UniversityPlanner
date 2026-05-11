export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="mt-16 border-t border-secondary/20">
            <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="UP" className="h-8 w-auto" />
                    <span className="text-xs text-text/40">
                        © {year} University Planner. Todos los derechos reservados.
                    </span>
                </div>
                <p className="text-xs text-text/30">
                    Hecho con ♥ para estudiantes
                </p>
            </div>
        </footer>
    )
}