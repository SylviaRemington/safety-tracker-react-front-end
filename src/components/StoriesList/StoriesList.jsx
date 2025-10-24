import { getStories } from "../../services/storiesService";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const StoriesList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  console.log(`Stories`, stories);

  if (loading) {
    return <div>Loading stories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <h1>Welcome to Stories From People Like You</h1>
      <p>Feel free to explore our stories & articles...</p>
      <p>...AND...</p>
      <p>We have so many shared experiences & wellbeing tips in this Community Support Area.</p>
      {stories.length === 0 ? (
        <p>No stories available at the moment.</p>
      ) : (
        <ul>
          {stories.map((story, index) => (
            <li key={story.id}>
              <Link to={`stories/${story.id}`}>
                <p>
                  {index + 1}. {story.title || "Untitled Story"}
                </p>
                {/* Going to show first 100 chars of content as preview for a kind of taster. */}
                {/* <p>{story.content.substring(0, 100)}...</p> */}
                <p>By: {story.author?.name || "Unknown Author"}</p>
                <div style={{ whiteSpace: 'pre-wrap' }}>Content: {story.content || "No content available"}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default StoriesList;

// Updated src components StoriesList StoriesList.jsx 
// StoriesList.jsx reviewed to make sure working correctly