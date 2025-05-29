import React from 'react';
import jefeScooterpro from "../assets/img/empresario.jpg";
import banner from "../assets/img/banner.png";

const QuienesSomos = () => {
  return (
    <section>
      <div
        className="relative h-56 -mx-5 bg-center bg-cover flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative text-center text-white px-4 max-w-4xl mx-auto z-10">
          <h1 className="text-4xl font-bold mb-4">Movilidad inteligente para un futuro más limpio.</h1>
          <p className="text-lg">
            En ScooterPro creemos en transformar la forma en que te mueves por la ciudad, combinando tecnología, sustentabilidad y un servicio técnico confiable.
          </p>
        </div>
      </div>

      <div className="py-16 px-4 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
  <div className="flex justify-center">
    <img
      src={jefeScooterpro}
      alt="Cliente con scooter"
      className="w-80 h-80 object-cover rounded-full shadow-lg"
    />
  </div>
  <div>
    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Nuestra Misión</h2>
    <p className="text-gray-700 text-lg text-justify leading-relaxed">
      En ScooterPro queremos liderar el cambio hacia una movilidad urbana sostenible. Vendemos scooters eléctricos de alta calidad y ofrecemos un servicio técnico especializado para asegurar que tu experiencia de transporte sea siempre segura, eficiente y ecológica. Trabajamos cada día para que más personas puedan moverse mejor.
    </p>
  </div>
</div>

    </section>
  );
};

export default QuienesSomos;
