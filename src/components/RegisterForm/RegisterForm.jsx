import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { register } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    username: "",
  });

  const {
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    username,
  } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await register(formData);
      setUser(newUser);
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      
      // Checking if it's a password validation error (422 status if the password doesn't fit the parameters / added parameters on login page because of this)
      if (err.response?.status === 422) {
        setMessage("Password doesn't meet requirements. Please check the password requirements below and try again.");
      } else if (err.response?.data?.password) {
        // Sending a password error message so the user know's what's up.
        setMessage("Password doesn't meet requirements. Please check the password requirements below and try again.");
      } else {
        setMessage(err.message || "Registration failed. Please try again.");
      }
    }
  };

  const isFormInvalid = () => {
    return !(
      email &&
      username &&
      password &&
      password === password_confirmation &&
      first_name &&
      last_name
    );
  };

  return (
    <main className="main-container">
      <div className="form-container">
        <h1 className="form-title">Register</h1>
        {message && <p className="error-message">{message}</p>}
        
        <form onSubmit={handleSubmit} className="form-field">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name" className="form-label">First Name:</label>
            <input
              type="text"
              id="first_name"
              value={first_name}
              name="first_name"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="form-label">Last Name:</label>
            <input
              type="text"
              id="last_name"
              value={last_name}
              name="last_name"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation" className="form-label">Confirm Password:</label>
            <input
              type="password"
              id="password_confirmation"
              value={password_confirmation}
              name="password_confirmation"
              onChange={handleChange}
              required
              className="form-input"
            />
            <div style={{ marginTop: '10px', fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)', backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(78, 205, 196, 0.3)' }}>
              <p style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '16px', color: '#4ecdc4', textDecoration: 'underline' }}>Password Requirements (For Your Safety):</p>
              <ul style={{ marginLeft: '20px', marginBottom: '10px', fontSize: '14px' }}>
                <li style={{ marginBottom: '8px' }}>At least 8 characters</li>
                <li style={{ marginBottom: '8px' }}>Not similar to username/email/name<br /><span style={{ fontSize: '12px', fontStyle: 'italic', color: '#4ecdc4' }}>(Example: If username is "john123", password "john123" would fail)</span></li>
                <li style={{ marginBottom: '8px' }}>Not a common password<br /><span style={{ fontSize: '12px', fontStyle: 'italic', color: '#4ecdc4' }}>(Examples of common passwords: password, 123456, password123)</span></li>
                <li style={{ marginBottom: '8px' }}>Not all numbers</li>
                <li style={{ marginBottom: '8px' }}>Mix of letters, numbers, and/or symbols</li>
              </ul>
              <p style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4ecdc4', fontStyle: 'italic' }}>Example good passwords:<br /><span style={{ fontSize: '14px', color: '#4ecdc4', marginLeft: '10px' }}>MyPass123! • Safety2024 • Tracker#1 • SecurePass9</span></p>
              <br />
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" disabled={isFormInvalid()} className="form-button">Register</button>
            <button type="button" onClick={() => navigate("/")} className="form-button-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
