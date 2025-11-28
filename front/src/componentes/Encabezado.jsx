import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import titulo from "../img/titulo.png";
import '../componentes/css/Encabezado.css';

const Encabezado = () => {

    //========ESTADOS NECESARIOS
    const [ver_menu, setVer_menu] = useState(false);
    const navigate = useNavigate();
    const Mostrar_Menu = () => setVer_menu(!ver_menu);

    //==========Cargar usuario inmediatamente
    const [usuario, setUsuario] = useState(() => {
        try {
            const u = JSON.parse(localStorage.getItem("usuario"));
            return u
                ? { ...u, Tipo_cliente: u.Tipo_cliente?.trim().toLowerCase() }
                : null;
        } catch {
            return null;
        }
    });

    //==========Detectar cambios en localStorage
    useEffect(() => {
        const handleStorage = () => {
            try {
                const u = JSON.parse(localStorage.getItem("usuario"));
                setUsuario(
                    u
                        ? { ...u, Tipo_cliente: u.Tipo_cliente?.trim().toLowerCase() }
                        : null
                );
            } catch {
                setUsuario(null);
            }
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);



    return (
        <div className="contenedor_encabezado">
            <img src={titulo} alt="" />
            <button type="button" onClick={Mostrar_Menu}>Menú</button>

            {!ver_menu ? (
                <nav className="navbar">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Inicio</NavLink>
                    <NavLink to="/Compra" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Compra</NavLink>
                    <NavLink to="/Carrito" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Carrito</NavLink>

                    {usuario ? (
                        <NavLink
                            to={usuario.Tipo_cliente === "cliente" ? "/Perfil_Cliente" : "/Perfil_Vendedor"}
                            className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}
                        >
                            Perfil
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/Inicio_Sesion"
                            className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}
                        >
                            Inicio Sesión
                        </NavLink>
                    )}
                </nav>
            ) : null}
        </div>
    );
};

export default Encabezado;
