import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import "./Auth.css";
import logo from "../../assets/Images/ccicon.png";
import { useNavigate } from "react-router-dom";

function AuthCard({ isLogin, setIsLogin }) {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="auth-header">
        <button className="back-home" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <img src={logo} alt="CampusConnect" />
        <h1>CampusConnect</h1>
      </div>
      <div className="auth-card">
        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <SignUpForm setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
}
export default AuthCard;
