import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Registro_Producto.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Formu_Registrar_Producto from "../componentes/Formu_Registrar_Producto";
import { Link } from "react-router-dom";

const Registro_Producto = () => {

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
                    <Formu_Registrar_Producto/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Registro_Producto