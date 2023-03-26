import React, {useState} from 'react'
import axios from 'axios'
import '../styles/Search.css'
import SearchIcon from './search.png';

const Search = ({search, setSearch, setData, setFlag}) => {
  const [actualSearch, setActualSearch] = useState('')

  const handleSearchBar = (e) => {
    let data = e.target.value
    setActualSearch(data)
    data = data.toLowerCase()
    data = data.trim()
    data = data.replace(' ','+')
    setSearch(data)
  }
//using omdb api to get the result of searched movie
  const showSearchResult = async () => {
    setFlag(true)
    document.getElementById('showResultsFor').textContent = `Movie Results For '${actualSearch}'`
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=4bc4b891&s=${search}`);
      setData(response.data.Search);
      console.log(response.data.Search)
    } catch (error) {
      console.log("Error: ==> " + error);
    }
  }

  return (
    <div id='searchContainer'>
      <div>
         <h4 style={{marginBottom:'10px'}}>Universal Movie Search Engine</h4> 
         <p style={{fontWeight:'200', color:'#beef00'}}>Search For Movies By Their Title</p> 
      </div>
      <div>
        <input type="text" id="searchBox" placeholder="Search..." 
        style={{
          backgroundImage: `url(${SearchIcon})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '20px center',
          paddingLeft: '4rem',
        }} onChange={handleSearchBar}/>
      </div>
      <div>
        <button type="submit" id='searchBtn' onClick={showSearchResult}>Search Now!</button>
      </div>
    </div>

  )
}

export default Search