import React from "react";
import '../componentes/css/Mas_Del_Vendedor.css'
import Tarjeta_Producto from "./Tarjeta_Producto";

const Mas_Del_Vendedor = ({ productos }) => {
    return(
        <div className="contenedor_mas_del_vendedor">
            <p>Mas del Vendedor</p>

            <div className="lista-mas-vendedor">
                {productos.map(p => (
                    <Tarjeta_Producto
                        key={p.Id_producto}
                        nombre={p.Nombre}
                        precio={p.Precio}
                        imagen={`data:image/jpeg;base64,${p.Imagen}`}
                        ruta_tarjeta={p.Id_producto}
                    />
                ))}
            </div>
        </div>
    )
}

export default Mas_Del_Vendedor