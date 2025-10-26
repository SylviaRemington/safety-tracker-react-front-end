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
    profile_image: "",
    username: "",
  });

  const {
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    profile_image,
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
      setMessage(err.message);
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
