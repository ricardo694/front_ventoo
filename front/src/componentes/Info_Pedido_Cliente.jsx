import React from "react";
import { Link } from "react-router-dom";
import '../componentes/css/Info_Pedido_Cliente.css'
import Tarjeta_Producto from "../componentes/Tarjeta_Producto"

const Info_Pedido_Cliente = ({ pedido, productos }) => {

      if (!pedido) return <p>Cargando pedido...</p>;

    return(
        <div className="contenedor_info_pedido_cliente">
            <Link to={'/Perfil_Cliente'}>{'<'} Devolverse</Link>

            <div>
               <p>Pedido: {pedido.Id_pedido}</p>
                <p>Fecha: {new Date(pedido.Fecha_pedido).toLocaleDateString("es-CO")}</p>

                <div>
                    {productos.map(prod => (
                        <div key={prod.Id_producto}>
                            <Tarjeta_Producto
                                producto={prod}
                                texto_tarjeta={'Ver'}
                                ruta_tarjeta={`/Info_Producto/${prod.Id_producto}`}
                            />

                            {/* Cantidad y subtotal */}
                            <div className="cantidad_carrito_box">
                                <p>Cantidad: {prod.Cantidad}</p>
                                <p>Subtotal: ${(prod.Precio * prod.Cantidad).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Info_Pedido_Cliente