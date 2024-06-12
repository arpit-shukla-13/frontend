import React, { useState } from "react";
import { Link } from "react-router-dom";

import '../../components/common/Header.css';

const Adminheader = () => {
  const [click, setClick] = useState(false);
  const [universityDropdown, setUniversityDropdown] = useState(false);
  

  const toggleUniversityDropdown = () => {
    setUniversityDropdown(!universityDropdown);
   
  };

 

  return (
    <>
      <header>
        <nav className='mt-2 flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/adminhome'>Home</Link>
            </li>
            <li className='dropdown'>
              <div onClick={toggleUniversityDropdown} className='dropdown-toggle'>
                Universities <i className='fa fa-caret-down'></i>
              </div>
              <ul className={`dropdown-menu ${universityDropdown ? 'show' : ''}`}>
                <li>
                  <Link to='/adduniversity'>Add Universities</Link>
                </li>
                <li>
                  <Link to='/viewuniversity'>University</Link>
                </li>
                <li>
                  <Link to='/viewcollege'>Colleges</Link>
                </li>
              </ul>
            </li>
         
            <li>
              <Link to='/journal'>Review</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/signup'>Log-Out</Link>
            </li>
          </ul>
          <div className='start transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300'>
            <div className='button'>SET SUBSCRIPTION</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Adminheader;
