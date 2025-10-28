import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { getAuthor } from "../../services/authorsService";

const AuthorShow = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        setError(null);
        const authorData = await getAuthor(id);
        setAuthor(authorData);
      } catch (error) {
        console.error("Error fetching author:", error);
        setError("Failed to load author: " + (error.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [id]);

  // Showing loading while checking authentication
  if (userLoading || loading) {
    return <div className="loading">Loading...</div>;
  }

  // If not logged in, this will redirect to login
  if (!user) {
    navigate("/login");
    return <div className="loading">Redirecting to login...</div>;
  }

  // If there's an error, display the error
  if (error) {
    return <div className="loading">Error: {error}</div>;
  }

  // If author data is not yet loaded, it will return to loading state
  if (!author) {
    return <div className="loading">Loading author details...</div>;
  }

  return (
    <div className="main-container">
      <div className="card">
        <h1 className="form-title">Stories by {author.name}</h1>
        
        {/* Navigation buttons */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => navigate("/authors")}>All Authors</button>
          <button onClick={() => navigate("/")}>Home</button>
        </div>

        {!author.stories || author.stories.length === 0 ? (
          <div className="empty-state">
            <p>No stories available from this author.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {author.stories.map((story) => (
              <div key={story.id} className="story-card">
                <Link to={`/stories/${story.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h2 className="story-title">{story.title || "Untitled Story"}</h2>
                  <div className="story-content">
                    {story.content && story.content.length > 200 
                      ? story.content.substring(0, 200) + "..." 
                      : story.content || "No content available"
                    }
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorShow;
