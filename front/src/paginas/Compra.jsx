import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Compra.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Filtros_Busqueda from "../componentes/Filtros_Busqueda";
import Barra_Busqueda from "../componentes/Barra_Busqueda";
import Tarjeta_Producto from "../componentes/Tarjeta_Producto";
import Bot from '../componentes/Bot';

const Compra = () => {

    //======ESTADOS NECESARIOS
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");

    // ======================
    // CARGAR PRODUCTOS Y CATEGORÍAS
    // ======================
    useEffect(() => {
        AOS.init({ duration: 800, offset: 100 });

        const cargarData = async () => {
            const resProd = await fetch("http://localhost:3001/productos");
            const dataProd = await resProd.json();

            const resCat = await fetch("http://localhost:3001/categorias");
            const dataCat = await resCat.json();

            if (dataProd.success) {
                setProductos(dataProd.productos);
                setProductosFiltrados(dataProd.productos);
            }

            if (dataCat.success) {
                setCategorias(dataCat.categorias);
            }
        };

        cargarData();
    }, []);

    // ======================
    // FILTRAR SEGÚN PARÁMETROS
    // ======================
    const filtrarProductos = () => {
        let lista = [...productos];

        // BUSQUEDA
        if (busqueda.trim() !== "") {
            lista = lista.filter(p =>
                p.Nombre.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        // CATEGORÍA
        if (categoria !== "") {
            lista = lista.filter(p => p.Id_categoria == categoria);
        }

        // PRECIO
        if (precio === "1") {
            lista.sort((a, b) => a.Precio - b.Precio);
        } else if (precio === "2") {
            lista.sort((a, b) => b.Precio - a.Precio);
        }

        setProductosFiltrados(lista);
    };

    //======OBTENER IMAGENES 
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

    return(
        <div className="contenedor_compra">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <div>

                    {/* BARRA DE BÚSQUEDA */}
                    <Barra_Busqueda 
                        busqueda={busqueda}
                        setBusqueda={setBusqueda}
                        onBuscar={filtrarProductos}
                    />

                    {/* FILTROS */}
                    <Filtros_Busqueda 
                        categorias={categorias}
                        categoria={categoria}
                        setCategoria={setCategoria}
                        precio={precio}
                        setPrecio={setPrecio}
                        onFiltrar={filtrarProductos}
                    />

                </div>

                <div className="caja_productos">
                    <p>Productos</p>

                    <div>
                        {productosFiltrados.map(p => (
                            <Tarjeta_Producto
                                key={p.Id_producto}
                                producto={p}
                                ruta_tarjeta={`/Info_Producto/${p.Id_producto}`}
                            />
                        ))}
                    </div>
                </div>

            </div>
            <Bot/>
            <Footer/>
        </div>
    );
}

export default Compra;
