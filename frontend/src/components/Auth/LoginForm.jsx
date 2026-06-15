import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function LoginForm({ setIsLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);

      console.log("Logged in:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/search")
    } catch (error) {
      console.log(error.response?.data);
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="login-title">Sign In</h1>
      <p className="login-sub-title">Welcome back, Builder</p>
      <div className="inputgroup">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@vitstudent.ac.in"
        />
      </div>
      <div className="inputgroup">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <button type="submit" className="loginbtn">Login</button>

      <p className="auth-footer">
        New here?{" "}
        <span onClick={() => setIsLogin(false)} className="auth-link">
          Create an Account
        </span>
      </p>
    </form>
  );
}
export default LoginForm;
