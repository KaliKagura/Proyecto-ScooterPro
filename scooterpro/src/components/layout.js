import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import SeccionCarrito from './seccionCarrito';
import { useSelector } from 'react-redux';
import Navbar from './navbar';

const Layout = () => {
  const statusSC = useSelector(store => store.cart.statusSC);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-200">
      <div
        className={`w-full transform transition-transform duration-500 flex-grow
        ${statusSC === false ? '' : '-translate-x-56'}`}
      >
        <Header />
        <Navbar />
        <main className="flex-grow w-full px-5">
          <Outlet />
        </main>
      </div>
      <Footer />
      <SeccionCarrito />
    </div>
  );
};

export default Layout;

