import React from 'react'
import Layout from '../components/layout';
import Inicio from '../paginas/inicio';
import Catalogo from '../paginas/catalogo';
import Producto from '../paginas/producto';
import QuienesSomos from '../paginas/quienesSomos';
import Servicios from '../paginas/servicios';
import Contacto from '../paginas/contacto';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path='/catalogo' element={<Catalogo />} />
          <Route path='/catalogo/:slug' element={<Producto />} />
          <Route path='/quienesSomos' element={<QuienesSomos />} />
          <Route path='servicios' element={<Servicios />} />
          <Route path='contacto' element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
