import React, { useState } from "react";
import '../componentes/css/Productos_Cliente_Carrito.css'
import Tarjeta_Producto from "./Tarjeta_Producto";

const Productos_Cliente_Carrito = ({Mostrar_Modal_Pago}) => {

    const [aceptar_permiso, setAceptar_permiso] = useState(false)

    return(
        <div className="contenedor_productos_cliente_carrito">
            <p>Carrito</p>

            <div className="caja_productos_productos_cliente_carrito">
                <div>
                    <div>
                        <Tarjeta_Producto
                            texto_tarjeta={'Ver'}
                            ruta_tarjeta={'/Ver_Informacion_Producto'}
                        />
                        <button>Eliminar</button>
                    </div>
                    <div>
                        <Tarjeta_Producto
                            texto_tarjeta={'Ver'}
                            ruta_tarjeta={'/Ver_Informacion_Producto'}
                        />
                        <button>Eliminar</button>
                    </div>
                    <div>
                        <Tarjeta_Producto
                            texto_tarjeta={'Ver'}
                            ruta_tarjeta={'/Ver_Informacion_Producto'}
                        />
                        <button>Eliminar</button>
                    </div>
                </div>

                <div>
                    <input id="aceptar_condiciones" type="checkbox" checked={aceptar_permiso} onChange={(e) => setAceptar_permiso(e.target.checked)}/>
                    <label htmlFor="aceptar_condiciones">¿Aceptas que no puedes cancelar el pedido una vez realizado?</label>
                </div>
            </div>

            {aceptar_permiso === false ? 
            (
                <button className="boton_desactivado">Comprar</button>
            ) : 
            (
                <button onClick={Mostrar_Modal_Pago}>Comprar</button>
            )}
        </div>
    )
}

export default Productos_Cliente_Carrito