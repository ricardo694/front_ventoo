import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import Formu_Registro from "../componentes/Formu_Registro";

const Registro = () => {

    const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    tipo: "",
    password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    


        
    const res = await fetch("http://localhost/front_ventoo/backend/auth-php/routes/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
    });

    const data = await res.json();
    console.log(data);

    if (data.message) {
    alert("Cuenta creada exitosamente");

        setForm({
        Nombre: '',
        Telefono: '',
        email: '',
        tipo: '',
        password: ''
    });
    navigate('/');
    } else {
        alert("Error: " + data.error);
    };

    };


    
    
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
                <Formu_Registro
                    handleSubmit={handleSubmit} 
                    handleChange={handleChange} 
                    form={form}
                />
            </div>

            <Footer/>
        </div>
    )
};

export default Registro