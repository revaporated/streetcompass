import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MapWithMarker from '../Map/MapWithMarker';
import PlacesList from '../PlacesList/PlacesList';
import { PLACE_TYPES } from '../../constants/placeTypes';

function Dashboard() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRadius, setSelectedRadius] = useState(1000);
  const [places, setPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestClick = () => {
    setIsMapOpen(true);
  };

  const handleLocationSelect = async (location, radius) => {
    setIsLoading(true);
    setSelectedLocation(location);
    setSelectedRadius(radius);
    setIsMapOpen(false);

    try {
      const { Place, SearchNearbyRankPreference } = await window.google.maps.importLibrary("places");
      
      const center = new window.google.maps.LatLng(location.lat, location.lng);
      const request = {
        fields: ["displayName", "formattedAddress", "location", "types"], // Changed primaryTypes to types
        locationRestriction: {
          center: center,
          radius: radius,
        },
        includedPrimaryTypes: PLACE_TYPES,
        maxResultCount: 20,
        rankPreference: SearchNearbyRankPreference.DISTANCE,
        language: "en-US",
        region: "us",
      };

      const { places: searchResults } = await Place.searchNearby(request);
      
      // Transform the results to include primaryTypes from types
      const transformedResults = searchResults.map(place => ({
        ...place,
        primaryTypes: place.types || []
      }));

      setPlaces(transformedResults);
    } catch (error) {
      console.error("Error searching nearby places:", error);
      // Optionally handle error state here
    } finally {
      setIsLoading(false);
    }
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
          
          {/* Location Information */}
          {selectedLocation && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Selected Location</h2>
              <div className="space-y-1">
                <p className="text-gray-600">
                  Latitude: {selectedLocation.lat.toFixed(6)}
                </p>
                <p className="text-gray-600">
                  Longitude: {selectedLocation.lng.toFixed(6)}
                </p>
                <p className="text-gray-600">
                  Radius: {(selectedRadius / 1609.34).toFixed(2)} miles
                </p>
              </div>
            </div>
          )}

          {/* Places List or Loading State */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-75"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-150"></div>
              </div>
              <p className="text-center text-gray-600 mt-2">Loading places...</p>
            </div>
          ) : places ? (
            <PlacesList places={places} />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600">
                Click the "Test" button in the sidebar to select a location and search for places.
              </p>
            </div>
          )}
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