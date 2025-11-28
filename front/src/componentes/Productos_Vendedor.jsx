import React from "react";
import '../componentes/css/Productos_Vendedor.css'
import Tarjeta_Producto from "./Tarjeta_Producto";

const Productos_Vendedor = ({productos, eliminarProducto}) => {
    return(
        <div className="contenedor_productos_vendedor">
            <p>Tus Productos</p>

            <div >
                {productos.length > 0 ? (
                    productos.map(producto => (
                        <div key={producto.Id_producto} className="producto_vendedor_card">

                            <img 
                                src={producto.Imagen}
                                alt={producto.Nombre}
                                className="producto_vendedor_img"
                            />

                            <h3>{producto.Nombre}</h3>
                            <p>{producto.Descripcion}</p>
                            <p>${producto.Precio}</p>

                            <button 
                                className="btn_eliminar"
                                onClick={() => eliminarProducto(producto.Id_producto)}
                            >
                                Eliminar
                            </button>

                        </div>
                    ))
                ) : (
                    <p>No has registrado productos todavía</p>
                )}
                
            </div>
        </div>
    )
}

export default Productos_Vendedor