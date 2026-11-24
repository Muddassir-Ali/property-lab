import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import API_BASE_URL from "../api";
import "./Dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(
    sessionStorage.getItem("propertyLabUser") || "{}"
  );

  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

 const isAdmin = [
 "hassanlaeeq88@gmail.com",
].includes(user.email?.toLowerCase());

  useEffect(() => {

    const token = sessionStorage.getItem("propertyLabToken");

    fetch(`${API_BASE_URL}/api/admin/seller-properties`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load submissions");
        }

        setProperties(data);
      })
      .catch((error) => setError(error.message));
  }, [isAdmin]);

const handleStatusChange = async (id, status) => {
  try {
    const token = sessionStorage.getItem("propertyLabToken");

    const response = await fetch(
      `${API_BASE_URL}/api/admin/seller-properties/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Status update failed");
    }

    setProperties((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  } catch (error) {
    setError(error.message);
  }
};

  return (
    <div className="dashboard-page">
      <h1>Welcome to Property Lab!</h1>
      <h2>{user.full_name || "User"}</h2>
      <p>{user.email}</p>

      <div className="dashboard-links">
        <Link to="/properties">Explore Properties</Link>
        <Link to="/">Continue to Home Page</Link>
      </div>

      {isAdmin && (
        <section>
          <h2>Seller Property Submissions</h2>

          {error && <p>{error}</p>}

          {properties.length === 0 && !error && (
            <p>No seller submissions found.</p>
          )}


{properties.length > 0 && (
  <div className="seller-table-wrapper">
    <table className="seller-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>City</th>
          <th>Location</th>
          <th>Property Type</th>
          <th>Expected Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {properties.map((property) => (
          <tr key={property.id}>
            <td>{property.full_name}</td>
            <td>{property.phone}</td>
            <td>{property.city}</td>
            <td>{property.property_location}</td>
            <td>{property.property_type}</td>
            <td>{property.expected_price}</td>
            <td>
  <select
    value={property.status}
    onChange={(e) =>
      handleStatusChange(property.id, e.target.value)
    }
  >
    <option value="Pending">Pending</option>
    <option value="Contacted">Contacted</option>
    <option value="Approved">Approved</option>
    <option value="Rejected">Rejected</option>
  </select>
</td>
            <td>
              <button
                onClick={() => setSelectedSubmission(property)}
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        </section>
      )}

{selectedSubmission && (
  <div className="seller-modal-overlay">
    <div className="seller-modal">
      <button
        className="seller-modal-close"
        onClick={() => setSelectedSubmission(null)}
      >
        ×
      </button>

      <h2>Seller Property Details</h2>

      <div className="seller-details">
        <p><strong>Seller Name:</strong> {selectedSubmission.full_name}</p>
        <p><strong>Phone:</strong> {selectedSubmission.phone}</p>
        <p><strong>City:</strong> {selectedSubmission.city}</p>
        <p><strong>Property Location:</strong> {selectedSubmission.property_location}</p>
        <p><strong>Property Type:</strong> {selectedSubmission.property_type}</p>
        <p><strong>Expected Price:</strong> {selectedSubmission.expected_price}</p>
        <p><strong>Status:</strong> {selectedSubmission.status}</p>
        <p><strong>Property Details:</strong> {selectedSubmission.property_details || "No details provided"}</p>
        <p>
          <strong>Submitted On:</strong>{" "}
          {new Date(selectedSubmission.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  </div>
)}


      <button onClick={logout}>Logout</button>
    </div>
  );
}
