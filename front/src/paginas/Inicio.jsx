import React, { useEffect,useState } from "react";
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
import Bot from '../componentes/Bot';

const Inicio = () => {

    //=====ESTADOS NECESARIOS
    const [productos, setProductos] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    //========VERIFICAR SI EL USUARIO ESTA LOGUEADO
    useEffect(() => {
    fetch("http://localhost:3001/usuario_loguedo", {
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            setUsuario(data.usuario); // Usuario logueado
        } else {
            setUsuario(null); // No logueado
        }
    });
}, []);

    //=====OBTENER PRODUCTOS
    useEffect(() => {
        const obtenerProductos = async () => {
            const res = await fetch("http://localhost:3001/productos");
            const data = await res.json();

            if (data.success) {
                setProductos(data.productos); 
                setProductosFiltrados(data.productos); 
            }
        };

        obtenerProductos();
    }, []);

    //=====MANEJO DE IMAGENES
    const getImageSrc = (img) => {
    if (!img) return "";

    const trimmed = img.trim();

    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed; 
    }

    if (trimmed.startsWith("data:image")) {
        return trimmed; 
    }

    return `http://localhost:3001/uploads/${trimmed}`;
};

// ======================
    // FILTRAR SEGÚN PARÁMETROS
    // ======================
    const filtrarProductos = () => {
    const texto = busqueda.toLowerCase();

    const filtrados = productos.filter(p =>
        p.Nombre.toLowerCase().includes(texto)
    );

    setProductosFiltrados(filtrados);
    };
    const productosParaMostrar = busqueda.trim() === ""
    ? productosFiltrados.slice(0, 3)
    : productosFiltrados;



    //=====AOS
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
            ruta_tarjeta_inicio: usuario ? "/Perfil_Cliente" : "/Inicio_Sesion",
            titulo: usuario ? "Ir a tu perfil" : "Inicia sesión",
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
            ruta_tarjeta_inicio: usuario ? "/Productos_Vendedor" : "/Inicio_Sesion",
            titulo: usuario ? "Vende tus productos" : "Vende tu mismo",
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
                            key={t.id}
                            ruta_tarjeta_inicio={t.ruta_tarjeta_inicio}
                            titulo={t.titulo}
                            logo={t.logo}
                        />
                    ))}
                </div>

                <div className="caja_barra_busqueda_inicio">
                    <p>¡Descubre tu mismo!</p>
                    {/* BARRA DE BÚSQUEDA */}
                    <Barra_Busqueda 
                        busqueda={busqueda}
                        setBusqueda={setBusqueda}
                        onBuscar={filtrarProductos}
                    />
                </div>

                <div className="caja_productos_inicio">
                    <div>
                        {productosParaMostrar.length === 0 ? (
                            <p>No se encontraron productos.</p>
                        ) : (
                            productosParaMostrar.map(p => (
                                <Tarjeta_Producto
                                    key={p.Id_producto}
                                    producto={p}
                                    ruta_tarjeta={`/Info_Producto/${p.Id_producto}`}
                                />
                            ))
                        )}
                    </div>

                    {busqueda.trim() === "" && (
                        <Link to={'/Compra'}>Encuentra más {'>>'}</Link>
                    )}
                </div>
            </div>
            <Bot/>

            <Footer/>
        </div>
    )
}

export default Inicio