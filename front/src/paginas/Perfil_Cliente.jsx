import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Perfil_Cliente.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Pedidos_Cliente from "../componentes/Pedidos_Cliente";
import Encabezado_Usuarios from "../componentes/Encabezado_Usuarios";

const Perfil_Cliente = () => {

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
                
                <div className="caja_pedidos_cliente_perfil_cliente">
                    <p>Pedidos</p>
                    <div>
                        <Pedidos_Cliente/>
                        <Pedidos_Cliente/>
                        <Pedidos_Cliente/>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Perfil_Cliente