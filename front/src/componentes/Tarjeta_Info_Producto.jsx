import React, { useState } from "react";
import '../componentes/css/Tarjeta_Info_Producto.css'
import img_1 from '../img/foto_prueba.jpg'
import perfil from '../img/avatar.png'
import { Link } from "react-router-dom";

const Tarjeta_Info_Producto = () => {

    const [cantidad, setCantidad] = useState(0)

    const Aumentar = () => {
        setCantidad(cantidad + 1)
    }

    const Disminuir = () => {
        setCantidad(cantidad - 1)
    }

    return(
        <div className="contenedor_tarjeta_info_producto">
            <p>Pintura Carisima</p>

            <div className="caja_info_producto_tarjeta_info_producto">
                <img src={img_1} alt="" />

                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,</p>
                    
                    <p>Cantidad: 10 </p>

                    <div>
                        <p>$10.000</p>

                        <div>
                            <button onClick={Disminuir}>-</button>
                            <p>{cantidad}</p>
                            <button onClick={Aumentar}>+</button>
                        </div>
                    </div>

                    <div>
                        <button>Agregar</button>
                    </div>
                </div>
            </div>

            <div>
                <img src={perfil} alt="" />
                <p>Vendedor</p>
            </div>
        </div>
    )
}

export default Tarjeta_Info_Producto