import { useState } from "react";
import { register } from "../../services/authService";

function SignUpForm({ setIsLogin }) {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    year: "",
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
      const data = await register(formData);

      console.log("Registered:", data);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error.response?.data);
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="signup-title">Create Account</h1>
      <p className="signup-sub-title">Show what you build. Find your people</p>
      <div className="inputgroup">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
      </div>
      <div className="input-row">
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
            placeholder="min 6 char"
          />
        </div>
      </div>
      <div className="inputgroup">
        <label>Department</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          placeholder="e.g. Computer Science"
        />
      </div>
      <div className="inputgroup">
        <label>Graduation Year</label>
        <select name="year" value={formData.year} onChange={handleChange}>
          <option value="">Graduation Year</option>
          {[...Array(11)].map((_, i) => (
            <option key={currentYear - 5 + i} value={currentYear - 5 + i}>
              {currentYear - 5 + i}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="signupbtn">Create Account</button>

      <p className="auth-footer">
        Already got an account?{" "}
        <span onClick={() => setIsLogin(true)} className="auth-link">
          Sign In
        </span>
      </p>
    </form>
  );
}
export default SignUpForm;
