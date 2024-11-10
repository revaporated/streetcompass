// src/utils/api.js
import axios from 'axios';

export const generateItinerary = async (places, timePreferences) => {
  const prompt = `Given the following places and time preferences, create a detailed itinerary. Only include places that would be open during the specified times according to their hours of operation. Consider travel time between locations.

Places Data:
${JSON.stringify(places, null, 2)}

Time Preferences:
${JSON.stringify(timePreferences, null, 2)}

Please create an optimized itinerary that:
1. Only includes places that are open during the specified times
2. Considers reasonable time spent at each location
3. Accounts for travel time between locations
4. Organizes the places in a logical order for visiting
5. Stays within the specified time range

Format the response as a clear, readable itinerary with times and locations.`;

  try {
    const response = await axios.post('http://localhost:3001/api/generate-itinerary', {
      prompt
    });

    return response.data.content[0].text;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
};