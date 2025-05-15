import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-center gap-10 py-3 bg-gray-900">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-4xl font-bold text-[#ff7e5f] border-b-2 border-[#ff7e5f]" : "text-4xl font-bold text-white hover:text-[#ff7e5f] transition-colors duration-300"}>
                Inicio
            </NavLink>
            <NavLink to="/QuienesSomos" className={({ isActive }) => isActive ? "text-4xl font-bold text-[#ff7e5f] border-b-2 border-[#ff7e5f]" : "text-4xl font-bold text-white hover:text-[#ff7e5f] transition-colors duration-300"}>
                Quienes Somos
            </NavLink>
            <NavLink to="/catalogo" className={({ isActive }) => isActive ? "text-4xl font-bold text-[#ff7e5f] border-b-2 border-[#ff7e5f]" : "text-4xl font-bold text-white hover:text-[#ff7e5f] transition-colors duration-300"}>
                Productos
            </NavLink>
            <NavLink to="/Servicios" className={({ isActive }) => isActive ? "text-4xl font-bold text-[#ff7e5f] border-b-2 border-[#ff7e5f]" : "text-4xl font-bold text-white hover:text-[#ff7e5f] transition-colors duration-300"}>
                Servicios
            </NavLink>
            <NavLink to="/Contacto" className={({ isActive }) => isActive ? "text-4xl font-bold text-[#ff7e5f] border-b-2 border-[#ff7e5f]" : "text-4xl font-bold text-white hover:text-[#ff7e5f] transition-colors duration-300"}>
                Contacto
            </NavLink>
        </nav>
    );
};

export default Navbar;
