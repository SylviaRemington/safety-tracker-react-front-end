// import tools needed
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createStory } from "../../services/storiesService";
import { getAuthors } from "../../services/authorsService"; // added so can get authors that already have & already are created
import axios from "../../services/axiosConfig"; // added for creating new authors

// StoryCreate page - creates/starts it
const StoryCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "", // can use this for either selected id or new author name
    content: "",
  });
  const [authors, setAuthors] = useState([]); //storing save authors
  const [error, setError] = useState("");

  // useEffect - getting/fetching authors when page loads
  useEffect(() => { // 
    const fetchAuthors = async () => {
      try {
        setError("");
        const authorsData = await getAuthors();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setError("Failed to load authors: " + (error.message || "Unknown error"));
      }
    };
    fetchAuthors();
  }, []);

  // handles typing in form boxes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // saves new story when clicking on create button
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setError("");
      // checking if author is an ID or new name
      let authorId = parseInt(formData.author); // first, check if it's an ID from the form
      if (!formData.author || isNaN(authorId)) { // if it's a new author - this is for handling new author
        // Only create author if we have a valid name
        if (formData.author && formData.author.trim()) {
          const response = await axios.post(
            `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/authors/`,
            { name: formData.author.trim() }
          );
          authorId = response.data.id; // gets new author id here if new
        } else {
          setError("Please select an author or enter a new author name");
          return;
        }
      }
      // sending story with author ID
      await createStory({
        title: formData.title,
        content: formData.content,
        authorId, // using author id instead of author
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating story:", error);
      setError("Failed to create story: " + (error.message || "Unknown error"));
    }
  };

  // returning - creating the form section
  return (
      <main className="main-container">
        <div className="form-container">
        <h1 className="form-title">Create Story</h1>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit} className="form-field">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="author" className="form-label">Author:</label>
            <select
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select or type new author</option> 
              {authors.map((author) => (
                <option key={author.id} value={String(author.id)}> 
                  {author.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or type new author name"
              name="author"
              value={formData.author === "" || isNaN(formData.author) ? formData.author : ""}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content" className="form-label">Content:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              required
              className="form-textarea"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="form-button">Create Story</button>
            <button type="button" onClick={() => navigate("/")} className="form-button">Go to All Stories</button>
            <button type="button" onClick={() => navigate("/")} className="form-button-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default StoryCreate;

