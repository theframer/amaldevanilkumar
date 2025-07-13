import React, { useState, useEffect } from 'react';
import './App.css';
import rocketImage from './images/IMG_0590.PNG';
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import CountUp from 'react-countup';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useInView } from 'react-intersection-observer';
import ContactForm from './ContactForm';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showContact, setShowContact] = useState(false); // new popup state
  const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: false });

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowContact(true), 10000); // open after 10s
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add("trail-svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "fixed";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "0";
    document.body.appendChild(svg);

    let points = [];
    let lastMove = Date.now();

    const addPoint = (x, y) => {
      points.push({ x, y });
      if (points.length > 30) points.shift();
      lastMove = Date.now();
    };

    const mouseMove = (e) => addPoint(e.clientX, e.clientY);
    const touchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        addPoint(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", touchMove, { passive: true });

    const animate = () => {
      const now = Date.now();
      if (now - lastMove > 100 && points.length > 1) {
        points.shift();
      }

      svg.innerHTML = "";
      const strokeWidth = window.innerWidth < 600 ? 2 : 4;
      for (let i = 1; i < points.length; i++) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", points[i - 1].x);
        line.setAttribute("y1", points[i - 1].y);
        line.setAttribute("x2", points[i].x);
        line.setAttribute("y2", points[i].y);

        const fade = i / points.length;
        line.setAttribute("stroke", darkMode ? "white" : "#8d1111");
        line.setAttribute("stroke-opacity", fade);
        line.setAttribute("stroke-width", strokeWidth);
        line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line);
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
      document.body.removeChild(svg);
    };
  }, [darkMode]);

  const employers = [
    { name: "OHO Solutions", role: "Senior Zoho Developer", description: "2023-2025", logo: "https://www.ohosolutions.com/logo%20bottom-1.png", link: "https://www.ohosolutions.com/#clients"},
    { name: "Agent Time", role: "Team Lead: Zoho and Web Developent", description: "Active", logo: "https://agenttime.au/wp-content/uploads/2025/03/Invert-AT-Logo.png", link: "https://agenttime.au/"}
  ];

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: employers.length - 1,
    loop: false,
    mode: "free-snap",
    slides: { origin: "center", perView: 3, spacing: 30 },
    breakpoints: {
      "(max-width: 1200px)": { slides: { perView: 2, spacing: 20 }},
      "(max-width: 768px)": { slides: { perView: 1, spacing: 15 }}
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
            <button onClick={() => setShowContact(true)} className="contact-me-btn">
  Contact Me
</button>
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
                <a href={emp.link} target="_blank" rel="noopener noreferrer" className="read-more-btn">Read More</a>
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
          <p>Zoho Developer | Web Developer</p>
          <p className="footer-contact">Alappuzha, Kerala, India</p>
          <p><a href="tel:+919074617161">+91 90746 17161</a></p>
          <p><a href="mailto:amaldevanil129@gmail.com">amaldevanil129@gmail.com</a></p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/amal_dv_/" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/amal-dev-anilkumar-295071216/" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://www.twitter.com/amal_dv_/" aria-label="Twitter"><FaTwitter /></a>
          </div>
          <p className="footer-tagline">Building scalable CRM & Web solutions tailored for your business.</p>
          <p className="footer-copy">© 2025 Amal Dev Anilkumar. All rights reserved.</p>
        </div>
      </footer>

      {showContact && <ContactForm onClose={() => setShowContact(false)} />}

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
