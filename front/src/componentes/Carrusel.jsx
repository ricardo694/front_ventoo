import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import img1 from '../img/banner_1.gif'
import img2 from '../img/banner_2.gif'
import img3 from '../img/banner_3.gif'
import img4 from '../img/banner_4.gif'
import img5 from '../img/banner_5.gif'
import img6 from '../img/banner_6.gif'
import '../componentes/css/Carrusel.css'

const Carrusel = () => {

    const imagenes = [
        img5, img6, img1, img2, img3, img4
    ]
    
    //Configuracion del carrusel
    var settings = {
        dots: false,              // Muestra los puntitos de navegación debajo del carrusel
        infinite: true,          // Permite que el carrusel vuelva al inicio al llegar al último slide (bucle infinito)
        speed: 800,            // Duración de la animación de transición entre slides (en milisegundos)
        autoplay: true,          // Activa el desplazamiento automático de los slides
        autoplaySpeed: 3000,        // Tiempo que el carrusel espera antes de pasar al siguiente slide (en milisegundos)
        pauseOnHover: false,      // Pausa el autoplay cuando el usuario pasa el mouse sobre el carrusel
        swipeToSlide: false,     // Si es true, permite arrastrar (swipe) libremente al siguiente slide con el dedo o mouse
        arrows: false,            // Muestra las flechas izquierda/derecha para navegar manualmente
        slidesToShow: 1,         // Cantidad de slides visibles al mismo tiempo
        slidesToScroll: 1        // Cantidad de slides que avanza cada vez
    };

    return(
        <div className="contenedor_carrusel">
            <Slider {...settings} className="caja_carrusel">
                {imagenes.map((i) => (
                    <img className="img_carrusel" src={i} alt="" />
                ))}
            </Slider>
        </div>
    )
}

export default Carrusel