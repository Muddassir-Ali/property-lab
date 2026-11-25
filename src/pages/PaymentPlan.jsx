
import propertyLabIcon from "../assets/Final logo.png";
import "./PaymentPlan.css";
import { useState, useEffect } from "react";

function PaymentPlan() {
const [percentage, setPercentage] = useState(1);

useEffect(() => {
  const timer = setInterval(() => {
    setPercentage((prev) => {
      if (prev >= 5) {
        clearInterval(timer);
        return 5;
      }
      return prev + 1;
    });
  }, 500);

  return () => clearInterval(timer);
}, []);

  return (
    <div className="payment-plan-page">

      {/* Navbar */}
      <header className="payment-navbar">
        <a href="/" className="payment-logo">
          <img src={propertyLabIcon} alt="Property Lab logo" />
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

      {/* Project Heading */}
      <section className="project-heading">
        <p>OUR PROJECT</p>
        <h2>SQ10 Square</h2>
        <h4 className="project-category">
             Category: <span>Elegant</span>
        </h4>
        <h3>2 Bed+DD+Lounge+Apartment 1295 Sq.ft.</h3>
      </section>

      {/* Payment Chart */}
      <section className="payment-chart-section">
        <h2>Payment Plan</h2>
        <div className="payment-chart-placeholder">
        <h3>Total Amount</h3>
            <h1>1,75,000,00/-</h1>
            <p>Without Documentation</p>
        </div>
      </section>

      {/* Extra Charges */}
      <section className="extra-charges-section">
        <h2>EXTRA CHARGES:</h2>

        <div className="extra-charges-content">
         <div className="charges-list">
  <p><strong>Corner....</strong> {percentage}%</p>
  <p><strong>Road Facing....</strong> {percentage}%</p>
  <p><strong>Park Facing....</strong> {percentage}%</p>
</div>
          <p className="common-area-note">
            Common area includes Ducts, Stairs, Lobby, Elevators,
            Common Area Walls, and Amenities allocated
            Proportionally to the Carpet area.
          </p>
        </div>
      </section>

      {/* Important Notes */}
      <section className="terms-section">
        <h2>IMPORTANT NOTES:</h2>

        <div className="terms-content">
          <ol>
            <li>5% discount against full cash payment at the time of booking.</li>

            <li>
              All the installments must be paid by the allotted strictly
              as per the schedule agreed by the allotter between the 1st
              to 5th of each month, and the allotter shall be abide by
              the terms and conditions of the booking application form.
            </li>

            <li>
              All the extra charges will be payable within 90 days
              from the booking.
            </li>

            <li>
              The allocation of units shall remain provisional until
              the company received full and final payment.
            </li>

            <li>
              Documentation charges for lease, sale deed, and connection
              of gas, electricity, transformer, water, sewerage, and gas
              charges will be charged extra as and when demanded by the
              company as these charges are not in the above mentioned cost.
            </li>

            <li>
              All discounts are subject to regular payments and deduct at last.
            </li>

            <li>
              1st to 4th Floor Extra Charges Rs.200,000/-.
            </li>
          </ol>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">
          <a className="logo" href="/">
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

        <p className="footer-address payment-footer-address">
          Suite D-3, Naveed Cottages Block-17 Gulistan-e-Johar, Karachi.
        </p>

        <small>© 2026 Property Lab · Real Estate Website</small>
      </footer>

    </div>
  );
}

export default PaymentPlan;