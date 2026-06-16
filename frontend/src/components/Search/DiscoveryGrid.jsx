import UserCard from "./UserCard";
import {UsersRound,} from "lucide-react";

function DiscoveryGrid({ filteredUsers, totalUsers, onLoadMore, hasMore }) {
  return (
    <div className="discovery-content">
      <div className="discovery-header">
        <h2><UsersRound size={20} /> Discovery</h2>

        <div className="results-count">{totalUsers} Results</div>
      </div>

      <div className="cards-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <p>No users found matching your search.</p>
        )}
      </div>

      {hasMore && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={onLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default DiscoveryGrid;
