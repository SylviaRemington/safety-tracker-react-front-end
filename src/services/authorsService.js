import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/authors`;

const getAuthors = async () => {
  try {
    const res = await axios.get(BASE_URL);
    const data = await res.data;
    return data;
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

export { getAuthors };
