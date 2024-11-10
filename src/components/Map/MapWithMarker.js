import React, { useState, useCallback, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194 // Default to San Francisco
};

// Radius options in meters
const RADIUS_OPTIONS = {
  ONE_MILE: 1609.34,
  TWO_MILES: 3218.68
};

function MapWithMarker({ onLocationSelect, onClose }) {
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);
  const [radius, setRadius] = useState(RADIUS_OPTIONS.ONE_MILE);
  const [searchQuery, setSearchQuery] = useState('');
  const searchBoxRef = useRef(null);
  const geocoderRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyCiV1Bza7sOb9rds9k-a1kprxGF79at0YQ",
    libraries: ['places']
  });

  const initializeMap = useCallback(async (mapDiv) => {
    if (!mapDiv) return;

    try {
      // Create map instance
      const mapInstance = new window.google.maps.Map(mapDiv, {
        center: defaultCenter,
        zoom: 14,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Initialize Geocoder
      geocoderRef.current = new window.google.maps.Geocoder();

      // Initialize SearchBox
      const searchInput = document.getElementById('location-search');
      searchBoxRef.current = new window.google.maps.places.SearchBox(searchInput);

      // Listen for searchbox events
      searchBoxRef.current.addListener('places_changed', () => {
        const places = searchBoxRef.current.getPlaces();
        if (places.length === 0) return;

        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        // Update map and marker position
        const newPos = place.geometry.location.toJSON();
        mapInstance.panTo(newPos);
        markerInstance.setPosition(newPos);
        setMarkerPosition(newPos);
        circleInstance.setCenter(newPos);

        // Adjust zoom if needed
        if (place.geometry.viewport) {
          mapInstance.fitBounds(place.geometry.viewport);
        } else {
          mapInstance.setZoom(14);
        }
      });

      // Create marker
      const markerInstance = new window.google.maps.Marker({
        map: mapInstance,
        position: defaultCenter,
        draggable: true,
        animation: window.google.maps.Animation.DROP
      });

      // Create circle
      const circleInstance = new window.google.maps.Circle({
        map: mapInstance,
        center: defaultCenter,
        radius: radius,
        fillColor: '#3B82F6',
        fillOpacity: 0.2,
        strokeColor: '#3B82F6',
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });

      // Add dragend listener to marker
      markerInstance.addListener("dragend", () => {
        const newPos = markerInstance.getPosition().toJSON();
        setMarkerPosition(newPos);
        circleInstance.setCenter(newPos);
      });

      // Add click listener to map
      mapInstance.addListener("click", (event) => {
        const newPos = event.latLng.toJSON();
        markerInstance.setPosition(newPos);
        setMarkerPosition(newPos);
        circleInstance.setCenter(newPos);
      });

      setMap(mapInstance);
      setMarker(markerInstance);
      setCircle(circleInstance);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [radius]);

  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    if (circle) {
      circle.setRadius(newRadius);
    }
  };

  const handleConfirm = () => {
    onLocationSelect(markerPosition, radius);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    geocoderRef.current.geocode({ address: searchQuery }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        const newPos = location.toJSON();
        
        map.panTo(newPos);
        marker.setPosition(newPos);
        setMarkerPosition(newPos);
        circle.setCenter(newPos);
        
        // Adjust zoom based on the type of location
        const types = results[0].types;
        if (types.includes('country')) {
          map.setZoom(5);
        } else if (types.includes('administrative_area_level_1')) {
          map.setZoom(7);
        } else if (types.includes('locality')) {
          map.setZoom(12);
        } else {
          map.setZoom(14);
        }
      }
    });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="p-4">
      <div className="mb-4 space-y-4">
        {/* Search Bar */}
        <div className="flex gap-2">
          <input
            id="location-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>

        {/* Radius Selection */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Radius:</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleRadiusChange(RADIUS_OPTIONS.ONE_MILE)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                radius === RADIUS_OPTIONS.ONE_MILE
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1 Mile
            </button>
            <button
              onClick={() => handleRadiusChange(RADIUS_OPTIONS.TWO_MILES)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                radius === RADIUS_OPTIONS.TWO_MILES
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              2 Miles
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Click on the map or drag the pin to select a location
        </p>
      </div>

      <div 
        ref={initializeMap}
        style={mapContainerStyle}
      />
      
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
}

export default MapWithMarker;