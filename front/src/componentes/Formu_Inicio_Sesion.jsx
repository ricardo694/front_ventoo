import React from "react";
import '../componentes/css/Formu_Inicio_Sesion.css'
import { Link } from "react-router-dom";

const Formu_Inicio_Sesion = ({
    onSubmit,
    onChange,
    email,
    contrasena}) => {
    return(
        <form onSubmit={onSubmit} className="contenedor_formu_inicio_sesion">

            <p>Inicio de Sesión</p>

            <div>
                <input 
                    type="email" 
                    placeholder="Correo" 
                    required
                    name="email"
                    value={email}
                    onChange={onChange}
                />

                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    required
                    name="contrasena"
                    value={contrasena}
                    onChange={onChange}
                />
            </div>

            <div>
                <button type="submit">Entrar</button>
                <p>¿No tienes una cuenta? <Link to={'/Registrarse'}>Registrate</Link></p>
            </div>
        </form>
    )
}

export default Formu_Inicio_Sesion