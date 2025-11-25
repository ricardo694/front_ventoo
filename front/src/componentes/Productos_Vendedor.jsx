import React from "react";
import '../componentes/css/Productos_Vendedor.css'
import Tarjeta_Producto from "./Tarjeta_Producto";

const Productos_Vendedor = () => {
    return(
        <div className="contenedor_productos_vendedor">
            <p>Tus Productos</p>

            <div>
                <div>
                    <Tarjeta_Producto
                        texto_tarjeta={'Editar'}
                        ruta_tarjeta={'/Editar_Producto'}
                    />
                    <button>Eliminar</button>
                </div>

                <div>
                    <Tarjeta_Producto
                        texto_tarjeta={'Editar'}
                        ruta_tarjeta={'/Editar_Producto'}
                    />
                    <button>Eliminar</button>
                </div>

                <div>
                    <Tarjeta_Producto
                        texto_tarjeta={'Editar'}
                        ruta_tarjeta={'/Editar_Producto'}
                    />
                    <button>Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default Productos_Vendedor