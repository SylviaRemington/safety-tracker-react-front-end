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

// Starts the StoryShow page
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

  // useEffect section - loads Story Section - Gets story from backend when page opens
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

  // handleChange section - handles adding input and whatever is typed in form boxes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Saves changes/updates to Story
  const handleEditStory = async (event) => {
    event.preventDefault();
    try {
      await updateStory(id, formData);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Deletes Story
  const handleDeleteStory = async () => {
    try {
      await deleteStory(id);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // Editing Form Section
  if (isEditing) {
    return (
      <div>
        <h2>Edit Story</h2>
        <form onSubmit={handleEditStory}>
          {/* Title Input Section - Box for story title */}
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          {/* Author Input Section - box for the author's name */}
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

          {/* {/* Body Text Section - Main Section of Story */} 
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
          {/* Submit Save Button Section */}
          <button type="submit">Save</button>
        </form>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        <button onClick={handleDeleteStory}>Delete</button>
      </div>
    );
  }

  return (
    <div>
      {/* Shows error if there are any errors. */}
      {error && <p>{error}</p>}
      {/* Shows story title */}
      <h1>{story?.title}</h1>
      {/* Shows author's name */}
      <p>{story?.author.name}</p>
      {/* Shows the main content */}
      <p>{story?.content}</p>
      {/* Shows Edit Button if logged in */}
      {user && <button onClick={() => setIsEditing(true)}>Edit Story</button>}
    </div>
  );
};

export default StoryShow;
