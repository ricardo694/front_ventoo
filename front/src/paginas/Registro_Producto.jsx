import React, { useEffect,useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Registro_Producto.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Formu_Registrar_Producto from "../componentes/Formu_Registrar_Producto";
import { Link, useNavigate  } from "react-router-dom";
import Bot from '../componentes/Bot';

const Registro_Producto = () => {
    
    //=====ESTADOS NECESARIOS
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        imagen: "",
        categoria: ""
    });
    const [categorias, setCategorias] = useState([]);
    const [previewImg, setPreviewImg] = useState("");

    //====AOS
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);
    // ========ACTUALIZAR CAMPOS

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === "imagen") {
            setPreviewImg(value);
        }
    };

    // ========  ENVIO DE FORMULARIO

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3001/registrar_producto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success) {
                alert("Producto registrado correctamente");

                // vaciar formulario
                setFormData({
                    titulo: "",
                    descripcion: "",
                    precio: "",
                    imagen: ""
                });
                setPreviewImg("");

                navigate("/Perfil_Vendedor");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Error del servidor");
        }
    };

    // ==================================
    // OBTENER CATEGORIAS 
    // ==================================
    useEffect(() => {
    AOS.init({ duration: 800, offset: 100 });

    const fetchCategorias = async () => {
        try {
            const res = await fetch("http://localhost:3001/categorias");
            const data = await res.json();

            if (data.success) {
                setCategorias(data.categorias);
            }
        } catch (error) {
            console.log("Error cargando categorías:", error);
        }
    };

    fetchCategorias();
}, []);

    return (
        <div className="contenedor_registro_producto">
            <Encabezado />

            <div data-aos="fade-up" data-aos-duration="1000">

                <Link to={"/Perfil_Vendedor"}>{'<'} Volver</Link>

                <div>
                    <Formu_Registrar_Producto
                        previewImg={previewImg}
                        formData={formData}
                        categorias={categorias}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <Bot/>
            <Footer />
        </div>
    );
};

export default Registro_Producto;