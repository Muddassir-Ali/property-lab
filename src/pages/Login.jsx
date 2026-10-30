import propertyLabIcon from '../assets/Final logo.png';
import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter your email and password.");
      return;
    }

    alert("Demo login successful! Authentication will be connected later.");
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
        <a href="/register">Register</a>
      </nav>

    </header>

    <main className="auth-page">

      <section className="auth-card">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-icon">P</span>
          <span>Property Lab</span>
        </Link>

        <h1>Login to your account</h1>
        <p className="auth-description">
          Find your place in the world with Property Lab.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="login-password">Password</label>
          <div className="auth-password-wrap">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register Yourself</Link>
        </p>

        <Link to="/" className="auth-back-home">
          Back to Home
        </Link>
      </section>
    </main>
    </>
  );
}

