import { getStories } from "../../services/storiesService";
import checkInsService from "../../services/checkInsService";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

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
      
      // Test the check-ins service
      checkInsService.getAllCheckIns().then(data => console.log("Check-ins:", data));
    }
  }, [user, userLoading, navigate]);

  console.log(`Stories`, stories);

  // Show loading while checking authentication
  if (userLoading) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>Loading...</div>;
  }

  // If not logged in, this will redirect to login
  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>Redirecting to login...</div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>Loading stories...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>Error: {error}</div>;
  }

  return (
      <main style={{ marginTop: '80px', padding: '20px', maxWidth: '600px', margin: '80px auto 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Welcome to Stories From People Like You</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', opacity: 0.8 }}>Feel free to explore our stories & articles...</p>
      <p style={{ textAlign: 'center', marginBottom: '30px', opacity: 0.8 }}>...AND...</p>
      <p style={{ textAlign: 'center', marginBottom: '40px', opacity: 0.8 }}>We have so many shared experiences & wellbeing tips in this Community Support Area.</p>
      
      {stories.length === 0 ? (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '20px', 
          borderRadius: '12px', 
          textAlign: 'center' 
        }}>
          <p>No stories available at the moment.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {stories.map((story) => (
            <div key={story.id} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Link to={`stories/${story.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2 style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: 'white' }}>
                  {story.title || "Untitled Story"}
                </h2>
                <p style={{ margin: '0 0 15px 0', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                  By: {story.author?.name || "Unknown Author"}
                </p>
                <div style={{ 
                  whiteSpace: 'pre-wrap', 
                  fontStyle: 'italic', 
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.5'
                }}>
                  {getPreview(story.content)}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default StoriesList;

// Updated src components StoriesList StoriesList.jsx 
// StoriesList.jsx reviewed to make sure working correctly