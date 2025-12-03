import React, { useState } from "react";
import '../componentes/css/Tarjeta_Info_Producto.css';

const Tarjeta_Info_Producto = ({ producto }) => {
    if (!producto) return null; 
    //====ESTADOS NECESARIOS
    
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [cantidad, setCantidad] = useState(1);

    const agregarCarrito = async (idProducto, cantidad) => {
        if (!usuario) {
            alert("Debes iniciar sesión.");
            return;
        }

        if (usuario.Tipo_cliente === "Vendedor") {
            alert("Debes ser cliente para poder comprar productos.");
            return;
        }

        const res = await fetch("http://localhost:3001/carrito/agregar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Id_usuario: usuario.Id_usuario,
                Id_producto: idProducto,
                Cantidad: cantidad
            })
        });

        const data = await res.json();

        if (data.success) {
            alert("Producto agregado al carrito");
        } else {
            alert("Error al agregar al carrito");
        }
    };

    //======Procesar imagen del producto
    let imagenProducto = producto.Imagen || "";

    if (imagenProducto.startsWith("http")) {
    }
    else if (!imagenProducto.startsWith("data:image")) {
        imagenProducto = `data:image/jpeg;base64,${imagenProducto}`;
    }


    //========Foto del vendedor

    let fotoVendedor =
        producto.FotoVendedor && producto.FotoVendedor !== ""
            ? producto.FotoVendedor
            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // foto por defecto

            
    return (
    <div className="contenedor_tarjeta_info_producto">


        <p>{producto.Nombre}</p>

 
        <div className="caja_info_producto_tarjeta_info_producto">


            <img
                src={imagenProducto}
                alt={producto.Nombre}
                onError={e => e.target.src = "https://via.placeholder.com/200"}
            />


            <div>

                <p>{producto.Descripcion}</p>
                

                <div>
                    <p>${producto.Precio}</p>

                    <div>
                        <button onClick={() => setCantidad(c => Math.max(1, c - 1))}>-

                        </button>

                        <p>{cantidad}</p>

                        <button onClick={() => setCantidad(c => c + 1)}>+
                        </button>
                    </div>
                </div>

                <div>

                    <button onClick={() => agregarCarrito(producto.Id_producto, cantidad)}>
                        Agregar
                    </button>
                
                </div>
            </div>
        </div>


        <div>
            <img
                src={fotoVendedor}
                alt="Foto del vendedor"
                onError={e => e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            />
            <p>{producto.NombreVendedor || "Vendedor desconocido"}</p>
        </div>

    </div>
);

};

export default Tarjeta_Info_Producto;
