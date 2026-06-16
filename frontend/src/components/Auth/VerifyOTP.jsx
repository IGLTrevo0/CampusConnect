import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";
import logo from "../../assets/Images/ccicon.png";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  
  const email = location.state?.email || "your email address";
  const nextRoute = location.state?.next || "/search";

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }
    
    try {
      // Need to import axios for this file if not already imported
      const axios = (await import("axios")).default;
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp
      });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      if (res.data.isNewUser) {
        navigate("/complete-profile");
      } else {
        navigate("/search"); // Or dashboard
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <button className="back-home" type="button" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
          <img src={logo} alt="CampusConnect" />
          <h1>CampusConnect</h1>
        </div>
        <div className="auth-card">
          <form onSubmit={handleVerify}>
          <h1 className="login-title">Verify OTP</h1>
          <p className="login-sub-title" style={{marginBottom: "2rem", color: "#666"}}>
            Enter the code sent to {email}
          </p>
          
          {error && <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "1rem" }}>{error}</p>}
          
          <div className="inputgroup">
            <label>One Time Password</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              autoComplete="off"
            />
          </div>
          
          <button type="submit" className="loginbtn" style={{marginTop: "1rem"}}>Verify & Continue</button>

          <p className="auth-footer">
            Didn't receive code?{" "}
            <span className="auth-link" onClick={() => alert("OTP Resent successfully!")}>
              Resend OTP
            </span>
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}
