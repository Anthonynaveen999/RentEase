import React, {useContext} from 'react'
import "../assets/css/style.css";
import Hero from './Hero';
import Service from './Service';
import About from './About';
import Features from './Features';
const Home = () => {
  
  return (
    <>
      <Hero />
      <About />
      <Service />
      <Features />
    </>
  );
}

export default Home