import React from 'react'
import { Link } from "react-router-dom"; 
const Contact = () => {
  return (
    <>
    
   <section id='contact-section'>
        <h2 className='main-heading text-center' id='C3'>Contact us</h2>
        <div className='contact'> 
        <a href="mailto: bharathjbiet10@gmail.com"> <i className="bi bi-envelope-at-fill contacticons" target="_blank"  rel="noopener noreferrer" aria-label="mail2" ></i> </a>
     <a href="https://wa.me/918639954433"><i className='bi bi-whatsapp contacticons'target="_blank"  rel="noopener noreferrer" aria-label="whatsapp" ></i></a> 
   <a href="https://maps.app.goo.gl/TrRqjH5Ky23T8aBc7"> <i className="bi bi-house-up-fill contacticons"></i></a>    
    </div> 
    </section>
    <section id="footer">
				<h2 className='main-heading text-center' id='C4'>Connect with me</h2>
        <div className='connect'>
					<a href="https://twitter.com/Bharathtwt1?t=LWGqlQmRF9NzBRojKtGSxw&s=08"><i className="bi bi-twitter socialicons" target="_blank"  rel="noopener noreferrer" aria-label="twitter" ></i> </a>
					<a href="https://www.linkedin.com/in/bharath-k-6436a11b2"><i className="bi bi-linkedin socialicons" target="_blank" rel="noopener noreferrer" aria-label="linkedin"></i> </a>
					<a href="https://www.instagram.com/bharathk_ig/"><i className="bi bi-instagram socialicons" target="_blank" rel="noopener noreferrer" aria-label="insta" ></i> </a>
					<a href="mailto: bharathjbiet10@gmail.com"> <i className="bi bi-envelope-at-fill socialicons" target="_blank"  rel="noopener noreferrer" aria-label="mail2" ></i> </a>
        
        </div>
        </section>
      <div className='terms-and-conditions'>
      <Link to="/Termsandconditions" className='tc'> TermsandConditions </Link> | <Link to="/PrivacyPolicy"  className='tc'>PrivacyPolicy</Link> | <Link to="/Refund"  className='tc'>Refund</Link> | <Link to="/Aboutus"  className='tc'>Aboutus</Link>
      </div>
				<div className="copyright">
					© 2023-2024 | DEVELOPED BY: <a href="https://www.instagram.com/bharathk_ig/"  className='tc'>Bharath</a>
				</div>


    
    </>
  )
}

export default Contact