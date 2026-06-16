import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Dashboard.css";
import { ClipboardList, Handshake, FileText,} from "lucide-react";

const API_BASE = "http://localhost:5000/api";

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

function getUserName() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) return user.name;
  } catch {
    /* ignore */
  }
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.name || payload.username || "User";
    }
  } catch {
    /* ignore */
  }
  return "User";
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPostType(item) {
  if (item.postType) return item.postType;
  if (item.type === "Mentor Request") return "Mentor Request";
  const category = item.category || item.post?.category;
  if (category === "hackathon") return "Hackathon Team";
  if (category === "collaboration") return "Project Collab";
  const type = item.type || item.post?.type;
  if (type === "teammate") return "Hackathon Team";
  return "Project Collab";
}

function normalizeStatus(status) {
  if (!status) return "PENDING";
  const upper = status.toUpperCase();
  if (upper === "ACCEPTED" || upper === "APPROVED") return "APPROVED";
  if (upper === "REJECTED") return "REJECTED";
  return "PENDING";
}

function StatusBadge({ status }) {
  const normalized = normalizeStatus(status);
  const classMap = {
    PENDING: "dashboard-badge dashboard-badge-pending",
    APPROVED: "dashboard-badge dashboard-badge-approved",
    REJECTED: "dashboard-badge dashboard-badge-rejected",
  };
  const isAccepted = status?.toLowerCase() === "accepted";
  const labels = {
    PENDING: "Pending",
    APPROVED: isAccepted ? "Accepted" : "Approved",
    REJECTED: "Rejected",
  };
  return (
    <span className={classMap[normalized]}>{labels[normalized]}</span>
  );
}

function LoadingSpinner() {
  return (
    <div className="dashboard-loading">
      <div className="dashboard-spinner" />
      <p>Loading...</p>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [mentorRequests, setMentorRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [applicantsMap, setApplicantsMap] = useState({});
  const [expandedPosts, setExpandedPosts] = useState({});
  const [loading, setLoading] = useState({
    applications: true,
    mentorRequests: true,
    receivedRequests: true,
    myPosts: true,
  });
  const [errors, setErrors] = useState({
    applications: "",
    mentorRequests: "",
    receivedRequests: "",
    myPosts: "",
  });
  const [actionLoading, setActionLoading] = useState(null);
  const userName = getUserName();

  const fetchApplications = useCallback(async () => {
    setLoading((prev) => ({ ...prev, applications: true }));
    setErrors((prev) => ({ ...prev, applications: "" }));
    try {
      const response = await axios.get(`${API_BASE}/posts/my-applications`, {
        headers: getAuthHeaders(),
      });
      setApplications(response.data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        applications:
          error.response?.data?.message || "Failed to load applications.",
      }));
      setApplications([]);
    } finally {
      setLoading((prev) => ({ ...prev, applications: false }));
    }
  }, []);

  const fetchMentorRequests = useCallback(async () => {
    setLoading((prev) => ({ ...prev, mentorRequests: true }));
    setErrors((prev) => ({ ...prev, mentorRequests: "" }));
    try {
      const response = await axios.get(`${API_BASE}/connections/my-requests`, {
        headers: getAuthHeaders(),
      });
      setMentorRequests(response.data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        mentorRequests:
          error.response?.data?.message || "Failed to load mentor requests.",
      }));
      setMentorRequests([]);
    } finally {
      setLoading((prev) => ({ ...prev, mentorRequests: false }));
    }
  }, []);

  const fetchReceivedRequests = useCallback(async () => {
    setLoading((prev) => ({ ...prev, receivedRequests: true }));
    setErrors((prev) => ({ ...prev, receivedRequests: "" }));
    try {
      const response = await axios.get(
        `${API_BASE}/connections/received-requests`,
        { headers: getAuthHeaders() },
      );
      setReceivedRequests(response.data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        receivedRequests:
          error.response?.data?.message || "Failed to load received requests.",
      }));
      setReceivedRequests([]);
    } finally {
      setLoading((prev) => ({ ...prev, receivedRequests: false }));
    }
  }, []);

  const fetchMyPosts = useCallback(async () => {
    setLoading((prev) => ({ ...prev, myPosts: true }));
    setErrors((prev) => ({ ...prev, myPosts: "" }));
    try {
      const response = await axios.get(`${API_BASE}/posts/my-posts`, {
        headers: getAuthHeaders(),
      });
      setMyPosts(response.data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        myPosts: error.response?.data?.message || "Failed to load your posts.",
      }));
      setMyPosts([]);
    } finally {
      setLoading((prev) => ({ ...prev, myPosts: false }));
    }
  }, []);

  useEffect(() => {
    fetchApplications();
    fetchMentorRequests();
    fetchReceivedRequests();
    fetchMyPosts();
  }, [fetchApplications, fetchMentorRequests, fetchReceivedRequests, fetchMyPosts]);

  const fetchApplicants = async (postId) => {
    try {
      const response = await axios.get(
        `${API_BASE}/posts/${postId}/applicants`,
        { headers: getAuthHeaders() },
      );
      setApplicantsMap((prev) => ({ ...prev, [postId]: response.data }));
    } catch (error) {
      setApplicantsMap((prev) => ({
        ...prev,
        [postId]: { error: error.response?.data?.message || "Failed to load applicants." },
      }));
    }
  };

  const togglePostExpand = (postId) => {
    const isExpanded = expandedPosts[postId];
    setExpandedPosts((prev) => ({ ...prev, [postId]: !isExpanded }));
    if (!isExpanded && !applicantsMap[postId]) {
      fetchApplicants(postId);
    }
  };

  const handleApplicantStatus = async (postId, userId, status) => {
    setActionLoading(`${postId}-${userId}`);
    try {
      await axios.put(
        `${API_BASE}/posts/${postId}/applicants/${userId}/status`,
        { status },
        { headers: getAuthHeaders() },
      );
      await fetchApplicants(postId);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update applicant status.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleConnectionStatus = async (connectionId, status) => {
    setActionLoading(`conn-${connectionId}`);
    try {
      await axios.put(
        `${API_BASE}/connections/${connectionId}/status`,
        { status },
        { headers: getAuthHeaders() },
      );
      setReceivedRequests((prev) =>
        prev.map((req) =>
          (req._id || req.id) === connectionId ? { ...req, status } : req,
        ),
      );
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to update request status.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  const getApplicationTitle = (app) =>
    app.title || app.post?.title || "Untitled Post";

  const getApplicationCreator = (app) =>
    app.creatorName ||
    app.creator?.name ||
    app.post?.creator?.name ||
    "Unknown";

  const getApplicationDate = (app) =>
    formatDate(app.appliedAt || app.createdAt || app.appliedDate);

  const getMentor = (req) => req.mentor || req.receiver || req.user || req;

  const getSender = (req) => req.sender || req.user || req;

  const getApplicantUser = (applicant) =>
    applicant.user || applicant.applicant || applicant;

  const getApplicantStatus = (applicant) =>
    applicant.status || "pending";

  const getApplicantId = (applicant) => {
    const user = getApplicantUser(applicant);
    return user._id || user.id || applicant.userId || applicant._id;
  };

  const tabs = [
    { id: "applications", label: "My Applications", icon: <ClipboardList size={20} /> },
    { id: "mentorRequests", label: "Mentor Requests", icon: <Handshake size={20} /> },
    { id: "myPosts", label: "My Posts", icon: <FileText size={20} /> },
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>
          Welcome back, <span className="dashboard-name">{userName}</span>!
        </h1>
        <p>Track your applications, mentor requests, and manage applicants.</p>
      </header>

      <nav className="dashboard-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`dashboard-tab ${activeTab === tab.id ? "dashboard-tab-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="dashboard-tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="dashboard-sections">
        {activeTab === "applications" && (
          <section className="dashboard-section">
            <h2 className="dashboard-section-title">
              <span><ClipboardList size={20} /></span> My Applications
            </h2>
            {loading.applications ? (
              <LoadingSpinner />
            ) : errors.applications ? (
              <p className="dashboard-error">{errors.applications}</p>
            ) : applications.length === 0 ? (
              <p className="dashboard-empty">No applications yet</p>
            ) : (
              <div className="dashboard-cards">
                {applications.map((app, index) => (
                  <div
                    key={app._id || app.id || index}
                    className="dashboard-card"
                  >
                    <h3 className="dashboard-card-title">
                      {getApplicationTitle(app)}
                    </h3>
                    <p className="dashboard-card-meta">
                      <span className="dashboard-type-tag">
                        {formatPostType(app.post || app)}
                      </span>
                    </p>
                    <p className="dashboard-card-detail">
                      <strong>Creator:</strong> {getApplicationCreator(app)}
                    </p>
                    <p className="dashboard-card-detail">
                      <strong>Applied:</strong> {getApplicationDate(app)}
                    </p>
                    <div className="dashboard-card-footer">
                      <StatusBadge status={app.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "mentorRequests" && (
          <section className="dashboard-section">
            <h2 className="dashboard-section-title">
              <span><ClipboardList size={20} /></span> My Mentor Requests
            </h2>
            {loading.mentorRequests ? (
              <LoadingSpinner />
            ) : errors.mentorRequests ? (
              <p className="dashboard-error">{errors.mentorRequests}</p>
            ) : mentorRequests.length === 0 ? (
              <p className="dashboard-empty">No mentor requests sent</p>
            ) : (
              <div className="dashboard-cards">
                {mentorRequests.map((req, index) => {
                  const mentor = getMentor(req);
                  const mentorName = mentor.name || "Unknown Mentor";
                  const mentorSkills =
                    mentor.domain ||
                    mentor.skills?.slice(0, 3).join(", ") ||
                    "—";
                  return (
                    <div
                      key={req._id || req.id || index}
                      className="dashboard-card"
                    >
                      <div className="dashboard-mentor-row">
                        {mentor.profilePicture ? (
                          <img
                            src={mentor.profilePicture}
                            alt={mentorName}
                            className="dashboard-avatar dashboard-avatar-img"
                          />
                        ) : (
                          <div className="dashboard-avatar">
                            {getInitials(mentorName)}
                          </div>
                        )}
                        <div>
                          <h3 className="dashboard-card-title">{mentorName}</h3>
                          <p className="dashboard-card-detail">
                            {mentorSkills}
                          </p>
                        </div>
                      </div>
                      <p className="dashboard-card-detail">
                        <strong>Sent:</strong>{" "}
                        {formatDate(req.createdAt || req.sentAt)}
                      </p>
                      <div className="dashboard-card-footer">
                        <StatusBadge status={req.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <h3 className="dashboard-subsection-title">Requests I Received</h3>
            {loading.receivedRequests ? (
              <LoadingSpinner />
            ) : errors.receivedRequests ? (
              <p className="dashboard-error">{errors.receivedRequests}</p>
            ) : receivedRequests.length === 0 ? (
              <p className="dashboard-empty">No incoming requests</p>
            ) : (
              <div className="dashboard-cards">
                {receivedRequests.map((req, index) => {
                  const sender = getSender(req);
                  const senderName = sender.name || "Unknown";
                  const connectionId = req._id || req.id;
                  const status = req.status || "pending";
                  const isPending = normalizeStatus(status) === "PENDING";

                  return (
                    <div
                      key={connectionId || index}
                      className="dashboard-card"
                    >
                      <div className="dashboard-mentor-row">
                        {sender.profilePicture ? (
                          <img
                            src={sender.profilePicture}
                            alt={senderName}
                            className="dashboard-avatar dashboard-avatar-img"
                          />
                        ) : (
                          <div className="dashboard-avatar">
                            {getInitials(senderName)}
                          </div>
                        )}
                        <div>
                          <h3 className="dashboard-card-title">{senderName}</h3>
                          <div className="dashboard-skill-tags">
                            {(sender.skills || []).map((skill) => (
                              <span key={skill}>{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="dashboard-card-detail">
                        <strong>Sent:</strong>{" "}
                        {formatDate(req.createdAt || req.sentAt)}
                      </p>
                      <div className="dashboard-card-footer">
                        {isPending ? (
                          <div className="dashboard-applicant-actions">
                            <button
                              type="button"
                              className="dashboard-btn-approve"
                              disabled={
                                actionLoading === `conn-${connectionId}`
                              }
                              onClick={() =>
                                handleConnectionStatus(
                                  connectionId,
                                  "accepted",
                                )
                              }
                            >
                              ACCEPT
                            </button>
                            <button
                              type="button"
                              className="dashboard-btn-reject"
                              disabled={
                                actionLoading === `conn-${connectionId}`
                              }
                              onClick={() =>
                                handleConnectionStatus(
                                  connectionId,
                                  "rejected",
                                )
                              }
                            >
                              REJECT
                            </button>
                          </div>
                        ) : (
                          <StatusBadge status={status} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {activeTab === "myPosts" && (
          <section className="dashboard-section">
            <h2 className="dashboard-section-title">
              <span><FileText size={20} /></span> My Posts
            </h2>
            {loading.myPosts ? (
              <LoadingSpinner />
            ) : errors.myPosts ? (
              <p className="dashboard-error">{errors.myPosts}</p>
            ) : myPosts.length === 0 ? (
              <p className="dashboard-empty">No posts created</p>
            ) : (
              <div className="dashboard-posts-list">
                {myPosts.map((post, index) => {
                  const postId = post._id || post.id;
                  const isExpanded = expandedPosts[postId];
                  const applicants = applicantsMap[postId];
                  const applicantCount =
                    post.applicantCount ??
                    post.totalApplicants ??
                    (Array.isArray(applicants) ? applicants.length : null);

                  return (
                    <div key={postId || index} className="dashboard-post-card">
                      <div className="dashboard-post-header">
                        <div>
                          <h3 className="dashboard-card-title">{post.title}</h3>
                          <p className="dashboard-card-meta">
                            <span className="dashboard-type-tag">
                              {formatPostType(post)}
                            </span>
                            <span className="dashboard-post-date">
                              Created {formatDate(post.createdAt)}
                            </span>
                          </p>
                        </div>
                        <div className="dashboard-applicant-count">
                          {applicantCount ?? "—"} applicant
                          {applicantCount !== 1 ? "s" : ""}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="dashboard-expand-btn"
                        onClick={() => togglePostExpand(postId)}
                      >
                        {isExpanded ? "Hide Applicants ▲" : "View Applicants ▼"}
                      </button>

                      {isExpanded && (
                        <div className="dashboard-applicants">
                          {applicants?.error ? (
                            <p className="dashboard-error">{applicants.error}</p>
                          ) : !applicants ? (
                            <LoadingSpinner />
                          ) : applicants.length === 0 ? (
                            <p className="dashboard-empty">
                              No applicants yet
                            </p>
                          ) : (
                            applicants.map((applicant, appIndex) => {
                              const user = getApplicantUser(applicant);
                              const userId = getApplicantId(applicant);
                              const status = getApplicantStatus(applicant);
                              const normalized = normalizeStatus(status);
                              const isPending = normalized === "PENDING";

                              return (
                                <div
                                  key={userId || appIndex}
                                  className="dashboard-applicant-row"
                                >
                                  <div className="dashboard-applicant-info">
                                    {user.profilePicture ? (
                                      <img
                                        src={user.profilePicture}
                                        alt={user.name}
                                        className="dashboard-avatar dashboard-avatar-sm dashboard-avatar-img"
                                      />
                                    ) : (
                                      <div className="dashboard-avatar dashboard-avatar-sm">
                                        {getInitials(user.name)}
                                      </div>
                                    )}
                                    <div>
                                      <p className="dashboard-applicant-name">
                                        {user.name || "Unknown"}
                                      </p>
                                      <div className="dashboard-skill-tags">
                                        {(user.skills || []).map((skill) => (
                                          <span key={skill}>{skill}</span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="dashboard-applicant-actions">
                                    {isPending ? (
                                      <>
                                        <button
                                          type="button"
                                          className="dashboard-btn-approve"
                                          disabled={
                                            actionLoading ===
                                            `${postId}-${userId}`
                                          }
                                          onClick={() =>
                                            handleApplicantStatus(
                                              postId,
                                              userId,
                                              "approved",
                                            )
                                          }
                                        >
                                          Approve
                                        </button>
                                        <button
                                          type="button"
                                          className="dashboard-btn-reject"
                                          disabled={
                                            actionLoading ===
                                            `${postId}-${userId}`
                                          }
                                          onClick={() =>
                                            handleApplicantStatus(
                                              postId,
                                              userId,
                                              "rejected",
                                            )
                                          }
                                        >
                                          Reject
                                        </button>
                                      </>
                                    ) : (
                                      <StatusBadge status={status} />
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
