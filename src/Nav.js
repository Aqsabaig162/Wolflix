import React, { useState, useEffect } from 'react'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false)
    useEffect(() => {
     window.addEventListener("scroll", () => {
      if(window.scrollY > 100){
          handleShow(true);
      }
      else
      handleShow(false);
     });
     return() => {
         window.removeEventListener("scroll");
     };

    }, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
            className='nav_logo'
            src="https://fontmeme.com/permalink/211226/227b99b3ce3aaf9c160749d9254f0dd3.png"
            alt='Netflixlogo'
            />
            <img
             className='nav_avatar'
             src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png'
             alt='Netflixlogo'
            />
        </div>
    )
}

export default Nav
