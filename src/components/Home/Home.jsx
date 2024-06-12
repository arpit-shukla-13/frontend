import React from "react"
import Hero from "../hero/Hero"
import AboutCard from "../About/AboutCard"
import Plans from "../princing/Plans"
import Contact from "../contact/Contact"
import Header from "../common/Header"



const Home = () => {
  return (
    <>
      <Header/>
      <Hero />
      <AboutCard/>
      <Plans/>
      <Contact/>
     
     
    </>
  )
}

export default Home
