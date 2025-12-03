import React, { useEffect,useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../componentes/Footer";
import Encabezado from "../componentes/Encabezado";
import Encabezado_Usuarios from "../componentes/Encabezado_Usuarios";
import Productos_Vendedor from "../componentes/Productos_Vendedor";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Bot from '../componentes/Bot';

const Perfil_Vendedor = () => {

    //========ESTADOS NECESARIOS
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [productosVendedor, setProductosVendedor] = useState([]);
   //========= OBTENER USUARIO 
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

    //============SUBIR FOTO
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

    //=====OBTENER PRODUCTOS DEL VENDEDOR
    useEffect(() => {
    const obtenerProductosVendedor = async () => {
        const res = await fetch("http://localhost:3001/productos_vendedor", {
            credentials: "include"
        });
        const data = await res.json();

        if (data.success) {
            setProductosVendedor(data.productos);
        }
    };

    obtenerProductosVendedor();
    }, []);

    //=====ELIMINAR PRODUCTO
    const eliminarProducto = async (idProducto) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    const res = await fetch(`http://localhost:3001/eliminar_producto/${idProducto}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await res.json();

    if (data.success) {
        // quitarlo del estado sin recargar
        setProductosVendedor(prev =>
            prev.filter(p => p.Id_producto !== idProducto)
        );
    } else {
        alert("Error al eliminar: " + data.message);
    }
    };


    //=========CERRAR SESIÓN 
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

    //=====AOS
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    //=====CARGAR IMAGEN

    const imagenFinal = imagenPreview ||
        (usuario?.Imagen ? `http://localhost:3001/uploads/${usuario.Imagen}` : null);

    // No renderizar nada hasta que usuario esté cargado
    if (!usuario) {
        return (
            <div className="contenedor_perfil_cliente">
                <Encabezado/>
                <p>Cargando perfil...</p>
                <Footer/>
            </div>
        );
    }
    return(
        <div className="contenedor_perfil_cliente">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Encabezado_Usuarios
                    nombre={usuario.Nombre}
                    email={usuario.Email}
                    imagen={imagenFinal}
                    handleImagenChange={handleImagenChange}
                    handleCerrarSesion={handleCerrarSesion}
                />

                <Link to={'/Registrar_Producto'} className="boton_registrar_producto">Registrar</Link>
                
                <Productos_Vendedor 
                    productos={productosVendedor} 
                    eliminarProducto={eliminarProducto}
                />
            </div>
            <Bot/>
            <Footer/>
        </div>
    )
}

export default Perfil_Vendedor