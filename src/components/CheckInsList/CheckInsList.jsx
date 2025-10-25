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
    return <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>Loading...</div>;
  }

  // If not logged in, this will redirect to login
  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>Redirecting to login...</div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>Loading check-ins...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>Error: {error}</div>;
  }

  return (
    <main style={{ marginTop: '80px', padding: '20px', maxWidth: '600px', margin: '80px auto 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>My Daily Check-Ins</h1>
      
      {checkIns.length === 0 ? (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '20px', 
          borderRadius: '12px', 
          textAlign: 'center' 
        }}>
          <p style={{ color: 'white' }}>No check-ins available yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {checkIns.map((checkIn) => (
            <div key={checkIn.id} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: 'white' }}>
                {checkIn.title || "Untitled Check-In"}
              </h2>
              <p style={{ margin: '0 0 10px 0', color: 'rgba(255, 255, 255, 0.8)' }}>
                Category: {checkIn.category}
              </p>
              <p style={{ margin: '0 0 10px 0', color: 'rgba(255, 255, 255, 0.8)' }}>
                Reaction Level: {checkIn.reaction_level}/10
              </p>
              <div style={{ 
                whiteSpace: 'pre-wrap', 
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.5'
              }}>
                {checkIn.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default CheckInsList;