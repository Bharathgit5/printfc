
import React,{useEffect,useRef} from 'react';
import {TweenMax , Power3} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from "./HeroSection.module.css";

const HeroSection = () => {
let txt1 = useRef(null);
let txt2 = useRef(null);
let txt3 = useRef(null);

useEffect(() => {
  TweenMax.to(
    txt1,
    .8,
    {
      opacity:1,
      y:-20,
      ease: Power3.easeOut,
      delay:0.3,
       
    }
  ),
  TweenMax.to(
    txt2,
    .8,
    {
      opacity:1,
      y:-20,
      ease: Power3.easeOut,
      delay:0.6
    }
  ),
  TweenMax.to(
    txt3,
    .8,
    {
      opacity:1,
      y:-20,
      ease: Power3.easeOut,
      delay:0.9
    }
  )
})
  return (
    <div id={styles.main}>
      <div id={styles.page1} >
        <h1 ref={el => {txt1 =el}}>UPLOAD. SELECT. PAY.</h1>
        <h2 ref={el => {txt2 =el}}>WELCOME TO PRINTFC.IN </h2>
        <p ref={el => {txt3 =el}}>Printfc.in is an online printing service in which you can upload your files to get print</p>
      </div>
    
    </div>
  );
};

export default HeroSection;
