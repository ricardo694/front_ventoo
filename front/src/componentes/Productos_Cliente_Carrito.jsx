import React, { useEffect, useState } from "react";
import '../componentes/css/Productos_Cliente_Carrito.css';
import Tarjeta_Producto from "./Tarjeta_Producto";

const Productos_Cliente_Carrito = ({ Mostrar_Modal_Pago, setTotalPago }) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [carrito, setCarrito] = useState([]);
    const [aceptar_permiso, setAceptar_permiso] = useState(false);


    useEffect(() => {
        cargarCarrito();
    }, []);

    useEffect(() => {
        const total = carrito.reduce((acc, item) => acc + item.Precio * item.Cantidad, 0);
        setTotalPago(total);
    }, [carrito, setTotalPago]);

    const cargarCarrito = async () => {
        const res = await fetch(`http://localhost:3001/carrito/${usuario.Id_usuario}`);
        const data = await res.json();
        if (data.success) setCarrito(data.carrito);
    };

    const eliminarProducto = async (idProducto) => {
        await fetch(`http://localhost:3001/carrito/eliminar/${usuario.Id_usuario}/${idProducto}`, {
            method: "DELETE"
        });
        cargarCarrito();
    };

    const total = carrito.reduce((acc, item) => acc + item.Precio * item.Cantidad, 0);

    return (
    <div className="contenedor_productos_cliente_carrito">
        <p>Carrito</p>

        <div className="caja_productos_productos_cliente_carrito">
            
            {/* === LISTA DE PRODUCTOS O MENSAJE DE VACÍO === */}
            <div>
                {carrito.length === 0 ? (
                    <p className="mensaje_carrito_vacio">
                        No has añadido nada al carrito
                    </p>
                ) : (
                    carrito.map(item => (
                        <div key={item.Id_producto}>
                            <Tarjeta_Producto
                                producto={item}
                                texto_tarjeta="Ver"
                                ruta_tarjeta={item.Id_producto}
                            />

                            <button onClick={() => eliminarProducto(item.Id_producto)}>
                                Eliminar
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* === SOLO MOSTRAR ESTOS SI HAY PRODUCTOS === */}
            {carrito.length > 0 && (
                <>
                    <div>
                        <input
                            id="aceptar_condiciones"
                            type="checkbox"
                            checked={aceptar_permiso}
                            onChange={e => setAceptar_permiso(e.target.checked)}
                        />
                        <label htmlFor="aceptar_condiciones">
                            ¿Aceptas que no puedes cancelar el pedido?
                        </label>
                    </div>

                    <p className="total_pagar">
                        Total: ${total.toLocaleString()}
                    </p>

                    <button
                        className={aceptar_permiso ? "" : "boton_desactivado"}
                        onClick={aceptar_permiso ? Mostrar_Modal_Pago : null}
                    >
                        Comprar
                    </button>
                </>
            )}
        </div>
    </div>
)
}

export default Productos_Cliente_Carrito;
