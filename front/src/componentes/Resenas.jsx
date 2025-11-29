import React, { useState } from "react";
import '../componentes/css/Resenas.css'
import { useNavigate } from "react-router-dom";

const Resenas = ({ resena, onUpdate, onDelete }) => {

    const [modoEditar, setModoEditar] = useState(false);
    const [nuevoTexto, setNuevoTexto] = useState(resena.Comentario);
    const [nuevasEstrellas, setNuevasEstrellas] = useState(resena.Estrellas);


       const guardarCambios = async () => {
        if (!usuario) {
            alert("Debes iniciar sesión.");
            return;
        }
        const res = await fetch(`http://localhost:3001/resena/${resena.Id_resena}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  
            body: JSON.stringify({
                Comentario: nuevoTexto,
                Estrellas: nuevasEstrellas
            })
        });

        const data = await res.json();

        if (data.success) {
            onUpdate();  // recarga reseñas
            setModoEditar(false);
        }
    };

    const Cancelar_Edicion = () => {
        if (confirm("¿Quiere dejar de editar?")) {
            setModoEditar(false);
            setNuevoTexto(resena.Comentario);
            setNuevasEstrellas(resena.Estrellas);
        }
    };

    const eliminarResena = async (idResena) => {
    if (!confirm("¿Seguro que quieres eliminar esta reseña?")) return;

    const res = await fetch(`http://localhost:3001/resena/${idResena}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await res.json();

    if (data.success) {
        cargarResenas();
    }
    }  ;

    return (
        <div className="contenedor_resenas">
            
            {/* Usuario y estrellas */}
            <div>
                <p>{resena.NombreUsuario}</p>
                <p>
                    {"★".repeat(resena.Estrellas)}
                    {"☆".repeat(5 - resena.Estrellas)}
                </p>
            </div>


            {/* Texto o edición */}
            { !modoEditar ? (
                <p>{resena.Comentario}</p>
            ) : (
                <div className="caja_editar_resena">
                    <input 
                        type="text"
                        value={nuevoTexto}
                        onChange={(e) => setNuevoTexto(e.target.value)}
                    />

                    <select 
                        value={nuevasEstrellas}
                        onChange={(e) => setNuevasEstrellas(Number(e.target.value))}
                    >
                        <option value="1">1 Estrella</option>
                        <option value="2">2 Estrellas</option>
                        <option value="3">3 Estrellas</option>
                        <option value="4">4 Estrellas</option>
                        <option value="5">5 Estrellas</option>
                    </select>
                </div>
            )}


            {/* Botones */}
            {!modoEditar ? (
                <div>
                    <button onClick={() => setModoEditar(true)}>Editar</button>
                    <button onClick={() => onDelete(resena.Id_resena)}>Eliminar</button>
                </div>
            ) : (
                <div>
                    <button onClick={guardarCambios}>Guardar</button>
                    <button onClick={Cancelar_Edicion}>Cancelar</button>
                </div>
            )}

        </div>
    );
};

export default Resenas;
