import React from 'react'
import '../styles/Cards.css'
import { Link } from 'react-router-dom'

const Cards = ({imgURL,title,type,year,imdbID}) => {
  return (
    <div className='postContainer'>
    <img src={imgURL} alt="img" />
    <div id='discription'>Title: {title}</div>
    <div>Type: {type} </div>
    <div>Year: {year}  </div>
    <div>
      <Link to={`/movies/${imdbID}`}> <button id={imdbID} className='cardsBtn' >Know More</button> </Link>
    </div>
  </div>
  )
}

export default Cards