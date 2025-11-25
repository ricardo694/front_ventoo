import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import { Link } from "react-router-dom";
import Formu_Editar_Producto from "../componentes/Formu_Editar_Producto";
import Footer from "../componentes/Footer";

const Editar_Producto = () => {

    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    return(
        <div className="contenedor_registro_producto">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">

                <Link to={'/Perfil_Vendedor'}>{'<'} Devolverse</Link>

                <div>
                    <Formu_Editar_Producto/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Editar_Producto