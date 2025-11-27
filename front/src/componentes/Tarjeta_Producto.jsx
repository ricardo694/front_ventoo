import React from "react";
import '../componentes/css/Tarjeta_Producto.css'
import { Link } from "react-router-dom";

const Tarjeta_Producto = ({ nombre, precio, imagen, ruta_tarjeta }) => {
    return (
        <div className="contenedor_tarjeta_producto">
            <img
                src={imagen}
                alt={nombre}
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
                <p>{nombre}</p>
                <p>${precio}</p>
            </div>

            <Link to={`/producto/${ruta_tarjeta}`}>Ver</Link>
        </div>
    );
};

export default Tarjeta_Producto;
