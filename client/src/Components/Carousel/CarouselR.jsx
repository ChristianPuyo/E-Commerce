import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const foto = "https://imgs.search.brave.com/OfrjBHaqjqduxgE_gRXcoBInLp8l3UsNivmVVj31V1M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdXBw/b3J0LmNvbnRlbnQu/b2ZmaWNlLm5ldC9l/cy1lcy9tZWRpYS81/Y2JhY2QwOC1hZGY1/LTQyODQtOWY0Mi1k/NjQyNDk5ZmRlNWQu/cG5n"

const CarouselR = () => {
  return (
    <Carousel autoplay={true} >
        <div>
            <img src={foto} />
            <p className="legend">Legend 1</p>
        </div>
        <div>
            <img src={foto} />
            <p className="legend">Legend 2</p>
        </div>
        <div>
            <img src={foto} />
            <p className="legend">Legend 3</p>
        </div>
    </Carousel>
  )
}

export default CarouselR