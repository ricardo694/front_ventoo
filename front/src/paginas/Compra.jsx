import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Compra.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Filtros_Busqueda from "../componentes/Filtros_Busqueda";
import Tarjeta_Producto from "../componentes/Tarjeta_Producto";

const Compra = () => {

    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    return(
        <div className="contenedor_compra">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <div>
                    <Filtros_Busqueda/>
                </div>

                <div className="caja_productos">
                    <p>Ropa</p>

                    <div>
                        <Tarjeta_Producto
                            texto_tarjeta={'Ver'}
                            ruta_tarjeta={'/Ver_Informacion_Producto'}
                        />
                        <Tarjeta_Producto
                            texto_tarjeta={'Ver'}
                            ruta_tarjeta={'/Ver_Informacion_Producto'}
                        />
                        <Tarjeta_Producto
                            texto_tarjeta={'Ver'}
                            ruta_tarjeta={'/Ver_Informacion_Producto'}
                        />
                        <Tarjeta_Producto
                            texto_tarjeta={'Ver'}
                            ruta_tarjeta={'/Ver_Informacion_Producto'}
                        />
                    </div>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Compra