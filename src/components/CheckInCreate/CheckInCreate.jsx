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
    relaxed_today: "",
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
    <main className="main-container">
      <div className="form-container">
        <h1 className="form-title">Create Daily Check-In</h1>
        <p className="required-message">(All fields are required for check-in to submit)</p>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit} className="form-field">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="day_type" className="form-label">Day Type:</label>
            <select
              id="day_type"
              name="day_type"
              value={formData.day_type}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">What kind of day are you having?</option>
              <option value="Challenging Day - Today's been rough.">Challenging Day - Today's been rough.</option>
              <option value="Normal Day - Not Bad or Good, I'm ok.">Normal Day - Not Bad or Good, I'm ok.</option>
              <option value="Good Day - Happy, Fun Day, and/or Peaceful Day.">Good Day - Happy, Fun Day, and/or Peaceful Day.</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="relaxed_today" className="form-label">Relaxed Today or Not?</label>
            <select
              id="relaxed_today"
              name="relaxed_today"
              value={formData.relaxed_today}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select the one that is closest to how you felt today.</option>
              <option value="Today, I felt like I could relax and be myself.">Today, I felt like I could relax and be myself.</option>
              <option value="Today, I didn't feel relaxed and I didn't feel like I could be myself.">Today, I didn't feel relaxed and I didn't feel like I could be myself.</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select a category of what you experienced today.</option>
              <option value="No Abuse">No Abuse</option>
              <option value="Physical Abuse">Physical Abuse</option>
              <option value="Verbal Abuse">Verbal Abuse</option>
              <option value="Emotional Abuse">Emotional Abuse</option>
              <option value="Psychological Abuse">Psychological Abuse</option>
              <option value="Financial Abuse">Financial Abuse</option>
              <option value="I have no idea">I have no idea</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reaction_level" className="form-label">Reaction Level (1-10, 1 = least intense and 10 = most intense):</label>
            <input
              type="number"
              id="reaction_level"
              name="reaction_level"
              value={formData.reaction_level}
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="The intensity of your partner today when you experienced the category."
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="coping_action" className="form-label">Coping Action:</label>
            <textarea
              id="coping_action"
              name="coping_action"
              value={formData.coping_action}
              onChange={handleChange}
              rows="3"
              required
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="effectiveness" className="form-label">Effectiveness (1-10):</label>
            <input
              type="number"
              id="effectiveness"
              name="effectiveness"
              value={formData.effectiveness}
              onChange={handleChange}
              min="1"
              max="10"
              required
              className="form-input"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="form-button">Create Check-In</button>
            <button type="button" onClick={() => navigate("/check-ins")} className="form-button-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CheckInCreate;
