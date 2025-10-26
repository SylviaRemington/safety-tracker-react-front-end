import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import checkInsService from "../../services/checkInsService";

const CheckInsList = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    if (!userLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      const fetchCheckIns = async () => {
        try {
          setLoading(true);
          setError(null);
          const checkInsData = await checkInsService.getAllCheckIns();
          setCheckIns(checkInsData);
        } catch (error) {
          console.error("Error fetching check-ins:", error);
          setError("Failed to load check-ins: " + (error.message || "Unknown error"));
        } finally {
          setLoading(false);
        }
      };
      fetchCheckIns();
    }
  }, [user, userLoading, navigate]);

  // Show loading while checking authentication
  if (userLoading) {
    return <div className="loading">Loading...</div>;
  }

  // If not logged in, this will redirect to login
  if (!user) {
    return <div className="loading">Redirecting to login...</div>;
  }

  if (loading) {
    return <div className="loading">Loading check-ins...</div>;
  }

  if (error) {
    return <div className="loading">Error: {error}</div>;
  }

  return (
    <main className="main-container">
      <h1 className="welcome-title">My Daily Check-Ins</h1>
      <p className="welcome-description" style={{ textAlign: 'center', marginBottom: '30px' }}>
        These are personal, private check-ins aka journal entries only for you to see & so that you can track what happens over time.
      </p>
      
      <div className="add-button">
        <button onClick={() => navigate("/check-ins/create")}>
          Add New Check-In
        </button>
      </div>
      
      {checkIns.length === 0 ? (
        <div className="empty-state">
          <p>No check-ins available yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {checkIns.map((checkIn) => (
            <div key={checkIn.id} className="check-in-card"
            onClick={() => navigate(`/check-ins/${checkIn.id}`)}
            >
              <h2 className="check-in-title">
                {checkIn.title || "Untitled Check-In"}
              </h2>
              <p className="check-in-date">
                {new Date(checkIn.created_at || checkIn.updated_at || Date.now()).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default CheckInsList;