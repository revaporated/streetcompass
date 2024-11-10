// EventPage.js

// Get elements by their IDs
const rsvpBtn = document.getElementById('rsvpBtn');
const attendingCount = document.getElementById('attendingCount');
const followBtn = document.getElementById('followBtn');
const communityBtn = document.getElementById('communityBtn');

// RSVP Button Functionality
let attendees = 3; // Initial attendee count
rsvpBtn.addEventListener('click', () => {
  attendees += 1; // Increase attendee count
  attendingCount.textContent = `People Attending: ${attendees}`;
  alert('You have successfully RSVP’d for the event!');
});

// Follow Button Functionality
let isFollowing = false;
followBtn.addEventListener('click', () => {
  isFollowing = !isFollowing; // Toggle follow state
  followBtn.textContent = isFollowing ? 'Following' : '+ Follow';
});

// Join Community Button Functionality
communityBtn.addEventListener('click', () => {
  communityBtn.textContent = 'Community Joined';
  communityBtn.disabled = true; // Disable button after joining
  alert('You have successfully joined the community!');
});
