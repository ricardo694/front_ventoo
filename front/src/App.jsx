import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./paginas/Inicio";
import Compra from "./paginas/Compra";
import Info_Producto from "./paginas/Info_Producto";
import Inicio_Sesion from "./paginas/Inicio_Sesion";
import Registro from "./paginas/Registro";
import Perfil_Cliente from "./paginas/Perfil_Cliente";
import Info_Pedido from "./paginas/Info_Pedido";
import Carrito from "./paginas/Carrito";
import Perfil_Vendedor from "./paginas/Perfil_Vendedor";
import Registro_Producto from "./paginas/Registro_Producto";
import Editar_Producto from "./paginas/Editar_Producto";
import Not_Found from "./paginas/Not_Found";

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="*" element = {<Not_Found/>}/>
        <Route path="/" element = {<Inicio/>}/>
        <Route path="/Compra" element = {<Compra/>}/>
        <Route path="/Ver_Informacion_Producto" element = {<Info_Producto/>}/>
        <Route path="/Inicio_Sesion" element = {<Inicio_Sesion/>}/>
        <Route path="/Registrarse" element = {<Registro/>}/>
        <Route path="/Perfil_Cliente" element = {<Perfil_Cliente/>}/>
        <Route path="/Informacion_Pedido" element = {<Info_Pedido/>}/>
        <Route path="/Carrito" element = {<Carrito/>}/>
        <Route path="/Perfil_Vendedor" element = {<Perfil_Vendedor/>}/>
        <Route path="/Registrar_Producto" element = {<Registro_Producto/>}/>
        <Route path="/Editar_Producto" element = {<Editar_Producto/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
