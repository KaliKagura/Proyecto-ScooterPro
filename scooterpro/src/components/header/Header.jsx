import "./Header.css";
import logo from "../../assets/img/logotest.png";
import carrito from "../../assets/img/carritoTest.png";


const Header = () => {
  return (
    <header className="header">
        <div className="seccion_logo">
            <img src={logo} alt="Logo" className="logo" />
            <h1>ScooterPro</h1>
        </div>
        <div className="seccion_carrito">
        <img src={carrito} alt="Carrito" className="carro" />
      </div>
    </header>
  );
};

export default Header;
