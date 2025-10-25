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
    <main style={{ marginTop: '80px', padding: '20px', maxWidth: '600px', margin: '80px auto 0' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '30px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>Register</h1>
        {message && <p style={{ color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>{message}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>
          <div>
            <label htmlFor="first_name" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>First Name:</label>
            <input
              type="text"
              id="first_name"
              value={first_name}
              name="first_name"
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>
          <div>
            <label htmlFor="last_name" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Last Name:</label>
            <input
              type="text"
              id="last_name"
              value={last_name}
              name="last_name"
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>
          <div>
            <label htmlFor="password_confirmation" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Confirm Password:</label>
            <input
              type="password"
              id="password_confirmation"
              value={password_confirmation}
              name="password_confirmation"
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button type="submit" disabled={isFormInvalid()} style={{ padding: '10px 20px', background: isFormInvalid() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '6px', cursor: isFormInvalid() ? 'not-allowed' : 'pointer' }}>Register</button>
            <button type="button" onClick={() => navigate("/")} style={{ padding: '10px 20px', background: 'transparent', color: 'white', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
