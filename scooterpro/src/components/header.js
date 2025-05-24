import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusSC } from "../stores/carrito";
import logo from "../assets/img/logotest.png";
import iconoCarrito from "../assets/svg/cart-shopping-solid.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [totalCantidad, setTotalCantidad] = useState(0);
    const carts = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    //const navigate = useNavigate();

    useEffect(() => {
        let total = 0;
        carts.forEach((item) => (total += item.cantidad));
        setTotalCantidad(total);
    }, [carts]);

    const handleAbrirCarrito = () => {
        dispatch(toggleStatusSC());
    };

    /*const handleBack = () => {
        navigate(-1);
    };*/

    return (
        <div className="bg-gray-800 text-white shadow-md">
            <header className="flex justify-between items-center px-5 lg:px-20 py-3">
                <NavLink to="/" className="flex items-center gap-2 cursor-pointer">
                    <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-semibold">ScooterPro</span>
                </NavLink>

                <div
                    className="w-10 h-10 bg-gray-700 rounded-full flex justify-center items-center relative cursor-pointer"
                    onClick={handleAbrirCarrito}
                >
                    <img src={iconoCarrito} alt="" className="w-6" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
                        {totalCantidad}
                    </span>
                </div>
            </header>
        </div>
    );
};

export default Header;
