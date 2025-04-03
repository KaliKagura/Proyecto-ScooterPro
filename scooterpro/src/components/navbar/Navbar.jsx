import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Inicio</NavLink>
            <NavLink to="/QuienesSomos" className={({ isActive }) => isActive ? "active" : ""}>Quienes Somos</NavLink>
            <NavLink to="/catalogo" className={({ isActive }) => isActive ? "active" : ""}>Productos</NavLink>
            <NavLink to="/servicios" className={({ isActive }) => isActive ? "active" : ""}>Servicios</NavLink>
            <NavLink to="/contacto" className={({ isActive }) => isActive ? "active" : ""}>Contacto</NavLink>

        </nav>
    );
};

export default Navbar;
