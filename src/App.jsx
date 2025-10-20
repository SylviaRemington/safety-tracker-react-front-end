import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import BooksList from "./components/BooksList/BooksList";
import BookShow from "./components/BookShow/BookShow";
import BookCreate from "./components/BookCreate/BookCreate";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/books/:id" element={<BookShow />} />
        <Route
          path="/books/create"
          element={
            <ProtectedRoute>
              <BookCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <main>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </main>
          }
        />
      </Routes>
    </>
  );
};

export default App;
