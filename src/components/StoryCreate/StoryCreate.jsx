import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createStory } from "../../services/storiesService";
import { getAuthors } from "../../services/authorsService";

const StoryCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      const authors = await getAuthors();
      setAuthors(authors);
    };
    fetchAuthors();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await createStory(formData);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

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
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Story</button>
      </form>
    </main>
  );
};

export default StoryCreate;

