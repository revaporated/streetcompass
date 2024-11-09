import React from 'react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8" class="body-container" >
      <div className="max-w-4xl mx-auto">
        <header>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Your Dashboard
        </h1>
        <div class="profile"><span>INITIALS</span><div class="avater"></div></div>
       
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6" id="body_right" class="grid" >
          <p className="text-gray-600">
            Welcome to your StreetCompass dashboard! This is a placeholder page that will
            be enhanced with features in future updates. 
          </p>
          <div class= "card"> This week</div>
          <div class= "card"> Upcoming events</div>
          <div class= "card"> Your followers</div>
          <div class= "card"> Friends activity</div>
        </div>
      </div>

      <div id="body_left">
        <h2> STREET CAMPUS</h2>
        <ul class="menue">
          <li><a href="#" class="row"> Discover </a></li>
          <li><a href="#" class="row"> Calender </a></li>
          <li><a href="PostCreator.js" class="row"> Create </a></li>
          <li><a href="#" class="row"> Find </a></li>
          <li><a href="#" class="row"> Chat </a></li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;