import { getStories } from "../../services/storiesService";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const StoriesList = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      const stories = await getStories();
      setStories(stories);
    };
    fetchStories();
  }, []);

  console.log(`Stories`, stories);

  return (
    <main>
      <h1>Welcome to Community Support with Stories From People Like You!</h1>
      <p>Feel free to explore our stories & articles...</p>
      <p>...AND...</p>
      <p>Feel free to explore shared tips...</p>
      <ul>
        {stories.map((story, index) => (
          <li key={story.id}>
            <Link to={`stories/${story.id}`}>
              <p>
                {index + 1}. {story.title}
              </p>
              {/* Going to show first 100 chars of content as preview for a kind of taster. */}
              <p>{story.content.substring(0, 100)}...</p>
              <p>By: {story.author.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default StoriesList;
