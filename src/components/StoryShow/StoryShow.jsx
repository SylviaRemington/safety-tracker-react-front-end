// Imports
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams, useNavigate } from "react-router";
import {
  getStoryById,
  updateStory,
  deleteStory,
} from "../../services/storiesService";
// for fetching authors
import { getAuthors } from "../../services/authorsService";
// for creating a new author
import axios from "../../services/axiosConfig";

// Starts the StoryShow page
const StoryShow = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [story, setStory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    newAuthor: "",
    content: "",
  });
  const [authors, setAuthors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  // tracking loading below
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // useEffect section - loads Story Section - Gets story from backend when page opens
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [storyData, authorsData] = await Promise.all([ // <--- Fetch both
          getStoryById(id),
          getAuthors()
        ]);
        setStory(storyData);
        setAuthors(authorsData);
        setFormData({
          title: storyData.title || "",
          // using author id as a string for form
          author: storyData.author ? String(storyData.author.id) : "", 
          newAuthor: "",
          content: storyData.content || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load story or authors: " + (error.message || "Unknown error"));
      } finally {
        // done fetching the info
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // handleChange section - handles adding input and whatever is typed in form boxes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Saves changes/updates to Story when person clicks on save
  const handleEditStory = async (event) => {
    event.preventDefault();
    try {
      setError(null);
      let authorId;
      
      // Check if user typed a new author name (prioritize this)
      if (formData.newAuthor && formData.newAuthor.trim()) {
        console.log("Creating new author:", formData.newAuthor.trim());
        const response = await axios.post(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/authors/`,
          { name: formData.newAuthor.trim() }
        );
        authorId = response.data.id; 
        console.log("New author created with ID:", authorId);
      } 
      // Otherwise, use the selected author from dropdown
      else if (formData.author && formData.author !== "") {
        authorId = parseInt(formData.author);
        console.log("Using existing author ID:", authorId);
      } 
      // If neither, show error
      else {
        setError("Please select an author or enter a new author name");
        return;
      }
      // sending update with the correct authorId
      await updateStory(id, {
        title: formData.title,
        content: formData.content,
        authorId, // <--- Send as authorId
        ownerId: user.id // <--- Add owner ID
      });
      setIsEditing(false);
      // redirect to main dashboard after successful edit
      navigate("/");
    } catch (error) {
      console.error("Error updating story:", error);
      setError("Failed to update story: " + (error.message || "Unknown error")); 
    }
  };

  // Deletes Story when person clicks on delete
  const handleDeleteStory = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you'd like to delete this story? This action cannot be undone.");
    
    if (!confirmed) {
      return; // User cancelled, don't delete
    }
    
    try {
      setError(null);
      await deleteStory(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting story:", error);
      setError("Failed to delete story: " + (error.message || "Unknown error")); 
    }
  };

  // Showing if loading or there's an error
  // Doing a loading check
  if (loading) { 
    return <div>Loading story...</div>;
  }
  // error message and return
  if (error) { 
    return <div>{error}</div>;
  }

  // Editing Form Section - the form that shows up when clicking the edit section
  if (isEditing) {
    return (
      <div style={{ marginTop: '80px', padding: '20px', maxWidth: '600px', margin: '80px auto 0' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>Edit Story</h2>
          <form onSubmit={handleEditStory} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Story Title - box that shows up for that */}
            <div>
              <label htmlFor="title" style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>

            {/* Author's Name / Author Selection - box that shows up for that */}
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
                name="newAuthor"
                value={formData.newAuthor || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </div>

            {/* Body Text Section - Main Section of Story - big box for the story text */} 
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
            
            {/* Save Button Section */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="button" onClick={handleDeleteStory}>Delete</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // showing story details
  return (
      <div style={{ marginTop: '80px', padding: '20px', maxWidth: '600px', margin: '80px auto 0' }}>
      {/* showing an error if there are any errors */}
      {error && <p style={{ color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', padding: '10px', borderRadius: '6px' }}>{error}</p>}
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '30px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* showing story title or no title if nothing is put down */}
        <h1 style={{ marginBottom: '20px', color: 'white' }}>{story?.title || "No title available"}</h1>
        
        {/* Navigation and Action Buttons - moved under title */}
        <div style={{ marginBottom: '25px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Always show navigation buttons */}
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/")}>See All Stories</button>
          
          {/* Show edit/delete buttons only if user is logged in and is the owner */}
          {user && story?.owner && user.id === story.owner.id && (
            <>
              <button onClick={() => setIsEditing(true)}>Edit My Story</button>
              <button onClick={handleDeleteStory}>Delete My Story</button>
            </>
          )}
        </div>
        
        {/* showing author's name or unknown author if none is given */}
        <p style={{ marginBottom: '25px', color: 'rgba(255, 255, 255, 0.8)' }}>
          <strong>By: {story?.author?.name || "Unknown Author"}</strong>
        </p>
        
        {/* showing the main content/story body */}
        <div style={{ 
          whiteSpace: 'pre-wrap', 
          lineHeight: '1.6',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          {story?.content || "No content or story available. Check back soon."}
        </div>
      </div>
    </div>
  );
};

export default StoryShow;
