import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../styles/Tile.css'
import { Skeleton } from '@mui/material';

const Tile = ({ img, title, id, screenLoading }) => {
    const [imdbID, setMovieID] = useState("")
    const [timer, setTimer] = useState(true)
//fetching the imdb id from the themoviedb for a particular movie title
    useEffect(() => {
        const getIMDB = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e7f7812cfa67c52aa6fd129f27b06414`);
                setMovieID(response.data.imdb_id);
            } catch (error) {
                console.log("Error: ==> " + error);
            }
        }
        getIMDB();
    }, [])

    setTimeout(()=>{
        setTimer(false)
    },6000)


    return (
        <div className="tile">
            {screenLoading || timer ? <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" animation="wave" width={180} height={240} /> :
                (<div>
                    <div className="tile__media">
                        <img className="tile_img" src={img} alt="img" />
                    </div>
                    <div className="tile__details">
                        <Link to={`/movies/${imdbID}`}>
                            <div className="tile__title">
                                {title}
                            </div>
                        </Link>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Tile