import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { login } from "../../services/authService";

import { UserContext } from "../../contexts/UserContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  return (
    <main style={{ marginTop: '80px', padding: '20px', maxWidth: '600px', margin: '80px auto 0' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '30px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>Login</h1>
        {message && <p style={{ color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>{message}</p>}
        
        <form autoComplete="off" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Email:</label>
            <input
              type="text"
              autoComplete="off"
              id="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button type="submit" style={{ padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '6px', cursor: 'pointer' }}>Login</button>
            <button type="button" onClick={() => navigate("/")} style={{ padding: '10px 20px', background: 'transparent', color: 'white', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
