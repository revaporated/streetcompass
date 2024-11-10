import React from 'react';

function PlacesList({ places }) {
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Places Found: {places.length}</h3>
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {places.map((place, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
            <h4 className="font-medium text-gray-800">{place.displayName}</h4>
            {place.formattedAddress && (
              <p className="text-sm text-gray-600 mt-1">{place.formattedAddress}</p>
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
    </div>
  );
}

export default PlacesList;