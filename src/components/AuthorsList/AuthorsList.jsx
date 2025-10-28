import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { getAuthors } from "../../services/authorsService";

const AuthorsList = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Checking to see if user is logged in
    if (!userLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      const fetchAuthors = async () => {
        try {
          setLoading(true);
          setError(null);
          const authorsData = await getAuthors();
          console.log("Authors data:", authorsData);
          setAuthors(authorsData);
        } catch (error) {
          console.error("Error fetching authors:", error);
          setError("Failed to load authors: " + (error.message || "Unknown error"));
        } finally {
          setLoading(false);
        }
      };
      fetchAuthors();
    }
  }, [user, userLoading, navigate]);

  // Showing loading while checking authentication
  if (userLoading) {
    return <div className="loading">Loading...</div>;
  }

  // If not logged in, this will redirect to login
  if (!user) {
    return <div className="loading">Redirecting to login...</div>;
  }

  if (loading) {
    return <div className="loading">Loading authors...</div>;
  }

  if (error) {
    return <div className="loading">Error: {error}</div>;
  }

  return (
    <div className="main-container">
      <div className="card">
        <h1 className="form-title">All Authors</h1>
        <p className="welcome-description" style={{ textAlign: 'center', marginBottom: '30px' }}>
          Click on an author to see all their stories
        </p>

        {authors.length === 0 ? (
          <div className="empty-state">
            <p>No authors available at the moment.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {authors.map((author) => {
              console.log("Individual author:", author);
              return (
              <div key={author.id} className="author-card">
                <Link to={`/authors/${author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 className="author-name">{author.name}</h3>
                  <p className="author-stories-count">
                    {author.stories ? author.stories.length : 0} {author.stories && author.stories.length === 1 ? 'story' : 'stories'}
                  </p>
                </Link>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorsList;
