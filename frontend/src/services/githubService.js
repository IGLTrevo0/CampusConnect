// src/services/githubService.js

/**
 * Fetches public repositories for a given GitHub username.
 * Uses native fetch to bypass global application axios interceptors.
 */
export async function getGithubRepos(username) {
  if (!username || username.trim() === "") {
    return [];
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    
    // If the profile doesn't exist or hits an API rate limit, fail gracefully without kicking the user out
    if (!response.ok) {
      console.warn(`GitHub API Warning: Responded with status ${response.status}`);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("GitHub API Connection Error:", err);
    return []; // Return empty array so the UI renders without crashing
  }
}