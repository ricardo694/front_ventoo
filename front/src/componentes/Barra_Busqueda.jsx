import React from "react";
import '../componentes/css/Barra_Busqueda.css'

const Barra_Busqueda = () => {
    return(
        <form className="contenedor_barra_busqueda">
            <input type="search"/>
            <button>Buscar</button>
        </form>
    )
}

export default Barra_Busqueda