import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API_BASE_URL from "./api";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const token = sessionStorage.getItem("propertyLabToken");

    if (!token) {
      setStatus("unauthorized");
      return;
    }

    fetch(`${API_BASE_URL}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          sessionStorage.removeItem("propertyLabToken");
          sessionStorage.removeItem("propertyLabUser");
          setStatus("unauthorized");
        } else {
          setStatus("authorized");
        }
      })
      .catch(() => setStatus("unauthorized"));
  }, []);

  if (status === "checking") return <p>Loading...</p>;

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return children;
}