// Imports
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams, useNavigate } from "react-router";
import {
  getStoryById,
  updateStory,
  deleteStory,
} from "../../services/storiesService";
// import { getAuthors } from "../../services/authorsService";

const StoryShow = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [story, setStory] = useState(null);
  // const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // useEffect section
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storyData = await getStoryById(id);
        setStory(storyData);
        setFormData({
          title: storyData.title,
          author: storyData.author.name,
          content: storyData.content,
        });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [id, isEditing]);

  // handleChange section
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

  const handleDeleteStory = async () => {
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

          {/* Author Input Section */}
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>



          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              required
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
      <p>{story?.content}</p>
      {user && <button onClick={() => setIsEditing(true)}>Edit Story</button>}
    </div>
  );
};

export default StoryShow;
