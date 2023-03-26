import React, { useState } from 'react'
import Slider from './Slider'
import Cards from './Cards';
import Search from './Search';
import Footer from './Footer'
import CarouselSlide from './CarouselSlide'
// import axios from 'axios'
import '../styles/Home.css'

// const apiKey = "e7f7812cfa67c52aa6fd129f27b06414";
// const url = "https://api.themoviedb.org/3";
// const upcoming = "upcoming";
// const nowPlaying = "trending/all/day";
// const popular = "popular";
// const topRated = "top_rated";

const Home = ({upcomingMovies, nowPlayingMovies, popularMovies, popularTvShows, topRatedMovies,
              screenLoading1, screenLoading2, screenLoading3, screenLoading4, screenLoading5 }) => {

  // const [upcomingMovies, setUpcomingMovies] = useState([]);
  // const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  // const [popularMovies, setPopularMovies] = useState([]);
  // const [popularTvShows, setPopularTV] = useState([]);
  // const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [search, setSearch] = useState('')
  const [data, setData] = useState()
  const [flag, setFlag] = useState(false)

  // useEffect(() => {
  //   const fetchUpcoming = async () => {
  //     const {
  //       data: { results },
  //     } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
  //     setUpcomingMovies(results);
  //   };
  //   const fetchNowPlaying = async () => {
  //     const {
  //       data: { results },
  //     } = await axios.get(`${url}/${nowPlaying}?api_key=${apiKey}`);
  //     setNowPlayingMovies(results);
  //   };
  //   const fetchPopular = async () => {
  //     const {
  //       data: { results },
  //     } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
  //     setPopularMovies(results);
  //   };

  //   const fetchPopularTV = async () => {
  //     const {
  //       data: { results },
  //     } = await axios.get(`${url}/tv/${popular}?api_key=${apiKey}`);
  //     setPopularTV(results);
  //   };
  //   const fetchTopRated = async () => {
  //     const {
  //       data: { results },
  //     } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
  //     setTopRatedMovies(results);
  //   };

  //   fetchUpcoming();
  //   fetchNowPlaying();
  //   fetchPopular();
  //   fetchPopularTV();
  //   fetchTopRated();
  // }, []);

  return (
    <div>

      <CarouselSlide />
      <Slider title={"Trending Today"} array={nowPlayingMovies} screenLoading={screenLoading2} />
      <Slider title={"Popular Movies"} array={popularMovies} screenLoading={screenLoading3} />
      <Slider title={"Popular Shows"} array={popularTvShows} screenLoading={screenLoading4} />
      <Slider title={"Top Rated"} array={topRatedMovies} screenLoading={screenLoading5} />
      <Slider title={"Upcoming"} array={upcomingMovies} screenLoading={screenLoading1} />

      <div>
        <Search search={search} setSearch={setSearch} setData={setData} setFlag={setFlag} />
        <div id='showResultsFor'></div>
        <div id='appContainer'>
          {
            flag ?
              data?.length > 0 ?
                data.map((e, index) => {
                  return (<Cards key={index} imdbID={e.imdbID} imgURL={e.Poster} title={e.Title} type={e.Type} year={e.Year} />)
                }) : 'No Results Found' : null
          }
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default React.memo(Home)