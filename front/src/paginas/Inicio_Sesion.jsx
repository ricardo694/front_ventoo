import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import '../paginas/css/Inicio_Sesion.css'
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Formu_Inicio_Sesion from "../componentes/Formu_Inicio_Sesion";

const Inicio_Sesion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            alert("Bienvenido " + data.usuario.nombre);
            navigate("/"); 
        } else {
            alert(data.message);
        }
    }

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
                    handleSubmit={handleSubmit}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                />
            </div>

            <Footer/>
        </div>
    )
}

export default Inicio_Sesion