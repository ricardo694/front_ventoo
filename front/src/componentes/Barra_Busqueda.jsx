import React from "react";
import '../componentes/css/Barra_Busqueda.css'

const Barra_Busqueda = ({ busqueda, setBusqueda, onBuscar }) => {
    return(
        <form 
            className="contenedor_barra_busqueda"
            onSubmit={(e) => { e.preventDefault(); onBuscar(); }}
            >
            <input 
                type="search" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar producto..."
            />
            <button type="submit">Buscar</button>
        </form>
    )
}

export default Barra_Busqueda