# StreetCompass (HackRPI Demo)

StreetCompass is a web application that helps users discover and plan itineraries based on nearby points of interest. It uses Google Maps and Places API to find locations, and generates intelligent itineraries using AI that consider opening hours and travel time.

## Features

- Interactive map selection for location search
- Customizable search radius (1 or 2 miles)
- Displays detailed information about nearby places including:
  - Business hours
  - Ratings
  - Types of establishments
  - Contact information
- Visual map display of all discovered locations
- AI-powered itinerary generation based on:
  - Opening hours
  - Travel time
  - User's time preferences
  - Logical visit order

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/streetcompass.git
cd streetcompass
```

2. Install dependencies:
```bash
npm install
```

3. Install additional server dependencies:
```bash
npm install express cors concurrently
```

## Running the Application

1. Start both the React app and proxy server:
```bash
npm run dev
```

This will:
- Start the React development server at http://localhost:3000
- Start the proxy server at http://localhost:3001

## Using the Application

1. Log in using Google authentication
2. Click the "Test" button in the sidebar
3. Select a location on the map and adjust the radius
4. View the discovered places and their details
5. Enter your time preferences
6. Get an AI-generated itinerary based on your selections

## Available Scripts

- `npm start`: Runs only the React frontend
- `npm run server`: Runs only the proxy server
- `npm run dev`: Runs both frontend and server concurrently
- `npm test`: Runs the test suite
- `npm run build`: Creates a production build

## Technologies Used

- React
- Google Maps API
- Google Places API
- Google OAuth
- Anthropic Claude AI
- Tailwind CSS
- Express.js
- Axios

## License

[Your chosen license]

## Acknowledgments

- Eric Hunt,
- Madison Fung,
- Sam Hort,
- Tara Najingo
