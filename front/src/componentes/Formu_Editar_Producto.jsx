import React from "react";
import '../componentes/css/Formu_Editar_Producto.css';

const Formu_Editar_Producto = ({
    previewImg,
    formData,
    categorias,
    handleChange,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit} className="contenedor_formu_editar_producto">

            <p>Producto</p>

            <img 
                src={previewImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="Vista previa"
            />

            <div>
                <input 
                    type="text" 
                    name="titulo" 
                    value={formData.titulo}
                    placeholder="Titulo" 
                    onChange={handleChange}
                    required
                />

                <input 
                    type="text" 
                    name="descripcion" 
                    value={formData.descripcion}
                    placeholder="Descripción" 
                    onChange={handleChange}
                    required
                />

                <input 
                    type="number" 
                    name="precio" 
                    value={formData.precio}
                    placeholder="Precio" 
                    onChange={handleChange}
                    required
                />

                <input 
                    type="text" 
                    name="imagen" 
                    value={formData.imagen}
                    placeholder="Imagen URL" 
                    onChange={handleChange}
                    required
                />
                    {/* === SELECTOR DE CATEGORIA === */}
                <select
                    name="Id_categoria"
                    value={formData.Id_categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map(cat => (
                        <option key={cat.Id_categoria} value={cat.Id_categoria}>
                            {cat.Nombre_categoria}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <button type="submit">Editar</button>

                <button type="button" onClick={() => window.history.back()}>
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default Formu_Editar_Producto;
