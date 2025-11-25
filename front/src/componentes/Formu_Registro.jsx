import React from "react";
import { Link } from "react-router-dom";

const Formu_Registro = ({handleSubmit, handleChange, form}) => {
    return(
        <form onSubmit={handleSubmit} className="contenedor_formu_inicio_sesion">

            <p>Registro</p>

            <div>
                <input 
                    type="text" 
                    placeholder="Nombre Completo" 
                    required
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}

                />

                <input 
                    type="number" 
                    placeholder="Telefono" 
                    required
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}

                
                />

                <input 
                    type="email" 
                    placeholder="Correo" 
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}

                />

                <select 
                    name="tipo"  
                    required
                    value={form.tipo}
                    onChange={handleChange}

                >
                    <option value="" hidden>Rol</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                </select>

                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    required
                    name="password"
                    value={form.password}
                    onChange={handleChange}

                />
            </div>

            <div>
                <button type="submit">Registrarse</button>

                <p>¿Ya tienes una cuenta? <Link to={'/Inicio_Sesion'}>Inicia Sesion</Link></p>

            </div>
        </form>
    )
}

export default Formu_Registro