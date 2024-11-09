import React from 'react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Your Dashboard
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600">
            Welcome to your StreetCompass dashboard! This is a placeholder page that will
            be enhanced with features in future updates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;