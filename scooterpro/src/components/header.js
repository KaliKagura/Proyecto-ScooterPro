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
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
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
    const getUserAndName = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user || null;

      if (!currentUser) {
        setUser(null);
        setUserName("");
        setUserRole("");
        return;
      }

      setUser(currentUser);

      const { data, error } = await supabase
        .from("usuarios")
        .select("nombre, rol")
        .eq("id", currentUser.id)
        .single();

      if (data) {
        setUserName(data.nombre);
        setUserRole(data.rol);
      } else {
        console.error("No se encontró nombre:", error);
        setUserName("");
      }
    };

    getUserAndName();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session) {
          setUser(null);
          setUserName("");
          setUserRole("");
        } else {
          const user = session.user;
          setUser(user);

          const { data } = await supabase
            .from("usuarios")
            .select("nombre, rol")
            .eq("id", user.id)
            .single();

          if (data) {
            setUserName(data.nombre);
            setUserRole(data.rol);
          } else {
            setUserName("");
            setUserRole("");
          };
        }
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
    setUserName("");
    setUserRole("");
    setMenuVisible(false);
    window.location.href = "/";
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
            <div className="relative flex items-center gap-2" ref={menuRef}>
              <div
                className="w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => setMenuVisible(!menuVisible)}
              >
                <img src={iconoUsuario} alt="Usuario" className="w-6" />
              </div>

              <span className="text-white font-medium select-none">
                {userName || user.email}
              </span>

              {menuVisible && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white text-black rounded shadow-lg z-50 py-2">
                  {userRole === "admin" && (
                    <NavLink
                      to="/admin"
                      className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                      onClick={() => setMenuVisible(false)}
                    >
                      Panel de Admin
                    </NavLink>
                  )}
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
