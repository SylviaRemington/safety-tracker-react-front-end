import axios from "./axiosConfig";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/check_ins`;

const checkInsService = {
  // Get all check-ins for the logged-in user
  getAllCheckIns: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/`);
      return res.data;
    } catch (error) {
      console.error("Error fetching check-ins:", error);
      throw error;
    }
  },

  // Get a single check-in by ID
  getCheckIn: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}/`);
      return res.data;
    } catch (error) {
      console.error("Error fetching check-in:", error);
      throw error;
    }
  },

  // Create a new check-in
  createCheckIn: async (checkIn) => {
    try {
      const res = await axios.post(`${BASE_URL}/`, checkIn);
      return res.data;
    } catch (error) {
      console.error("Error creating check-in:", error);
      throw error;
    }
  },

  // Update an existing check-in
  updateCheckIn: async (id, checkIn) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}/`, checkIn);
      return res.data;
    } catch (error) {
      console.error("Error updating check-in:", error);
      throw error;
    }
  },

  // Delete a check-in
  deleteCheckIn: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${id}/`);
      return res.data;
    } catch (error) {
      console.error("Error deleting check-in:", error);
      throw error;
    }
  }
};

export default checkInsService;
