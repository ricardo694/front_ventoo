import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Inicio_Sesion.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Formu_Inicio_Sesion from "../componentes/Formu_Inicio_Sesion";

const Inicio_Sesion = () => {

    //======ESTADOS NECESARIOS
    const [formData, setFormData]= useState({
        email:"",
        contrasena:""
    })
    const navigate = useNavigate();

    //=======MANEJAR CAMBIOS EN LOS INPUTS
    const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData ({...formData, [name]: value });
    };

    //========MAENAJAR EL ENVIO DEL FORMULARIO
    const handleSubmit = async (e) => {
        e.preventDefault();
    try{
        const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                 email: formData.email,
                contrasena: formData.contrasena
                })
        });

        const data = await response.json();
        console.log(data)

        if (response.ok) {
            if (data.usuario && data.usuario.Tipo_cliente) {
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
            } else {
                console.warn("El backend devolvió usuario inválido:", data.usuario);
                localStorage.removeItem("usuario");
            }

            alert("¡Bienvenido!");
            navigate("/");
        }
         else {
                alert(data.error || "Error en las credenciales ");
        }
        }catch(error){
            console.error("Error en la petición:", error);
            alert("No se pudo conectar con el servidor ");
        }
    }
    //========AOS   
    useEffect(() => {
        AOS.init({
        duration: 800,       // duración del fade
        offset: 100,         // cuándo iniciar la animación
        once: false,         // si quieres que se repita al subir/bajar
        });
    }, []);

    return(
        <div className="contenedor_inicio_sesion">
            <Encabezado/>

            <div data-aos="fade-up" data-aos-duration="1000">
                <Formu_Inicio_Sesion
                    email={formData.email}
                    contrasena={formData.contrasena}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </div>

            <Footer/>
        </div>
    )
}

export default Inicio_Sesion