// ProfilePage.js

import React, { useState } from 'react';
import './style.css'; // Assuming style.css is in the same folder or adjust the path as necessary

function ProfilePage() {
  // State for the RSVP and following functionality
  const [attendees, setAttendees] = useState(3);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasJoinedCommunity, setHasJoinedCommunity] = useState(false);

  // RSVP button handler
  const handleRSVP = () => {
    setAttendees(attendees + 1);
    alert('You have successfully RSVP’d for the event!');
  };

  // Follow button handler
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Join community button handler
  const joinCommunity = () => {
    setHasJoinedCommunity(true);
    alert('You have successfully joined the community!');
  };

  return (
    <div className="container">
      {/* Top navigation with only Dashboard button */}
      <div className="top-nav">
        <button className="dashboard-btn" id="dashboardBtn">Dashboard</button>
      </div>

      {/* Header with Profile and Follow button */}
      <div className="header">
        <span>Profile</span>
        <button className="follow-btn" id="followBtn" onClick={toggleFollow}>
          {isFollowing ? 'Following' : '+ Follow'}
        </button>
      </div>

      <h2 className="event-name">Name of Event</h2>
      <div className="event-poster">Poster</div>
      <div className="description">Description of the event goes here.</div>

      {/* Buttons for RSVP and joining the community */}
      <div className="buttons">
        <button id="rsvpBtn" onClick={handleRSVP}>RSVP</button>
        <span className="attending" id="attendingCount">People Attending: {attendees}</span>
        <button
          className="community-btn"
          id="communityBtn"
          onClick={joinCommunity}
          disabled={hasJoinedCommunity}
        >
          {hasJoinedCommunity ? 'Community Joined' : 'Join Community'}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
