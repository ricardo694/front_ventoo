import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../componentes/Footer";
import Encabezado from "../componentes/Encabezado";
import Encabezado_Usuarios from "../componentes/Encabezado_Usuarios";
import Productos_Vendedor from "../componentes/Productos_Vendedor";
import { Link } from "react-router-dom";

const Perfil_Vendedor = () => {

    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    return(
        <div className="contenedor_perfil_cliente">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Encabezado_Usuarios/>

                <Link to={'/Registrar_Producto'} className="boton_registrar_producto">Registrar</Link>
                
                <Productos_Vendedor/>
            </div>

            <Footer/>
        </div>
    )
}

export default Perfil_Vendedor