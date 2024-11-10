// src/components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MapWithMarker from '../Map/MapWithMarker';
import PlacesList from '../PlacesList/PlacesList';
import ResultsMap from '../Map/ResultsMap';
import TimePreferencesForm from '../TimePreferences/TimePreferencesForm';
import { generateItinerary } from '../../utils/api';
import { PLACE_TYPES } from '../../constants/placeTypes';

function Dashboard() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRadius, setSelectedRadius] = useState(1000);
  const [places, setPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timePreferences, setTimePreferences] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);

  const handleTestClick = () => {
    setIsMapOpen(true);
  };

  const handleLocationSelect = async (location, radius) => {
    setIsLoading(true);
    setError(null);
    setSelectedLocation(location);
    setSelectedRadius(radius);
    setIsMapOpen(false);
    setTimePreferences(null);
    setItinerary(null);

    try {
      const { Place, SearchNearbyRankPreference } = await window.google.maps.importLibrary("places");
      
      const center = new window.google.maps.LatLng(location.lat, location.lng);
      const request = {
        fields: [
          "displayName",
          "formattedAddress",
          "location",
          "types",
          "internationalPhoneNumber",
          "rating",
          "userRatingCount",
          "priceLevel",
          "businessStatus",
          "primaryType",
          "regularOpeningHours"
        ],
        locationRestriction: {
          center: center,
          radius: radius,
        },
        includedPrimaryTypes: PLACE_TYPES,
        maxResultCount: 20,
        rankPreference: SearchNearbyRankPreference.POPULARITY,
        language: "en-US",
        region: "us",
      };

      const { places: searchResults } = await Place.searchNearby(request);
      
      // Transform the results to include all metadata
      const transformedResults = searchResults.map(place => ({
        id: place.id,
        displayName: place.displayName?.text || place.displayName,
        formattedAddress: place.formattedAddress,
        location: {
          lat: typeof place.location.lat === 'function' ? place.location.lat() : parseFloat(place.location.lat),
          lng: typeof place.location.lng === 'function' ? place.location.lng() : parseFloat(place.location.lng)
        },
        primaryTypes: place.types || [],
        phoneNumber: place.internationalPhoneNumber,
        rating: place.rating,
        userRatingCount: place.userRatingCount,
        priceLevel: place.priceLevel,
        businessStatus: place.businessStatus,
        primaryType: place.primaryType,
        openingHours: place.regularOpeningHours?.weekdayDescriptions || null
      }));

      setPlaces(transformedResults);
    } catch (error) {
      console.error("Error searching nearby places:", error);
      setError("Failed to fetch nearby places. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
  };

  const handleTimePreferencesSubmit = async (preferences) => {
    setTimePreferences(preferences);
    setIsGeneratingItinerary(true);
    
    try {
      const generatedItinerary = await generateItinerary(places, preferences);
      setItinerary(generatedItinerary);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setError("Failed to generate itinerary. Please try again.");
    } finally {
      setIsGeneratingItinerary(false);
    }
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-75"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-150"></div>
              </div>
              <p className="text-center text-gray-600 mt-2">Loading places...</p>
            </div>
          )}

          {/* Results */}
          {!isLoading && places && (
            <div className="space-y-4">
              <ResultsMap 
                places={places} 
                centerLocation={selectedLocation}
              />
              {!timePreferences ? (
                <TimePreferencesForm onSubmit={handleTimePreferencesSubmit} />
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Selected Time Preferences</h3>
                    <button
                      onClick={() => {
                        setTimePreferences(null);
                        setItinerary(null);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                  <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(timePreferences, null, 2)}
                  </pre>
                </div>
              )}

              {/* Itinerary Section */}
              {timePreferences && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Generated Itinerary
                  </h3>
                  {isGeneratingItinerary ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                      <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-75"></div>
                      <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-150"></div>
                      <p className="text-gray-600">Generating itinerary...</p>
                    </div>
                  ) : itinerary ? (
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap">{itinerary}</div>
                    </div>
                  ) : (
                    <p className="text-gray-600">Failed to generate itinerary. Please try again.</p>
                  )}
                </div>
              )}

              <PlacesList places={places} />
            </div>
          )}

          {/* Initial State */}
          {!isLoading && !places && !error && (
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