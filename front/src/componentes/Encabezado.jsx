import React from "react";
import { Link, NavLink } from "react-router-dom";
import titulo from "../img/titulo.png"
import '../componentes/css/Encabezado.css'
import { useState } from "react";

const Encabezado = () => {

    const [ver_menu, setVer_menu] = useState(false)

    const Mostrar_Menu = () => {
        if(ver_menu === false){
            setVer_menu(true)
        }
        else{
            setVer_menu(false)
        }
    }

    return(
        <div className="contenedor_encabezado">
            <img src={titulo} alt="" />

            <button onClick={Mostrar_Menu}>Menú</button>

            {ver_menu === false ? 
            (
                <nav className="navbar">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Inicio</NavLink>

                    <NavLink to="/Compra" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Compra</NavLink>

                    <NavLink to="/Carrito" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Carrito</NavLink>

                    <NavLink to="/Inicio_Sesion" className={({ isActive }) => isActive ? 'nav_link_active' : 'nav-link'}>Inicio Sesion</NavLink>
                </nav>
            ) : 
            (
                null
            )}
        </div>
    )
}

export default Encabezado