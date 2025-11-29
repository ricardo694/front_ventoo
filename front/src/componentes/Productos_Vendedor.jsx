import React from "react";
import '../componentes/css/Productos_Vendedor.css';
import Tarjeta_Producto from "./Tarjeta_Producto";
import { Link } from "react-router-dom";

const Productos_Vendedor = ({ productos, eliminarProducto }) => {

    if (!productos || productos.length === 0) {
        return <p className="mensaje_no_productos">Aún no has registrado productos.</p>;
    }

    return (
        <div className="contenedor_productos_vendedor">
            <p>Tus Productos</p>

            <div>
                {productos.map((producto) => (
                    <div key={producto.Id_producto}>
                        
                        {/* Tarjeta del producto */}
                        <Tarjeta_Producto
                            producto={producto}
                            ruta_tarjeta={`/producto/Editar_Producto/${producto.Id_producto}`}

                        />

                        {/* Botón eliminar */}
                        <button
                            onClick={() => eliminarProducto(producto.Id_producto)}
                        >
                            Eliminar
                        </button>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default Productos_Vendedor;
