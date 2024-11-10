import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MapWithMarker from '../Map/MapWithMarker';

function Dashboard() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRadius, setSelectedRadius] = useState(1000);

  const handleTestClick = () => {
    setIsMapOpen(true);
  };

  const handleLocationSelect = (location, radius) => {
    setSelectedLocation(location);
    setSelectedRadius(radius);
    setIsMapOpen(false);
    // You can add additional processing here
    console.log('Selected Location:', location);
    console.log('Selected Radius:', radius);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar onTestClick={handleTestClick} />
      <div className="flex-1 bg-gray-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto md:ml-64">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-12 md:mt-0">
            Your Dashboard
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600">
              Welcome to your StreetCompass dashboard! This is a placeholder page that will
              be enhanced with features in future updates.
            </p>
            {selectedLocation && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h2 className="text-lg font-semibold text-gray-800">Selected Location</h2>
                <p className="text-gray-600">
                  Latitude: {selectedLocation.lat.toFixed(6)}
                </p>
                <p className="text-gray-600">
                  Longitude: {selectedLocation.lng.toFixed(6)}
                </p>
                <p className="text-gray-600">
                  Radius: {selectedRadius} meters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Select Location
              </h2>
            </div>
            <MapWithMarker
              onLocationSelect={handleLocationSelect}
              onClose={handleCloseMap}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;