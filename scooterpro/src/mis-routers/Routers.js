import React from "react";
import Layout from "../components/layout";
import Inicio from "../paginas/inicio";
import Catalogo from "../paginas/catalogo";
import Producto from "../paginas/producto";
import QuienesSomos from "../paginas/quienesSomos";
import Servicios from "../paginas/servicios";
import Contacto from "../paginas/contacto";
import Registro from "../paginas/registro";
import Login from "../paginas/login";
import PassRecovery from "../paginas/passRecovery";
import ResetPass from "../paginas/resetPass";
import AdminPanel from "../paginas/panelAdmin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogo/:slug" element={<Producto />} />
          <Route path="/quienesSomos" element={<QuienesSomos />} />
          <Route path="/pass-recovery" element={<PassRecovery />} />
          <Route path="/reset-pass" element={<ResetPass />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
