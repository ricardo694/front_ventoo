import React from "react";
import img_1 from '../img/foto_prueba.jpg'

const Formu_Registrar_Producto = () => {
    return(
        <form action="" className="contenedor_formu_inicio_sesion">

            <p>Producto</p>

            <img src={img_1} alt="" />

            <div>
                <input type="text" placeholder="Titulo" required/>
                <input type="text" placeholder="Descripción" required/>
                <input type="number" placeholder="Precio" required/>
                <input type="number" placeholder="Cantidad" required/>
                <input type="text" placeholder="Imagen URL" required/>
            </div>

            <div>
                <button>Registrar</button>
            </div>
        </form>
    )
}

export default Formu_Registrar_Producto