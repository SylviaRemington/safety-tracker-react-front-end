import axios from "./axiosConfig";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/stories`;

// Get all stories (public)
const getStories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get one story by ID (public)
const getStoryById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}/`);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// Update story (auth, owner only)
const updateStory = async (id, story) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}/`, story);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteStory = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}/`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Create story (auth, adds owner)
const createStory = async (story) => {
  try {
    const res = await axios.post(`${BASE_URL}/`, story);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getStories, getStoryById, updateStory, deleteStory, createStory };

