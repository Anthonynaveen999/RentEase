import React from 'react'
import heroBanner from "../assets/images/hero-banner.png";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">
            <ion-icon name="home"></ion-icon>

            <span>Real Estate Agency</span>
          </p>

          <h2 className="h1 hero-title">Find Your Dream House By Us</h2>

          <p className="hero-text">
            Explore a wide range of properties tailored to your needs. Start
            your journey to finding your perfect home today!
          </p>

          <button className="btn">Get Started</button>
        </div>

        <figure className="hero-banner">
          <img src={heroBanner} alt="Modern house model" className="w-100" />
        </figure>
      </div>
    </section>
  );
}

export default Hero