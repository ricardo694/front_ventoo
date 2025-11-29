import React from "react";
import '../componentes/css/Filtros_Busqueda.css'

const Filtros_Busqueda = ({
    categorias,
    categoria,
    setCategoria,
    precio,
    setPrecio,
    onFiltrar
}) => {
    return (
        <div className="contenedor_filtros_busqueda">
            <form onSubmit={(e)=>{e.preventDefault(); onFiltrar();}}>
                
                {/* PRECIO */}
                <select value={precio} onChange={(e)=>setPrecio(e.target.value)}>
                    <option value="">Precio</option>
                    <option value="1">Menor a Mayor</option>
                    <option value="2">Mayor a Menor</option>
                </select>

                {/* CATEGORIA */}
                <select value={categoria} onChange={(e)=>setCategoria(e.target.value)}>
                    <option value="">Categoría</option>
                    {categorias.map(c => (
                        <option key={c.Id_categoria} value={c.Id_categoria}>
                            {c.Nombre_categoria}
                        </option>
                    ))}
                </select>

                <button type="submit">Filtrar</button>
            </form>
        </div>
    );
};

export default Filtros_Busqueda;