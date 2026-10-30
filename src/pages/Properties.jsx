import propertyLabIcon from '../assets/Final logo.png';
import { useState, useEffect } from "react";
import "../App.css";
import slideImage1 from "../assets/Pic 1.jpeg";
import slideImage2 from "../assets/Pic 2.jpeg";
import slideImage3 from "../assets/Pic 3.jpeg";
import slideImage4 from "../assets/Pic4.jpeg";

import houseImage from "../assets/House.jpg";
import apartmentImage from "../assets/apartment.jpg";
import portionsImage from "../assets/portions.jpg";
import banglowImage from "../assets/banglow.jpg";
import commercialFlatsImage from "../assets/commercial Flat.jpg";
import flatsImage from "../assets/flats.jpg";
import shopsImage from "../assets/shops.jpg";
import schoolsImage from "../assets/schools.jpg";
import marriageHallImage from "../assets/marriage hall.jpg";
import petrolPumpImage from "../assets/petrol pump.jpg";
import farmHouseImage from "../assets/farmhouse.jpg";
import farmHousePlotImage from "../assets/farmhouse plot.jpg";


const properties = [
  { id: 1, name: "Modern Family House", city: "Karachi", area: "DHA Phase 6", price: "PKR 4.5 Crore", type: "House", beds: 4, size: "500 Sq. Yd.", image: houseImage},
  { id: 2, name: "Luxury Apartment", city: "Karachi", area: "Clifton", price: "Contact for Price", type: "Apartment", beds: 3, size: "1,800 Sq. Ft.", image: apartmentImage},
  { id: 3, name: "Family Portion", city: "Karachi", area: "Gulistan-e-Johar", price: "Contact for Price", type: "Portions", beds: 3, size: "240 Sq. Yd.", image: portionsImage},
  { id: 4, name: "Elegant Banglow", city: "Karachi", area: "DHA Phase 8", price: "Contact for Price", type: "Banglow", beds: 5, size: "1000 Sq. Yd.", image: banglowImage},
  { id: 5, name: "Commercial Flats", city: "Lahore", area: "Gulberg", price: "Contact for Price", type: "Commercial flats", beds: 2, size: "1,200 Sq. Ft.", image: commercialFlatsImage},
  { id: 6, name: "City Flats", city: "Lahore", area: "DHA Phase 5", price: "Contact for Price", type: "Flats", beds: 2, size: "1,000 Sq. Ft.", image: flatsImage},
  { id: 7, name: "Main Road Shop", city: "Karachi", area: "North Nazimabad", price: "Contact for Price", type: "Shops", beds: 0, size: "500 Sq. Ft.", image: shopsImage},
  { id: 8, name: "School Building", city: "Lahore", area: "Model Town", price: "Contact for Price", type: "Schools", beds: 0, size: "2,000 Sq. Yd.", image: schoolsImage},
  { id: 9, name: "Event Hall", city: "Karachi", area: "Gulistan-e-Johar", price: "Contact for Price", type: "Marriage Halls", beds: 0, size: "1,500 Sq. Yd.", image: marriageHallImage},
  { id: 10, name: "Commercial Petrol Pump", city: "Islamabad", area: "I-9", price: "Contact for Price", type: "Petrol Pump", beds: 0, size: "2,000 Sq. Yd.", image: petrolPumpImage},
  { id: 11, name: "Country Farm House", city: "Karachi", area: "Gadap Town", price: "Contact for Price", type: "Farm House", beds: 4, size: "2 Acres", image: farmHouseImage},
  { id: 12, name: "Farm House Plot", city: "Islamabad", area: "Bahria Enclave", price: "Contact for Price", type: "Farm House Plot", beds: 0, size: "500 Sq. Yd.", image: farmHousePlotImage},
];


export default function Properties() {
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

  const [city, setCity] = useState("All Cities");
  const [type, setType] = useState("All Types");
  const [search, setSearch] = useState("");
const [selectedProperty, setSelectedProperty] = useState(null);

  const filtered = properties.filter((property) => {
    const matchesCity =
      city === "All Cities" || property.city === city;
    const matchesType =
      type === "All Types" || property.type === type;
    const matchesSearch =
      `${property.name} ${property.area} ${property.city}`
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCity && matchesType && matchesSearch;
  });


return (
    <>
      <header className="navbar">
        
<a className="logo" href="/">
  <img
    src={propertyLabIcon}
    alt="Property Lab logo"
    className="logo-icon"
  />
  Property <b>Lab</b>
</a>


        <nav>
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
        <a href="/register">Register</a>
        </nav>
      </header>

      <main className="properties-page">
        
<div className="properties-slider">
  <img
    className="properties-slide-image"
    src={slides[currentSlide].image}
    alt={slides[currentSlide].title}
  />

  <button
    className="properties-slider-arrow prev"
    onClick={() =>
      setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)
    }
    aria-label="Previous picture"
  >
    ❮
  </button>

  <button
    className="properties-slider-arrow next"
    onClick={() =>
      setCurrentSlide((currentSlide + 1) % slides.length)
    }
    aria-label="Next picture"
  >
    ❯
  </button>

  <div className="properties-slider-dots">
    {slides.map((slide, index) => (
      <button
        key={slide.title}
        className={currentSlide === index ? "active" : ""}
        onClick={() => setCurrentSlide(index)}
        aria-label={`Go to picture ${index + 1}`}
      />
    ))}
  </div>
</div>
      <section className="properties-hero">
        <p className="tag">FIND YOUR NEXT ADDRESS</p>
        <h1>Explore Property</h1>
        <p>
          Discover houses and apartments in Karachi.
          Find a place that feels like home.
        </p>
      </section>

      <section className="section listings">
        <div className="properties-heading">
          <div>
            <p className="tag">OUR PROPERTY COLLECTION</p>
            <h2>Available Property</h2>
            <p className="muted">
              {filtered.length} property found
            </p>
          </div>
        </div>

        <div className="properties-filters">
          <input
            type="search"
            placeholder="Search by name, area or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search properties"
          />

          <select
  value={city}
  onChange={(e) => setCity(e.target.value)}
  aria-label="Filter by city"
>
  <option value="All Cities">All Cities</option>
  <option value="Karachi">Karachi</option>
</select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Filter by property type"
          >
            <option>All Types</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Portions</option>
            <option>Banglow</option>
            <option>Commercial flats</option>
            <option>Flats</option>
            <option>Shops</option>
            <option>Schools</option>
            <option>Marriage Halls</option>
            <option>Petrol Pump</option>
            <option>Farm House</option>
            <option>Farm House Plot</option>
          </select>
        </div>

        <div className="property-grid">
          {filtered.length > 0 ? (
            filtered.map((property) => (
              
<article
  className="property-card"
  key={property.id}
 
onClick={() => setSelectedProperty(property)}

  style={{ cursor: "pointer" }}
>

                <div className="properties-image-wrap">
                  <span className="featured-badge">FEATURED</span>
                  <img
                    src={property.image}
                    alt={property.name}
                    loading="lazy"
                  />
                </div>

                <div className="property-info">
                  <span className="property-type">
                    {property.type}
                  </span>
                  <h3>{property.name}</h3>
                  <p className="muted">
                    {property.area}, {property.city}
                  </p>
                  <b className="price">{property.price}</b>
                  <div className="details">
                    <span>{property.beds} Bedrooms</span>
                    <span>{property.size}</span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No properties match your search. Try another filter.</p>
          )}
        </div>

{selectedProperty && (
  <div
    className="property-modal-overlay"
    onClick={() => setSelectedProperty(null)}
  >
    <div
      className="property-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="property-modal-close"
        onClick={() => setSelectedProperty(null)}
        aria-label="Close property details"
      >
        ×
      </button>

      <img
        src={selectedProperty.image}
        alt={selectedProperty.name}
      />

      <div className="property-modal-content">
        <span className="property-type">
          {selectedProperty.type}
        </span>
        <h2>{selectedProperty.name}</h2>
        <p>
          {selectedProperty.area}, {selectedProperty.city}
        </p>
        <h3>{selectedProperty.price}</h3>
        <p>
          {selectedProperty.beds} Bedrooms · {selectedProperty.size}
        </p>

        <a
          className="whatsapp-btn"
          href={`https://wa.me/923001234567?text=${encodeURIComponent(
            `Assalam-o-Alaikum, mujhe ${selectedProperty.name} (${selectedProperty.price}) ke bare mein maloomat chahiye.`
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          Inquire on WhatsApp
        </a>
      </div>
    </div>
  </div>
)}      
      </section>
      </main>

      

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


    </>
  );
}
