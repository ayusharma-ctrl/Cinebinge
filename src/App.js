import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login';
import Signup from './components/Signup';
import Reset from './components/Reset';
import Home from './components/Home';
import Profile from './components/Profile'
import Movie from './components/Movie'
import Welcome from './components/Welcome';
import PrivateRoutes from './routes/PrivateRoutes';
import RestrictedRoutes from './routes/RestrictedRoutes';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
// import { AuthContext } from './AuthDetails';

//we are fetching data from moviedb api
const apiKey = "e7f7812cfa67c52aa6fd129f27b06414";
const url = "https://api.themoviedb.org/3";
const upcoming = "upcoming";
const nowPlaying = "trending/all/day";
const popular = "popular";
const topRated = "top_rated";

function App() {
//setting up imp states 
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [nowPlayingMovies, setNowPlayingMovies] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [popularTvShows, setPopularTV] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
//these states will handle the case of 'no data found'
  const [screenLoading1, setScreenLoading1] = useState(true);
  const [screenLoading2, setScreenLoading2] = useState(true);
  const [screenLoading3, setScreenLoading3] = useState(true);
  const [screenLoading4, setScreenLoading4] = useState(true);
  const [screenLoading5, setScreenLoading5] = useState(true);
//on first render, we are making api calls to fetch the data and updating states
  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
      setScreenLoading1(false);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
      setScreenLoading2(false)
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
      setScreenLoading3(false);
    };

    const fetchPopularTV = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/tv/${popular}?api_key=${apiKey}`);
      setPopularTV(results);
      setScreenLoading4(false)
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
      setScreenLoading5(false)
    };

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchPopularTV();
    fetchTopRated();
  }, []);
  

  return (
    <>
      {isFirstTimeUser ? <Welcome setIsFirstTimeUser={setIsFirstTimeUser} /> :
          <Router>
            <Header />
            <Routes>
            
              <Route path='/' element={<PrivateRoutes />} >
                <Route path="/" element={<Home upcomingMovies={upcomingMovies} nowPlayingMovies={nowPlayingMovies}
                  popularMovies={popularMovies} popularTvShows={popularTvShows} topRatedMovies={topRatedMovies}
                  screenLoading1={screenLoading1} screenLoading2={screenLoading2} screenLoading3={screenLoading3}
                  screenLoading4={screenLoading4} screenLoading5={screenLoading5} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/movies/:movieID" element={<Movie />} />
              </Route>

              <Route path='/' element={<RestrictedRoutes />} >
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset" element={<Reset />} />
              </Route>

            </Routes>
          </Router>
      }
    </>
  );
}

export default React.memo(App)
