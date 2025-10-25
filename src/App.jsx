import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import StoriesList from "./components/StoriesList/StoriesList";
import StoryShow from "./components/StoryShow/StoryShow";
import StoryCreate from "./components/StoryCreate/StoryCreate";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Importing Check-Ins components 
import CheckInsList from "./components/CheckInsList/CheckInsList";
import CheckInCreate from "./components/CheckInCreate/CheckInCreate";
// import CheckInShow from "./components/CheckInShow/CheckInShow";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <StoriesList />
            </ProtectedRoute>
          } 
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route 
          path="/stories/:id" 
          element={
            <ProtectedRoute>
              <StoryShow />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/stories/create"
          element={
            <ProtectedRoute>
              <StoryCreate />
            </ProtectedRoute>
          }
        />

        {/* Check-Ins functionality routes */}
        <Route 
          path="/check-ins" 
          element={
            <ProtectedRoute>
              <CheckInsList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/check-ins/create" 
          element={
            <ProtectedRoute>
              <CheckInCreate />
            </ProtectedRoute>
          } 
        />
        {/* <Route path="/check-ins/:id" element={<CheckInShow />} /> */}

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
