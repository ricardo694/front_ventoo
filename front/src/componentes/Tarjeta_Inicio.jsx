import React from "react";
import '../componentes/css/Tarjeta_Inicio.css'
import { Link } from "react-router-dom";

const Tarjeta_Inicio = ({ruta_tarjeta_inicio,titulo, logo}) => {
    return(
        <Link to={ruta_tarjeta_inicio} className="contenedor_tarjeta_inicio">
            <p>{titulo}</p>
            <img src={logo} alt="" />
        </Link>
    )
}

export default Tarjeta_Inicio