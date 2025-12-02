import React,{useState} from "react";
import '../componentes/css/Formu_Resenas.css'

const Formu_Resenas =({ texto, estrellas, setTexto, setEstrellas, onSubmit }) => {



    return (
        <form className="contenedor_formu_resenas" onSubmit={onSubmit}>
            <input 
                type="text" 
                placeholder="Escribe una reseña"
                value={texto}
                onChange={e => setTexto(e.target.value)}
            />

            <select value={estrellas} onChange={e => setEstrellas(e.target.value)}>
                <option value="1">1 Estrella</option>
                <option value="2">2 Estrella</option>
                <option value="3">3 Estrella</option>
                <option value="4">4 Estrella</option>
                <option value="5">5 Estrella</option>
            </select>

            <button>Subir</button>
        </form>
    );
};


export default Formu_Resenas