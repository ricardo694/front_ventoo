import React from "react";
import '../componentes/css/Formu_Editar_Producto.css'
import img_1 from '../img/foto_prueba.jpg'

const Formu_Editar_Producto = () => {
    return(
        <form action="" className="contenedor_formu_editar_producto">

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
                <button>Editar</button>
                <button>Cancelar</button>
            </div>
        </form>
    )
}

export default Formu_Editar_Producto