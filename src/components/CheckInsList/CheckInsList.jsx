import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import checkInsService from "../../services/checkInsService";
import blueWatercolor from "../../assets/bluewatercolor.jpeg";

const CheckInsList = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const [checkIns, setCheckIns] = useState([]);
  const [filteredCheckIns, setFilteredCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dayTypeFilter, setDayTypeFilter] = useState("");

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
          setFilteredCheckIns(checkInsData);
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

  // Filter check-ins based on search term and day type
  useEffect(() => {
    let filtered = checkIns;

    // Filter by search term (title and description)
    if (searchTerm) {
      filtered = filtered.filter(checkIn => 
        checkIn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        checkIn.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by day type
    if (dayTypeFilter) {
      filtered = filtered.filter(checkIn => 
        checkIn.day_type && checkIn.day_type.includes(dayTypeFilter)
      );
    }

    setFilteredCheckIns(filtered);
  }, [checkIns, searchTerm, dayTypeFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDayTypeChange = (e) => {
    setDayTypeFilter(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDayTypeFilter("");
  };

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

      {/* Search and Filter Controls */}
      <div 
        className="search-container"
        style={{
          marginBottom: '30px',
          backgroundImage: `url(${blueWatercolor})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(150, 206, 180, 0.75)',
          borderRadius: '8px',
          zIndex: 1
        }}></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <style>
            {`
              .search-input::placeholder {
                color: #1a1a1a !important;
                font-weight: bold !important;
              }
            `}
          </style>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-input search-input"
              style={{ 
                flex: '1', 
                minWidth: '200px', 
                maxWidth: '300px', 
                color: '#1a1a1a', 
                fontWeight: 'bold'
              }}
            />
            <select
              value={dayTypeFilter}
              onChange={handleDayTypeChange}
              className="form-select"
              style={{ minWidth: '150px', color: '#1a1a1a', fontWeight: 'bold' }}
            >
              <option value="">All Day Types</option>
              <option value="Challenging">Challenging Day</option>
              <option value="Normal">Normal Day</option>
              <option value="Good">Good Day</option>
            </select>
            <button 
              onClick={clearFilters} 
              className="form-button-cancel"
              style={{ color: '#1a1a1a', fontWeight: 'bold' }}
            >
              Clear
            </button>
          </div>
          {(searchTerm || dayTypeFilter) && (
            <p style={{ textAlign: 'center', color: '#1a1a1a', fontSize: '14px', fontWeight: 'bold' }}>
              Showing {filteredCheckIns.length} of {checkIns.length} check-ins
            </p>
          )}
        </div>
      </div>
      
      {filteredCheckIns.length === 0 ? (
        <div className="empty-state">
          <p>
            {checkIns.length === 0 
              ? "No check-ins created yet." 
              : "No check-ins found with that information."
            }
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredCheckIns.map((checkIn) => (
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