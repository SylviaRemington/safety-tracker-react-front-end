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
      <h1>Welcome to The Dusty Shelf</h1>
      <p>Feel free to explore our library...</p>
      <ul>
        {stories.map((story, index) => (
          <li key={story.id}>
            <Link to={`stories/${story.id}`}>
              <p>
                {index + 1}. {story.title}
              </p>
              <p>Genre: {story.genre}</p>
              <p>Released: {story.year}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default StoriesList;
