import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import checkInsService from "../../services/checkInsService";

const CheckInShow = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [checkIn, setCheckIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCheckIn = async () => {
      try {
        setLoading(true);
        setError(null);
        const checkInData = await checkInsService.getCheckIn(id);
        
        // Checking if the user is the owner of the particular check-in they are trying to get to
        if (user && checkInData.owner && user.id !== checkInData.owner.id) {
          setError("You don't have permission to view this check-in");
          return;
        }
        
        setCheckIn(checkInData);
      } catch (error) {
        console.error("Error fetching check-in:", error);
        setError("Failed to load check-in: " + (error.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
    };
    fetchCheckIn();
  }, [id, user]);

  const handleDeleteCheckIn = async () => {
    if (window.confirm("Are you sure you want to delete this check-in?")) {
      try {
        await checkInsService.deleteCheckIn(id);
        navigate("/check-ins");
      } catch (error) {
        console.error("Error deleting check-in:", error);
        setError("Failed to delete check-in: " + (error.message || "Unknown error"));
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading check-in...</div>;
  }

  if (error) {
    return <div className="loading">Error: {error}</div>;
  }

  if (!checkIn) {
    return <div className="loading">Check-in not found</div>;
  }

  return (
    <div className="main-container">
      {error && <p className="error-message">{error}</p>}
      
      <div className="card">
        <h1 className="story-title">{checkIn.title || "No title available"}</h1>
        
        {/* Date - adding date to the checkin so it can be official what day it is. */}
        <p style={{ marginBottom: '25px', color: 'rgba(255, 255, 255, 0.8)' }}>
          <strong>Created:</strong> {new Date(checkIn.created_at || Date.now()).toLocaleDateString()}
        </p>
        
        {/* Check-in Details */}
        <div className="story-content">
          <p><strong>Description:</strong> {checkIn.description || "No description available"}</p>
          <p><strong>Day Type:</strong> {checkIn.day_type || "Not specified"}</p>
          <p><strong>Relaxed Today:</strong> {checkIn.relaxed_today || "Not specified"}</p>
          <p><strong>Category:</strong> {checkIn.category || "No category available"}</p>
          <p><strong>Reaction Level:</strong> {checkIn.reaction_level || "Not specified"}</p>
          <p><strong>Coping Action:</strong> {checkIn.coping_action || "No coping action available"}</p>
          <p><strong>Effectiveness:</strong> {checkIn.effectiveness || "Not specified"}</p>
        </div>
        
        {/* Navigation and Action Buttons */}
        <div style={{ marginTop: '30px', display: 'flex', gap: '10px', flexWrap: 'nowrap', justifyContent: 'center' }}>
          <button onClick={() => navigate("/check-ins/create")}>Add New Check-In</button>
          <button onClick={() => navigate("/check-ins")}>All Check-Ins</button>
          <button onClick={() => navigate(`/check-ins/${id}/edit`)}>Edit Check-In</button>
          <button onClick={handleDeleteCheckIn}>Delete Check-In</button>
        </div>
      </div>
    </div>
  );
};

export default CheckInShow;
