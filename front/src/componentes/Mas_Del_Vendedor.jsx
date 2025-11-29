import React from "react";
import '../componentes/css/Mas_Del_Vendedor.css'
import Tarjeta_Producto from "./Tarjeta_Producto";

const Mas_Del_Vendedor = ({ productos }) => {
    return(
        <div className="contenedor_mas_del_vendedor">
            <p>Mas del Vendedor</p>

             <div className="lista-mas-vendedor">
                {productos.length === 0 ? (
                    <p className="mensaje-no-productos">
                        El vendedor no tiene más productos.
                    </p>
                ) : (
                    productos.map(p => (
                        <Tarjeta_Producto
                            key={p.Id_producto}
                            producto={p}
                            ruta_tarjeta={`/Info_Producto/${p.Id_producto}`}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Mas_Del_Vendedor