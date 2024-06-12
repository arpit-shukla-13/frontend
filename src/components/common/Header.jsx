import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import './Header.css'


const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/courses'>All Colleges</Link>
            </li>
            <li>
              <Link to='/pricing'>Pricing</Link>
            </li>
            <li>
              <Link to='/journal'>Review</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
            <li>
              <Link to='/signinsignup'>Account</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>
          <div className='start transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300'>
            <div className='button '>GET SUBSCRIPTION</div>
          </div>
          <button className='toggle ' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
