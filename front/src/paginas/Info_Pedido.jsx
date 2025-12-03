import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Info_Pedido_Cliente from "../componentes/Info_Pedido_Cliente";
import Bot from '../componentes/Bot';

const Info_Pedido = () => {
    //========ESTADOS NECESARIOS
    const { idPedido } = useParams();
    const [productos, setProductos] = useState([]);
    const [pedido, setPedido] = useState(null);

    //=======AOS
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

  // ======= CARGAR PEDIDO
    useEffect(() => {
        const cargarPedido = async () => {
            const res = await fetch(`http://localhost:3001/pedido/${idPedido}`, {
                credentials: "include"
            });

            const data = await res.json();

            if (data.success) {
                setPedido(data.pedido);
                setProductos(data.productos);
            }
        };

        cargarPedido();
    }, [idPedido]);

    return(
        <div className="contenedor_perfil_cliente">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Info_Pedido_Cliente
                pedido={pedido}
                productos={productos}
                />
            </div>
            <Bot/>
            <Footer/>
        </div>
    )
}

export default Info_Pedido