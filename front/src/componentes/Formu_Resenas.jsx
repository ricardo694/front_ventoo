import React,{useState} from "react";
import '../componentes/css/Formu_Resenas.css'

const Formu_Resenas = ({ idProducto, onUpload }) => {

    const [texto, setTexto] = useState("");
    const [estrellas, setEstrellas] = useState(5);

    const enviar = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3001/resena", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                Id_producto: idProducto,
                Comentario: texto,
                Estrellas: estrellas

                


            })

        });

        const data = await res.json();
        if (data.success) {
            onUpload();
            setTexto("");
            setEstrellas(5);
        }
    };

    return (
        <form className="contenedor_formu_resenas" onSubmit={enviar}>
            <input 
                type="text" 
                placeholder="Escribe una reseña"
                value={texto}
                onChange={e => setTexto(e.target.value)}
            />

            <select value={estrellas} onChange={e => setEstrellas(e.target.value)}>
                <option value="1">1 Estrella</option>
                <option value="2">2 Estrella</option>
                <option value="3">3 Estrella</option>
                <option value="4">4 Estrella</option>
                <option value="5">5 Estrella</option>
            </select>

            <button>Subir</button>
        </form>
    );
};


export default Formu_Resenas