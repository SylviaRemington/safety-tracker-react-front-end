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
import CheckInShow from "./components/CheckInShow/CheckInShow";
import CheckInEdit from "./components/CheckInEdit/CheckInEdit";
import EmergencyResources from "./components/EmergencyResources/EmergencyResources";
import AuthorsList from "./components/AuthorsList/AuthorsList";
import AuthorShow from "./components/AuthorShow/AuthorShow";
import WellnessTips from "./components/WellnessTips/WellnessTips";

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
        <Route 
          path="/check-ins/:id" 
          element={
            <ProtectedRoute>
              <CheckInShow />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/check-ins/:id/edit" 
          element={
            <ProtectedRoute>
              <CheckInEdit />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/emergency-resources" 
          element={
            <ProtectedRoute>
              <EmergencyResources />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/authors" 
          element={
            <ProtectedRoute>
              <AuthorsList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/authors/:id" 
          element={
            <ProtectedRoute>
              <AuthorShow />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/wellness-tips" 
          element={
            <ProtectedRoute>
              <WellnessTips />
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
