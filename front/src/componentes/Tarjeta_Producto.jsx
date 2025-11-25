import React from "react";
import '../componentes/css/Tarjeta_Producto.css'
import img_1 from '../img/foto_prueba.jpg'
import { Link } from "react-router-dom";

const Tarjeta_Producto = ({texto_tarjeta, ruta_tarjeta}) => {
    return(
        <div className="contenedor_tarjeta_producto">
            <img src={img_1} alt="" />

            <div>
                <p>Pintura Carisima</p>
                <p>$10.000</p>
            </div>

            <Link to={ruta_tarjeta}>{texto_tarjeta}</Link>
        </div>
    )
}

export default Tarjeta_Producto