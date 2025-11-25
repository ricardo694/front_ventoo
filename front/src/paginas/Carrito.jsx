import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Productos_Cliente_Carrito from "../componentes/Productos_Cliente_Carrito";
import Modal_Pago from "../componentes/Modal_Pago";

const Carrito = () => {

    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    //Mostrar model de pago
    const [ver_modal, setVer_modal] = useState(false)

    const Mostrar_Modal_Pago = () => {
        if(ver_modal === false){
            setVer_modal(true)
        }
        else{
            setVer_modal(false)  
        }
    }

    return(
        <div className="contenedor_perfil_cliente">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                
                <Productos_Cliente_Carrito
                    Mostrar_Modal_Pago={Mostrar_Modal_Pago}
                />
                
            </div>

            <Footer/>

            {ver_modal === false ?
            (
                null
            ) : 
            (
                <Modal_Pago
                    Mostrar_Modal_Pago={Mostrar_Modal_Pago}
                />
            )}
        </div>
    )
}

export default Carrito