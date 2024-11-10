// src/components/Map/ResultsMap.js
import React, { useCallback, useEffect, useState } from 'react';

function ResultsMap({ places, centerLocation }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);

  const initializeMap = useCallback(async (mapDiv) => {
    if (!mapDiv) return;

    try {
      const newMap = new window.google.maps.Map(mapDiv, {
        center: centerLocation,
        zoom: 14,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      const newInfoWindow = new window.google.maps.InfoWindow();

      setMap(newMap);
      setInfoWindow(newInfoWindow);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [centerLocation]);

  // Update markers when places change
  useEffect(() => {
    if (!map || !places) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Create new markers
    const newMarkers = places.map(place => {
      const marker = new window.google.maps.Marker({
        position: place.location,
        map: map,
        title: place.displayName?.text || place.displayName,
      });

      // Create info window content
      const content = `
        <div class="p-2">
          <h3 class="font-medium text-gray-900">${place.displayName?.text || place.displayName}</h3>
          <p class="text-sm text-gray-600">${place.formattedAddress || ''}</p>
        </div>
      `;

      // Add hover listeners
      marker.addListener('mouseover', () => {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      marker.addListener('mouseout', () => {
        infoWindow.close();
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Adjust map bounds to fit all markers
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      newMarkers.forEach(marker => bounds.extend(marker.getPosition()));
      map.fitBounds(bounds);
    }
  }, [map, places, infoWindow]);

  return (
    <div 
      ref={initializeMap}
      className="w-full h-[400px] rounded-lg shadow-lg mb-4"
    />
  );
}

export default ResultsMap;