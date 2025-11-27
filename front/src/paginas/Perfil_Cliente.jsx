import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Perfil_Cliente.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Pedidos_Cliente from "../componentes/Pedidos_Cliente";
import Encabezado_Usuarios from "../componentes/Encabezado_Usuarios";
import { useNavigate } from "react-router-dom";

const Perfil_Cliente = () => {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);

    //================== OBTENER USUARIO ==================
    useEffect(() => {
        const obtenerUsuario = async () => {
            const res = await fetch("http://localhost:3001/usuario_logueado", {
                credentials: "include"
            });
            const data = await res.json();

            if (data.success) {
                setUsuario(data.usuario);
            } else {
                navigate("/");
            }
        };

        obtenerUsuario();
    }, []);

    //================ SUBIR FOTO =================
    const handleImagenChange = async (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;

        const formData = new FormData();
        formData.append("imagen", archivo);

        const res = await fetch("http://localhost:3001/subir_imagen", {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        const data = await res.json();

        if (data.success) {
            const nuevaRuta = `http://localhost:3001/uploads/${data.imagen}`;

            setImagenPreview(nuevaRuta);

            setUsuario(prev => ({
                ...prev,
                Imagen: data.imagen
            }));
        }
    };


    //================ CERRAR SESIÓN =================
    const handleCerrarSesion = async () => {
        if (!window.confirm("¿Seguro que quieres cerrar tu sesión?")) return;

        try {
            const res = await fetch("http://localhost:3001/cerrar_sesion", {
                method: "POST",
                credentials: "include"
            });

            const data = await res.json();

            if (data.success) {
                localStorage.removeItem("usuario");
                navigate("/");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };


    //================ AOS =================
    useEffect(() => {
        AOS.init({ duration: 800, offset: 100, once: false });
    }, []);


    if (!usuario) return null; // evitar render vacío

    const imagenFinal = imagenPreview ||
        (usuario.Imagen ? `http://localhost:3001/uploads/${usuario.Imagen}` : null);

    return (
        <div className="contenedor_perfil_cliente">
            
            <Encabezado />

            <div data-aos="fade-up" data-aos-duration="1000">

                <Encabezado_Usuarios
                    nombre={usuario.Nombre}
                    email={usuario.Email}
                    imagen={imagenFinal}
                    handleImagenChange={handleImagenChange}
                    handleCerrarSesion={handleCerrarSesion}
                />

                <div className="caja_pedidos_cliente_perfil_cliente">
                    <p>Pedidos</p>
                    <div>
                        <Pedidos_Cliente />
                        <Pedidos_Cliente />
                        <Pedidos_Cliente />
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default Perfil_Cliente;
