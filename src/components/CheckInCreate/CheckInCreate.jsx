import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import checkInsService from "../../services/checkInsService";

const CheckInCreate = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    day_type: "",
    reaction_level: "",
    coping_action: "",
    effectiveness: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is logged in
    if (!userLoading && !user) {
      navigate("/login");
      return;
    }
  }, [user, userLoading, navigate]);

  const handleChange = (evt) => {
    setError("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setError("");
      await checkInsService.createCheckIn(formData);
      navigate("/check-ins");
    } catch (error) {
      console.error("Error creating check-in:", error);
      setError("Failed to create check-in: " + (error.message || "Unknown error"));
    }
  };

  // Show loading while checking authentication
  if (userLoading) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>Loading...</div>;
  }

  // If not logged in, this will redirect to login
  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>Redirecting to login...</div>;
  }

  return (
    <main style={{ marginTop: '80px', padding: '20px', maxWidth: '600px', margin: '80px auto 0' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '30px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>Create Daily Check-In</h1>
        {error && <p style={{ color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>

          <div>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>

          <div>
            <label htmlFor="day_type" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Day Type:</label>
            <select
              id="day_type"
              name="day_type"
              value={formData.day_type}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            >
              <option value="">What kind of day are you having?</option>
              <option value="Challenging Days">Challenging Days</option>
              <option value="Normal Days - Not Bad or Good">Normal Days - Not Bad or Good</option>
              <option value="Good Days">Good Days</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            >
              <option value="">Select a category</option>
              <option value="Physical">Physical</option>
              <option value="Emotional">Emotional</option>
              <option value="Financial">Financial</option>
              <option value="Social">Social</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="reaction_level" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Reaction Level (1-10):</label>
            <input
              type="number"
              id="reaction_level"
              name="reaction_level"
              value={formData.reaction_level}
              onChange={handleChange}
              min="1"
              max="10"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>

          <div>
            <label htmlFor="coping_action" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Coping Action:</label>
            <textarea
              id="coping_action"
              name="coping_action"
              value={formData.coping_action}
              onChange={handleChange}
              rows="3"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>

          <div>
            <label htmlFor="effectiveness" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Effectiveness (1-10):</label>
            <input
              type="number"
              id="effectiveness"
              name="effectiveness"
              value={formData.effectiveness}
              onChange={handleChange}
              min="1"
              max="10"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button type="submit" style={{ padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '6px', cursor: 'pointer' }}>Create Check-In</button>
            <button type="button" onClick={() => navigate("/check-ins")} style={{ padding: '10px 20px', background: 'transparent', color: 'white', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CheckInCreate;
