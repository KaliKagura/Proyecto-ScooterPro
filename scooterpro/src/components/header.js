import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusSC } from "../stores/carrito";
import { NavLink } from "react-router-dom";
import supabase from "../supabase/supabaseClient";

import logo from "../assets/img/logotest.png";
import iconoCarrito from "../assets/svg/cart-shopping-solid.svg";
import iconoUsuario from "../assets/svg/user-solid.svg";

const Header = () => {
  const [user, setUser] = useState(null);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.cantidad));
    setTotalCantidad(total);
  }, [carts]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAbrirCarrito = () => {
    dispatch(toggleStatusSC());
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuVisible(false);
  };

  return (
    <div className="bg-gray-800 text-white shadow-md">
      <header className="flex justify-between items-center px-5 lg:px-20 py-3">
        <NavLink to="/" className="flex items-center gap-2 cursor-pointer">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-semibold">ScooterPro</span>
        </NavLink>

        <div className="flex items-center gap-4 relative">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="text-white hover:text-[#ff7e5f] font-semibold transition-colors duration-300"
              >
                Iniciar sesión
              </NavLink>
              <NavLink
                to="/registro"
                className="bg-[#ff7e5f] text-white px-3 py-1 rounded-lg hover:bg-[#eb684e] transition-all"
              >
                Registrarse
              </NavLink>
            </>
          ) : (
            <div className="relative" ref={menuRef}>
              <div
                className="w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => setMenuVisible(!menuVisible)}
              >
                <img src={iconoUsuario} alt="Usuario" className="w-6" />
              </div>

              {menuVisible && (
                <div className="absolute right-0 mt-2 w-36 bg-white text-black rounded shadow-lg z-50 py-2">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Carrito */}
          <div
            className="w-10 h-10 bg-white rounded-full flex justify-center items-center relative cursor-pointer"
            onClick={handleAbrirCarrito}
          >
            <img src={iconoCarrito} alt="Carrito" className="w-6" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
              {totalCantidad}
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;