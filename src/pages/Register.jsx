import propertyLabIcon from '../assets/Final logo.png';
import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import "./Login.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    alert("Registration form completed! Account creation will be connected later.");
  }

  return (
    <>
      <header className="navbar">
        <Link className="logo" to="/">
  <img
    src={propertyLabIcon}
    alt="Property Lab logo"
    className="logo-icon"
  />
  Property <b>Lab</b>
</Link>

        <nav>
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
        </nav>

      </header>

      <main className="auth-page">
        <section className="auth-card">
          <Link to="/" className="auth-logo">
            <span className="auth-logo-icon">P</span>
            <span>Property Lab</span>
          </Link>

          <p className="auth-eyebrow">JOIN PROPERTY LAB</p>
          <h1>Create your account</h1>
          <p className="auth-description">
            Start your property journey with us.
          </p>

          <form className="auth-form" onSubmit={handleRegister}>
            <label htmlFor="register-name">Full name</label>
            <input
              id="register-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="register-phone">Phone number</label>
            <input
              id="register-phone"
              type="tel"
              placeholder="03XX XXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />

            <label htmlFor="register-confirm-password">
              Confirm password
            </label>
            <div className="auth-password-wrap">
              <input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                required
              />
              <button
                type="button"
                className="auth-show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" className="auth-submit">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <Link to="/" className="auth-back-home">
            ← Back to homepage
          </Link>
        </section>
      </main>
    </>
  );
}
