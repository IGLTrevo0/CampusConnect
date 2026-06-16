import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CompleteProfile.css";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bio: "",
    github: "",
    linkedin: "",
    portfolio: "",
    skills: "",
    interests: "",
    achievements: "",
    mentorAvailability: "open",
    year: "",
    branch: ""
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      const payload = {
        ...formData,
        skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : [],
        interests: formData.interests ? formData.interests.split(",").map(s => s.trim()) : [],
        achievements: formData.achievements ? formData.achievements.split(",").map(s => s.trim()) : []
      };

      await axios.put("http://localhost:5000/api/users/profile", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Profile update failed", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complete-profile-container">
      <div className="complete-profile-card">
        <h1>Complete Your Profile</h1>
        <p>Tell us more about yourself to get the most out of CampusConnect.</p>
        
        <form onSubmit={handleSubmit} className="complete-profile-form">
          <div className="form-group">
            <label>Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="A short bio about yourself..." />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Branch</label>
              <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. Computer Science" />
            </div>
            <div className="form-group">
              <label>Graduation Year</label>
              <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 2026" />
            </div>
          </div>

          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node, Python" />
          </div>

          <div className="form-group">
            <label>Interests (comma separated)</label>
            <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="AI, Web Dev, Design" />
          </div>
          
          <div className="form-group">
            <label>Achievements (comma separated)</label>
            <input type="text" name="achievements" value={formData.achievements} onChange={handleChange} placeholder="Hackathon Winner, Published Paper" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>GitHub Link</label>
              <input type="url" name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/..." />
            </div>
            <div className="form-group">
              <label>LinkedIn Link</label>
              <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
          
          <div className="form-group">
            <label>Portfolio Link (Optional)</label>
            <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://yourwebsite.com" />
          </div>
          
          <div className="form-group">
            <label>Mentor Availability</label>
            <select name="mentorAvailability" value={formData.mentorAvailability} onChange={handleChange}>
              <option value="open">Open</option>
              <option value="limited">Limited</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
