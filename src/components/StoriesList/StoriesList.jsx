import { getStories } from "../../services/storiesService";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import blueWatercolor from "../../assets/bluewatercolor.jpeg";
import pinkWatercolor from "../../assets/pinkwatercolor.jpeg";

const StoriesList = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get first two sentences as preview
  const getPreview = (content) => {
    if (!content) return "No content available";
    
    // Split by sentence endings (. ! ?) and take first two
    const sentences = content.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const preview = sentences.slice(0, 2).join('. ').trim();
    
    // Add ellipsis if there are more sentences
    return sentences.length > 2 ? preview + '...' : preview;
  };

  useEffect(() => {
    // Check if user is logged in
    if (!userLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      const fetchStories = async () => {
        try {
          setLoading(true);
          setError(null);
          const stories = await getStories();
          setStories(stories);
        } catch (error) {
          console.error("Error fetching stories:", error);
          setError("Failed to load stories: " + (error.message || "Unknown error"));
        } finally {
          setLoading(false);
        }
      };
      fetchStories();
    }
  }, [user, userLoading, navigate]);

  console.log(`Stories`, stories);

  // Show loading while checking authentication
  if (userLoading) {
    return <div className="loading">Loading...</div>;
  }

  // If not logged in, this will redirect to login
  if (!user) {
    return <div className="loading">Redirecting to login...</div>;
  }

  if (loading) {
    return <div className="loading">Loading stories...</div>;
  }

  if (error) {
    return <div className="loading">Error: {error}</div>;
  }

  return (
      <main 
        className="main-container"
        style={{
          backgroundImage: `url(${blueWatercolor})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(13, 15, 30, 0.7)',
          zIndex: 1
        }}></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div 
            style={{
              backgroundImage: `url(${pinkWatercolor})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '12px',
              padding: '30px',
              marginBottom: '30px',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(13, 15, 30, 0.6)',
              borderRadius: '12px',
              zIndex: 1
            }}></div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h1 className="welcome-title">Welcome to Safety Tracker</h1>
              <p className="welcome-subtitle">A place to have a personal, private journal for yourself,</p>
              <p className="welcome-subtitle">and</p>
              <p className="welcome-description">To share stories from people like you for inspiration, encouragement, and to know you are not alone.</p>
            </div>
          </div>
          
          {stories.length === 0 ? (
            <div className="empty-state">
              <p>No stories available at the moment.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {stories.map((story) => (
                <div 
                  key={story.id} 
                  className="story-card"
                  style={{
                    backgroundImage: `url(${pinkWatercolor})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(13, 15, 30, 0.6)',
                    borderRadius: '12px',
                    zIndex: 1
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <Link to={`stories/${story.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h2 className="story-title">
                        {story.title || "Untitled Story"}
                      </h2>
                      <p className="story-author">
                        By: {story.author?.name || "Unknown Author"}
                      </p>
                      <div className="story-content">
                        {getPreview(story.content)}
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
  );
};

export default StoriesList;

// Updated src components StoriesList StoriesList.jsx 
// StoriesList.jsx reviewed to make sure working correctly