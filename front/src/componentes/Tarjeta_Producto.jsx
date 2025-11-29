import React from "react";
import '../componentes/css/Tarjeta_Producto.css'
import { Link } from "react-router-dom";

const Tarjeta_Producto = ({ producto, ruta_tarjeta }) => {
    if (!producto) return null;

    const { Imagen, Nombre, Precio } = producto;

    // Detectar formato correcto de imagen
    const srcImagen =
        Imagen?.startsWith("data:image") ? Imagen :           // base64
        Imagen?.startsWith("http") ? Imagen :                 // URL 
        `http://localhost:3001/uploads/${Imagen}`;            // 

    return (
        <div className="contenedor_tarjeta_producto">
            <img
                src={srcImagen}
                alt={Nombre}
                style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px"
                }}
                onError={(e) => {
                    e.target.src =
                        "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
                }}
            />

            <div>
                <p>{Nombre}</p>
                <p>${Precio}</p>
            </div>


            <Link to={ruta_tarjeta}>Ver</Link>
        </div>
    );
};

export default Tarjeta_Producto;
