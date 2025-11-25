import React from "react";
import '../componentes/css/Encabezado_Cliente.css'
import perfil from '../img/avatar.png'

const Encabezado_Usuarios = () => {
    return(
        <div className="contenedor_encabezado_cliente">
            <div>
                <img src={perfil} alt="" />

                <div>
                    <p>Cliente marica</p>
                    <p>marica@gmail.com</p>
                </div>
            </div>

            <button>Salir</button>
        </div>
    )
}

export default Encabezado_Usuarios