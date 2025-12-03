import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Productos_Cliente_Carrito from "../componentes/Productos_Cliente_Carrito";
import Modal_Pago from "../componentes/Modal_Pago";
import Bot from '../componentes/Bot';
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
    const [totalPago, setTotalPago] = useState(0);


    const Mostrar_Modal_Pago = () => {
        if(ver_modal === false){
            setVer_modal(true)
        }
        else{
            setVer_modal(false)  
        }
    }
    const vaciarCarrito = async () => {
        const res = await fetch("http://localhost:3001/vaciar_carrito", {
            method: "DELETE",
            credentials: "include"
        });

        const data = await res.json();

        if (data.success) {
            alert("Compra finalizada exitosamente");
            setVer_modal(false); // cerrar modal
            window.location.reload(); // recargar carrito
        } else {
            alert("Error al finalizar compra");
        }
    };

    const finalizarCompra = async (direccion, metodoPago) => {

    if (!direccion || !metodoPago) {
        return alert("Debes completar todos los campos");
    }

    const res = await fetch("http://localhost:3001/crear_pedido", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            direccion,
            metodoPago,
            total: totalPago
        })
    });

    const data = await res.json();

    if (data.success) {
        alert("Pedido creado correctamente");

        // Ahora sí vaciar carrito
        await fetch("http://localhost:3001/vaciar_carrito", {
            method: "DELETE",
            credentials: "include"
        });

        setVer_modal(false);
        window.location.reload();

    } else {
        alert("Error al crear el pedido");
    }
};
    return(
        <div className="contenedor_perfil_cliente">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                
                <Productos_Cliente_Carrito
                    Mostrar_Modal_Pago={Mostrar_Modal_Pago}
                    setTotalPago={setTotalPago}
                />
                
            </div>
            <Bot/>
            <Footer/>

            {ver_modal === false ?
            (
                null
            ) : 
            (
                <Modal_Pago
                    Mostrar_Modal_Pago={Mostrar_Modal_Pago}
                    total={totalPago}
                    vaciarCarrito={vaciarCarrito}
                    finalizarCompra={finalizarCompra}
                />
            )}
        </div>
    )
}

export default Carrito