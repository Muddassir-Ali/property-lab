import propertyLabIcon from '../assets/Final logo.png';
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const DEMO_WHATSAPP = "923001234567";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "Buying a Property",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const message = [
      "Assalam-o-Alaikum, Property Lab!",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `Inquiry: ${form.inquiryType}`,
      `Message: ${form.message}`,
    ].join("\n");

    const url = `https://wa.me/${DEMO_WHATSAPP}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="contact-page">
      <nav className="contact-navbar">
        
<Link className="logo" to="/">
  <img
    src={propertyLabIcon}
    alt="Property Lab logo"
    className="logo-icon"
  />
  Property <b>Lab</b>
</Link>

        <div className="contact-nav-links">
          <Link to="/#Home">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/about">About</Link>
          <Link to="/contact" className="active">Contact</Link>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>

      <header className="contact-hero">
        <span className="contact-eyebrow">WE'RE HERE TO HELP</span>
        <h1>Let's talk about your <span>next move.</span></h1>
        <p>
          Looking to buy, sell, or explore your options?
          Send us a message and let's start the conversation.
        </p>
      </header>

      <main className="contact-main">
        <section className="contact-info">
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h2>Your property journey starts here.</h2>
          <p>
            Tell us what you're looking for. Our inquiry form
            will prepare a message for you to send through WhatsApp.
          </p>

          <div className="contact-info-item">
            <span className="contact-info-icon">⌂</span>
            <div>
              <h3>Property Lab</h3>
              <p>Find your next address in Pakistan.</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span className="contact-info-icon">◷</span>
            <div>
              <h3>Property Inquiries</h3>
              <p>Buying, selling, or general questions.</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span className="contact-info-icon">↗</span>
            <div>
              <h3>WhatsApp</h3>
              <p>Send your inquiry directly from the form.</p>
            </div>
          </div>

          <div className="contact-info-note">
            Demo website — replace the demo WhatsApp number
            with your office number before going live.
          </div>
        </section>

        <section className="contact-form-card">
          <h2>Send us an inquiry</h2>
          <p className="contact-form-intro">
            Fill in your details and continue to WhatsApp.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="contact-name">Full name *</label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-phone">Phone number *</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="03XX-XXXXXXX"
                autoComplete="tel"
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-type">How can we help? *</label>
              <select
                id="contact-type"
                name="inquiryType"
                value={form.inquiryType}
                onChange={handleChange}
                required
              >
                <option>Select your Option</option>
                <option>Buying a Property</option>
                <option>Selling a Property</option>
                <option>Renting a Property</option>
                <option>General Inquiry</option>
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Your message *</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about the property you're looking for..."
                rows={4}
                required
              />
            </div>

            <button className="contact-submit" type="submit">
              Continue to WhatsApp <span>↗</span>
            </button>

            <p className="contact-privacy-note">
              Your message opens in WhatsApp for you to review and send.
            </p>
          </form>
        </section>
      </main>

      <section className="contact-bottom-cta">
        <h2>Still exploring your options?</h2>
        <p>Browse our available listings to find your next address.</p>
        <Link to="/properties" className="contact-browse-btn">
          Explore Properties →
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
