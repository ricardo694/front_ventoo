import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../componentes/css/Modal_Pago.css'

const Modal_Pago = ({Mostrar_Modal_Pago}) => {

    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    return(
        <div className="contenedor_modal_pago">

            <div data-aos="fade-up" data-aos-duration="1000">
                <div>
                    <p>Total a Pagar:</p>
                    <p>$10.000</p>
                </div>
                
                <form action="">
                    <p>Meotodo de Pago</p>

                    <select name="" id="">
                        <option value="" hidden>Seleccionar...</option>
                    </select>

                    <button>Finalizar Compra</button>
                </form>

                <button onClick={Mostrar_Modal_Pago}>Cancelar</button>
            </div>

        </div>
    )
}

export default Modal_Pago