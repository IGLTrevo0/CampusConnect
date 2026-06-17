import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import "./Auth.css";
import logo from "../../assets/Images/ccicon.png";
import { verifyOTP, resendOTP } from "../../services/authService";
import { setAuthSession } from "../../utils/auth";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  const email = location.state?.email;
  const nextRoute = location.state?.next || "/search";

  if (!email) {
    return <Navigate to="/auth" replace />;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }

    try {
      const data = await verifyOTP({ email, otp });
      setAuthSession({ token: data.token, user: data.user });

      if (data.isNewUser) {
        navigate("/complete-profile");
      } else {
        navigate(nextRoute);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    try {
      await resendOTP(email);
      alert("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
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
            <p className="login-sub-title" style={{ marginBottom: "2rem", color: "#666" }}>
              Enter the code sent to {email}
            </p>

            {error && (
              <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "1rem" }}>
                {error}
              </p>
            )}

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

            <button type="submit" className="loginbtn" style={{ marginTop: "1rem" }}>
              Verify & Continue
            </button>

            <p className="auth-footer">
              Didn&apos;t receive code?{" "}
              <span
                className="auth-link"
                onClick={resending ? undefined : handleResend}
                style={{ opacity: resending ? 0.6 : 1 }}
              >
                {resending ? "Resending..." : "Resend OTP"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
