import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import { login } from "../../services/authService";

import { UserContext } from "../../contexts/UserContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // If user is already logged in, this redirects to the home page where there are user stories for all users to see.
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await login(formData);

      setUser(signedInUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // Show loading while checking for authentication.
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // If the user is logged in, this will redirect to the homepage.
  if (user) {
    return <div className="loading">Redirecting...</div>;
  }

  return (
    <main className="main-container">
      <div className="form-container">
        <h1 className="form-title">Login</h1>
        {message && <p className="error-message">{message}</p>}
        
        <form autoComplete="off" onSubmit={handleSubmit} className="form-field">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="text"
              autoComplete="off"
              id="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="form-button">Login</button>
            <button type="button" onClick={() => navigate("/")} className="form-button-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
