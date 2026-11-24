import propertyLabIcon from '../assets/Final logo.png';
import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import "./Login.css";
import API_BASE_URL from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
  e.preventDefault();

  if (!email.trim() || !cnic.trim() || !password) {
    alert("Please enter your email, CNIC and password.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        cnic: cnic,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed.");
      return;
    }
if (!data.token) {
  alert("Login token was not received. Please try again.");
  return;
}

sessionStorage.setItem("propertyLabToken", data.token);
sessionStorage.setItem("propertyLabUser", JSON.stringify(data.user));

const verifyResponse = await fetch(`${API_BASE_URL}/api/me`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${data.token}`,
  },
});

const verifyData = await verifyResponse.json();

if (!verifyResponse.ok) {
  sessionStorage.removeItem("propertyLabToken");
  sessionStorage.removeItem("propertyLabUser");

  alert(verifyData.message || "Authentication failed.");
  return;
}

alert(`Welcome, ${verifyData.user.full_name}!`);
if (verifyData.user.email?.toLowerCase() === "hassanlaeeq88@gmail.com") {
  window.location.href = "/dashboard";
} else {
  window.location.href = "/";
}

setPassword("");

  } catch (error) {
    console.error("Login error:", error);
    alert("Cannot connect to the server. Please try again.");
  }
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
        <a href="/payment-plan">Project SQ10</a>
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
          <label htmlFor="login-cnic">CNIC number</label>
          <input
            id="login-cnic"
            type="text"
            placeholder="XXXXX-XXXXXXX-X"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            maxLength={15}
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

