import { useState, useEffect } from "react";
import { getPosts, createPost, applyToPost } from "../../services/postService";
import { getStoredUser } from "../../utils/auth";
import "./PostPage.css";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function PostPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "collaboration",
    type: "teammate",
    description: "",
    skillsNeeded: "",
    hackathonName: "",
    theme: "",
    teamSize: "",
    deadline: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState({ type: "", text: "" });
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [applyingId, setApplyingId] = useState(null);
  const [applyMsg, setApplyMsg] = useState({});

  const currentUserId = getStoredUser()?.id;

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      setLoadingPosts(true);
      try {
        const data = await getPosts();
        if (!cancelled) setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoadingPosts(false);
      }
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  const refreshPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMsg({ type: "", text: "" });

    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        type: formData.type,
        description: formData.description,
        skillsNeeded: formData.skillsNeeded
          ? formData.skillsNeeded.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        deadline: formData.deadline || undefined,
      };

      if (formData.category === "hackathon") {
        payload.hackathonName = formData.hackathonName || undefined;
        payload.theme = formData.theme || undefined;
        payload.teamSize = formData.teamSize ? Number(formData.teamSize) : undefined;
      } else {
        payload.teamSize = 1;
      }

      await createPost(payload);

      setFormMsg({ type: "success", text: "Post created successfully!" });
      setFormData({
        title: "",
        category: "collaboration",
        type: "teammate",
        description: "",
        skillsNeeded: "",
        hackathonName: "",
        theme: "",
        teamSize: "",
        deadline: "",
      });
      await refreshPosts();
    } catch (error) {
      setFormMsg({
        type: "error",
        text: error.response?.data?.message || "Failed to create post.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleApply = async (postId) => {
    const message = window.prompt("Optional message to the post creator:") ?? "";
    setApplyingId(postId);
    setApplyMsg((prev) => ({ ...prev, [postId]: "" }));
    try {
      await applyToPost(postId, message);
      setApplyMsg((prev) => ({ ...prev, [postId]: "Application sent!" }));
    } catch (error) {
      setApplyMsg((prev) => ({
        ...prev,
        [postId]: error.response?.data?.message || "Failed to apply.",
      }));
    } finally {
      setApplyingId(null);
    }
  };

  const canApply = (post) => {
    if (post.status !== "open") return false;
    const creatorId = post.creator?._id || post.creator;
    return creatorId && String(creatorId) !== String(currentUserId);
  };

  return (
    <div className="postpage">
      <header className="postpage-header">
        <h1>
          Campus <span className="postpage-header-accent">Posts</span>
        </h1>
        <p>Create collaboration posts or find hackathon teammates.</p>
      </header>

      <section className="postpage-form-section">
        <h2 className="postpage-section-title">Create a Post</h2>
        <form className="postpage-form" onSubmit={handleSubmit}>
          <div className="postpage-form-grid">
            <div className="postpage-form-group full-width">
              <label htmlFor="post-title">Title</label>
              <input
                id="post-title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="postpage-form-group">
              <label htmlFor="post-category">Post Type</label>
              <select
                id="post-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="collaboration">General</option>
                <option value="hackathon">Hackathon</option>
              </select>
            </div>

            <div className="postpage-form-group">
              <label htmlFor="post-type">Looking For</label>
              <select
                id="post-type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="teammate">Teammate</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="researcher">Researcher</option>
              </select>
            </div>

            <div className="postpage-form-group full-width">
              <label htmlFor="post-description">Description</label>
              <textarea
                id="post-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project or what you're looking for"
                required
              />
            </div>

            <div className="postpage-form-group">
              <label htmlFor="post-skills">Skills Needed (comma separated)</label>
              <input
                id="post-skills"
                type="text"
                name="skillsNeeded"
                value={formData.skillsNeeded}
                onChange={handleChange}
                placeholder="React, Node.js, Python"
              />
            </div>

            <div className="postpage-form-group">
              <label htmlFor="post-deadline">Deadline</label>
              <input
                id="post-deadline"
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>

            {formData.category === "hackathon" && (
              <>
                <div className="postpage-form-group">
                  <label htmlFor="post-hackathonName">Hackathon Name</label>
                  <input
                    id="post-hackathonName"
                    type="text"
                    name="hackathonName"
                    value={formData.hackathonName}
                    onChange={handleChange}
                    placeholder="e.g. SIH 2026"
                  />
                </div>

                <div className="postpage-form-group">
                  <label htmlFor="post-theme">Theme</label>
                  <input
                    id="post-theme"
                    type="text"
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    placeholder="e.g. FinTech, Healthcare"
                  />
                </div>

                <div className="postpage-form-group">
                  <label htmlFor="post-teamSize">Team Size (2-4)</label>
                  <input
                    id="post-teamSize"
                    type="number"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    min="2"
                    max="4"
                    placeholder="2-4"
                    required
                  />
                </div>
              </>
            )}
          </div>

          <button type="submit" className="postpage-submit-btn" disabled={submitting}>
            {submitting ? "Creating..." : "Create Post"}
          </button>

          {formMsg.text && (
            <div
              className={
                formMsg.type === "success"
                  ? "postpage-msg-success"
                  : "postpage-msg-error"
              }
            >
              {formMsg.text}
            </div>
          )}
        </form>
      </section>

      <section>
        <h2 className="postpage-section-title">All Posts</h2>

        {loadingPosts ? (
          <div className="postpage-loading">
            <div className="postpage-spinner" />
            <p>Loading...</p>
          </div>
        ) : posts.length === 0 ? (
          <p className="postpage-empty">No posts found yet. Be the first to create one!</p>
        ) : (
          <div className="postpage-cards">
            {posts.map((post) => (
              <div key={post._id} className="postpage-card">
                <h3 className="postpage-card-title">{post.title}</h3>
                <div className="postpage-card-meta">
                  <span
                    className={`postpage-tag ${
                      post.category === "hackathon"
                        ? "postpage-tag-hackathon"
                        : "postpage-tag-collaboration"
                    }`}
                  >
                    {post.category === "hackathon" ? "Hackathon" : "General"}
                  </span>
                  <span className="postpage-tag">{post.type}</span>
                  <span
                    className={`postpage-status-badge ${
                      post.status === "open"
                        ? "postpage-status-open"
                        : post.status === "filled"
                          ? "postpage-status-filled"
                          : "postpage-status-closed"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="postpage-card-desc">{post.description}</p>
                <p className="postpage-card-detail">
                  <strong>Creator:</strong> {post.creator?.name || "Unknown"}
                </p>
                {post.creator?.branch && (
                  <p className="postpage-card-detail">
                    <strong>Branch:</strong> {post.creator.branch}
                    {post.creator.year ? ` · Year ${post.creator.year}` : ""}
                  </p>
                )}
                <p className="postpage-card-detail">
                  <strong>Team Size:</strong> {post.teamSize || "—"}
                </p>
                {post.category === "hackathon" && post.hackathonName && (
                  <p className="postpage-card-detail">
                    <strong>Hackathon:</strong> {post.hackathonName}
                  </p>
                )}
                {post.category === "hackathon" && post.theme && (
                  <p className="postpage-card-detail">
                    <strong>Theme:</strong> {post.theme}
                  </p>
                )}
                {post.deadline && (
                  <p className="postpage-card-detail">
                    <strong>Deadline:</strong> {formatDate(post.deadline)}
                  </p>
                )}
                <p className="postpage-card-detail">
                  <strong>Posted:</strong> {formatDate(post.createdAt)}
                </p>
                {post.skillsNeeded?.length > 0 && (
                  <div className="postpage-card-footer">
                    <div className="postpage-skill-tags">
                      {post.skillsNeeded.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                {canApply(post) && (
                  <div className="postpage-card-footer">
                    <button
                      type="button"
                      className="postpage-submit-btn"
                      disabled={applyingId === post._id}
                      onClick={() => handleApply(post._id)}
                    >
                      {applyingId === post._id ? "Applying..." : "Apply"}
                    </button>
                    {applyMsg[post._id] && (
                      <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                        {applyMsg[post._id]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default PostPage;
