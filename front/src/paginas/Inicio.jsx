import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import '../paginas/css/General.css'
import '../paginas/css/Inicio.css'
import Carrusel from "../componentes/Carrusel";
import Tarjeta_Inicio from "../componentes/Tarjeta_Inicio";
import img1 from "../img/perfil-del-usuario.png"
import img2 from "../img/anadir-a-la-cesta.png"
import img3 from "../img/no-se-vende.png"
import Barra_Busqueda from "../componentes/Barra_Busqueda";
import Tarjeta_Producto from "../componentes/Tarjeta_Producto";
import { Link } from "react-router-dom";
import Footer from "../componentes/Footer";

const Inicio = () => {

    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    const info_tarjetas_inicio = [
        {
            id: 1,
            ruta_tarjeta_inicio: "/Inicio_Sesion",
            titulo: "Entra a tu cuenta",
            logo: img1
        },
        {
            id: 2,
            ruta_tarjeta_inicio: "/Compra",
            titulo: "Compra algo",
            logo: img2
        },
        {
            id: 3,
            ruta_tarjeta_inicio: "/Inicio_Sesion",
            titulo: "Vende tu mismo",
            logo: img3
        }
    ];

    return(
        <div className="contenedor_inicio">
            <Encabezado/>
            <div data-aos="fade-up" data-aos-duration="1000">
                <Carrusel/>

                <div className="caja_tarjetas_inicio_inicio">
                    {info_tarjetas_inicio.map((t) => (
                        <Tarjeta_Inicio
                            ruta_tarjeta_inicio={t.ruta_tarjeta_inicio}
                            titulo={t.titulo}
                            logo={t.logo}
                        />
                    ))}
                </div>

                <div className="caja_barra_busqueda_inicio">
                    <p>¡Descubre tu mismo!</p>
                    <Barra_Busqueda/>
                </div>

                <div className="caja_productos_inicio">
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
                    </div>
                    <Link to={'/Compra'}>Encuentra mas {'>>'}</Link>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Inicio