import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";

function SignUpForm({ setIsLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "student" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/manual-signup", formData);
      if (res.data.email) {
        navigate("/verify-otp", { state: { email: res.data.email } });
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        credential: credentialResponse.credential,
        role: formData.role
      });
      if (res.data.email) {
        navigate("/verify-otp", { state: { email: res.data.email } });
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Google Sign Up failed");
    }
  };

  return (
    <div>
      <h1 className="signup-title">Create Account</h1>
      <p className="signup-sub-title">Show what you build. Find your people</p>
      
      <form onSubmit={handleSubmit}>
        <div className="inputgroup">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
        </div>
        <div className="inputgroup">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your VIT email" required />
        </div>
        <div className="inputgroup">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required />
        </div>
        <div className="inputgroup">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange} style={{padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd", fontFamily: "inherit"}}>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>
        <button type="submit" className="loginbtn" style={{marginTop: "1rem"}}>Sign Up</button>
      </form>

      <div style={{ display: "flex", alignItems: "center", margin: "2rem 0" }}>
        <hr style={{ flex: 1, borderColor: "#eee", margin: 0 }} />
        <span style={{ margin: "0 10px", color: "#888", fontSize: "0.9rem" }}>OR</span>
        <hr style={{ flex: 1, borderColor: "#eee", margin: 0 }} />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.log('Signup Failed');
            alert('Google Signup Failed');
          }}
          text="signup_with"
        />
      </div>

      <p className="auth-footer" style={{marginTop: "2rem"}}>
        Already got an account?{" "}
        <span onClick={() => setIsLogin(true)} className="auth-link">
          Sign In
        </span>
      </p>
    </div>
  );
}
export default SignUpForm;
