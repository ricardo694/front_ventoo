import React from "react";
import { Link } from "react-router-dom";
import '../componentes/css/Info_Pedido_Cliente.css'
import Tarjeta_Producto from "../componentes/Tarjeta_Producto"

const Info_Pedido_Cliente = () => {
    return(
        <div className="contenedor_info_pedido_cliente">
            <Link to={'/Perfil_Cliente'}>{'<'} Devolverse</Link>

            <div>
                <p>Pedido: FRT454</p>

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
                </div>
            </div>
        </div>
    )
}

export default Info_Pedido_Cliente