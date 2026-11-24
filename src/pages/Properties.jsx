import propertyLabIcon from '../assets/Final logo.png';
import { useState, useEffect } from "react";
import API_BASE_URL from "../api";
import "../App.css";

import houseImage from "../assets/House.jpg";
import apartmentImage from "../assets/apartment.jpg";
import portionsImage from "../assets/portions.jpg";
import banglowImage from "../assets/banglow.jpg";
import commercialFlatsImage from "../assets/commercial flat.jpg";
import flatsImage from "../assets/flats.jpg";
import shopsImage from "../assets/shops.jpg";
import schoolsImage from "../assets/schools.jpg";
import marriageHallImage from "../assets/marriage hall.jpg";
import petrolPumpImage from "../assets/petrol pump.jpg";
import farmHouseImage from "../assets/farmhouse.jpg";
import farmHousePlotImage from "../assets/farmhouse plot.jpg";


const fallbackImages = {
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
};

const whatsappNumbers = [
  "923332443153",
  "923353230963",
  "923333027251",
];

export default function Properties() {
  const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch(`${API_BASE_URL}/api/properties`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load properties");
      return res.json();
    })
    .then((data) => {
      setProperties(
        data.map((item) => ({
          id: item.id,
          name: item.title,
          city: item.city || "",
          area: item.location || "",
          price: item.price
            ? `PKR ${Number(item.price).toLocaleString("en-PK")}`
            : "Contact for Price",
          type: item.property_type || "",
          beds: item.bedrooms || 0,
          size: item.area || "",
          image:
          item.image_url ||
           fallbackImages[item.property_type?.trim()] ||
            houseImage,
        }))
      );
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
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
          <a href="/payment-plan">Project SQ10</a>
          <a href="/login">Login</a>
        <a href="/register">Register</a>
        </nav>
      </header>

      <main className="properties-page">
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

<div className="whatsapp-contact-list">
  {whatsappNumbers.map((number, index) => (
    <a
      key={number}
      className="whatsapp-btn"
      href={`https://wa.me/${number}?text=${encodeURIComponent(
        `Hello, I would like more information about ${selectedProperty.name} (${selectedProperty.price}). Location: ${selectedProperty.area}, ${selectedProperty.city}.`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
     ☏ +{number.slice(0, 2)} ({number.slice(2, 5)}) {number.slice(5, 8)}{number.slice(8)}
    </a>
  ))}
</div>
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

  <p className="footer-address properties-footer-address">
    Suite D-3, Naveed Cottages Block-17 Gulistan-e-Johar, Karachi.
  </p>

  <small>© 2026 Property Lab · Real Estate Website</small>
</footer>


    </>
  );
}
