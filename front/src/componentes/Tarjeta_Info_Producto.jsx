import React, { useState } from "react";
import '../componentes/css/Tarjeta_Info_Producto.css';

const Tarjeta_Info_Producto = ({ producto }) => {
    const [cantidad, setCantidad] = useState(1);

    // -------------------------------
    // 1. Procesar imagen del producto
    // -------------------------------
    let imagenProducto = producto.Imagen;

    // Si es URL normal → se deja igual
    if (imagenProducto.startsWith("http")) {
        // ok
    }
    // Si es base64 sin encabezado → agregarlo
    else if (!imagenProducto.startsWith("data:image")) {
        imagenProducto = `data:image/jpeg;base64,${imagenProducto}`;
    }

    // -------------------------------
    // 2. Foto del vendedor
    // -------------------------------
    let fotoVendedor =
        producto.FotoVendedor && producto.FotoVendedor !== ""
            ? producto.FotoVendedor
            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // foto por defecto

    return (
        <div className="contenedor_tarjeta_info_producto">
            <p>{producto.Nombre}</p>

            <div className="caja_info_producto_tarjeta_info_producto">
                <img 
                    src={imagenProducto}
                    alt={producto.Nombre}
                    onError={e => e.target.src = "https://via.placeholder.com/200"}
                />

                <div>
                    <p>{producto.Descripcion}</p>
                    <p>Cantidad disponible: 10</p>

                    <div>
                        <p>${producto.Precio}</p>

                        <div>
                            <button onClick={() => setCantidad(c => Math.max(1, c - 1))}>-</button>
                            <p>{cantidad}</p>
                            <button onClick={() => setCantidad(c => c + 1)}>+</button>
                        </div>
                    </div>

                    <div>
                        <button>Agregar</button>
                    </div>
                </div>
            </div>

            {/* Información del vendedor */}
            <div className="vendedor_box">
                <img 
                    src={fotoVendedor}
                    alt="Foto del vendedor"
                    onError={e => e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                />
                <p>{producto.NombreVendedor || "Vendedor desconocido"}</p>
            </div>
        </div>
    );
};

export default Tarjeta_Info_Producto;
