import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import checkInsService from "../../services/checkInsService";

const CheckInEdit = () => {
  const navigate = useNavigate();
  const { user, loading: userLoading } = useContext(UserContext);
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
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Checking if user is logged in
    if (!userLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      const fetchCheckIn = async () => {
        try {
          setLoading(true);
          setError("");
          const checkInData = await checkInsService.getCheckIn(id);
          
          // Checking if user is the owner of this check-in prior to allowing them access
          if (checkInData.owner && user.id !== checkInData.owner.id) {
            setError("You don't have permission to edit this check-in");
            return;
          }
          
          setFormData({
            title: checkInData.title || "",
            description: checkInData.description || "",
            category: checkInData.category || "",
            day_type: checkInData.day_type || "",
            relaxed_today: checkInData.relaxed_today || "",
            reaction_level: checkInData.reaction_level || "",
            coping_action: checkInData.coping_action || "",
            effectiveness: checkInData.effectiveness || ""
          });
        } catch (error) {
          console.error("Error fetching check-in:", error);
          setError("Failed to load check-in: " + (error.message || "Unknown error"));
        } finally {
          setLoading(false);
        }
      };
      fetchCheckIn();
    }
  }, [id, user, userLoading, navigate]);

  const handleChange = (evt) => {
    setError("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setError("");
      
      // Converting string values to numbers for numbers
      const submitData = {
        ...formData,
        reaction_level: formData.reaction_level ? parseFloat(formData.reaction_level) : null,
        effectiveness: formData.effectiveness ? parseFloat(formData.effectiveness) : null,
        owner: user.id
      };
      
      console.log("Sending update data:", submitData);
      console.log("User ID:", user.id);
      await checkInsService.updateCheckIn(id, submitData);
      navigate(`/check-ins/${id}`);
    } catch (error) {
      console.error("Error updating check-in:", error);
      console.error("Response data:", error.response?.data);
      setError("Failed to update check-in: " + (error.message || "Unknown error"));
    }
  };

  // Showing loading while checking authentication
  if (userLoading) {
    return <div className="loading">Loading...</div>;
  }

  // If user is not logged in, this will redirect to login
  if (!user) {
    return <div className="loading">Redirecting to login...</div>;
  }

  if (loading) {
    return <div className="loading">Loading check-in...</div>;
  }

  if (error) {
    return <div className="loading">Error: {error}</div>;
  }

  return (
    <main className="main-container">
      <div className="form-container">
        <h1 className="form-title">Edit Check-In</h1>
        <p className="required-message">(All fields are necessary for check-in to submit)</p>
        
        {error && <p className="error-message">{error}</p>}
        
        <form autoComplete="off" onSubmit={handleSubmit} className="form-field">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              type="text"
              autoComplete="off"
              id="title"
              value={formData.title}
              name="title"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
              autoComplete="off"
              id="description"
              value={formData.description}
              name="description"
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="day_type" className="form-label">Day Type:</label>
            <select
              id="day_type"
              value={formData.day_type}
              name="day_type"
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
              value={formData.relaxed_today}
              name="relaxed_today"
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
              value={formData.category}
              name="category"
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
              min="1"
              max="10"
              autoComplete="off"
              id="reaction_level"
              value={formData.reaction_level}
              name="reaction_level"
              onChange={handleChange}
              placeholder="The intensity of your partner today when you experienced the category."
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="coping_action" className="form-label">Coping Action:</label>
            <textarea
              autoComplete="off"
              id="coping_action"
              value={formData.coping_action}
              name="coping_action"
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="effectiveness" className="form-label">Effectiveness:</label>
            <input
              type="number"
              min="1"
              max="10"
              autoComplete="off"
              id="effectiveness"
              value={formData.effectiveness}
              name="effectiveness"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="form-button">Update Check-In</button>
            <button type="button" onClick={() => navigate(`/check-ins/${id}`)} className="form-button-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CheckInEdit;
