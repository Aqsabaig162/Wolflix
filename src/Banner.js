import React, {useEffect, useState} from 'react'
import axios from './axios';
import requests from './request';
import './Banner.css'


function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        (async () => {
             const request = await axios.get(requests.fetchNetflixOriginals);
             setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)])
           
    })()
      }, []);
      console.log(movie);
      function truncate(str, n){
          return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }
       

      return (
        <header className='banner'
       style={
            {
             justifyContent:"center",
             backgroundSize: "cover",
             backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
             backgroundPosition: "center center",
             height: "448px",
            }
         }  
        >
            <div className='Banner_contents'>
            <h1 className='banner_title'>
                { movie?.name || movie?.title || movie?.original_name}
            </h1>
            <div className='banner_buttons' >
                <button className='banner_button'>▶ Play</button>
                <button className='banner_button'>My List</button>
            </div>
            <h1 className='banner_description'>
               {truncate(movie?.overview,150)}
            </h1>
            </div>
            <div className='banner--fadeBottom'/>
        </header>
    )
}

export default Banner



