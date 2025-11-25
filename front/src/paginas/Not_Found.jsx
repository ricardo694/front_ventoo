import React from "react";
import '../paginas/css/Not_Found.css'
import { Link } from "react-router-dom";
import not_found from "../img/not_found.png"

const Not_Found = () => {
    
    return(
        <Link to={'/'} className="contenedor_not_found">
            <img src={not_found} alt="" />
        </Link>
    )
}

export default Not_Found