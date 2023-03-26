import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Search.css'

const Movie = () => {
  const { movieID } = useParams();
  const [movieData, setMovieData] = useState([])

  useEffect(() => {
    showSearchResult()
  }, [])

  const showSearchResult = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=4bc4b891&i=${movieID}`);
      setMovieData(response.data);
    } catch (error) {
      console.log("Error: ==> " + error);
    }
  }

  return (
    <div id='movieContainer'>
      <div>
        <img src={movieData.Poster} style={{ width: '180px', height: '240px' }} alt='img' />
      </div>
      <div>Title: {movieData.Title} </div>

      <div id='movieContainerHoriz' >
        <div>Year: {movieData.Year} </div>
        <div>Released: {movieData.Released} </div>
      </div>

      <div id='movieContainerHoriz' >
        <div>Rated: {movieData.Rated} </div>
        <div>Genre: {movieData.Genre} </div>
      </div>
      <div id='movieContainerHoriz' >
        <div>Runtime: {movieData.Runtime} </div>
      </div>
      <div id='movieContainerHoriz' >
        <div>IMDB Rating: {movieData.imdbRating} </div>
        <div>Country: {movieData.Country} </div>
      </div>
      <div id='movieContainerHoriz' >
        <div>Language: {movieData.Language} </div>
        <div>Director: {movieData.Director} </div>
      </div>
      <div>Actors: {movieData.Actors} </div>
    </div>
  )
}

export default Movie