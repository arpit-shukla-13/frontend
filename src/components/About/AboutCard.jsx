import React from "react"
import Heading from "../hero/Heading"
import "./About.css"
import { homeAbout } from "../../dummydata"
import Awrapper from "./Awrapper"

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row transition ease-in-out delay-100 shadow-lg shadow-gray-700/50  hover:-translate-y-1 hover:scale-90 duration-300 
          border-t-8 border-l-8 hover:border-t-0 hover:border-l-0 hover:border-b-8 hover:border-r-8 border-sky-700'>
            <img src='./images/about.webp' alt='' />
          </div>
          <div className='right row'>
            <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Notes Learning Platform' />
            <div className='items'>
              {homeAbout.map((val) => {
                return (
                  <div className='item flexSB transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default AboutCard
