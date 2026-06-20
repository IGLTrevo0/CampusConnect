import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./components/LandingPage/Hero";
import Stats from "./components/LandingPage/Stats";
import Marquee from "./components/LandingPage/Marquee";
import Problems from "./components/LandingPage/Problems";
import Footer from "./Footer";
import Auth from "./Auth";
import SearchPage from "./components/Search/SearchPage";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard&Post/Dashboard";
import VerifyOTP from "./components/Auth/VerifyOTP";
import CompleteProfile from "./components/Profile/CompleteProfile";
import PostPage from "./components/Dashboard&Post/PostPage";
import { isAuthenticated } from "./utils/auth";
import MeetTheTeam from "./Meet_the_team";

function ProtectedRoute({ children }) {
  console.log("TOKEN:", localStorage.getItem("token"));
  console.log("AUTH:", isAuthenticated());
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="content">
        <Hero />
        <hr className="section-divider" />
        <Stats />
        <Marquee />
        <Problems />
      </main>
      <Footer />
    </>
  );
}

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/auth" element={<Auth />} />

      <Route path="/verify-otp" element={<VerifyOTP />} />

      <Route
        path="/complete-profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <CompleteProfile />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <AppLayout>
              <SearchPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <AppLayout>
              <PostPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/:id"
        element={
          <AppLayout>
            <Profile />
          </AppLayout>
        }
      />
      <Route
        path="/team"
        element={
            <AppLayout>
              <MeetTheTeam />
            </AppLayout>
          
        }
      />
    </Routes>
  );
}

export default App;
