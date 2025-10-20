import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams, useNavigate } from "react-router";
import {
  getStoryById,
  updateStory,
  deleteStory,
} from "../../services/storiesService";
import { getAuthors } from "../../services/authorsService";

const StoryShow = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [story, setStory] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsData, storyData] = await Promise.all([
          getAuthors(),
          getStoryById(id),
        ]);
        // const storyData = await getStoryById(id);
        setAuthors(authorsData);
        setStory(storyData);
        setFormData({
          title: storyData.title,
          author: storyData.author.id,
          genre: storyData.genre,
          year: storyData.year,
        });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [id, isEditing]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleEditStory = async (event) => {
    event.preventDefault();
    try {
      await updateStory(id, formData);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteStory = async (event) => {
    try {
      await deleteStory(id);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  if (isEditing) {
    return (
      <div>
        <h2>Edit Story</h2>
        <form onSubmit={handleEditStory}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <div>
            <label htmlFor="author">Author:</label>
            <select
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            >
              <option value="">Select an author...</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="year">Year:</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        <button onClick={handleDeleteStory}>Delete</button>
      </div>
    );
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>{story?.title}</h1>
      <p>{story?.author.name}</p>
      <p>{story?.genre}</p>
      <p>{story?.year}</p>
      {user && <button onClick={() => setIsEditing(true)}>Edit Story</button>}
    </div>
  );
};

export default StoryShow;
