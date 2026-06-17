import React from 'react';

export default function ProjectCard({ title, description, image, tags, badge }) {
  return (
    <div className="profile-project-card" style={{ position: 'relative' }}>
      <img src={image || "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500"} alt={title} />
      
      {badge && (
        <span 
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#f4c542',
            border: '2px solid #111',
            padding: '2px 8px',
            fontSize: '11px',
            fontWeight: '800',
            borderRadius: '4px',
            color: '#111'
          }}
        >
          {badge}
        </span>
      )}

      <div className="profile-project-body">
        <h3>{title}</h3>
        <p>{description}</p>
        
        <div className="profile-tags">
          {tags && tags.length > 0 ? (
            tags.map((tag, index) => <span key={index}>{tag}</span>)
          ) : (
            <span>Code</span>
          )}
        </div>
      </div>
    </div>
  );
}