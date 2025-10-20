import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams, useNavigate } from "react-router";
import {
  getBookById,
  updateBook,
  deleteBook,
} from "../../services/booksService";
import { getAuthors } from "../../services/authorsService";

const BookShow = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsData, bookData] = await Promise.all([
          getAuthors(),
          getBookById(id),
        ]);
        // const bookData = await getBookById(id);
        setAuthors(authorsData);
        setBook(bookData);
        setFormData({
          title: bookData.title,
          author: bookData.author.id,
          genre: bookData.genre,
          year: bookData.year,
        });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [id, isEditing]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleEditBook = async (event) => {
    event.preventDefault();
    try {
      await updateBook(id, formData);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteBook = async (event) => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  if (isEditing) {
    return (
      <div>
        <h2>Edit Book</h2>
        <form onSubmit={handleEditBook}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
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
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="year">Year:</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        <button onClick={handleDeleteBook}>Delete</button>
      </div>
    );
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>{book?.title}</h1>
      <p>{book?.author.name}</p>
      <p>{book?.genre}</p>
      <p>{book?.year}</p>
      {user && <button onClick={() => setIsEditing(true)}>Edit Book</button>}
    </div>
  );
};

export default BookShow;
