import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Properties from './pages/Properties.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import PaymentPlan from "./pages/PaymentPlan";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment-plan" element={<PaymentPlan />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
                  }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
