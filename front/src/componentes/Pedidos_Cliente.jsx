import React from "react";
import '../componentes/css/Pedidos_Cliente.css'
import { Link } from "react-router-dom";

const Pedidos_Cliente = ({ codigo, fecha, estado, total }) => {
    return (
        <div className="contenedor_pedidos_cliente">
            <p>Código: {codigo}</p>
            <p>{new Date(fecha).toLocaleDateString("es-CO")}</p>
            <p>Total: ${total}</p>
            <p>Estado: {estado}</p>
            <Link to={`/Info_Pedido/${codigo}`}>
                Ver
            </Link>
        </div>
    );
};

export default Pedidos_Cliente;
