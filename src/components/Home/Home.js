import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    navigate('/dashboard');
  };

  const handleLoginError = () => {
    console.error('Login Failed');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome to StreetCompass
        </h1>
        <p className="text-center text-gray-600">
          Discover your perfect itinerary
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
}

export default Home;