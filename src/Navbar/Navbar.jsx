
import React,{useState,useEffect} from 'react'
import gsap from 'gsap';

import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link } from "react-router-dom"; 
import styles from "./Navbar.module.css";


gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  
 useEffect(() => {
    gsap.to('h4',  {
      color: 'black',
      duration: 0.5,
      scrollTrigger: {
        trigger: 'nav',
        scroller: 'body',
        start: 'top -10%',
        end: 'top -10%',
        scrub: 2,
      },
    });
    gsap.to('nav', {
      backgroundColor: 'white',
      height: '70px',
      duration: 0.5,
      scrollTrigger: {
        trigger: 'nav',
        scroller: 'body',
        start: 'top -10%',
        end: 'top -10%',
        scrub: 1,
      },
    });
 
  

   
  }, []);


  return (
   
    <>
<nav>
  <h4>PRINTFC.IN </h4>
  <div>
  <Link to="/Signup"> <button type="button" id={styles['signupbtn']}>Signup</button> </Link>
  <Link to="/Login"> <button type="button" id='loginbtn'>Login</button> </Link>
  </div>
</nav>

    </>

  )
}

export default Navbar
