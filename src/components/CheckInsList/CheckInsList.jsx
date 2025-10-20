// import tools needed
import { useState, useEffect } from "react";
import { Link } from "react-router";

// import service to get check-ins from backend
import { getCheckIns } from "../../services/checkInsService";

const CheckInsList = () => {
    // using state for our check-ins data & storing it
    // "checkIns" will store all our check-ins that we get from the backend
    const [checkIns, setCheckIns] = useState([]);
    
    // using state to track if data is still loading
    const [loading, setLoading] = useState(true);

    // When this page first opens, automatically get all our check-ins from backend  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const checkInsData = await getCheckIns();
        setCheckIns(checkInsData);
      } catch (error) {
        console.log("Error loading check-ins:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCheckIns();
  }, []);

  // Show loading message while fetching data
  if (loading) {
    return <main><h1>Loading your check-ins...</h1></main>;
  }

  return (
    <main>
      {/* Page Title */}
      <h1>My Daily Check-Ins</h1>
      
      {/* Link to create new check-in */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/check-ins/create" style={{ 
          background: "#667eea", 
          color: "white", 
          padding: "10px 20px", 
          textDecoration: "none", 
          borderRadius: "5px" 
        }}>
          + Add New Check-In
        </Link>
      </div>

      {/* Show message if no check-ins */}
      {checkIns.length === 0 && (
        <p>You haven't created any check-ins yet. <Link to="/check-ins/create">Create your first one!</Link></p>
      )}

      {/* List all check-ins */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {checkIns.map((checkIn) => (
          <li key={checkIn.id} style={{ 
            border: "1px solid #ddd", 
            marginBottom: "15px", 
            padding: "15px", 
            borderRadius: "8px" 
          }}>
            <Link to={`/check-ins/${checkIn.id}`} style={{ textDecoration: "none", color: "#333" }}>
              <h3>{checkIn.title}</h3>
              <p><strong>Category:</strong> {checkIn.category}</p>
              <p><strong>Reaction Level:</strong> {checkIn.reaction_level}/10</p>
              <p><strong>Effectiveness:</strong> {checkIn.effectiveness}/10</p>
              {/* Show short preview of description */}
              <p>{checkIn.description.substring(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CheckInsList;