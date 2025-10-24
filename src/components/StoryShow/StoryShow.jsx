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
      // making sure that authorId is a number
      // converting it to a number
      let authorId = parseInt(formData.author); 
      // creating a new author if it's not an id
      if (isNaN(authorId) || !formData.author) { 
        // Check if user typed a new author name
        if (formData.newAuthor && formData.newAuthor.trim()) {
          const response = await axios.post(
            `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/authors/`,
            { name: formData.newAuthor.trim() }
          );
          // getting a new author id
          authorId = response.data.id; 
        } else {
          setError("Please select an author or enter a new author name");
          return;
        }
      }
      // sending update with the correct authorId
      await updateStory(id, {
        title: formData.title,
        content: formData.content,
        authorId, // <--- Send as authorId
        ownerId: user.id // <--- Add owner ID
      });
      setIsEditing(false);
      // adding to refresh the story info
      const updatedStory = await getStoryById(id); 
      // updating the state
      setStory(updatedStory); 
      setFormData({
        title: updatedStory.title || "",
        // string for the form
        author: updatedStory.author ? String(updatedStory.author.id) : "", 
        newAuthor: "",
        content: updatedStory.content || "",
      });
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
      <div>
        <h2>Edit Story</h2>
        <form onSubmit={handleEditStory}>
          {/* Story Title - box that shows up for that */}
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required // making sure the title shows up
          />

          {/* Author's Name / Author Selection - box that shows up for that */}
          <div>
            <label htmlFor="author">Author:</label>
            {/* select changes it to a dropdown */}
            <select 
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            >
              {/* dropdown menu */}
              <option value="">Select or type new author</option>  
              {authors.map((author) => (
                // using the id as a string
                <option key={author.id} value={String(author.id)}> 
                  {author.name}
                </option>
              ))}
            </select>
            {/* input button if want to add a new author */}
            <input 
              type="text"
              placeholder="Or type new author name"
              name="newAuthor"
              value={formData.newAuthor || ""}
              onChange={handleChange}
            />
          </div>

          {/* {/* Body Text Section - Main Section of Story - big box for the story text */} 
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
          {/* Save Button Section */}
          <button type="submit">Save</button>
        </form>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        <button onClick={handleDeleteStory}>Delete</button>
      </div>
    );
  }

  // showing story details
  return (
    <div>
      {/* showing an error if there are any errors */}
      {error && <p>{error}</p>}
      {/* showing story title or no title if nothing is put down */}
      <h1>{story?.title || "No title available"}</h1>
      {/* showing author's name or unknown author if none is given */}
      <p>By: {story?.author?.name || "Unknown Author"}</p>
      {/* showing the main content/story body */}
      <p>{story?.content || "No content or story available. Check back soon."}</p>
      {/* showing Edit/Delete Buttons if the user is logged in and is an owner */}
      {user && story?.owner && user.id === story.owner.id && ( // <--- Added owner check with null safety
        <>
          <button onClick={() => setIsEditing(true)}>Edit Story</button>
          <button onClick={handleDeleteStory}>Delete Story</button>
        </>
      )}
    </div>
  );
};

export default StoryShow;
