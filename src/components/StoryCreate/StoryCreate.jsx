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
      <main style={{ marginTop: '80px', padding: '20px', maxWidth: '600px', margin: '80px auto 0' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>Create Story</h1>
        {error && <p style={{ color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', padding: '10px', borderRadius: '6px' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          
          <div>
            <label htmlFor="author" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Author:</label>
            <select
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '10px' }}
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
              style={{ width: '100%' }}
            />
          </div>
          
          <div>
            <label htmlFor="content" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Content:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button type="submit">Create Story</button>
            <button type="button" onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default StoryCreate;

