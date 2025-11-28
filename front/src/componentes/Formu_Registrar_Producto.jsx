import React from "react";
import '../componentes/css/Formu_Registrar_Producto.css';
const Formu_Registrar_Producto = ({
    previewImg,
    formData,
    categorias,
    handleChange,
    handleSubmit
}) => {
    return(
        <form onSubmit={handleSubmit}className="contenedor_formu_inicio_sesion">

            <p>Registrar Producto</p>

            <img 
                src={previewImg || "https://via.placeholder.com/200"} 
                alt="preview" 
                className="preview_producto"
            />
            <div>
                <input 
                    type="text" 
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Título"
                    required
                />

                <input 
                    type="text" 
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción"
                    required
                />

                <input 
                    type="number" 
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    placeholder="Precio"
                    required
                />

                <input 
                    type="text" 
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    placeholder="URL de imagen"
                    required
                />

                <select 
                    name="categoria" 
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar categoría</option>
                    {/*OBTENER CATEGORIA DE LA BASE DE DATOS*/}
                    {categorias.map(cat => (
                        <option key={cat.Id_categoria} value={cat.Id_categoria}>
                            {cat.Nombre_categoria}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <button>Registrar</button>
            </div>
        </form>
    )
}

export default Formu_Registrar_Producto