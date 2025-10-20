import { getBooks } from "../../services/booksService";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  console.log(`Books`, books);

  return (
    <main>
      <h1>Welcome to The Dusty Shelf</h1>
      <p>Feel free to explore our library...</p>
      <ul>
        {books.map((book, index) => (
          <li key={book.id}>
            <Link to={`books/${book.id}`}>
              <p>
                {index + 1}. {book.title}
              </p>
              <p>Genre: {book.genre}</p>
              <p>Released: {book.year}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default BooksList;
