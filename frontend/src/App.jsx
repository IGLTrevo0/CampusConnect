import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./components/LandingPage/Hero";
import Stats from "./components/LandingPage/Stats";
import Marquee from "./components/LandingPage/Marquee";
import Problems from "./components/LandingPage/Problems";
import "./Footer";
import Footer from "./Footer";
import Auth from "./Auth";
import SearchPage from "./components/Search/SearchPage";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard/Dashboard";
import VerifyOTP from "./components/Auth/VerifyOTP";
import CompleteProfile from "./components/Profile/CompleteProfile";
function LandingPage() {
  const isLoggedIn = !!localStorage.getItem("token");
  if (isLoggedIn) {
    return <Navigate to="/search" />;
  }
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
      <Route
        path="/search"
        element={
          <AppLayout>
            <SearchPage />
          </AppLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <AppLayout>
            <Profile />
          </AppLayout>
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
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route
        path="/complete-profile"
        element={
          <AppLayout>
            <CompleteProfile />
          </AppLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        }
      />
    </Routes>
  );
}
export default App;
