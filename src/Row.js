import React, { useState,useEffect } from 'react'
import YouTube from 'react-youtube';
import axios from './axios';
import './Row.css';
import movieTrailer from 'movie-trailer';

const base_url = "http://image.tmdb.org/t/p/original/"
function Row({ title,fetchUrl, isLargeRow}) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")
  // a snippet of code which runs based on a specific condition

  useEffect( () => {
       //if [] , run this code when the row loads and then dont run it again
         async function fetchData(){
           const request = await axios.get(fetchUrl);
           setMovies(request.data.results);
           return request;
          }
         fetchData();
  }, [fetchUrl]);
   const opts = {
     height: "390",
     width: "100%",
     playerVars: {
       //http://developers.google.com/youtube/player_parameters
       autoplay: 1,
     },
   };
      const handleClick = (movie) => {
        if (trailerUrl) {
          setTrailerUrl('');
        }
        else
        {
          movieTrailer(movie?.name || "")
          .then( url => {
            const urlParams = new URLSearchParams( new URL(url).search)
            setTrailerUrl(urlParams.get("v"))
            console.log(urlParams)

          }).catch(error => console.log(error))

        }
      }
     
    return (
        <div className='row' >
         <h2> {title} 
         </h2>
         <div className='row_posters' >
          {/*container+posters*/}  
          {movies?.map( movie => (
          <img
          key={movie.id}
          onClick={() => handleClick(movie)}
          className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          src={`${base_url}${ isLargeRow?  movie.poster_path: movie.backdrop_path}`} alt= {movie.name}/>

          ))}
          </div>
         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
          }


export default Row
