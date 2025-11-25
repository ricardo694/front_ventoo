import React from "react";
import '../componentes/css/Filtros_Busqueda.css'

const Filtros_Busqueda = () => {
    return(
        <div className="contenedor_filtros_busqueda">
            <form action="">
                <input type="search" />

                <button type="submit">Buscar</button>
            </form>

            <form action="">
                <select name="" id="">
                    <option value="" hidden>Precio</option>
                </select>

                <select name="" id="">
                    <option value="" hidden>Categoria</option>
                </select>

                <button>Filtrar</button>
            </form>
        </div>
    )
}

export default Filtros_Busqueda