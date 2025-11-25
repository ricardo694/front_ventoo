import React from "react";
import '../componentes/css/Footer.css'
import titulo_footer from '../img/footer.png'
import logo_facebook from '../img/facebook.png'
import logo_instagram from '../img/instagram.png'
import logo_twitter from '../img/twitter.png'

const Footer = () => {
    return(
        <div className="contenedor_footer">
            <div>
                <img src={titulo_footer} alt="" />
            </div>

            <div>
                <a href="https://www.facebook.com/?locale=es_LA" target="_blank" rel="noopener noreferrer">
                    <img src={logo_facebook} alt="Facebook" title="Facebook"/>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <img src={logo_instagram} alt="Instagram" title="Instagram"/>
                </a>
                <a href="https://x.com/?lang=es" target="_blank" rel="noopener noreferrer">
                    <img src={logo_twitter} alt="Twitter" title="Twitter"/>
                </a>
            </div>
        </div>
    )
}

export default Footer