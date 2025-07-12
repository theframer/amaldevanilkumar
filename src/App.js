import React, { useState, useEffect } from 'react';
import './App.css';
import rocketImage from './images/IMG_0590.PNG';
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import CountUp from 'react-countup';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useInView } from 'react-intersection-observer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: false });

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const employers = [
    { name: "OHO Solutions", role: "Senior Zoho Developer", description: "2023-2025", logo: "https://www.ohosolutions.com/logo%20bottom-1.png", link: "https://www.ohosolutions.com/#clients"},
    { name: "Agent Time", role: "Team Lead: Zoho and Web Developent", description: "Active", logo: "https://agenttime.au/wp-content/uploads/2025/03/Invert-AT-Logo.png", link: "https://agenttime.au/"}
  ];

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: employers.length - 1,
    loop: false,
    mode: "free-snap",
    slides: {
      origin: "center",
      perView: 3,
      spacing: 30
    },
    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 2, spacing: 20 }
      },
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 15 }
      }
    }
  });

  return (
    <div className={darkMode ? 'dark' : ''}>
      <section>
        <div className="container">
          <header>
            <a href="/" className="logo">trudev</a>
            <ul>
              <li><a href="/" className="active">Home</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </header>

          <div className="content">
            <h2>Hey !</h2>
            <p> I'm Amal Dev Anilkumar 👋</p>
            <p> Welcome to my personal space.</p>
            <p>Know more about me and keep scrolling. Hope you enjoy exploring as much as I enjoy building it. 😊</p>
            <a href="/Deluge%20Functions.html" target="_blank" rel="noopener noreferrer">Read More</a>
          </div>

          <div className="imgbox">
            <img src={rocketImage} alt="Rocket illustration" />
          </div>

          <ul className="social-icons">
            <li><a href="https://www.instagram.com/amal_dv_/" aria-label="Instagram"><FaInstagram /></a></li>
            <li><a href="https://www.linkedin.com/in/amal-dev-anilkumar-295071216/" aria-label="LinkedIn"><FaLinkedin /></a></li>
            <li><a href="https://www.twitter.com/amal_dv_/" aria-label="Twitter"><FaTwitter /></a></li>
          </ul>

          <p className="copyright">©2025 Amal Dev Anilkumar. All Rights Reserved.</p>
        </div>
      </section>

      <div className="intro-section" id="intro">
        <h1>Introduction</h1>
        <p>
          I bring strong communication, consultation, and problem-solving skills, applying both Agile and Waterfall methodologies to ensure projects meet goals and deadlines.
          Passionate about building scalable CRM & web solutions that drive business growth. With 50+ projects delivered across international and domestic markets, I bring technical depth along with a consultative approach to every engagement.
        </p>
      </div>

      <div className="projects-summary" id="projects" ref={projectsRef}>
  <h2>Projects Delivered</h2>
  <div className="projects-total">
    {projectsInView && (
      <>
        <span><CountUp end={50} duration={3} /></span><span>+</span>
      </>
    )}
  </div>
  <div className="projects-stats-row">
    <div className="projects-stat-card">
      <h3>International</h3>
      {projectsInView && <span><CountUp end={6} duration={3} />+</span>}
    </div>
    <div className="projects-stat-card">
      <h3>Domestic</h3>
      {projectsInView && <span><CountUp end={44} duration={3} />+</span>}
    </div>
  </div>
</div>


      <div className="employer-carousel">
        <h2>Employment Status</h2>
        <div ref={sliderRef} className="keen-slider employer-carousel-3d">
          {employers.map((emp, index) => (
            <div className="keen-slider__slide employer-slide-3d" key={index}>
              <div className="employer-card">
                <img src={emp.logo} alt={emp.name} />
                <h3>{emp.role}</h3>
                <p>{emp.name}</p>
                {emp.description && (
                  <p className="emp-description">{emp.description}</p>
                )}
                <a
                  href={emp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more-btn"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button onClick={() => instanceRef.current?.prev()} className="arrow-button left-arrow">‹</button>
          <button onClick={() => instanceRef.current?.next()} className="arrow-button right-arrow">›</button>
        </div>
      </div>

      <div className="achievements-section" id="skills">
        <h2>Skills & Achievements</h2>
        <ul>
          <p>Zoho CRM Certified Administrator (Dec 2023 - Dec 2025)</p>
          <p>Premium Partner Developer Badge at OHO Solutions</p>
          <p>Expert in Zoho Deluge, API Integrations, HTML, CSS, JavaScript</p>
          <p>Proficient in SDLC, Agile & Waterfall Methodologies</p>
          <p>Completed 95% of tasks within agreed timelines, exceeding client expectations</p>
          <p>Multilingual: English, Malayalam, Hindi, Tamil</p>
        </ul>
      </div>

      <footer className="site-footer" id='about'>
        <div className="footer-content">
          <h3>Amal Dev Anilkumar</h3>
          <p>Zoho Developer & Web Developer</p>
          <p className="footer-contact">
            📍 Alappuzha, Kerala, India &nbsp;|&nbsp;
            📞 <a href="tel:+919074617161">+91 90746 17161</a> &nbsp;|&nbsp;
            ✉️ <a href="mailto:amaldevanil129@gmail.com">amaldevanil129@gmail.com</a>
          </p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/amal_dv_/" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/amal-dev-anilkumar-295071216/" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://www.twitter.com/amal_dv_/" aria-label="Twitter"><FaTwitter /></a>
          </div>
          <p className="footer-tagline">Building scalable CRM & Web solutions tailored for your business.</p>
          <p className="footer-copy">© 2025 Amal Dev Anilkumar. All rights reserved.</p>
        </div>
      </footer>

      {showTopButton && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="top-button">
          ↑ Top
        </button>
      )}
      <button onClick={() => setDarkMode(!darkMode)} className="darkmode-toggle">
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

export default App;
