// src/components/PlacesList/PlacesList.js
import React, { useState } from 'react';

function PlacesList({ places }) {
  const [showJson, setShowJson] = useState(false);

  if (!places || places.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <p className="text-gray-600">No places found in this area.</p>
      </div>
    );
  }

  function formatPlaceType(type) {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Create formatted JSON data
  const jsonData = places.map(place => ({
    name: place.displayName?.text || place.displayName,
    address: place.formattedAddress,
    location: {
      lat: place.location?.lat,
      lng: place.location?.lng
    },
    types: place.primaryTypes || [],
    openingHours: place.openingHours || null,
    rating: place.rating || null,
    userRatingCount: place.userRatingCount || null,
    priceLevel: place.priceLevel || null,
    phoneNumber: place.phoneNumber || null,
    businessStatus: place.businessStatus || null
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Places Found: {places.length}
      </h3>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto mb-4">
        {places.map((place, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
            <h4 className="font-medium text-gray-800">
              {place.displayName?.text || place.displayName}
            </h4>
            {place.formattedAddress && (
              <p className="text-sm text-gray-600 mt-1">{place.formattedAddress}</p>
            )}
            {place.openingHours && (
              <div className="mt-2">
                <h5 className="text-sm font-medium text-gray-700 mb-1">Hours:</h5>
                <ul className="text-sm text-gray-600 space-y-0.5">
                  {place.openingHours.map((hours, idx) => (
                    <li key={idx}>{hours}</li>
                  ))}
                </ul>
              </div>
            )}
            {place.primaryTypes && place.primaryTypes.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {place.primaryTypes.map((type, typeIndex) => (
                    <span
                      key={typeIndex}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                    >
                      {formatPlaceType(type)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {place.location && (
              <p className="text-xs text-gray-500 mt-2">
                ({place.location.lat.toFixed(6)}, {place.location.lng.toFixed(6)})
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <button
          onClick={() => setShowJson(!showJson)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {showJson ? 'Hide JSON' : 'Show JSON'}
        </button>
        {showJson && (
          <div className="mt-4">
            <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlacesList;