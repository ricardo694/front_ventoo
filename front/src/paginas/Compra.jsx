import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Compra.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Filtros_Busqueda from "../componentes/Filtros_Busqueda";
import Tarjeta_Producto from "../componentes/Tarjeta_Producto";

const Compra = () => {
    const [productos, setProductos] = React.useState([]);

    useEffect(() => {
        AOS.init({ duration: 800, offset: 100 });

        const obtenerProductos = async () => {
            const res = await fetch("http://localhost:3001/productos");
            const data = await res.json();

            if (data.success) {
                setProductos(data.productos);
            }
        };

        obtenerProductos();
    }, []);

       const getImageSrc = (img) => {
    if (!img) return "";

    const trimmed = img.trim(); // <-- IMPORTANTE

    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed; // URL completa
    }

    if (trimmed.startsWith("data:image")) {
        return trimmed; // Base64
    }

    return `http://localhost:3001/uploads/${trimmed}`;
};
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
                            {productos.map(p => (
                                <Tarjeta_Producto
                                    key={p.Id_producto}
                                    nombre={p.Nombre}
                                    precio={p.Precio}
                                    imagen={getImageSrc(p.Imagen)}
                                    ruta_tarjeta={p.Id_producto}
                                />
                            ))}
                        </div>
                    </div>



            </div>

            <Footer/>
        </div>
    )
}

export default Compra