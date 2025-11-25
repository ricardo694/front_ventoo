import React from "react";
import '../componentes/css/Mas_Del_Vendedor.css'
import Tarjeta_Producto from "./Tarjeta_Producto";

const Mas_Del_Vendedor = () => {
    return(
        <div className="contenedor_mas_del_vendedor">
            <p>Mas del Vendedor</p>

            <div>
                <Tarjeta_Producto
                    texto_tarjeta={'Ver'}
                    ruta_tarjeta={'/Ver_Informacion_Producto'}
                />
                <Tarjeta_Producto
                    texto_tarjeta={'Ver'}
                    ruta_tarjeta={'/Ver_Informacion_Producto'}
                />
                <Tarjeta_Producto
                    texto_tarjeta={'Ver'}
                    ruta_tarjeta={'/Ver_Informacion_Producto'}
                />
                <Tarjeta_Producto
                    texto_tarjeta={'Ver'}
                    ruta_tarjeta={'/Ver_Informacion_Producto'}
                />
            </div>
        </div>
    )
}

export default Mas_Del_Vendedor