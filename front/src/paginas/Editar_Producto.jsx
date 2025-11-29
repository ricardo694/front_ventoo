import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import { Link, useParams, useNavigate } from "react-router-dom";
import Formu_Editar_Producto from "../componentes/Formu_Editar_Producto";
import Footer from "../componentes/Footer";

const Editar_Producto = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        imagen: "",
        Id_categoria: ""
    });

    const [previewImg, setPreviewImg] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarProducto();
        obtenerCategorias();
        AOS.init({ duration: 800, offset: 100 });
    }, []);

    const cargarProducto = async () => {
        try {
            const res = await fetch(`http://localhost:3001/producto_editar/${id}`, {
                credentials: "include"
            });

            const data = await res.json();

            if (!data.success) {
                // ❗ No redirigimos aquí todavía
                setCargando(false);
                return;
            }

            setFormData({
                titulo: data.producto.Nombre,
                descripcion: data.producto.Descripcion,
                precio: data.producto.Precio,
                imagen: data.producto.Imagen,
                Id_categoria: data.producto.Id_categoria
            });

            setPreviewImg(data.producto.Imagen);
            setCargando(false);

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const obtenerCategorias = async () => {
        const res = await fetch("http://localhost:3001/categorias");
        const data = await res.json();
        if (data.success) setCategorias(data.categorias);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === "imagen") setPreviewImg(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3001/editar_producto/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include"
        });
        const data = await res.json();
        if (data.success) {
            alert("Producto actualizado");
            navigate("/Perfil_Vendedor");
        }
        else{
            alert("Error al editar");
        }
            
    };

    const handleCancel = () => navigate("/Perfil_Vendedor");


    return (
        <div className="contenedor_registro_producto">
            <Encabezado />

            <div data-aos="fade-up" data-aos-duration="1000">
                <Link to={'/Perfil_Vendedor'}>{'<'} Devolverse</Link>

                <Formu_Editar_Producto
                    previewImg={previewImg}
                    formData={formData}
                    categorias={categorias}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            </div>

            <Footer />
        </div>
    );
};

export default Editar_Producto;
