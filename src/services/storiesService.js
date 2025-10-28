import axios from "./axiosConfig";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/stories`;

// get all stories (public)
const getStories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get one story by ID (public)
const getStoryById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}/`);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// update story (auth, owner only)
const updateStory = async (id, story) => {
  try {
    const storyData = {
      title: story.title,
      author: story.authorId,  // Send the author ID directly
      content: story.content,
      owner: story.ownerId,  // Add the owner field
    };
    console.log("Sending update data:", storyData); // debugging 
    console.log("Author ID type:", typeof story.authorId, "Value:", story.authorId); // debugging
    console.log("Story ID:", id); // debugging
    const res = await axios.put(`${BASE_URL}/${id}/`, storyData);
    return res.data;
  } catch (error) {
    console.error("Error updating story:", error);
    console.error("Response data:", error.response?.data); // debugging
    console.error("Response status:", error.response?.status); // debugging
    console.error("Response headers:", error.response?.headers); // debugging
    console.error("Full error response:", error.response); // debugging
    throw error;
  }
};

const deleteStory = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}/`);
  } catch (error) {
    console.error("Error deleting story:", error);
    throw error;
  }
};

// creating story (auth, adds owner)
const createStory = async (story) => {
  try {
    // sending story with author ID
    const storyData = {
      title: story.title,
      author: story.authorId, // send an author ID directly
      content: story.content,
    };
    console.log("Sending create data:", storyData); // debugging
    const res = await axios.post(`${BASE_URL}/`, storyData);
    return res.data;
  } catch (error) {
    console.error("Error creating story:", error);
    console.error("Response data:", error.response?.data); // debugging
    throw error;
  }
};

export { getStories, getStoryById, updateStory, deleteStory, createStory };


