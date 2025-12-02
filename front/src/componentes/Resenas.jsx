import React, { useState } from "react";
import '../componentes/css/Resenas.css';

const Resenas = ({ resena, onSave, onCancel, onDelete, usuarioActual }) => {

    const [modoEditar, setModoEditar] = useState(false);
    const [nuevoTexto, setNuevoTexto] = useState(resena.Comentario);
    const [nuevasEstrellas, setNuevasEstrellas] = useState(resena.Estrellas);

    const esPropietario =
        usuarioActual && usuarioActual.Id_usuario === resena.Id_usuario;

    const iniciarEdicion = () => setModoEditar(true);

    const cancelar = () => {
        setModoEditar(false);
        setNuevoTexto(resena.Comentario);
        setNuevasEstrellas(resena.Estrellas);
        if (onCancel) onCancel();
    };

    const guardar = () => {
        onSave(resena.Id_resena, nuevoTexto, nuevasEstrellas);
        setModoEditar(false);
    };

    return (
        <div className="contenedor_resenas">

            {/* === PRIMER DIV (arriba) — usuario y estrellas/acciones === */}
            <div>
                <p>{resena.NombreUsuario}</p>

                <p>
                    {/* Aquí NO van botones porque el CSS marca este <p> solo para texto */}
                </p>
            </div>

            {/* === TEXTO O EDICIÓN === */}
            {!modoEditar ? (
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

            {/* === ÚLTIMO DIV (abajo) — botones === */}
            {esPropietario && (
                <div>
                    {!modoEditar ? (
                        <>
                            <button onClick={iniciarEdicion}>Editar</button>
                            <button onClick={() => onDelete(resena.Id_resena)}>Eliminar</button>
                        </>
                    ) : (
                        <>
                            <button onClick={guardar}>Guardar</button>
                            <button onClick={cancelar}>Cancelar</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Resenas;
