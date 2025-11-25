import React from "react";
import '../componentes/css/Pedidos_Cliente.css'
import { Link } from "react-router-dom";

const Pedidos_Cliente = () => {
    return(
        <div className="contenedor_pedidos_cliente">
            <p>Codigo: FEE65</p>
            <p>16/11/2025</p>
            <p>Productos: 3</p>
            <Link to={'/Informacion_Pedido'}>Ver</Link>
        </div>
    )
}

export default Pedidos_Cliente