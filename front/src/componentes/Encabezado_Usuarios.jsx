import React from "react";
import '../componentes/css/Encabezado_Cliente.css'
import perfilDefault from '../img/avatar.png';

const Encabezado_Usuarios = ({
    nombre,
    email,
    imagen,
    handleImagenChange,
    handleCerrarSesion
}) => {

    return (
        <div className="contenedor_encabezado_cliente">

            <div className="info_usuario">
                <label>
                    <img 
                        src={imagen || perfilDefault}
                        alt="perfil"
                        className="imagen_perfil_usuario"
                    />

                    {/* INPUT invisible */}
                    <input 
                        type="file" 
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImagenChange}
                    />
                </label>

                <div>
                    <p>{nombre}</p>
                    <p>{email}</p>
                </div>
            </div>

            <button onClick={handleCerrarSesion}>Salir</button>
        </div>
    );
};

export default Encabezado_Usuarios;
