import propertyLabIcon from "./assets/Final logo.png";
import { useState, useEffect } from "react";
import "./App.css";
import heroImage from "./assets/hero.png";

import houseImage from "./assets/House.jpg";
import apartmentImage from "./assets/apartment.jpg";
import portionsImage from "./assets/portions.jpg";
import banglowImage from "./assets/banglow.jpg";
import commercialFlatsImage from "./assets/commercial flat.jpg";
import flatsImage from "./assets/flats.jpg";
import shopsImage from "./assets/shops.jpg";
import schoolsImage from "./assets/schools.jpg";
import marriageHallImage from "./assets/marriage hall.jpg";
import petrolPumpImage from "./assets/petrol pump.jpg";
import farmHouseImage from "./assets/farmhouse.jpg";
import farmHousePlotImage from "./assets/farmhouse plot.jpg";

import slideImage1 from "./assets/Pic 1.jpeg";
import slideImage2 from "./assets/Pic 2.jpeg";
import slideImage3 from "./assets/Pic 3.jpeg";
import slideImage4 from "./assets/Pic4.jpeg";



const properties = [
  {
    id: 1,
    name: "Modern Family House",
    city: "Karachi",
    area: "DHA Phase 6",
    price: "PKR 4.5 Crore",
    type: "House",
    featured: true,
    beds: 4,
    size: "500 Sq. Yd.",
    image: houseImage,
  },
  {
    id: 2,
    name: "Modern Apartment",
    city: "Karachi",
    area: "Gulistan-e-Johar",
    price: "PKR 1.8 Crore",
    type: "Apartment",
    featured: true,
    beds: 3,
    size: "1,800 Sq. Ft.",
    image: apartmentImage,
  },
  {
    id: 3,
    name: "Family Portion",
    city: "Karachi",
    area: "Gulistan-e-Johar",
    price: "Contact for Price",
    type: "Portions",
    featured: true,
    beds: 3,
    size: "120 Sq. Yd.",
    image: portionsImage,
  },
  {
    id: 4,
    name: "Luxury Banglow",
    city: "Karachi",
    area: "DHA",
    price: "Contact for Price",
    type: "Banglow",
    featured: true,
    beds: 5,
    size: "500 Sq. Yd.",
    image: banglowImage,
  },
  {
    id: 5,
    name: "Commercial Property",
    city: "Karachi",
    area: "Business District",
    price: "Contact for Price",
    type: "Commercial flats",
    featured: true,
    beds: 0,
    size: "Commercial Space",
    image: commercialFlatsImage,
  },
  {
    id: 6,
    name: "Residential Flats",
    city: "Karachi",
    area: "Gulistan-e-Johar",
    price: "Contact for Price",
    type: "Flats",
    featured: true,
    beds: 2,
    size: "120 Sq. Yd.",
    image: flatsImage,
  },
  {
    id: 7,
    name: "Shop for Business",
    city: "Karachi",
    area: "Commercial Area",
    price: "Contact for Price",
    type: "Shops",
    featured: true,
    beds: 0,
    size: "Commercial Space",
    image: shopsImage,
  },
  {
    id: 8,
    name: "School Building",
    city: "Karachi",
    area: "Main Road",
    price: "Contact for Price",
    type: "Schools",
    featured: true,
    beds: 0,
    size: "Commercial Property",
    image: schoolsImage,
  },
  {
    id: 9,
    name: "Marriage Hall",
    city: "Karachi",
    area: "Main Road",
    price: "Contact for Price",
    type: "Marriage Halls",
    featured: true,
    beds: 0,
    size: "Event Venue",
    image: marriageHallImage,
  },
  {
    id: 10,
    name: "Petrol Pump Property",
    city: "Karachi",
    area: "Main Road",
    price: "Contact for Price",
    type: "Petrol Pump",
    featured: true,
    beds: 0,
    size: "Commercial Property",
    image: petrolPumpImage,
  },
  {
    id: 11,
    name: "Farm House",
    city: "Karachi",
    area: "Outskirts",
    price: "Contact for Price",
    type: "Farm House",
    featured: true,
    beds: 4,
    size: "Large Plot",
    image: farmHouseImage,
  },
  {
    id: 12,
    name: "Farm House Plot",
    city: "Karachi",
    area: "Outskirts",
    price: "Contact for Price",
    type: "Farm House Plot",
    featured: true,
    beds: 0,
    size: "Open Land",
    image: farmHousePlotImage,
  },
];


export default function App() {
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
  const [searchedType, setSearchedType] = useState("");
  const [purpose, setPurpose] = useState("Buy");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showSellForm, setShowSellForm] = useState(false);

  const filtered = properties.filter((p) => {
  return (
    (city === "All Cities" || p.city === city) &&
    (type === "All Types" || type === "Types" || p.type === type)
  );
});

  return (
    <div className="app">
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
          <a href="#home">Home</a>
          <a href="/properties">Properties</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>

      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="tag">YOUR PROPERTY. YOUR FUTURE.</p>

            <h1>
              Find a place
              <br />
              <span>to call home.</span>
            </h1>

            <p className="description">
              Discover houses, plots and apartments across Pakistan.
              Your next property journey starts here.
            </p>

            <div className="search-box">
              <div className="tabs">
                {[
                   "Buy",
                   "Rent",
                   "Sell",
                   "Commercial",
                   "Plots",
                   "Commercial Rent",
                   "Commercial Buy",
                  ].map((item) => (
                  <button
                    key={item}
                    className={purpose === item ? "active" : ""}
                    onClick={() => setPurpose(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>


<div className="filters">
  <label>
    Select a City
    <select
      value={city}
      onChange={(e) => setCity(e.target.value)}
    >
      <option>City</option>
      <option>Karachi</option>
    </select>
  </label>

  <label>
    Select Property Type
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
    >
      <option>Types</option>
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

{searchedType && (
  <div className="selected-type-preview">
    <h3>{searchedType}</h3>
    <img
      src={{
        House: houseImage,
        Apartment: apartmentImage,
        Portions: portionsImage,
        Banglow: banglowImage,
        "Commercial flats": commercialFlatsImage,
        Flats: flatsImage,
        Shops: shopsImage,
        Schools: schoolsImage,
        "Marriage Halls": marriageHallImage,
        "Petrol Pump": petrolPumpImage,
        "Farm House": farmHouseImage,
        "Farm House Plot": farmHousePlotImage,
      }[searchedType]}
      alt={searchedType}
      className="selected-type-image"
    />
  </div>
)}
</label>
</div>

            </div>

          </div>

          <div className="hero-photo">
  
<img
  src={slides[currentSlide].image}
  alt="Property Lab property"
/>

<div className="photo-label">
  <b>{slides[currentSlide].title}</b>
  <span>Explore properties across Pakistan</span>
</div>

  <button
    className="slider-arrow prev"
    onClick={() =>
      setCurrentSlide(
  (currentSlide - 1 + slides.length) % slides.length)
    }
  >
    ❮
  </button>

  <button
    className="slider-arrow next"
    onClick={() =>
      setCurrentSlide((currentSlide + 1) % slides.length)
    }
  >
    ❯
  </button>

  <div className="slider-dots">
    {slides.map((slide, index) => (
      <button
        key={index}
        className={currentSlide === index ? "active" : ""}
        onClick={() => setCurrentSlide(index)}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</div>
        </section>

        <section className="section listings" id="properties">
          <p className="tag">HANDPICKED FOR YOU</p>
          <h2>Featured properties</h2>
          <p className="muted">
            {filtered.length} sample properties available
          </p>

          <div className="property-grid">
            {filtered.length ? filtered.map((p) => (
              
<article
  className="property-card"
  key={p.id}
  onClick={() => setSelectedProperty(p)}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedProperty(p);
    }
  }}
>

                {p.featured && (
                  <span className="featured-badge">FEATURED</span>
                )}  
                <img src={p.image} alt={p.name} loading="lazy" />
                <div className="property-info">
                  <span className="property-type">{p.type}</span>
                  <h3>{p.name}</h3>
                  <p className="muted">{p.area}, {p.city}</p>
                  <b className="price">{p.price}</b>
                  <div className="details">
                    <span>{p.beds} Bedrooms</span>
                    <span>{p.size}</span>
                  </div>
                </div>
              </article>

            )) : (
              <p>No sample listings match your filters.</p>
            )}
          </div>
        </section>

        <section className="sell-banner">
          <div>
            <p className="tag">LIST YOUR PROPERTY</p>
            <h2>Ready to sell your property?</h2>
            <p>Showcase your property with Property Lab.</p>
          </div>
          <button onClick={() => setShowSellForm(true)}>
            Get Started ↗
          </button>
        </section>
      
{showSellForm && (
  <div
    className="modal-overlay"
    onClick={() => setShowSellForm(false)}
  >
    <div
      className="property-modal sell-form-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Sell your property"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setShowSellForm(false)}
        aria-label="Close form"
      >
        ×
      </button>

      <div className="modal-content">
        <span className="property-type">PROPERTY LISTING</span>
        <h2>Sell Your Property</h2>
        <p className="muted">
          Share your property details and our team will contact you.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you! Your property details have been received.");
            e.target.reset();
            setShowSellForm(false);
          }}
        >
          <label>Your Full Name</label>
          <input type="text" placeholder="Enter your name" required />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="03XXXXXXXXX"
            pattern="[0-9+ -]{10,15}"
            required
          />

          <label>City</label>
          <input type="text" placeholder="e.g. Karachi" required />

          <label>Property Location</label>
          <input
            type="text"
            placeholder="Area, block or society"
            required
          />

          <label>Property Type</label>
          <select required defaultValue="">
            <option value="" disabled>Select property type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Plot">Plot</option>
            <option value="Commercial">Commercial</option>
          </select>

          <label>Expected Selling Price</label>
          <input type="text" placeholder="e.g. PKR 2 Crore" required />

          <label>Property Details</label>
          <textarea
            placeholder="Describe your property..."
            rows="4"
            required
          />

          <label>Property Photos</label>
          <input type="file" accept="image/*" multiple />

          <button type="submit" className="whatsapp-btn">
            Submit Property ↗
          </button>
        </form>
      </div>
    </div>
  </div>
)}

{selectedProperty && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedProperty(null)}
  >
    <div
      className="property-modal"
      role="dialog"
      aria-modal="true"
      aria-label={selectedProperty.name}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setSelectedProperty(null)}
        aria-label="Close property details"
      >
        ×
      </button>

      <img src={selectedProperty.image} alt={selectedProperty.name} />

      <div className="modal-content">
        <span className="property-type">{selectedProperty.type}</span>
        <h2>{selectedProperty.name}</h2>
        <p className="muted">
          {selectedProperty.area}, {selectedProperty.city}
        </p>
        <h3 className="price">{selectedProperty.price}</h3>

        <div className="details">
          <span>{selectedProperty.beds} Bedrooms</span>
          <span>{selectedProperty.size}</span>
        </div>
        
<a
  className="whatsapp-btn"
  href={`https://wa.me/923001234567?text=${encodeURIComponent(
    `Assalam o Alaikum, mujhe ${selectedProperty.name} ke baare mein maloomat chahiye. Location: ${selectedProperty.area}, ${selectedProperty.city}. Price: ${selectedProperty.price}.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => e.stopPropagation()}
>
  <span>☏</span> Inquire on WhatsApp
</a>

        <p className="muted">
          Demo listing — details and prices are not verified.
        </p>
      </div>
    </div>
  </div>
)}

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

    </div>
  );
}
