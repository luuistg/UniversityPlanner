import {  useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "./NavLink";
import { useEffect, useState,  } from "react";

export default function NavBar() {
    const navigate = useNavigate();
    const currentPath = useLocation().pathname;

    const handleNavigation = (path: string) => {
        navigate(path);

    };

    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
    <section className={`bg-transparent fixed top-0 left-0 right-0 w-full h-20 transition-all duration-300 ${scrolled ? 'opacity-75 backdrop-blur-sm' : 'opacity-100'}`}>
        <div className="flex items-center justify-between gap-4 px-6 h-full max-w-6xl mx-auto">
            <img src="/public/logo.png" alt="Logo" className="h-14 w-auto"/>

            <nav className="flex items-center gap-4 text-lg font-semibold">
                <NavLink 
                    to="/"
                    label="Inicio"
                    isActive={currentPath === '/'}
                    onNavigate={handleNavigation}
                />
                <NavLink 
                    to="/subjects"
                    label="Asignaturas"
                    isActive={currentPath === '/subjects'}
                    onNavigate={handleNavigation}
                />
                <NavLink 
                    to="/calendar"
                    label="Calendario"
                    isActive={currentPath === '/calendar'}
                    onNavigate={handleNavigation}
                />
            </nav>
        </div>
    </section>
    )
        
        
}