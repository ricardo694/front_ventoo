import React from "react";
import '../componentes/css/Formu_Inicio_Sesion.css'
import { Link } from "react-router-dom";

const Formu_Inicio_Sesion = (    
    {handleSubmit,
    email, 
    setEmail, 
    password, 
    setPassword}) => {
    return(
        <form onSubmit={handleSubmit} className="contenedor_formu_inicio_sesion">

            <p>Inicio de Sesión</p>

            <div>
                <input 
                    type="email" 
                    placeholder="Correo" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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