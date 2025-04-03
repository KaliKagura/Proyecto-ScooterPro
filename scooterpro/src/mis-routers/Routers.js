import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../components/inicio/Inicio.js";
import QuienesSomos from "../components/quienesSomos/QuienesSomos.jsx";
import Catalogo from "../components/catalogo/Catalogo.js";
import Header from "../components/header/Header.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import Servicios from '../components/servicios/Servicios.jsx';
import Contacto from '../components/contacto/Contacto.jsx';


const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/QuienesSomos" element={<QuienesSomos />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;
