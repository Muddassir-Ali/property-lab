import propertyLabIcon from '../assets/Final logo.png';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./About.css";
import slideImage1 from "../assets/Pic 1.jpeg";
import slideImage2 from "../assets/Pic 2.jpeg";
import slideImage3 from "../assets/Pic 3.jpeg";
import slideImage4 from "../assets/Pic4.jpeg";

export default function About() {
    const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: slideImage1, title: "Property Lab" },
    { image: slideImage2, title: "Discover Our Properties" },
    { image: slideImage3, title: "Find Your Dream Home" },
    { image: slideImage4, title: "Your Property. Your Future." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="about-page">
      <nav className="about-navbar">
        
<Link className="logo" to="/">
  <img
    src={propertyLabIcon}
    alt="Property Lab logo"
    className="logo-icon"
  />
  Property <b>Lab</b>
</Link>


        <div className="about-nav-links">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/about" className="active">About</Link>
          <Link to="/contact">Contact</Link>
           <a href="/login">Login</a>
           <a href="/register">Register</a>
        </div>
      </nav>

      
<header className="about-hero about-slider">
  <img
    className="about-slide-image"
    src={slides[currentSlide].image}
    alt={slides[currentSlide].title}
  />

  <button
    className="about-slider-arrow prev"
    onClick={() =>
      setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)
    }
    aria-label="Previous picture"
  >
    ❮
  </button>

  <button
    className="about-slider-arrow next"
    onClick={() =>
      setCurrentSlide((currentSlide + 1) % slides.length)
    }
    aria-label="Next picture"
  >
    ❯
  </button>

  <div className="about-slider-dots">
    {slides.map((slide, index) => (
      <button
        key={slide.title}
        className={currentSlide === index ? "active" : ""}
        onClick={() => setCurrentSlide(index)}
        aria-label={`Go to picture ${index + 1}`}
      />
    ))}
  </div>
</header>

      <section className="about-story">
        <div>
          <span className="about-eyebrow">OUR STORY</span>
          <h2>Real estate decisions deserve a better experience.</h2>
        </div>
        <div className="about-story-text">
  <p>
    At Property Lab, we believe that finding the right
    property is more than just a transaction it is the
    beginning of a new chapter. Whether you are looking
    for your dream home, a modern apartment, a residential
    plot, or a valuable investment opportunity, we are here
    to make your property journey easier, clearer, and more
    rewarding.
  </p>
  <p>
    Our aim is to bring buyers, sellers, and property
    seekers closer to the opportunities that matter to them.
    With a focus on professionalism, transparency, and
    customer satisfaction, we strive to make property
    discovery across Pakistan simple and convenient. We
    believe every client deserves clear information,
    personalized guidance, and the confidence to make
    informed decisions.
  </p>
  <p>
    At Property Lab, your goals are our priority. We are
    committed to building trust, creating lasting
    relationships, and helping you take the next step
    towards your future.
  </p>
</div>
      </section>

      <section className="about-values">
        <div className="about-section-heading">
          <span className="about-eyebrow">THE PROPERTY LAB DIFFERENCE</span>
          <h2>Built around what matters to you.</h2>
          <p>A thoughtful approach to finding your next property.</p>
        </div>

        <div className="about-value-grid">
          <article className="about-value-card">
            <span className="about-value-icon">◇</span>
            <h3>Trust & Transparency</h3>
            <p>
              Clear information and honest communication
              help you make informed property decisions.
            </p>
          </article>

          <article className="about-value-card">
            <span className="about-value-icon">⌂</span>
            <h3>Quality Properties</h3>
            <p>
              Explore property options selected to help
              you find a home that fits your needs.
            </p>
          </article>

          <article className="about-value-card">
            <span className="about-value-icon">♡</span>
            <h3>People First</h3>
            <p>
              Your goals matter. We want every step of
              your property journey to feel more personal.
            </p>
          </article>
        </div>
      </section>

      <section className="about-cta">
        <span className="about-eyebrow">YOUR NEXT MOVE</span>
        <h2>Let's find a place that feels right.</h2>
        <p>
          Explore available properties and take the first
          step towards your next address.
        </p>
        <Link to="/properties" className="about-primary-btn">
          Browse Properties <span>→</span>
        </Link>
      </section>

      
<footer className="footer">
  <div className="footer-brand">
    <a className="logo" href="#home">
      <img
        src={propertyLabIcon}
        alt="Property Lab logo"
        className="logo-icon"
      />
      Property <b>Lab</b>
    </a>

    <p className="footer-tagline">
      <b>Real Estate Consultant & Advisor</b>
    </p>
  </div>

  <p className="footer-address">
    Suite D-3, Naveed Cottages Block-17 Gulistan-e-Johar, Karachi.
  </p>

  <small>© 2026 Property Lab · Real Estate Website</small>
</footer>

    </div>
  );
}
