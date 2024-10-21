import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProyectoCard from './proyectoCard'; // Importa el nuevo componente para mostrar los proyectos
import { FaSearch } from 'react-icons/fa'; // Asegúrate de instalar react-icons

const BuscarOferta = () => {
    const [proyectos, setProyectos] = useState([]);
    const [filtro, setFiltro] = useState(''); // Un solo estado para el filtro

    // Función para obtener proyectos desde el backend con el filtro
    const obtenerProyectos = async (filtro = '') => {
        try {
            const response = await axios.get('/api/proyectos', {
                params: { filtro }
            });
            console.log('Datos de la API:', response.data); // Verifica la respuesta
            // Asegúrate de que sea un arreglo
            setProyectos(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error al obtener proyectos:', error.response || error.message);
        }
    };

    // Obtener todos los proyectos al montar el componente
    useEffect(() => {
        obtenerProyectos(); // Llama a la función sin filtro al inicio
    }, []);

    // Manejar cambio en el campo de búsqueda
    const manejarCambioBuscador = (e) => {
        const valorFiltro = e.target.value;
        setFiltro(valorFiltro);
        obtenerProyectos(valorFiltro); // Filtrar por el único campo
    };

    return (
        <div className="buscar-oferta">
            <h1 className="text-2xl font-bold mb-4">Buscar Ofertas</h1>

            {/* Input para buscar por título o requerimiento */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Buscar por título o requerimiento..."
                    className="border p-2 w-full pl-10" // Espaciado para la lupa
                    value={filtro}
                    onChange={manejarCambioBuscador}
                />
                <FaSearch className="absolute left-2 top-2 text-gray-500" /> {/* Icono de lupa */}
            </div>

            {/* Listado de proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {proyectos.length > 0 ? (
                    proyectos.map((proyecto) => (
                        <ProyectoCard key={proyecto.id} proyecto={proyecto} />
                    ))
                ) : (
                    <p>No se encontraron proyectos.</p>
                )}
            </div>
        </div>
    );
};

export default BuscarOferta;
