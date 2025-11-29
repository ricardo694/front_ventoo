import React, { useEffect, useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../componentes/css/Modal_Pago.css'

const Modal_Pago = ({Mostrar_Modal_Pago, total, finalizarCompra}) => {

    const [direccion, setDireccion] = useState("");
    const [metodoPago, setMetodoPago] = useState("");

        const handleFinalizar = () => {
        finalizarCompra(direccion, metodoPago);
    };
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
                    <p>${total.toLocaleString()}</p>
                </div>
                
                <form>
                    
                    <p>Dirección de envío</p>
                    <input
                        type="text"
                        placeholder="Escribe tu dirección..."
                        value={direccion}
                        onChange={e => setDireccion(e.target.value)}
                    />
                    <p>Meotodo de Pago</p>

                    <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                        <option hidden>Seleccionar...</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Nequi">Nequi</option>
                        <option value="Bancolombia">Bancolombia</option>
                    </select>

                    <button 
                        type="button"
                        className="btn_finalizar_compra"
                        onClick={handleFinalizar}
                    >
                        Finalizar Compra
                    </button>
                </form>

                <button onClick={Mostrar_Modal_Pago}>Cancelar</button>
            </div>

        </div>
    )
}

export default Modal_Pago