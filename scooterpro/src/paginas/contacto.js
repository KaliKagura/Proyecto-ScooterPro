import React from 'react';
import iconoTelefono from "../assets/svg/phone-solid.svg";
import iconoCorreo from "../assets/svg/envelope-solid.svg";

const Contacto = () => {
  return (
    <div className="flex h-[80vh] w-full overflow-hidden m-0 p-0">
      <div className="bg-orange-700 text-white flex flex-col justify-center md:w-1/3 w-full box-border m-0 p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-2 pl-0">Información de contacto</h2>
        <p className="mb-4 pl-0">
          ¿Interesado en contactarnos directamente? Rellene el formulario y nuestro equipo le responderá dentro de las próximas 24 horas.
        </p>
        <div className="mb-1 flex items-center gap-2 pl-0">
          <img src={iconoTelefono} alt="Teléfono" className="w-5 h-5" />
          <span>+569 31351754</span>
        </div>
        <div className="mb-1 flex items-center gap-2 pl-0">
          <img src={iconoCorreo} alt="Correo" className="w-5 h-5" />
          <span>ScooterPro@gmail.com</span>
        </div>
      </div>

      <form className="flex-1 p-4 md:p-6 flex flex-col justify-center box-border m-0 md:pl-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 w-full max-w-lg">
          <input type="text" placeholder="Nombre" className="border-b p-2 outline-none w-full" />
          <input type="text" placeholder="Apellido" className="border-b p-2 outline-none w-full" />
        </div>
        <input type="email" placeholder="Correo electrónico" className="border-b w-full mb-3 p-2 outline-none max-w-lg" />
        <input type="text" placeholder="Teléfono" className="border-b w-full mb-3 p-2 outline-none max-w-lg" />
        <div className="mb-3 w-full max-w-lg">
          <p className="mb-2 text-center md:text-left">¿Cuál es la razón de su mensaje?</p>
          <div className="flex gap-3 flex-wrap justify-center md:justify-start">
            {['Feedback', 'Colaboración', 'Problema técnico', 'Otro'].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input type="radio" name="service" value={option} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
        <textarea
          placeholder="Escriba su mensaje..."
          className="border-b w-full mb-3 p-2 outline-none resize-none max-w-lg"
          rows="4"
        />
        <button className="bg-orange-700 text-white py-2 px-6 rounded hover:bg-purple-800 self-start max-w-lg">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;