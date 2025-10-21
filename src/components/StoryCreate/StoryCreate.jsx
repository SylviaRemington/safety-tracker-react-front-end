import { useState } from "react";
import { useNavigate } from "react-router";
import { createStory } from "../../services/storiesService";

// StoryCreate page - creates/starts it
const StoryCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  });
  // for error messages
  const [error, setError] = useState("");

  // handles typing in form boxes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // saves new story when clicking on create button
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await createStory(formData);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // returning/creating the form section
  return (
    <main>
      <h1>Create Story</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
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

        <button type="submit">Create Story</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </main>
  );
};

export default StoryCreate;

