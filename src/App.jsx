import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import StoriesList from "./components/StoriesList/StoriesList";
import StoryShow from "./components/StoryShow/StoryShow";
import StoryCreate from "./components/StoryCreate/StoryCreate";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<StoriesList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/stories/:id" element={<StoryShow />} />
        <Route
          path="/stories/create"
          element={
            <ProtectedRoute>
              <StoryCreate />
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
