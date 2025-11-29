import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Info_Producto.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import { Link, useParams } from "react-router-dom";
import Tarjeta_Info_Producto from "../componentes/Tarjeta_Info_Producto";
import Mas_Del_Vendedor from "../componentes/Mas_Del_Vendedor";
import Formu_Resenas from "../componentes/Formu_Resenas";
import Resenas from "../componentes/Resenas";
const Info_Producto = () => {

    //====ESTADOS NECESARIOS
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [masDelVendedor, setMasDelVendedor] = useState([]);
    const [resenas, setResenas] = useState([]);
    //=====AOS
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    //====OBTENER PRODUCTO POR ID
    useEffect(() => {
        fetch(`http://localhost:3001/producto/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
            console.log("Datos completos del backend:", data);
            console.log("Productos del mismo vendedor:", data.masDelVendedor);

                    setProducto(data.producto);
                    setMasDelVendedor(data.masDelVendedor);
                }
            });
    }, [id]);

      //=========OBTENER RESEÑAS POR PRODUCTO
    const cargarResenas = () => {
    fetch(`http://localhost:3001/resenas/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setResenas(data.resenas);
            }
        });
};

  
    useEffect(() => {
        if (!id) return;
        cargarResenas();
    }, [id]);

      // eliminar reseña
    const eliminarResena = async (idResena) => {
        if (!window.confirm("¿Seguro que quieres eliminar esta reseña?")) return;

        try {
            const res = await fetch(`http://localhost:3001/resena/${idResena}`, {
                method: "DELETE",
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                // recargar reseñas
                cargarResenas();
            } else {
                alert("No se pudo eliminar la reseña");
            }
        } catch (error) {
            console.error("Error al eliminar reseña:", error);
            alert("Error al eliminar reseña");
        }
    };

    return(
        <div className="contenedor_info_tarjeta">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Link to={'/Compra'}>{'<'} Devolverse</Link>

                <div>
                    <Tarjeta_Info_Producto producto={producto} />
                    <Mas_Del_Vendedor productos={masDelVendedor} />
                </div>

                <div className="caja_resenas">
                    <h3>Reseñas</h3>

                    <Formu_Resenas idProducto={id} onUpload={cargarResenas} />
                    <div>
                        {resenas.length === 0 ? (
                            <p>No hay reseñas todavía.</p>
                        ) : (
                            resenas.map(r => (
                                <Resenas key={r.Id_resena} resena={r} onUpdate={cargarResenas} onDelete={eliminarResena}/>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Info_Producto