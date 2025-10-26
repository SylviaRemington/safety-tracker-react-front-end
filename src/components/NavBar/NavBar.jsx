import { useContext } from "react";
import { Link } from "react-router";

import { UserContext } from "../../contexts/UserContext";
import "./navbar.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li>
            <Link to="/">Safety-Tracker-Dashboard</Link>
          </li>
          <li>
            <Link to="/check-ins">My Check-Ins</Link>
          </li>
          <li>
            <Link to="/stories/create">Add Story</Link>
          </li>
          <li>
            <Link to="/emergency-resources">Resources</Link>
          </li>
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>          
          <li>
            <Link to="/login">Login</Link>
          </li>
          
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
