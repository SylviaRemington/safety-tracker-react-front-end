import axios from "axios";
import { BASE_URL } from "./axiosConfig";

const checkInsService = {
  // Get all check-ins for the logged-in user
  getAllCheckIns: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/check_ins/`);
      return res.data;
    } catch (error) {
      console.error("Error fetching check-ins:", error);
      throw error;
    }
  },

  // Get a single check-in by ID
  getCheckIn: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/check_ins/${id}/`);
      return res.data;
    } catch (error) {
      console.error("Error fetching check-in:", error);
      throw error;
    }
  },

  // Create a new check-in
  createCheckIn: async (checkIn) => {
    try {
      const res = await axios.post(`${BASE_URL}/check_ins/`, checkIn);
      return res.data;
    } catch (error) {
      console.error("Error creating check-in:", error);
      throw error;
    }
  },

  // Update an existing check-in
  updateCheckIn: async (id, checkIn) => {
    try {
      const res = await axios.put(`${BASE_URL}/check_ins/${id}/`, checkIn);
      return res.data;
    } catch (error) {
      console.error("Error updating check-in:", error);
      throw error;
    }
  },

  // Delete a check-in
  deleteCheckIn: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/check_ins/${id}/`);
      return res.data;
    } catch (error) {
      console.error("Error deleting check-in:", error);
      throw error;
    }
  }
};

export default checkInsService;
