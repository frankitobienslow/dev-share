// app/Ofertas.jsx
import React from 'react';
import BuscarOferta from '../components/BuscarOferta'; 

const Ofertas = () => {
    return (
        <div className="ofertas-page">
            <h1 className="text-2xl font-bold mb-4">Ofertas</h1>
            <BuscarOferta />
        </div>
    );
};

export default Ofertas;
