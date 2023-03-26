import React from 'react'
import '../styles/Slider.css'
import Tile from './Tile'

const imgUrl = "https://image.tmdb.org/t/p/original";

const Slider = ({title, array = [], screenLoading}) => {
    return (
        <div>
            <div className="row">
            <h3>{title}</h3>
                <div className="row__inner">
                    {
                        array.map((e, index) => (
                            <Tile key={index} id={e.id} title={e.title ? e.title : e.name} 
                            img={`${imgUrl}/${e.poster_path}`} screenLoading={screenLoading} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Slider