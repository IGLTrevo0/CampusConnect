import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { manualLogin, googleSignIn } from "../../services/authService";
import { setAuthSession } from "../../utils/auth";

function LoginForm({ setIsLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuthSuccess = (data) => {
    setAuthSession({ token: data.token, user: data.user });
    if (data.isNewUser) {
      navigate("/complete-profile");
    } else {
      navigate("/search");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await manualLogin(formData);
      handleAuthSuccess(data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await googleSignIn(credentialResponse.credential);
      handleAuthSuccess(data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Google Login Failed");
    }
  };

  return (
    <div>
      <h1 className="login-title">Sign In</h1>
      <p className="login-sub-title">Welcome back, Builder</p>

      <form onSubmit={handleSubmit}>
        <div className="inputgroup">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your VIT email"
            required
          />
        </div>
        <div className="inputgroup">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="loginbtn">
          Sign In
        </button>
      </form>

      <div className="auth-divider">
        <hr />
        <span>OR</span>
        <hr />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            alert("Google Login Failed");
          }}
        />
      </div>

      <p className="auth-footer" style={{ marginTop: "2rem" }}>
        New here?{" "}
        <span onClick={() => setIsLogin(false)} className="auth-link">
          Create an Account
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
